/*
 * Automatic Rain-Sensing Retractable Clothesline (2024–2025)
 * Author: Sujaya K S (Electronics and Communication Engineering)
 * Practical Implementation & Demonstration: TRIOX Technology IoT Internship
 * GitHub: https://github.com/sujaya-25
 * 
 * Hardware:
 * - Microcontroller: Arduino Uno / Nano or ESP8266 NodeMCU
 * - Sensory Layer: FC-37 / YL-83 Raindrop Detection Module (Analog + Digital)
 * - Actuation Layer: L298N Dual H-Bridge Motor Driver + 12V High-Torque Geared DC Motor
 * - Safety & Limits: Dual Mechanical Microswitches (End-stop limit switches)
 * - Acoustic Signal: Active Piezo Buzzer
 * 
 * Control Engineering Highlights:
 * - 10-sample moving average digital filter to reject condensation and humidity noise
 * - Hysteresis band logic to eliminate motor chatter during light drizzle transitions
 * - Emergency watchdog timer: Shuts down motor after 15s if limit switches fail to trigger
 */

// Pin Definitions
const uint8_t PIN_RAIN_ANALOG      = A0;  // Rain Sensor Analog Output (0 to 1023)
const uint8_t PIN_LIMIT_EXTENDED   = 3;   // Microswitch: High when clothesline fully out
const uint8_t PIN_LIMIT_RETRACTED  = 4;   // Microswitch: High when clothesline sheltered
const uint8_t PIN_MOTOR_ENA        = 5;   // PWM Speed Control (L298N ENA)
const uint8_t PIN_MOTOR_IN1        = 6;   // Motor Direction Input 1
const uint8_t PIN_MOTOR_IN2        = 7;   // Motor Direction Input 2
const uint8_t PIN_BUZZER           = 9;   // Acoustic Rain Alert Buzzer
const uint8_t PIN_MANUAL_OVERRIDE  = 11;  // Pushbutton / Toggle for manual operation

// Calibration Constants
const int RAIN_THRESHOLD_TRIGGER   = 600; // ADC value below 600 indicates rain detected
const int RAIN_THRESHOLD_CLEAR     = 850; // ADC value above 850 indicates surface dried
const uint8_t MOTOR_NORMAL_SPEED   = 200; // PWM duty cycle (0-255)
const unsigned long WATCHDOG_MAX_MS = 15000; // 15s maximum travel duration safety cutoff

// Moving Average Filter Buffer
const uint8_t FILTER_WINDOW_SIZE   = 10;
int sensorReadings[FILTER_WINDOW_SIZE];
uint8_t readIndex                  = 0;
long totalSum                      = 0;
int filteredRainValue              = 1023;

// Finite State Machine Enum
enum SystemState {
  STATE_EXTENDED,     // Clothes drying in open sun
  STATE_RETRACTING,   // Rain detected: motor pulling line into sheltered enclosure
  STATE_RETRACTED,    // Sheltered from rain
  STATE_EXTENDING,    // Rain stopped and dried: restoring clothes to drying position
  STATE_SAFETY_ERROR  // Watchdog timeout exceeded (jam / sensor failure)
};

SystemState currentState = STATE_EXTENDED;
unsigned long motorActionStartTime = 0;
bool alertSounded = false;

void setup() {
  Serial.begin(9600);
  while (!Serial) { delay(10); }

  Serial.println(F("=================================================="));
  Serial.println(F("  Automatic Rain-Sensing Retractable Clothesline"));
  Serial.println(F("  Engineered by: Sujaya K S | TRIOX IoT Internship"));
  Serial.println(F("=================================================="));

  // Initialize Input / Output Pins
  pinMode(PIN_RAIN_ANALOG, INPUT);
  pinMode(PIN_LIMIT_EXTENDED, INPUT_PULLUP);
  pinMode(PIN_LIMIT_RETRACTED, INPUT_PULLUP);
  pinMode(PIN_MANUAL_OVERRIDE, INPUT_PULLUP);

  pinMode(PIN_MOTOR_ENA, OUTPUT);
  pinMode(PIN_MOTOR_IN1, OUTPUT);
  pinMode(PIN_MOTOR_IN2, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

  // Stop motor by default
  stopMotor();

  // Initialize moving average buffer
  for (int i = 0; i < FILTER_WINDOW_SIZE; i++) {
    sensorReadings[i] = analogRead(PIN_RAIN_ANALOG);
    totalSum += sensorReadings[i];
    delay(20);
  }
  filteredRainValue = totalSum / FILTER_WINDOW_SIZE;

  // Initial State Assessment
  if (digitalRead(PIN_LIMIT_RETRACTED) == LOW) {
    currentState = STATE_RETRACTED;
    Serial.println(F("[INIT] System starting in RETRACTED state."));
  } else {
    currentState = STATE_EXTENDED;
    Serial.println(F("[INIT] System starting in EXTENDED state."));
  }

  tone(PIN_BUZZER, 1500, 100);
}

void loop() {
  updateSensorFilter();
  handleStateMachine();
  telemetryLog();
  delay(100);
}

// -------------------------------------------------------------
// Digital Filter: 10-Point Running Average
// -------------------------------------------------------------
void updateSensorFilter() {
  totalSum -= sensorReadings[readIndex];
  sensorReadings[readIndex] = analogRead(PIN_RAIN_ANALOG);
  totalSum += sensorReadings[readIndex];
  readIndex = (readIndex + 1) % FILTER_WINDOW_SIZE;
  filteredRainValue = totalSum / FILTER_WINDOW_SIZE;
}

// -------------------------------------------------------------
// State Machine Engine
// -------------------------------------------------------------
void handleStateMachine() {
  bool rainDetected = (filteredRainValue < RAIN_THRESHOLD_TRIGGER);
  bool surfaceDry   = (filteredRainValue > RAIN_THRESHOLD_CLEAR);

  switch (currentState) {
    case STATE_EXTENDED:
      if (rainDetected) {
        Serial.println(F("[EVENT] Rain onset detected! Initiating retraction to shelter..."));
        alertSounded = false;
        startMotorRetracting();
      }
      break;

    case STATE_RETRACTING:
      // Sound alert chime while retracting
      if (!alertSounded) {
        tone(PIN_BUZZER, 2200, 400);
        alertSounded = true;
      }

      // Check Retracted Limit Switch (Active LOW with internal pullup)
      if (digitalRead(PIN_LIMIT_RETRACTED) == LOW) {
        stopMotor();
        currentState = STATE_RETRACTED;
        Serial.println(F("[LIMIT] Retracted limit switch reached. Clothesline sheltered securely."));
        tone(PIN_BUZZER, 1000, 150);
      } 
      // Safety Watchdog Check
      else if (millis() - motorActionStartTime > WATCHDOG_MAX_MS) {
        triggerSafetyError(F("Watchdog timeout during RETRACT! Possible mechanical jam."));
      }
      break;

    case STATE_RETRACTED:
      if (surfaceDry) {
        Serial.println(F("[EVENT] Rain ceased and sensor dried. Automatically extending clothesline..."));
        startMotorExtending();
      }
      break;

    case STATE_EXTENDING:
      // Immediate rain abort: if rain starts again while extending, reverse immediately!
      if (rainDetected) {
        Serial.println(F("[ABORT] Rain detected during extension! Reversing immediately."));
        startMotorRetracting();
        return;
      }

      // Check Extended Limit Switch
      if (digitalRead(PIN_LIMIT_EXTENDED) == LOW) {
        stopMotor();
        currentState = STATE_EXTENDED;
        Serial.println(F("[LIMIT] Extended limit switch reached. Clothes restored to drying area."));
        tone(PIN_BUZZER, 1800, 100);
      } 
      // Safety Watchdog Check
      else if (millis() - motorActionStartTime > WATCHDOG_MAX_MS) {
        triggerSafetyError(F("Watchdog timeout during EXTEND! Check pulley tension."));
      }
      break;

    case STATE_SAFETY_ERROR:
      stopMotor();
      // Fast warning beeps
      if ((millis() / 500) % 2 == 0) {
        tone(PIN_BUZZER, 500, 100);
      }
      break;
  }
}

// -------------------------------------------------------------
// Motor Actuation Subroutines (L298N H-Bridge)
// -------------------------------------------------------------
void startMotorRetracting() {
  currentState = STATE_RETRACTING;
  motorActionStartTime = millis();

  digitalWrite(PIN_MOTOR_IN1, HIGH);
  digitalWrite(PIN_MOTOR_IN2, LOW);
  analogWrite(PIN_MOTOR_ENA, MOTOR_NORMAL_SPEED);
}

void startMotorExtending() {
  currentState = STATE_EXTENDING;
  motorActionStartTime = millis();

  digitalWrite(PIN_MOTOR_IN1, LOW);
  digitalWrite(PIN_MOTOR_IN2, HIGH);
  analogWrite(PIN_MOTOR_ENA, MOTOR_NORMAL_SPEED);
}

void stopMotor() {
  analogWrite(PIN_MOTOR_ENA, 0);
  digitalWrite(PIN_MOTOR_IN1, LOW);
  digitalWrite(PIN_MOTOR_IN2, LOW);
}

void triggerSafetyError(const __FlashStringHelper* reason) {
  stopMotor();
  currentState = STATE_SAFETY_ERROR;
  Serial.print(F("[EMERGENCY STOP] "));
  Serial.println(reason);
}

// -------------------------------------------------------------
// Telemetry & Debugging Output
// -------------------------------------------------------------
unsigned long lastLogTime = 0;
void telemetryLog() {
  if (millis() - lastLogTime >= 2000) {
    lastLogTime = millis();
    int rainPercent = map(constrain(filteredRainValue, 200, 1023), 1023, 200, 0, 100);

    Serial.print(F("[TELEMETRY] Sensor ADC: "));
    Serial.print(filteredRainValue);
    Serial.print(F(" | Rain Level: "));
    Serial.print(rainPercent);
    Serial.print(F("% | State: "));

    switch (currentState) {
      case STATE_EXTENDED:    Serial.println(F("EXTENDED (Drying)")); break;
      case STATE_RETRACTING:  Serial.println(F("RETRACTING (Moving to shelter)")); break;
      case STATE_RETRACTED:   Serial.println(F("RETRACTED (Sheltered)")); break;
      case STATE_EXTENDING:   Serial.println(F("EXTENDING (Restoring)")); break;
      case STATE_SAFETY_ERROR:Serial.println(F("ERROR (Watchdog triggered)")); break;
    }
  }
}

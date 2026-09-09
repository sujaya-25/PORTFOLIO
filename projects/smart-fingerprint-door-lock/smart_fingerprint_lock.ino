/*
 * Smart Fingerprint Door Lock System (2023–2024)
 * Author: Sujaya K S (Electronics and Communication Engineering)
 * Institution: Dr. N.G.P. Institute of Technology
 * GitHub: https://github.com/sujaya-25
 * 
 * Target Hardware: Arduino Uno / Nano
 * Sensor: Optical Biometric Fingerprint Sensor (AS608 / R307 / FPM10A)
 * Actuator: 12V DC Solenoid Door Lock via 5V Optocoupler Relay Module
 * Visual/Audio Feedback: Dual Status LEDs + Piezo Buzzer
 * 
 * Security Features:
 * - Real-time biometric pattern matching against enrolled templates
 * - Non-blocking auto-relock timer (5 seconds)
 * - Security lockout penalty after 3 consecutive unauthorized attempts
 * - Hardware flyback diode protection for inductive solenoid spikes
 */

#include <SoftwareSerial.h>
#include <Adafruit_Fingerprint.h>

// Pin Configurations
const uint8_t PIN_FINGERPRINT_RX = 2;   // Arduino Pin 2 -> Sensor TX (White/Yellow wire)
const uint8_t PIN_FINGERPRINT_TX = 3;   // Arduino Pin 3 -> Sensor RX (Green wire via voltage divider if 3.3V)
const uint8_t PIN_RELAY_LOCK     = 7;   // Active-LOW Relay control for Solenoid Lock
const uint8_t PIN_LED_GREEN      = 8;   // Access Granted Indicator
const uint8_t PIN_LED_RED        = 9;   // Access Denied / Locked Indicator
const uint8_t PIN_BUZZER         = 10;  // Piezo Buzzer for acoustic signals

// Operational Parameters
const unsigned long UNLOCK_DURATION_MS = 5000;   // 5 seconds unlocked state
const uint8_t MAX_FAILED_ATTEMPTS      = 3;      // Security lockout threshold
const unsigned long LOCKOUT_PENALTY_MS = 30000;  // 30 seconds lockout alarm

// Hardware Serial Interface for Optical Sensor
SoftwareSerial mySerial(PIN_FINGERPRINT_RX, PIN_FINGERPRINT_TX);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

// System State Variables
bool isDoorUnlocked = false;
unsigned long unlockStartTime = 0;
uint8_t consecutiveFailedAttempts = 0;
bool isSystemInLockout = false;
unsigned long lockoutStartTime = 0;

void setup() {
  Serial.begin(9600);
  while (!Serial) { delay(10); }

  Serial.println(F("=================================================="));
  Serial.println(F("  Smart Fingerprint Door Lock System"));
  Serial.println(F("  Engineered by: Sujaya K S (B.E. ECE)"));
  Serial.println(F("=================================================="));

  // Initialize Pin Modes
  pinMode(PIN_RELAY_LOCK, OUTPUT);
  pinMode(PIN_LED_GREEN, OUTPUT);
  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

  // Relay is Active-LOW: HIGH means locked, LOW means unlocked
  digitalWrite(PIN_RELAY_LOCK, HIGH);
  digitalWrite(PIN_LED_GREEN, LOW);
  digitalWrite(PIN_LED_RED, HIGH);  // Door securely locked by default
  digitalWrite(PIN_BUZZER, LOW);

  // Initialize Biometric Fingerprint Sensor
  finger.begin(57600);
  delay(100);

  if (finger.verifyPassword()) {
    Serial.println(F("[SUCCESS] Optical Fingerprint Sensor found and verified."));
    beepSuccess();
  } else {
    Serial.println(F("[ERROR] Biometric sensor not detected. Check wiring connections!"));
    beepError();
  }

  finger.getTemplateCount();
  Serial.print(F("[INFO] Enrolled Fingerprint Templates: "));
  Serial.println(finger.templateCount);
  Serial.println(F("[INFO] System Active. Awaiting fingerprint placement..."));
}

void loop() {
  // Handle Security Lockout State
  if (isSystemInLockout) {
    if (millis() - lockoutStartTime >= LOCKOUT_PENALTY_MS) {
      isSystemInLockout = false;
      consecutiveFailedAttempts = 0;
      Serial.println(F("[SECURITY] Lockout timer expired. Normal operation restored."));
      digitalWrite(PIN_LED_RED, HIGH);
      beepSuccess();
    } else {
      // Rapid blinking during penalty period
      digitalWrite(PIN_LED_RED, (millis() / 250) % 2 == 0 ? HIGH : LOW);
      delay(50);
      return;
    }
  }

  // Handle Automatic Door Relocking
  if (isDoorUnlocked) {
    if (millis() - unlockStartTime >= UNLOCK_DURATION_MS) {
      relockDoor();
    }
  }

  // Scan for finger placement
  int fingerprintID = getFingerprintIDez();

  if (fingerprintID > 0) {
    // Authorized fingerprint detected
    Serial.print(F("[AUTH GRANTED] Valid Fingerprint ID: #"));
    Serial.print(fingerprintID);
    Serial.print(F(" | Confidence Score: "));
    Serial.println(finger.confidence);

    consecutiveFailedAttempts = 0;
    unlockDoor();
  } else if (fingerprintID == -1) {
    // Unknown or unauthorized fingerprint
    consecutiveFailedAttempts++;
    Serial.print(F("[AUTH DENIED] Unrecognized fingerprint! Attempt "));
    Serial.print(consecutiveFailedAttempts);
    Serial.print(F(" of "));
    Serial.println(MAX_FAILED_ATTEMPTS);

    handleFailedAttempt();
  }

  delay(50); // Small loop stabilization pause
}

// -------------------------------------------------------------
// Core Hardware Control Functions
// -------------------------------------------------------------

void unlockDoor() {
  isDoorUnlocked = true;
  unlockStartTime = millis();

  // Energize Relay (Active LOW) to pull 12V Solenoid
  digitalWrite(PIN_RELAY_LOCK, LOW);
  digitalWrite(PIN_LED_GREEN, HIGH);
  digitalWrite(PIN_LED_RED, LOW);

  // Play Access Granted audio chime
  tone(PIN_BUZZER, 1800, 150);
  delay(180);
  tone(PIN_BUZZER, 2400, 200);

  Serial.println(F("[HARDWARE] Solenoid Latch OPEN. Door unlocked for 5 seconds."));
}

void relockDoor() {
  isDoorUnlocked = false;

  // De-energize Relay
  digitalWrite(PIN_RELAY_LOCK, HIGH);
  digitalWrite(PIN_LED_GREEN, LOW);
  digitalWrite(PIN_LED_RED, HIGH);

  // Relock tone
  tone(PIN_BUZZER, 1000, 150);

  Serial.println(F("[HARDWARE] Solenoid Latch CLOSED. Door locked."));
}

void handleFailedAttempt() {
  digitalWrite(PIN_LED_RED, HIGH);
  digitalWrite(PIN_LED_GREEN, LOW);

  // Harsh warning buzz
  tone(PIN_BUZZER, 400, 400);

  if (consecutiveFailedAttempts >= MAX_FAILED_ATTEMPTS) {
    triggerSecurityLockout();
  }
}

void triggerSecurityLockout() {
  isSystemInLockout = true;
  lockoutStartTime = millis();

  Serial.println(F("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
  Serial.println(F("[ALERT] 3 FAILED ATTEMPTS! SYSTEM LOCKED FOR 30 SECONDS."));
  Serial.println(F("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));

  // Continuous alarm bursts
  for (int i = 0; i < 4; i++) {
    tone(PIN_BUZZER, 800, 200);
    delay(250);
    tone(PIN_BUZZER, 400, 200);
    delay(250);
  }
}

// -------------------------------------------------------------
// Biometric Sensor Acquisition Subroutine
// -------------------------------------------------------------
int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return 0; // No finger placed

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return 0; // Could not convert image

  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    return finger.fingerID; // Match found
  } else if (p == FINGERPRINT_NOTFOUND) {
    return -1; // Finger placed, but no match in database
  }

  return 0;
}

void beepSuccess() {
  tone(PIN_BUZZER, 2000, 100);
  delay(120);
  tone(PIN_BUZZER, 2500, 150);
}

void beepError() {
  tone(PIN_BUZZER, 500, 300);
}

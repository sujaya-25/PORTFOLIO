# Automatic Rain-Sensing Retractable Clothesline — Hardware & Wiring Guide

**Developer:** Sujaya K S | Department of ECE | TRIOX Technology IoT Internship  
**Target Board:** Arduino Uno / Nano / ESP8266 NodeMCU  

---

## 🔌 Pin Interconnect Matrix

| Arduino Uno Pin | Peripheral Module | Pin Name | Wire Color / Notes |
| :--- | :--- | :--- | :--- |
| **A0** | FC-37 Rain Sensor Comparator | **A0 (Analog Out)** | Blue wire (0–1023 mV proportional to moisture) |
| **5V** | FC-37 Rain Sensor Comparator | **VCC** | Red wire (5V DC power) |
| **GND** | FC-37 Rain Sensor Comparator | **GND** | Black wire (Common ground) |
| **D3** | Limit Switch 1 (Retracted) | **NO / Signal** | Pulled LOW when carriage hits home position |
| **D4** | Limit Switch 2 (Extended) | **NO / Signal** | Pulled LOW when carriage reaches full extension |
| **GND** | Limit Switches | **Common (C)** | Shared ground for microswitches |
| **D5** | L298N Motor Driver | **ENA** | PWM speed control jumper removed |
| **D6** | L298N Motor Driver | **IN1** | Direction polarity pin A |
| **D7** | L298N Motor Driver | **IN2** | Direction polarity pin B |
| **D9** | Piezo Buzzer | **(+) Anode** | Audio chime trigger |
| **GND** | Piezo Buzzer | **(-) Cathode** | Common ground |
| **External 12V (+)** | L298N 12V Power Terminal | **12V Input** | Dedicated 12V 2A DC adapter for motor |
| **External GND (-)** | L298N GND Terminal | **GND Input** | Tied to Arduino GND (common ground reference) |

---

## 📊 Analog Sensor Calibration Guide

The FC-37 rain sensor uses nickel-coated conductive traces. When dry, resistance is virtually infinite ($ADC \approx 1023$). As raindrops bridge the traces, resistance drops sharply ($ADC \le 400$).

```
Dry / Clear Sun (ADC: 850 - 1023)  --> System State: EXTENDED (Drying)
             |
             | Drops below 600 (Rain Onset)
             v
Drizzle / Heavy Rain (ADC: 200 - 600) --> System State: RETRACTING --> RETRACTED
             |
             | Rises above 850 (Moisture Evaporated)
             v
Restored to Sun (ADC > 850)        --> System State: EXTENDING --> EXTENDED
```

### Hysteresis Protection
A 250-point hysteresis gap ($600 \leftrightarrow 850$) ensures that ambient coastal humidity or single stray droplets do not cause continuous motor jitter.

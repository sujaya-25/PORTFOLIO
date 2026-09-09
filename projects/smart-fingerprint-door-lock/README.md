# Smart Fingerprint Door Lock System (2023–2024)

[![Arduino](https://img.shields.io/badge/Platform-Arduino%20Uno%2FNano-00979C.svg?logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![Biometrics](https://img.shields.io/badge/Sensor-AS608%2FR307%20Optical-red.svg)](https://github.com/sujaya-25)
[![Embedded C++](https://img.shields.io/badge/Language-C%2B%2B%20Embedded-blue.svg)](https://isocpp.org/)

> **Academic Project** developed by **Sujaya K S** (Electronics and Communication Engineering, Dr. N.G.P. Institute of Technology).

---

## 📌 Project Overview

Traditional mechanical key locks are vulnerable to picking, loss, and unauthorized duplication. The **Smart Fingerprint Door Lock System** provides a reliable, keyless biometric access control mechanism using an optical fingerprint sensor, an Arduino microcontroller, and a high-retention 12V solenoid lock.

### Key Objectives
- Fast biometric verification (under 1 second).
- Autonomous 5-second unlock cycle with automatic mechanical latching.
- Security lockout mechanism: 3 consecutive unauthorized fingerprint attempts trigger an alarm and lock the system for 30 seconds.
- Inductive spike suppression using flyback diodes for hardware reliability.

---

## 🛠️ Hardware Bill of Materials (BOM)

| Component | Specification | Purpose |
| :--- | :--- | :--- |
| **Arduino Uno / Nano** | ATmega328P, 16MHz | Central microcontroller processing authentication logic |
| **Biometric Sensor** | R307 / AS608 Optical Sensor | Captures and matches fingerprint ridge minutiae (57600 baud) |
| **5V Relay Module** | 1-Channel Optocoupled (Active LOW) | Controls 12V high-current circuit safely from 5V logic |
| **12V Solenoid Door Lock**| 12V DC, 1.2A, Stroke 10mm | Electromechanical latch mechanism |
| **Flyback Diode** | 1N4007 | Suppresses inductive kickback from solenoid coil |
| **Power Supply** | 12V 2A DC Power Adapter | Drives solenoid and powers Arduino via barrel jack |
| **Visual Indicators** | 5mm LEDs (Green & Red) + 220Ω | Visual feedback for Access Granted vs Denied |
| **Acoustic Indicator**| 5V Piezo Buzzer | Distinct frequency chimes for success, error, and alarm |

---

## ⚡ Circuit Connections

See [`circuit_diagram.txt`](circuit_diagram.txt) for full ASCII schematics and wiring map.

- **R307 Sensor TX** $\rightarrow$ **Arduino D2 (RX)**
- **R307 Sensor RX** $\rightarrow$ **Arduino D3 (TX)**
- **Relay IN** $\rightarrow$ **Arduino D7**
- **Green LED** $\rightarrow$ **Arduino D8** (via 220Ω)
- **Red LED** $\rightarrow$ **Arduino D9** (via 220Ω)
- **Buzzer** $\rightarrow$ **Arduino D10**

---

## 📖 How to Deploy & Flash Firmware

1. **Install Arduino IDE**: Download and open Arduino IDE (v2.x or v1.8.x).
2. **Install Library**:
   - Go to `Tools` $\rightarrow$ `Manage Libraries...`
   - Search for **Adafruit Fingerprint Sensor Library** and click **Install**.
3. **Enroll Fingerprints**:
   - Flash the `enroll` example from the Adafruit library to store authorized user templates to flash memory IDs (`#1`, `#2`, etc.).
4. **Flash Project Code**:
   - Open `smart_fingerprint_lock.ino` in Arduino IDE.
   - Select your board: `Tools` $\rightarrow$ `Board` $\rightarrow$ `Arduino Uno`.
   - Select the corresponding COM port and click **Upload**.
5. **Monitor System**:
   - Open `Tools` $\rightarrow$ `Serial Monitor` at **9600 baud** to view real-time authentication logs and confidence scores.

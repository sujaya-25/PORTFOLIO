# Sujaya K S — Developer Portfolio & Projects Showcase 🚀

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=24&pause=1000&color=38BDF8&center=true&vCenter=true&width=650&lines=Sujaya+K+S;B.E.+ECE+Undergraduate+%7C+CGPA+8.7;Python+%7C+Java+%7C+DSA+%7C+Embedded+C;Smart+IoT+%26+Biometric+Systems" alt="Sujaya's Banner" />
</p>

<p align="center">
  <a href="https://sujaya-25.github.io/sujaya-portfolio/"><img src="https://img.shields.io/badge/Live%20Portfolio-GitHub%20Pages-success?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Portfolio" /></a>
  <a href="https://linkedin.com/in/sujayaks/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:sujayaaks@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://github.com/sujaya-25"><img src="https://img.shields.io/badge/GitHub-sujaya--25-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Institution-Dr._N.G.P._IT-blue?style=flat-square" alt="Institution" />
  <img src="https://img.shields.io/badge/CGPA-8.7-brightgreen?style=flat-square" alt="CGPA" />
  <img src="https://img.shields.io/badge/NPTEL-Elite%20Certified%20(IIT%20KGP)-purple?style=flat-square" alt="NPTEL" />
  <img src="https://img.shields.io/badge/Hackathon-SIH%20'25%20Presenter-orange?style=flat-square" alt="SIH" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square" alt="License" />
</p>

---

## 📑 Table of Contents

- [About Sujaya K S](#-about-sujaya-k-s)
- [Repository Architecture](#-repository-architecture)
- [Interactive Web Portfolio](#-interactive-web-portfolio)
- [Featured Projects](#-featured-projects)
  - [1. GuidEx — Smart Exam Hall Guidance System](#1-guidex--smart-exam-hall-guidance-system-20252026)
  - [2. Automatic Rain-Sensing Retractable Clothesline](#2-automatic-rain-sensing-retractable-clothesline-20242025)
  - [3. Smart Fingerprint Door Lock System](#3-smart-fingerprint-door-lock-system-20232024)
  - [4. SIH 2025: Crowdsourced Civic Issue Reporting](#4-sih-2025-crowdsourced-civic-issue-reporting-and-resolution-system)
- [Multi-Format Resume Suite](#-multi-format-resume-suite)
- [Professional Experience & Internships](#-professional-experience--internships)
- [Certifications & Achievements](#-certifications--achievements)
- [Quick Start & Local Execution](#-quick-start--local-execution)
- [Automated CI/CD Deployment](#-automated-cicd-deployment)
- [Connect & Contact](#-connect--contact)

---

## 👩‍💻 About Sujaya K S

Final-year **Electronics and Communication Engineering (ECE)** student at **Dr. N.G.P. Institute of Technology, Coimbatore** (CGPA: **8.7**). Skilled in **Python, Java, Data Structures & Algorithms (DSA), and SQL**, with hands-on experience in software development, desktop applications, embedded systems, and IoT automation.

- **Objective**: Looking for an opportunity to apply programming and analytical skills, learn from real-world engineering projects, and grow in a professional IT environment.
- **Core Strengths**: Strong foundation in hardware-software integration, testing and debugging, object-oriented design, algorithmic thinking, and sensor telemetry.

---

## 📂 Repository Architecture

```
sujaya-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── .gitignore                      # Python, Node, OS, and IDE ignore configurations
├── LICENSE                         # Open-source MIT License
├── README.md                       # Comprehensive repository documentation
├── PROFILE_README.md               # Ready-to-use GitHub Profile README (for sujaya-25/sujaya-25)
├── index.html                      # Interactive web portfolio application
├── css/
│   ├── style.css                   # Responsive layout, modern theme & glassmorphism
│   └── terminal.css                # Retro-modern CLI terminal emulator styling
├── js/
│   ├── app.js                      # Portfolio UI controls, filters, modal controllers
│   ├── data.js                     # Structured resume data store
│   ├── simulators.js               # In-browser interactive hardware simulators
│   └── terminal.js                 # Interactive CLI terminal logic
├── projects/
│   ├── guidex-exam-system/         # Flagship Software Project (2025–2026)
│   │   ├── README.md               # Project guide, architecture diagram & data schema
│   │   ├── app.py                  # Python Tkinter desktop GUI + Serial & Simulator mode
│   │   ├── requirements.txt        # Dependencies (pyserial, standard library)
│   │   ├── data/
│   │   │   └── students.csv        # Student records & exam hall allocations database
│   │   └── test_guidex.py          # 8 automated unit tests for verification engine
│   ├── smart-fingerprint-door-lock/ # Embedded Security Project (2023–2024)
│   │   ├── README.md               # Bill of materials, setup instructions & troubleshooting
│   │   ├── smart_fingerprint_lock.ino # Arduino C++ firmware (Optical sensor + Solenoid)
│   │   └── circuit_diagram.txt     # ASCII schematics & inductive isolation guide
│   └── rain-sensing-clothesline/   # IoT Automation Project (2024–2025)
│       ├── README.md               # System design, state machine flow & features
│       ├── rain_sensing_clothesline.ino # Arduino/NodeMCU firmware with moving average filter
│       └── wiring_guide.md         # Pinout diagrams & ADC threshold calibration guide
└── resume/
    ├── resume.md                   # ATS-optimized Markdown resume
    ├── resume.html                 # Print-ready A4 styled resume (1-Click Print to PDF)
    └── resume.json                 # Standard JSON Resume schema representation
```

---

## 🌐 Interactive Web Portfolio

The web portfolio (`index.html`) is a modern, standalone web application deployable directly to **GitHub Pages**:

- **Dynamic Visuals**: HTML5 Canvas particle network background with interactive mouse repulsion.
- **Dark & Light Mode**: Smooth theme toggling with persistent user preference storage.
- **Interactive In-Browser Simulators**:
  - *GuidEx Simulator*: Test RFID card scans, biometric matching, and dynamic seat grid highlighting directly inside the browser modal.
  - *Rain-Sensing Clothesline Simulator*: Adjust dynamic rain intensity sliders to watch real-time motor state transitions and telemetry plots.
  - *Biometric Door Lock Simulator*: Tap enrolled or unauthorized fingerprint scans to trigger relay actuation and lockout alarms.
- **Developer CLI Terminal**: An interactive terminal playground supporting commands like `skills`, `projects`, `cat resume.txt`, `experience`, `clear`, and `hire`.

---

## 🛠️ Featured Projects

### 1. GuidEx — Smart Exam Hall Guidance System (2025–2026)
*Domain: Software Development, Python GUI, Biometric & RFID Authentication*  
📁 **Source Code**: [`projects/guidex-exam-system/`](projects/guidex-exam-system/)

- **Problem**: Examination halls suffer from severe queue bottlenecks around paper notice boards, leading to hallway congestion, delays, and impersonation risks.
- **Solution**: Developed a hardware-software guidance kiosk combining RFID smart cards and optical biometric fingerprint scanning with an interactive Python desktop GUI built on Tkinter.
- **Key Capabilities**:
  - Sub-50ms student verification against a structured CSV backend (`data/students.csv`).
  - Dynamic hall allocation badge, floor level routing, and visual 4x6 desk seating map highlighting the student's assigned desk.
  - Duplicate check-in prevention with amber alerts.
  - Audit logging with automated timestamped CSV export.
  - Complete automated test suite: 8 passing unit tests covering all verification branches.

### 2. Automatic Rain-Sensing Retractable Clothesline (2024–2025)
*Domain: Embedded Systems, IoT Automation, Sensor Signal Processing*  
📁 **Source Code**: [`projects/rain-sensing-clothesline/`](projects/rain-sensing-clothesline/)

- **Problem**: Unexpected rainfall damages laundry left outside when residents are away from home.
- **Solution**: Engineered an autonomous mechatronic clothesline system with an analog raindrop sensor and microcontroller.
- **Control Engineering Features**:
  - 10-point moving average digital filter to reject condensation and false triggers from morning dew.
  - 250-point hysteresis deadband preventing motor chatter during drizzle transitions.
  - Industrial end-stop limit switches with 15-second watchdog emergency shutdown protection.
  - Demonstrated practical IoT application during the **TRIOX Technology IoT internship**.

### 3. Smart Fingerprint Door Lock System (2023–2024)
*Domain: Embedded Security, Biometrics, Actuator Interfacing*  
📁 **Source Code**: [`projects/smart-fingerprint-door-lock/`](projects/smart-fingerprint-door-lock/)

- **Solution**: Designed a keyless biometric door access control system on Arduino Uno using an optical fingerprint sensor (AS608/R307) and an electromechanical 12V solenoid lock.
- **Engineering Highlights**:
  - High-speed minutiae extraction and template matching from onboard flash memory.
  - Active-LOW relay actuation with automatic 5-second relatch timer.
  - Security lockout penalty: Locks down system for 30 seconds with warning alarm after 3 consecutive failed attempts.
  - Inductive flyback diode (1N4007) isolation preventing back-EMF microcontroller resets.

### 4. SIH 2025: Crowdsourced Civic Issue Reporting and Resolution System
*Domain: Software Engineering, Hackathons, Civic Tech*

- Presented at the **Smart India Hackathon (SIH) 2025** under the *Clean & Green Technology* theme.
- Designed a community-driven workflow enabling citizens to report municipal infrastructure defects with geolocation metadata, routing tickets to local civic authorities.

---

## 📄 Multi-Format Resume Suite

| Format | File Location | Intended Use Case |
| :--- | :--- | :--- |
| **ATS Markdown** | [`resume/resume.md`](resume/resume.md) | Formatted for quick copy-pasting into ATS job portals and technical recruiters. |
| **Print-Ready HTML** | [`resume/resume.html`](resume/resume.html) | Pixel-perfect A4 styled resume with a 1-click **"Print to PDF"** button. |
| **JSON Resume** | [`resume/resume.json`](resume/resume.json) | Standard JSON schema compliant for automated programmatic parser ingestion. |

---

## 💼 Professional Experience & Internships

- **IoT Intern — TRIOX Technology, Coimbatore (June 2025)**
  - Interfaced sensors, microcontrollers (Arduino Uno, ESP8266 NodeMCU), and actuators.
  - Configured cloud platforms for real-time sensor data telemetry and monitoring.
  - Developed a rain sensor-based automation prototype demonstrating IoT smart home applications.
- **Winter Intern — Coimbatore Institute of Technology (CIT) (Nov 2025)**
  - Completed technical training in Smart Systems and Emerging Technologies.
  - Focused on embedded firmware architecture, real-time computing, and hardware-software interfacing.

---

## 🏆 Certifications & Achievements

- **Elite Certification in Cryptography and Network Security** — NPTEL (IIT Kharagpur, 2026).
- **Computer Architecture** — NPTEL Certified (2024).
- **Smart India Hackathon (SIH) 2025 Presenter** — *Crowdsourced Civic Issue Reporting and Resolution System*.
- **Workshop on Semi-Custom ASIC Design Flow using Cadence EDA** — SREC UTSAVA'26 (Jan 2026).
- **Paper Presentation at “Circuit Masters”** — SREC UTSAVA'26 (Jan 2026).
- **Workshop on PCB Designing and Fabrication** — Pinnacle 2024, Coimbatore Institute of Technology.
- **Intra-College Sports Winner** — Throwball Championship (2024).

---

## ⚡ Quick Start & Local Execution

### 1. Run the Web Portfolio Locally
You can open `index.html` directly in any web browser, or launch a local HTTP server:
```bash
# Using Python built-in web server
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### 2. Launch GuidEx Desktop GUI Application
```bash
cd projects/guidex-exam-system
python app.py
```

### 3. Run Headless GuidEx Simulation (CLI)
```bash
cd projects/guidex-exam-system
python app.py --cli --simulate
```

### 4. Execute GuidEx Automated Test Suite
```bash
cd projects/guidex-exam-system
python -m unittest test_guidex.py
```

---

## 🚀 Automated CI/CD Deployment

This repository includes a turnkey GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

To deploy to **GitHub Pages**:
1. Push this repository to GitHub under `sujaya-25/sujaya-portfolio` (or `sujaya-portfolio`).
2. Go to your repository **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
4. Every push to the `main` branch will automatically build and publish the live portfolio!

---

## 📬 Connect & Contact

- **Email**: [sujayaaks@gmail.com](mailto:sujayaaks@gmail.com)
- **Phone**: +91 9384466268
- **LinkedIn**: [linkedin.com/in/sujayaks](https://www.linkedin.com/in/sujayaks/)
- **GitHub**: [github.com/sujaya-25](https://github.com/sujaya-25)
- **Location**: Coimbatore, Tamil Nadu, India

---

<p align="center">
  Released under the <a href="LICENSE">MIT License</a>. Copyright &copy; 2026 <strong>Sujaya K S</strong>.
</p>

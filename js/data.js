// Portfolio Data Store for Sujaya K S
const portfolioData = {
  personal: {
    name: "Sujaya K S",
    title: "Electronics & Communication Engineer | Software & IoT Developer",
    location: "Coimbatore, Tamil Nadu, India",
    email: "sujayaaks@gmail.com",
    phone: "+91 9384466268",
    linkedin: "https://www.linkedin.com/in/sujayaks/",
    github: "https://github.com/sujaya-25",
    bio: "Motivated Electronics & Communication Engineering undergraduate with a strong foundation in software engineering, embedded systems, and IoT. Driven by solving real-world challenges through clean code and hardware-software synergy. Experienced in Python, Java, Data Structures, Arduino, NodeMCU, and sensor interfacing.",
    statusBadge: "Open to Software & Embedded Roles",
    stats: [
      { label: "CGPA", value: "8.73", subtext: "Dr. N.G.P. IT (Till 5th Sem)" },
      { label: "Projects Completed", value: "4+", subtext: "Software & Embedded" },
      { label: "Internships", value: "2", subtext: "TRIOX Tech & CIT" },
      { label: "Certifications & Honors", value: "6+", subtext: "NPTEL Elite, SIH '25" }
    ]
  },

  skills: {
    programming: [
      { name: "Python", level: 90, icon: "fab fa-python", tags: ["Automation", "Tkinter", "Data Handling", "Scripting"] },
      { name: "Java", level: 85, icon: "fab fa-java", tags: ["OOP", "Data Structures", "Backend Basics"] },
      { name: "C Programming", level: 85, icon: "fas fa-code", tags: ["Embedded C", "Memory Management", "Algorithms"] }
    ],
    coreCS: [
      { name: "Data Structures & Algorithms", level: 85, icon: "fas fa-network-wired", tags: ["Arrays", "Linked Lists", "Trees", "Searching/Sorting"] },
      { name: "Object-Oriented Programming (OOPs)", level: 90, icon: "fas fa-cubes", tags: ["Inheritance", "Polymorphism", "Abstraction", "Encapsulation"] },
      { name: "Database Management & MySQL", level: 80, icon: "fas fa-database", tags: ["Queries", "Relational Modeling", "CRUD", "CSV Data"] },
      { name: "Computer Architecture", level: 85, icon: "fas fa-microchip", tags: ["NPTEL Certified", "Instruction Sets", "Pipelining"] },
      { name: "Cryptography & Network Security", level: 88, icon: "fas fa-shield-alt", tags: ["NPTEL Elite (IIT KGP)", "Ciphers", "Auth Protocols"] }
    ],
    hardwareAndIoT: [
      { name: "Arduino & Microcontrollers", level: 90, icon: "fas fa-robot", tags: ["Arduino Uno/Nano", "NodeMCU", "Firmware"] },
      { name: "Sensor & Actuator Interfacing", level: 90, icon: "fas fa-bolt", tags: ["Biometric/Fingerprint", "RFID", "Rain Sensors", "Relays", "Motors"] },
      { name: "Hardware-Software Integration", level: 88, icon: "fas fa-plug", tags: ["Serial Communication", "Real-time Verification", "Testing"] },
      { name: "PCB Design & Cadence EDA", level: 75, icon: "fas fa-layer-group", tags: ["Semi-Custom ASIC Flow", "PCB Fabrication (Pinnacle '24)"] }
    ],
    tools: [
      { name: "VS Code", level: 90, icon: "fas fa-terminal", tags: ["Development", "Debugging", "Extensions"] },
      { name: "Arduino IDE", level: 92, icon: "fas fa-tools", tags: ["Embedded Flashing", "Serial Monitor"] },
      { name: "Python GUI (Tkinter)", level: 88, icon: "fas fa-desktop", tags: ["UI Design", "Event Handling", "Desktop Apps"] },
      { name: "Git & Version Control", level: 82, icon: "fab fa-git-alt", tags: ["Collaboration", "Repositories", "Branching"] },
      { name: "Canva & MS Excel", level: 85, icon: "fas fa-chart-bar", tags: ["Presentations", "Data Organization", "Reports"] }
    ]
  },

  projects: [
    {
      id: "guidex",
      title: "GuidEx — Smart Exam Hall Guidance System",
      year: "2025–2026",
      category: "software",
      badge: "Flagship Project",
      summary: "An automated exam hall guidance system combining RFID cards and biometric fingerprint verification with a Python Tkinter GUI for instantaneous student authentication and hall allocation.",
      description: "GuidEx eliminates traditional paper-based exam hall notices and bottleneck verification lines. As a student taps their RFID credential and places their finger on the biometric scanner, the system authenticates identity against a secure CSV/database registry in real time, displaying their assigned hall number, floor, desk number, and exam slot via an intuitive GUI dashboard.",
      architecture: [
        "Hardware: RFID Module (RC522) + Biometric Fingerprint Sensor + Microcontroller/Serial Interface",
        "Backend / Processing: Python with real-time serial listener and validation engine",
        "Frontend GUI: Python Tkinter with dynamic visual desk routing and exam timing widgets",
        "Data Storage: Optimized CSV/MySQL record management for bulk student imports"
      ],
      highlights: [
        "Reduced manual student verification time by over 70%",
        "Implemented fail-safe authentication logic with instant visual guidance",
        "Built modular student record handling and hall seat allocation algorithms"
      ],
      techStack: ["Python", "Tkinter GUI", "RFID Reader", "Biometric Sensor", "CSV Data Handling", "Serial Comms"],
      interactiveDemoType: "guidex"
    },
    {
      id: "rain-sensing-clothesline",
      title: "Automatic Rain-Sensing Retractable Clothesline",
      year: "2024–2025",
      category: "iot",
      badge: "IoT & Smart Automation",
      summary: "An autonomous microcontroller-driven retractable clothesline that senses raindrops and triggers motorized shelter retraction to protect drying laundry without human intervention.",
      description: "Designed and engineered an automated outdoor smart system using an analog/digital rain sensor module paired with a microcontroller. Upon rain detection, the system triggers a motorized pulley mechanism to pull the clothesline under a sheltered enclosure, sounding a light alert and protecting fabrics from water damage. When the sensor dries, it automatically restores clothes to the sunny position.",
      architecture: [
        "Sensory Layer: Conductive Raindrop Detection Sensor with analog threshold comparator",
        "Processing Unit: Microcontroller executing event-driven interrupt routines",
        "Actuation Layer: High-torque DC motor / stepper driven by L298N motor driver module",
        "Power & Safety: Regulated power supply with mechanical limit switches for motor protection"
      ],
      highlights: [
        "Autonomous real-time rain sensitivity calibration with zero human intervention required",
        "Low power standby consumption with interrupt-based wakeup",
        "Showcased at TRIOX Technology IoT internship demonstrations"
      ],
      techStack: ["Microcontroller", "Arduino IDE", "Rain Sensor Module", "Motor Actuators", "Embedded C/C++", "Hardware Testing"],
      interactiveDemoType: "rain"
    },
    {
      id: "fingerprint-doorlock",
      title: "Smart Fingerprint Door Lock System",
      year: "2023–2024",
      category: "iot",
      badge: "Embedded Security",
      summary: "A robust biometric door access control system built on Arduino, featuring optical fingerprint recognition, encrypted credential storage, and relay solenoid lock actuation.",
      description: "Developed a secure access control mechanism to prevent unauthorized physical entry in sensitive rooms. Built with an optical fingerprint sensor (R307/FPM10A) interfaced with an Arduino microcontroller, relay shield, and status LCD. Authorized users are authenticated in under 0.8 seconds, while multiple failed attempts trigger an audible lockout alarm.",
      architecture: [
        "Biometric Scanning: Optical fingerprint module utilizing image matching algorithms (1:N mode)",
        "Control Logic: Arduino microcontroller managing enrollment, verification, and relay pulses",
        "Physical Access: 12V Solenoid electromagnetic door lock controlled via transistor-isolated relay",
        "User Interface: 16x2 I2C LCD displaying greeting and verification status"
      ],
      highlights: [
        "Supports enrollment of up to 100 distinct user fingerprints with EEPROM storage",
        "Sub-second verification latency with high accuracy biometric matching",
        "Fail-secure power cutoff state to guarantee facility safety"
      ],
      techStack: ["Arduino", "Biometric R307 Sensor", "Relay Module", "Solenoid Lock", "I2C LCD", "Embedded C"],
      interactiveDemoType: "fingerprint"
    },
    {
      id: "sih-civic-issue",
      title: "Crowdsourced Civic Issue Reporting & Resolution System",
      year: "2025",
      category: "hackathon",
      badge: "Smart India Hackathon 2025",
      summary: "A smart platform presented at Smart India Hackathon (SIH) 2025 under the Clean & Green Technology theme, enabling citizen issue logging, geo-tagging, and municipal department routing.",
      description: "Presented at SIH 2025 to tackle urban hygiene, waste accumulation, and street light outages. The solution enables citizens to capture geotagged photos of municipal issues, categorized automatically and dispatched to the relevant city department dashboard for transparent resolution tracking and feedback validation.",
      architecture: [
        "Citizen Interface: Clean issue submission workflow with location tagging and category selector",
        "Municipal Admin Portal: Priority queue categorization (Waste, Sanitation, Lighting, Roads)",
        "Status Lifecycle: Real-time ticket tracking from 'Reported' to 'In Progress' to 'Resolved'"
      ],
      highlights: [
        "Shortlisted and presented at Smart India Hackathon 2025 (Clean & Green Tech)",
        "Promotes civic accountability through transparent status metrics and automated SLA tracking"
      ],
      techStack: ["Software Architecture", "Clean & Green Tech", "Geo-tagging Workflow", "Database Management", "SIH 2025 Presentation"],
      interactiveDemoType: "sih"
    }
  ],

  experience: [
    {
      company: "TRIOX Technology",
      role: "IoT Engineering Intern",
      location: "Coimbatore, India",
      period: "June 2025",
      badge: "Industry Internship",
      icon: "fas fa-microchip",
      description: "Gained hands-on immersion into IoT architecture, sensor telemetry, and cloud monitoring.",
      bullets: [
        "Worked with sensor interfacing and microcontrollers including Arduino and NodeMCU (ESP8266/ESP32).",
        "Utilized cloud IoT dashboards for real-time telemetry streaming and remote actuator control.",
        "Engineered and presented a practical mini-project integrating rain sensor-based automation for environmental control."
      ]
    },
    {
      company: "Coimbatore Institute of Technology (CIT)",
      role: "Winter Intern — Smart Systems & Emerging Technologies",
      location: "Coimbatore, India",
      period: "November 2025",
      badge: "Institutional Training",
      icon: "fas fa-university",
      description: "Advanced winter training program focused on smart embedded systems and real-time hardware interfacing.",
      bullets: [
        "Trained in high-performance embedded systems design and real-time sensor processing pipelines.",
        "Deepened practical understanding of automation protocols, hardware debugging, and system integration.",
        "Collaborated on embedded interfacing exercises addressing real-world telemetry challenges."
      ]
    }
  ],

  education: [
    {
      degree: "B.E. in Electronics and Communication Engineering",
      institution: "Dr. N.G.P. Institute of Technology",
      location: "Coimbatore, Tamil Nadu",
      period: "2023 – Present",
      grade: "CGPA: 8.73 (Till 5th Semester)",
      badge: "First Class with Distinction Pace",
      highlights: [
        "Core Coursework: Data Structures, OOPs, DBMS, Microcontrollers, Digital Signal Processing, Cryptography & Network Security, VLSI.",
        "Active participant in technical symposiums, paper presentations, and sports."
      ]
    },
    {
      degree: "Higher Secondary Certificate (HSC) - 12th Grade",
      institution: "Amrita Vidyalayam CBSE Senior Secondary School",
      location: "Coimbatore, Tamil Nadu",
      period: "Completed May 2023",
      grade: "80.4% (CBSE Board)",
      badge: "Senior Secondary",
      highlights: [
        "Stream: Physics, Chemistry, Mathematics & Computer Science.",
        "Strong foundation in algorithmic reasoning, physics, and mathematical analysis."
      ]
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC) - 10th Grade",
      institution: "Amrita Vidyalayam CBSE Senior Secondary School",
      location: "Coimbatore, Tamil Nadu",
      period: "Completed March 2021",
      grade: "88.2% (CBSE Board)",
      badge: "High Distinction",
      highlights: [
        "Distinction across all core subjects with consistent academic honors."
      ]
    }
  ],

  certifications: [
    {
      title: "Cryptography and Network Security — Elite",
      issuer: "NPTEL (IIT Kharagpur)",
      year: "2026",
      badge: "Elite Grade",
      icon: "fas fa-award",
      description: "Certified with Elite standing by IIT Kharagpur in foundational cryptography, ciphers, symmetric/asymmetric algorithms, and modern security protocols."
    },
    {
      title: "Computer Architecture",
      issuer: "NPTEL",
      year: "2024",
      badge: "Verified Course",
      icon: "fas fa-microchip",
      description: "Mastered fundamental concepts in CPU datapath design, memory hierarchies, pipelining, cache optimization, and instruction set architectures."
    },
    {
      title: "Semi-Custom ASIC Design Flow using Cadence EDA",
      issuer: "Sri Ramakrishna Engineering College (SREC UTSAVA '26)",
      year: "Jan 2026",
      badge: "EDA Workshop",
      icon: "fas fa-project-diagram",
      description: "Intensive hands-on workshop covering digital ASIC implementation flow, synthesis, floorplanning, placement, routing, and timing analysis using Cadence tools."
    },
    {
      title: "Circuit Masters Paper Presentation",
      issuer: "SREC UTSAVA '26, Sri Ramakrishna Engineering College",
      year: "Jan 2026",
      badge: "Paper Presentation",
      icon: "fas fa-file-alt",
      description: "Presented research insights and circuit analysis during the flagship technical symposium Circuit Masters event."
    },
    {
      title: "PCB Designing and Fabrication",
      issuer: "Pinnacle 2024, Coimbatore Institute of Technology (CIT)",
      year: "2024",
      badge: "Hands-on Workshop",
      icon: "fas fa-layer-group",
      description: "Completed full-cycle schematic capture, PCB layout routing, chemical etching, component soldering, and continuity testing."
    },
    {
      title: "Smart India Hackathon (SIH) 2025 Presenter",
      issuer: "Ministry of Education / SIH 2025",
      year: "2025",
      badge: "National Hackathon",
      icon: "fas fa-lightbulb",
      description: "Selected and presented 'Crowdsourced Civic Issue Reporting and Resolution System' under Clean & Green Technology theme."
    },
    {
      title: "Throwball Intra-College Winners",
      issuer: "Dr. N.G.P. Institute of Technology",
      year: "2024",
      badge: "Sports Champion",
      icon: "fas fa-trophy",
      description: "Demonstrated teamwork, leadership, and athletic endurance securing 1st place in the Intra-College Throwball Championship."
    }
  ]
};

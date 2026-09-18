// Portfolio Data Store for Sujaya K S
const portfolioData = {
  personal: {
    name: "Sujaya K S",
    title: "Final-Year ECE Student | Software & Data Engineering",
    location: "Coimbatore, Tamil Nadu, India",
    email: "sujayaaks@gmail.com",
    phone: "+91 9384466268",
    linkedin: "https://www.linkedin.com/in/sujayaks/",
    github: "https://github.com/sujaya-25",
    bio: "Final-year Electronics and Communication Engineering student interested in software development, data engineering, and problem-solving. Skilled in Python, Java, SQL, DSA, and embedded technologies, with hands-on experience building practical hardware and software projects.",
    statusBadge: "Open to Entry-Level IT Opportunities",
    stats: [
      { label: "CGPA", value: "8.7", subtext: "B.E. ECE" },
      { label: "LeetCode", value: "171+", subtext: "Problems Solved" },
      { label: "Projects", value: "5+", subtext: "Software & Embedded" },
      { label: "Certifications", value: "6+", subtext: "Technical & Academic" }
    ]
  },


skills: {
  programming: [
    { name: "Python", level: 90, icon: "fab fa-python", tags: ["Scripting", "Data Handling", "Tkinter", "Streamlit"] },
    { name: "Java", level: 85, icon: "fab fa-java", tags: ["OOP", "DSA", "Backend Basics"] },
    { name: "C / C++", level: 85, icon: "fas fa-code", tags: ["Programming", "Embedded C", "Problem Solving"] },
    { name: "SQL", level: 85, icon: "fas fa-database", tags: ["Queries", "RDBMS", "Data Handling"] }
  ],

  coreCS: [
    { name: "Data Structures & Algorithms", level: 85, icon: "fas fa-network-wired", tags: ["Arrays", "Linked Lists", "Searching", "Sorting"] },
    { name: "Object-Oriented Programming", level: 85, icon: "fas fa-cubes", tags: ["Inheritance", "Polymorphism", "Encapsulation"] },
    { name: "Database Management", level: 80, icon: "fas fa-database", tags: ["SQL", "RDBMS", "CRUD"] },
    { name: "Computer Architecture", level: 80, icon: "fas fa-microchip", tags: ["NPTEL", "CPU", "Memory"] }
  ],

  hardwareAndIoT: [
    { name: "Arduino", level: 90, icon: "fas fa-microchip", tags: ["Arduino IDE", "Embedded C", "Sensors"] },
    { name: "Raspberry Pi", level: 75, icon: "fas fa-server", tags: ["IoT", "Python", "GPIO"] },
    { name: "STM32 & ESP32", level: 75, icon: "fas fa-microchip", tags: ["Microcontrollers", "Embedded Systems", "IoT"] },
    { name: "Embedded Systems & IoT", level: 85, icon: "fas fa-project-diagram", tags: ["Sensors", "Actuators", "Serial Communication"] }
  ],

  tools: [
    { name: "VS Code", level: 90, icon: "fas fa-terminal", tags: ["Development", "Debugging"] },
    { name: "Git & GitHub", level: 82, icon: "fab fa-github", tags: ["Repositories", "Version Control"] },
    { name: "Proteus & Multisim", level: 80, icon: "fas fa-wave-square", tags: ["Circuit Simulation", "Testing"] },
    { name: "KiCad & Verilog", level: 75, icon: "fas fa-layer-group", tags: ["PCB Design", "Digital Design"] },
    { name: "MATLAB & LabVIEW", level: 70, icon: "fas fa-chart-line", tags: ["Simulation", "Data Analysis"] },
    { name: "MicroPython & Mission Planner", level: 70, icon: "fas fa-tools", tags: ["Embedded Development", "UAV Tools"] }
  ]
},
  projects: [
  {
    id: "sightx",
    title: "SightX — Real-Time AI Vision Assistant",
    year: "2026",
    category: "software",
    badge: "AI Vision Project",
    summary: "A real-time AI vision assistant that uses a webcam and YOLO object detection to identify objects and provide simple scene descriptions.",
    description: "SightX captures webcam video, detects objects using YOLO, displays bounding boxes and object counts, and generates a simple scene description that can be spoken through the browser.",
    architecture: [
      "Input: Live webcam video using Streamlit WebRTC",
      "AI Processing: YOLO object detection using Ultralytics",
      "Application: Python Streamlit web application",
      "Output: Object labels, counts, bounding boxes, and spoken scene description"
    ],
    highlights: [
      "Real-time webcam object detection",
      "Displays detected objects with bounding boxes and counts",
      "Provides simple voice-based scene descriptions"
    ],
    techStack: ["Python", "Streamlit", "YOLO", "OpenCV", "WebRTC"],
    interactiveDemoType: "sightx"
  },

  {
    id: "recoverai",
    title: "RecoverAI — AI Revenue Recovery Dashboard",
    year: "2026",
    category: "software",
    badge: "AI & Data Project",
    summary: "A Streamlit and Pandas dashboard that analyzes failed payments and identifies recovery opportunities based on transaction data.",
    description: "RecoverAI analyzes failed payment records, estimates recovery potential, prioritizes transactions, and provides recommendations to help reduce revenue leakage.",
    architecture: [
      "Data Processing: Pandas-based transaction analysis",
      "Scoring: Recovery prioritization using failure reason and transaction value",
      "Dashboard: Streamlit interactive interface",
      "Output: Recovery potential, priority levels, and recommendations"
    ],
    highlights: [
      "Analyzes failed payment transactions",
      "Prioritizes recovery opportunities",
      "Provides data-driven recommendations"
    ],
    techStack: ["Python", "Streamlit", "Pandas", "Data Analysis"],
    interactiveDemoType: "recoverai"
  },

  {
    id: "guidex",
    title: "GuidEx — Intelligent Examination Hall Guidance & Security System",
    year: "2025–2026",
    category: "software",
    badge: "RFID & Biometric System",
    summary: "An examination hall guidance system using RFID and fingerprint verification to authenticate students and display their assigned hall and seat information.",
    description: "GuidEx uses an RFID tag for student identification followed by fingerprint verification. A Python Tkinter interface retrieves student details from a CSV or Excel-based record and displays the assigned examination hall and seat information.",
    architecture: [
      "Identification: RC522 RFID reader",
      "Verification: R307 fingerprint sensor",
      "Processing: Arduino and Python serial communication",
      "Interface: Python Tkinter GUI with student and hall details",
      "Data: CSV or Excel-based student records"
    ],
    highlights: [
      "Combines RFID identification with fingerprint verification",
      "Displays student hall and seat information through a GUI",
      "Provides an additional verification step for examination entry"
    ],
    techStack: ["Python", "Tkinter", "RFID", "Fingerprint Sensor", "Arduino", "CSV"],
    interactiveDemoType: "guidex"
  },

  {
    id: "rain-sensing-clothesline",
    title: "Automatic Rain-Sensing Retractable Clothesline",
    year: "2024–2025",
    category: "iot",
    badge: "IoT Automation",
    summary: "An automated clothesline system that detects rain and retracts the clothesline using a motor to protect clothes from rain.",
    description: "The system uses a rain sensor connected to an ATmega328P-based controller. When rain is detected, the controller activates a motor to retract the clothesline automatically.",
    architecture: [
      "Sensor: HL-83 rain sensor",
      "Controller: ATmega328P",
      "Actuation: Servo motor",
      "Power: 7805 regulated 5V supply",
      "Control: Arduino-based embedded programming"
    ],
    highlights: [
      "Automatic rain detection",
      "Motor-based clothesline retraction",
      "Designed for simple outdoor automation"
    ],
    techStack: ["ATmega328P", "Arduino", "Embedded C", "Rain Sensor", "Servo Motor"],
    interactiveDemoType: "rain"
  },

  {
    id: "fingerprint-doorlock",
    title: "Smart Fingerprint Door Lock System",
    year: "2023–2024",
    category: "iot",
    badge: "Embedded Security",
    summary: "A fingerprint-based door access system using Arduino and a biometric sensor to control access.",
    description: "The system verifies a user's fingerprint through a biometric sensor and controls the door locking mechanism through an Arduino-based control system.",
    architecture: [
      "Biometric Input: R307 fingerprint sensor",
      "Controller: Arduino",
      "Access Control: Relay-based locking mechanism",
      "Verification: Fingerprint matching"
    ],
    highlights: [
      "Fingerprint-based user verification",
      "Arduino-controlled access mechanism",
      "Designed for basic biometric security applications"
    ],
    techStack: ["Arduino", "R307", "Fingerprint Sensor", "Relay", "Embedded C"],
    interactiveDemoType: "fingerprint"
  }
],
experience: [
  {
    company: "TRIOX Technologies",
    role: "Engineering Intern",
    location: "Coimbatore, India",
    period: "June 2025",
    badge: "Industry Internship",
    icon: "fas fa-microchip",
    description: "Gained practical exposure to IoT systems, embedded technologies, and hardware-software integration.",
    bullets: [
      "Worked with Arduino and IoT-based systems.",
      "Worked on sensor-based automation and tool simulation.",
      "Developed and demonstrated an Automatic Rain-Sensing Retractable Clothesline System."
    ]
  }
],

 education: [
  {
    degree: "B.E. in Electronics and Communication Engineering",
    institution: "Dr. N.G.P. Institute of Technology",
    location: "Coimbatore, Tamil Nadu",
    period: "2023 – Present",
    grade: "CGPA: 8.7",
    badge: "B.E. ECE",
    highlights: [
      "Core areas: Data Structures, OOP, DBMS, Microcontrollers, Cryptography & Network Security, and VLSI.",
      "Participated in technical symposiums, paper presentations, workshops, and sports activities."
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
      "Stream: Physics, Chemistry, Mathematics & Computer Science."
    ]
  },
  {
    degree: "Secondary School - 10th Grade",
    institution: "Amrita Vidyalayam CBSE Senior Secondary School",
    location: "Coimbatore, Tamil Nadu",
    period: "Completed March 2021",
    grade: "88.2% (CBSE Board)",
    badge: "Secondary School",
    highlights: [
      "Completed secondary education under the CBSE curriculum."
    ]
  }
],
  

 certifications: [
  {
    title: "Cryptography and Network Security",
    issuer: "NPTEL - IIT Kharagpur",
    year: "2026",
    badge: "Elite",
    icon: "fas fa-award",
    description: "Completed the NPTEL course in Cryptography and Network Security with an Elite grade."
  },
  {
    title: "Computer Architecture",
    issuer: "NPTEL",
    year: "2024",
    badge: "Course Certificate",
    icon: "fas fa-microchip",
    description: "Completed an NPTEL course covering computer architecture concepts and processor organization."
  },
  {
    title: "Semi-Custom ASIC Design Flow using Cadence EDA",
    issuer: "Sri Ramakrishna Engineering College - UTSAVA '26",
    year: "Jan 2026",
    badge: "EDA Workshop",
    icon: "fas fa-project-diagram",
    description: "Participated in a hands-on workshop on semi-custom ASIC design flow using Cadence EDA tools."
  },
  {
    title: "Circuit Masters Paper Presentation",
    issuer: "SREC UTSAVA '26",
    year: "Jan 2026",
    badge: "Paper Presentation",
    icon: "fas fa-file-alt",
    description: "Presented a technical paper at the Circuit Masters event during SREC UTSAVA '26."
  },
  {
    title: "PCB Designing and Fabrication",
    issuer: "Pinnacle 2024 - Coimbatore Institute of Technology",
    year: "2024",
    badge: "Workshop",
    icon: "fas fa-layer-group",
    description: "Participated in a hands-on workshop on PCB designing and fabrication."
  },
  {
    title: "Smart India Hackathon 2025 Presenter",
    issuer: "Smart India Hackathon",
    year: "2025",
    badge: "National Hackathon",
    icon: "fas fa-lightbulb",
    description: "Presented a Clean & Green Technology project at Smart India Hackathon 2025."
  },
  {
    title: "RTOS Certification",
    issuer: "RTOS Training Program",
    year: "2026",
    badge: "Certification",
    icon: "fas fa-microchip",
    description: "Completed training in Real-Time Operating System concepts."
  },
  {
    title: "Throwball Intra-College Winners",
    issuer: "Dr. N.G.P. Institute of Technology",
    year: "2024",
    badge: "Sports Achievement",
    icon: "fas fa-trophy",
    description: "Won the intra-college Throwball competition."
  }
]
};

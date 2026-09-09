// Main Application Logic for Sujaya K S Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCanvasBackground();
  initTypewriter();
  renderStatsBanner();
  renderSkills('all');
  renderProjects('all');
  renderExperience();
  renderEducation();
  renderCertifications();
  initContactForm();
  initMobileNav();
  initScrollSpy();
});

/* ==========================================
   1. Theme Management (Dark / Light)
   ========================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('sujaya_theme') || 'dark';
  window.setAppTheme(savedTheme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      window.setAppTheme(nextTheme);
    });
  }
}

window.setAppTheme = function(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sujaya_theme', theme);
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
};

/* ==========================================
   2. HTML5 Canvas Circuit Particles Network
   ========================================== */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================
   3. Typewriter Effect
   ========================================== */
function initTypewriter() {
  const textElem = document.getElementById('role-typewriter');
  if (!textElem) return;

  const roles = [
    "Electronics & Communication Engineer",
    "IoT & Embedded Systems Innovator",
    "Python & Tkinter GUI Developer",
    "Smart India Hackathon '25 Presenter",
    "Problem Solver & Tech Enthusiast"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const current = roles[roleIdx];
    if (isDeleting) {
      textElem.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      textElem.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================
   4. Render Stats Banner
   ========================================== */
function renderStatsBanner() {
  const container = document.getElementById('stats-banner-container');
  if (!container) return;

  container.innerHTML = portfolioData.personal.stats.map(s => `
    <div class="stat-card">
      <div class="stat-big">${s.value}</div>
      <div class="stat-title">${s.label}</div>
      <div class="stat-sub">${s.subtext}</div>
    </div>
  `).join('');
}

/* ==========================================
   5. Render Skills Matrix
   ========================================== */
function renderSkills(category = 'all') {
  const grid = document.getElementById('skills-grid-container');
  if (!grid) return;

  let allSkills = [];
  if (category === 'all' || category === 'programming') {
    allSkills = allSkills.concat(portfolioData.skills.programming.map(s => ({ ...s, cat: 'Programming' })));
  }
  if (category === 'all' || category === 'coreCS') {
    allSkills = allSkills.concat(portfolioData.skills.coreCS.map(s => ({ ...s, cat: 'Core CS & DB' })));
  }
  if (category === 'all' || category === 'hardwareAndIoT') {
    allSkills = allSkills.concat(portfolioData.skills.hardwareAndIoT.map(s => ({ ...s, cat: 'Hardware & IoT' })));
  }
  if (category === 'all' || category === 'tools') {
    allSkills = allSkills.concat(portfolioData.skills.tools.map(s => ({ ...s, cat: 'Tools & IDEs' })));
  }

  grid.innerHTML = allSkills.map(skill => `
    <div class="skill-card fade-in">
      <div>
        <div class="skill-head">
          <div class="skill-name-wrap">
            <i class="${skill.icon} skill-icon"></i>
            <span class="skill-title">${skill.name}</span>
          </div>
          <span class="skill-pct">${skill.level}%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${skill.level}%;"></div>
        </div>
      </div>
      <div class="skill-tags">
        ${skill.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

window.filterSkills = function(category, btn) {
  document.querySelectorAll('.skills-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSkills(category);
};

/* ==========================================
   6. Render Projects Showcase
   ========================================== */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid-container');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter);

  const getIconForCategory = (cat) => {
    switch (cat) {
      case 'software': return 'fas fa-laptop-code';
      case 'iot': return 'fas fa-microchip';
      case 'hackathon': return 'fas fa-trophy';
      default: return 'fas fa-project-diagram';
    }
  };

  grid.innerHTML = filtered.map(proj => `
    <div class="project-card fade-in">
      <div class="project-card-banner">
        <i class="${getIconForCategory(proj.category)} project-banner-icon"></i>
        <span class="project-badge-top">${proj.badge}</span>
        <span class="project-year-tag"><i class="fas fa-calendar-alt"></i> ${proj.year}</span>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${proj.title}</h3>
        <p class="project-card-desc">${proj.summary}</p>
        <div class="project-tech-tags">
          ${proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-card-footer">
          <button class="btn btn-outline btn-sm" onclick="openProjectModal('${proj.id}')">
            <i class="fas fa-info-circle"></i> Deep Dive
          </button>
          <button class="btn btn-primary btn-sm" onclick="openSimulatorModal('${proj.id}')">
            <i class="fas fa-play"></i> Live Simulator
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.filterProjects = function(category, btn) {
  document.querySelectorAll('.projects-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(category);
};

/* ==========================================
   7. Render Experience & Education
   ========================================== */
function renderExperience() {
  const container = document.getElementById('experience-timeline-container');
  if (!container) return;

  container.innerHTML = portfolioData.experience.map(exp => `
    <div class="timeline-item fade-in">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <span class="timeline-company"><i class="${exp.icon}"></i> ${exp.company}</span>
          </div>
          <span class="timeline-period"><i class="fas fa-calendar-alt"></i> ${exp.period}</span>
        </div>
        <p style="color:var(--text-secondary); font-size:0.92rem; margin-bottom:8px;">${exp.description}</p>
        <ul class="timeline-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

function renderEducation() {
  const container = document.getElementById('academics-cards-container');
  if (!container) return;

  container.innerHTML = portfolioData.education.map(ed => `
    <div class="academic-card fade-in">
      <div class="academic-header">
        <h4>${ed.degree}</h4>
        <span class="academic-grade">${ed.grade}</span>
      </div>
      <div class="inst-name"><i class="fas fa-university"></i> ${ed.institution} (${ed.period})</div>
      <p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${ed.location}</p>
      ${ed.highlights.map(h => `<p style="font-size:0.84rem; color:var(--text-secondary); margin-top:4px;">▹ ${h}</p>`).join('')}
    </div>
  `).join('');
}

/* ==========================================
   8. Render Certifications
   ========================================== */
function renderCertifications() {
  const grid = document.getElementById('certs-grid-container');
  if (!grid) return;

  grid.innerHTML = portfolioData.certifications.map(c => `
    <div class="cert-card fade-in">
      <div class="cert-icon-box">
        <i class="${c.icon}"></i>
      </div>
      <div class="cert-info">
        <h4>${c.title}</h4>
        <div class="cert-issuer">${c.issuer} (${c.year}) • <span class="badge badge-primary" style="font-size:0.75rem; color:var(--accent-primary);">${c.badge}</span></div>
        <p class="cert-desc">${c.description}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   9. Modals (Project Detail & Simulator)
   ========================================== */
window.openProjectModal = function(id) {
  const proj = portfolioData.projects.find(p => p.id === id);
  if (!proj) return;

  const modal = document.getElementById('global-modal');
  const modalContent = document.getElementById('global-modal-content');

  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="badge badge-primary" style="font-size:0.8rem; color:var(--accent-primary);"><i class="fas fa-tag"></i> ${proj.badge}</span>
        <h2 style="font-size:1.4rem; margin-top:4px;">${proj.title}</h2>
      </div>
      <button class="modal-close-btn" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <p style="font-size:1rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.6;">${proj.description}</p>
      
      <h4 style="color:var(--accent-primary); margin-bottom:12px;"><i class="fas fa-sitemap"></i> System Architecture & Data Flow:</h4>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:24px;">
        ${proj.architecture.map(a => `
          <li style="background:rgba(6,182,212,0.06); padding:10px 14px; border-radius:6px; border-left:3px solid var(--accent-primary); font-size:0.88rem;">
            ${a}
          </li>
        `).join('')}
      </ul>

      <h4 style="color:var(--accent-primary); margin-bottom:12px;"><i class="fas fa-check-circle"></i> Key Achievements & Metrics:</h4>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:6px; margin-bottom:24px;">
        ${proj.highlights.map(h => `<li style="font-size:0.88rem; color:var(--text-secondary);"><i class="fas fa-arrow-right" style="color:var(--accent-primary); font-size:0.75rem; margin-right:8px;"></i> ${h}</li>`).join('')}
      </ul>

      <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <button class="btn btn-primary btn-sm" onclick="openSimulatorModal('${proj.id}')">
          <i class="fas fa-play"></i> Open Interactive Simulator
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
};

window.openSimulatorModal = function(id) {
  const proj = portfolioData.projects.find(p => p.id === id);
  if (!proj || !proj.interactiveDemoType || !projectSimulators[proj.interactiveDemoType]) return;

  const sim = projectSimulators[proj.interactiveDemoType];
  const modal = document.getElementById('global-modal');
  const modalContent = document.getElementById('global-modal-content');

  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="badge badge-primary" style="font-size:0.8rem; color:var(--accent-primary);"><i class="fas fa-flask"></i> Interactive Sandbox Demo</span>
        <h2 style="font-size:1.3rem; margin-top:4px;">${proj.title}</h2>
      </div>
      <button class="modal-close-btn" onclick="closeModal()"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      ${sim.render()}
    </div>
  `;

  modal.classList.add('open');
};

window.closeModal = function() {
  const modal = document.getElementById('global-modal');
  if (modal) modal.classList.remove('open');
};

// Close modal on click outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('global-modal');
  if (e.target === modal) {
    closeModal();
  }
});

/* ==========================================
   10. Resume Viewer Modal
   ========================================== */
window.openResumeModal = function() {
  const modal = document.getElementById('global-modal');
  const modalContent = document.getElementById('global-modal-content');

  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="badge badge-primary" style="font-size:0.8rem; color:var(--accent-primary);"><i class="fas fa-file-pdf"></i> Verified Resume Profile</span>
        <h2 style="font-size:1.3rem; margin-top:4px;">Sujaya K S — Resume</h2>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-primary btn-xs" onclick="window.print()"><i class="fas fa-print"></i> Print / Save as PDF</button>
        <button class="modal-close-btn" onclick="closeModal()"><i class="fas fa-times"></i></button>
      </div>
    </div>
    <div class="modal-body" style="background:#0f172a; padding:20px;">
      <div class="resume-view-paper">
        <div class="resume-header-paper">
          <h1>SUJAYA K S</h1>
          <p><strong>Electronics and Communication Engineering</strong></p>
          <p><i class="fas fa-envelope"></i> sujayaaks@gmail.com | <i class="fas fa-phone"></i> +91 9384466268 | <i class="fas fa-map-marker-alt"></i> Coimbatore</p>
          <p><i class="fab fa-linkedin"></i> <a href="https://www.linkedin.com/in/sujayaks/" target="_blank" style="color:#0284c7;">linkedin.com/in/sujayaks/</a></p>
        </div>

        <div class="resume-section-paper">
          <h2>1. Objective</h2>
          <p>Motivated Electronics and Communication Engineering student with a strong interest in programming and problem-solving. Looking for an opportunity to apply my skills, learn from real-world projects, and grow in a professional IT/software environment.</p>
        </div>

        <div class="resume-section-paper">
          <h2>2. Technical Qualifications</h2>
          <ul>
            <li><strong>Programming:</strong> Java, Python, C Programming</li>
            <li><strong>Core Concepts:</strong> Data Structures, OOPs, DBMS, MySQL</li>
            <li><strong>Libraries & GUI:</strong> Python GUI (Tkinter)</li>
            <li><strong>Other Tools:</strong> Arduino IDE, Canva, VS Code, MS Excel</li>
          </ul>
        </div>

        <div class="resume-section-paper">
          <h2>3. Key Strengths</h2>
          <ul>
            <li>Strong foundation in Embedded Systems, Electronics, and Programming</li>
            <li>Proficient in Arduino, Python, and Sensor Interfacing</li>
            <li>Skilled in Hardware–Software Integration, Testing, and Debugging</li>
            <li>Strong analytical thinking and problem-solving abilities, debugging skills</li>
          </ul>
        </div>

        <div class="resume-section-paper">
          <h2>4. Academic Credentials</h2>
          <ul>
            <li><strong>B.E. Electronics and Communication Engineering</strong>, Dr. N.G.P. Institute of Technology (2023 – Present) | <strong>CGPA: 8.73</strong> (Till 5th semester)</li>
            <li><strong>HSC</strong> — Amrita Vidyalayam CBSE Senior Secondary School (May 2023 | <strong>80.4%</strong>)</li>
            <li><strong>SSLC</strong> — Amrita Vidyalayam CBSE Senior Secondary School (March 2021 | <strong>88.2%</strong>)</li>
          </ul>
        </div>

        <div class="resume-section-paper">
          <h2>5. Projects</h2>
          <ul>
            <li><strong>GuidEx — Smart Exam Hall Guidance System (2025–2026):</strong> RFID + biometric authentication, Python Tkinter GUI for student verification and hall allocation, CSV record management.</li>
            <li><strong>Automatic Rain-Sensing Retractable Clothesline (2024–2025):</strong> Microcontroller rain sensor detection triggering motorized retraction to protect laundry.</li>
            <li><strong>Smart Fingerprint Door Lock System (2023–2024):</strong> Fingerprint-based door lock system using Arduino and biometric sensor.</li>
          </ul>
        </div>

        <div class="resume-section-paper">
          <h2>6. Professional Experience</h2>
          <ul>
            <li><strong>IoT Internship — TRIOX Technology, Coimbatore (June 2025):</strong> Hands-on IoT fundamentals, Arduino, NodeMCU, cloud platforms, and sensor automation.</li>
            <li><strong>Winter Internship — Coimbatore Institute of Technology (CIT) (Nov 2025):</strong> Smart Systems and Emerging Technologies, embedded systems, hardware interfacing.</li>
          </ul>
        </div>

        <div class="resume-section-paper">
          <h2>7. Certifications & Achievements</h2>
          <ul>
            <li>Elite Certification in <strong>Cryptography and Network Security</strong> – NPTEL (IIT Kharagpur, 2026)</li>
            <li><strong>Computer Architecture</strong> – NPTEL (2024)</li>
            <li>Workshop on <strong>Semi-Custom ASIC Design Flow using Cadence EDA</strong> at SREC UTSAVA'26 (Jan 2026)</li>
            <li><strong>Circuit Masters</strong> Paper Presentation at SREC UTSAVA'26 (Jan 2026)</li>
            <li>Workshop on <strong>PCB Designing and Fabrication</strong> at Pinnacle 2024, CIT</li>
            <li>Presented <strong>Crowdsourced Civic Issue Reporting & Resolution System</strong> at Smart India Hackathon (SIH) 2025</li>
            <li>Winners in <strong>Throwball</strong> (2024) Intra-college competition</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
};

/* ==========================================
   11. Contact Form Simulation & Toast
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const msg = document.getElementById('contact-msg').value;

    showToast(`Thank you, ${name}! Your message has been logged. Sujaya will get back to you shortly at ${email}.`, 'success');
    form.reset();
  });
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* ==========================================
   12. Navigation & Mobile Menu & ScrollSpy
   ========================================== */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (btn && navLinks) {
    btn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
}

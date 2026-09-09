// Developer CLI Terminal Emulator for Sujaya's Portfolio

class TerminalEmulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.history = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderInitialScreen();
  }

  renderInitialScreen() {
    this.container.innerHTML = `
      <div class="terminal-window">
        <div class="terminal-bar">
          <div class="terminal-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="terminal-title">sujaya@portfolio-v2: ~ (bash / zsh)</div>
          <div class="terminal-actions">
            <button class="term-btn" onclick="terminal.runCommand('help')" title="Show Help"><i class="fas fa-question-circle"></i></button>
            <button class="term-btn" onclick="terminal.runCommand('clear')" title="Clear"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
        <div class="terminal-body" id="term-output-area">
          <div class="term-banner">
<pre class="ascii-art">
   ____          _                       _  ______ 
  / __/_ _____ _(_)__ _____ _   ____    | |/ / __/ 
 _\ \/ // / _ `/ / _ `/ // / _\/___/    |   /\ \   
/___/\_,_/\_,_/_/\_,_/\_, /_(_)        |_|\_\___/  
                     /___/                         
</pre>
            <p class="term-welcome">Welcome to <strong>Sujaya's Interactive Developer Terminal</strong> [v2.4.0-release]</p>
            <p class="term-hint">Type <span class="term-highlight">help</span> to view available commands, or click any command shortcut below:</p>
            <div class="term-shortcuts">
              <span class="term-tag" onclick="terminal.runCommand('about')">about</span>
              <span class="term-tag" onclick="terminal.runCommand('skills')">skills</span>
              <span class="term-tag" onclick="terminal.runCommand('projects')">projects</span>
              <span class="term-tag" onclick="terminal.runCommand('experience')">experience</span>
              <span class="term-tag" onclick="terminal.runCommand('cat resume.txt')">cat resume.txt</span>
              <span class="term-tag" onclick="terminal.runCommand('hire')">hire</span>
            </div>
          </div>
          <div id="term-history-log"></div>
          <div class="term-prompt-line">
            <span class="term-prompt-user">sujaya@portfolio</span><span class="term-prompt-sep">:</span><span class="term-prompt-dir">~</span><span class="term-prompt-symbol">$</span>
            <input type="text" id="term-input" class="term-input" autocomplete="off" spellcheck="false" autofocus />
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('term-input');
    if (input) {
      input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }
  }

  handleKeyDown(e) {
    const input = document.getElementById('term-input');
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      if (raw) {
        this.history.push(raw);
        this.historyIndex = this.history.length;
        this.execute(raw);
        input.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        input.value = this.history[this.historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        input.value = this.history[this.historyIndex] || '';
      } else {
        this.historyIndex = this.history.length;
        input.value = '';
      }
    }
  }

  runCommand(cmd) {
    const input = document.getElementById('term-input');
    if (input) {
      input.value = cmd;
      this.execute(cmd);
      input.value = '';
    }
  }

  execute(cmdLine) {
    const log = document.getElementById('term-history-log');
    if (!log) return;

    const parts = cmdLine.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const lineEntry = document.createElement('div');
    lineEntry.className = 'term-entry';
    lineEntry.innerHTML = `
      <div class="term-cmd-echo">
        <span class="term-prompt-user">sujaya@portfolio</span>:<span class="term-prompt-dir">~</span>$ <strong>${this.escapeHTML(cmdLine)}</strong>
      </div>
      <div class="term-cmd-result">${this.getOutput(cmd, args, cmdLine)}</div>
    `;

    log.appendChild(lineEntry);

    const body = document.getElementById('term-output-area');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  getOutput(cmd, args, rawLine) {
    switch (cmd) {
      case 'help':
        return `
          <div class="term-help-grid">
            <div><strong class="term-cyan">about</strong> / <strong class="term-cyan">whoami</strong> - Brief professional profile</div>
            <div><strong class="term-cyan">skills</strong> - Technical abilities & proficiencies</div>
            <div><strong class="term-cyan">projects</strong> - Key software & IoT hardware projects</div>
            <div><strong class="term-cyan">experience</strong> - Internships & industry training</div>
            <div><strong class="term-cyan">education</strong> - Academic credentials (CGPA 8.73)</div>
            <div><strong class="term-cyan">certifications</strong> - NPTEL Elite, SIH '25 & Workshops</div>
            <div><strong class="term-cyan">cat resume.txt</strong> - Formatted plain-text resume</div>
            <div><strong class="term-cyan">contact</strong> - Get email, phone, location & LinkedIn</div>
            <div><strong class="term-cyan">hire</strong> - Instant recruitment connect</div>
            <div><strong class="term-cyan">theme [dark|light]</strong> - Switch UI color theme</div>
            <div><strong class="term-cyan">date</strong> - Show current date/time</div>
            <div><strong class="term-cyan">clear</strong> - Clear console output</div>
          </div>
        `;

      case 'about':
      case 'whoami':
        return `
          <div class="term-profile">
            <p><strong>${portfolioData.personal.name}</strong></p>
            <p class="term-yellow">${portfolioData.personal.title}</p>
            <p>${portfolioData.personal.bio}</p>
            <p>📍 Location: ${portfolioData.personal.location}</p>
            <p>🎓 Dr. N.G.P. Institute of Technology | CGPA: <strong>8.73</strong></p>
          </div>
        `;

      case 'skills':
        return `
          <div class="term-skills-view">
            <p class="term-cyan">⚡ <strong>Programming & Software:</strong></p>
            <p>• Python (90%) [Automation, Tkinter, Data Handling]<br>• Java (85%) [OOP, Data Structures]<br>• C Programming (85%) [Embedded C, Algorithms]</p>
            
            <p class="term-cyan" style="margin-top:8px;">🛠️ <strong>Core CS & Databases:</strong></p>
            <p>• Data Structures & Algorithms (85%)<br>• Object Oriented Programming (90%)<br>• DBMS & MySQL (80%)<br>• Cryptography & Network Security (Elite - IIT Kharagpur)<br>• Computer Architecture (NPTEL)</p>

            <p class="term-cyan" style="margin-top:8px;">🔌 <strong>Hardware & IoT:</strong></p>
            <p>• Microcontrollers: Arduino Uno/Nano, NodeMCU (ESP8266/ESP32)<br>• Interfacing: Biometrics, RFID, Rain Sensors, Relays, Motors<br>• EDA & Fabrication: Cadence EDA ASIC Flow, PCB Design</p>
          </div>
        `;

      case 'projects':
        return `
          <div class="term-projects-list">
            ${portfolioData.projects.map((p, i) => `
              <div class="term-proj-item">
                <span class="term-green">[#${i+1}] ${p.title} (${p.year})</span>
                <p>${p.summary}</p>
                <p class="term-muted">Tech Stack: ${p.techStack.join(', ')}</p>
              </div>
            `).join('')}
          </div>
        `;

      case 'experience':
        return `
          <div class="term-exp-list">
            ${portfolioData.experience.map(e => `
              <div class="term-exp-item">
                <span class="term-yellow">🏢 ${e.company} — ${e.role}</span>
                <span class="term-muted"> (${e.period}, ${e.location})</span>
                <p>${e.description}</p>
                <ul>
                  ${e.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        `;

      case 'education':
        return `
          <div class="term-edu-list">
            ${portfolioData.education.map(ed => `
              <div class="term-edu-item">
                <span class="term-green">🎓 ${ed.degree}</span>
                <p><strong>${ed.institution}</strong> | <span class="term-yellow">${ed.grade}</span> (${ed.period})</p>
              </div>
            `).join('')}
          </div>
        `;

      case 'certifications':
        return `
          <div class="term-certs-list">
            ${portfolioData.certifications.map(c => `
              <p>🏆 <strong>${c.title}</strong> — <span class="term-cyan">${c.issuer}</span> (${c.year})</p>
            `).join('')}
          </div>
        `;

      case 'cat':
        if (args[0] === 'resume.txt' || args[0] === 'resume') {
          return `
<pre class="term-resume-block">
============================================================
                     SUJAYA K S
     Electronics and Communication Engineering Undergrad
 Email: sujayaaks@gmail.com | Phone: +91 9384466268
 LinkedIn: https://www.linkedin.com/in/sujayaks/ | Coimbatore
============================================================

OBJECTIVE:
Motivated ECE student with strong programming, embedded, and
problem-solving skills seeking high-impact IT/Software roles.

ACADEMICS:
• B.E. ECE @ Dr. N.G.P. Institute of Tech (2023–Present) | CGPA: 8.73
• HSC @ Amrita Vidyalayam (CBSE, 2023) | 80.4%
• SSLC @ Amrita Vidyalayam (CBSE, 2021) | 88.2%

TECHNICAL SKILLS:
• Languages: Python, Java, C
• Core CS: DSA, OOPs, DBMS, MySQL, Cryptography & Network Security
• Embedded & IoT: Arduino, NodeMCU, Sensors, RFID, Biometrics, PCB
• Tools: VS Code, Arduino IDE, Tkinter, Git, Canva, Excel

PROJECTS:
1. GuidEx — Smart Exam Hall Guidance System (Python Tkinter + RFID + Biometrics)
2. Automatic Rain-Sensing Retractable Clothesline (IoT + Sensors + Motors)
3. Smart Fingerprint Door Lock System (Arduino + Biometric Lock Control)
4. Crowdsourced Civic Issue Reporting (Smart India Hackathon SIH '25)

INTERNSHIPS:
• IoT Intern @ TRIOX Technology (June 2025)
• Winter Intern @ Coimbatore Institute of Technology (Nov 2025)
============================================================
</pre>
          `;
        }
        return `<span class="term-red">cat: cannot open file '${this.escapeHTML(args.join(' '))}' (Try 'cat resume.txt')</span>`;

      case 'contact':
        return `
          <div class="term-contact">
            <p>📬 <strong>Email:</strong> <a href="mailto:${portfolioData.personal.email}" class="term-link">${portfolioData.personal.email}</a></p>
            <p>📞 <strong>Phone:</strong> <a href="tel:${portfolioData.personal.phone}" class="term-link">${portfolioData.personal.phone}</a></p>
            <p>🔗 <strong>LinkedIn:</strong> <a href="${portfolioData.personal.linkedin}" target="_blank" class="term-link">${portfolioData.personal.linkedin}</a></p>
            <p>📍 <strong>Location:</strong> ${portfolioData.personal.location}</p>
          </div>
        `;

      case 'hire':
        return `
          <div class="term-hire-banner">
            <p class="term-green">🎉 <strong>Thank you for your interest in hiring Sujaya!</strong></p>
            <p>Sujaya is actively open for Software Engineering, Python/Java Developer, and Embedded/IoT Engineering opportunities.</p>
            <div style="margin-top:10px;">
              <a href="mailto:${portfolioData.personal.email}?subject=Interview%20Invitation%20for%20Sujaya%20K%20S" class="btn btn-primary btn-xs"><i class="fas fa-envelope"></i> Send Interview Invite</a>
              <a href="tel:${portfolioData.personal.phone}" class="btn btn-outline btn-xs" style="margin-left:8px;"><i class="fas fa-phone"></i> Call Direct</a>
            </div>
          </div>
        `;

      case 'theme':
        if (args[0] === 'dark' || args[0] === 'light') {
          if (window.setAppTheme) {
            window.setAppTheme(args[0]);
            return `Theme switched to <strong class="term-green">${args[0]} mode</strong>.`;
          }
        }
        return `Usage: <span class="term-cyan">theme dark</span> or <span class="term-cyan">theme light</span>`;

      case 'date':
        return new Date().toString();

      case 'clear':
        const log = document.getElementById('term-history-log');
        if (log) log.innerHTML = '';
        return '';

      case 'sudo':
        return `<span class="term-red">sujaya is not in the sudoers file. This incident will be reported.</span>`;

      case 'ls':
        return `resume.txt   projects/   skills.json   internships/   contact.vcf   sih_presentation.pdf`;

      case 'pwd':
        return `/home/sujaya/portfolio`;

      default:
        return `<span class="term-red">Command not found: '${this.escapeHTML(cmd)}'. Type <strong class="term-cyan" onclick="terminal.runCommand('help')">help</strong> for available commands.</span>`;
    }
  }

  escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

// Global reference
let terminal;
document.addEventListener('DOMContentLoaded', () => {
  terminal = new TerminalEmulator('terminal-container');
});

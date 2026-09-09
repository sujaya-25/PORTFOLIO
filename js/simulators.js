// Interactive Project Simulators for Sujaya K S Portfolio

const projectSimulators = {
  // 1. GuidEx Simulator
  guidex: {
    title: "GuidEx — Live Exam Hall Allocation Simulator",
    students: [
      { id: "RFID-84920", roll: "711523106042", name: "Sujaya K S", dept: "ECE", hall: "Hall 304", floor: "3rd Floor, Block B", desk: "Desk #18", session: "Morning (09:30 AM)", course: "EC8551 - Microcontrollers & Embedded Systems" },
      { id: "RFID-39102", roll: "711523106015", name: "Ananya Ramesh", dept: "ECE", hall: "Hall 201", floor: "2nd Floor, Block A", desk: "Desk #04", session: "Morning (09:30 AM)", course: "EC8551 - Microcontrollers & Embedded Systems" },
      { id: "RFID-77124", roll: "711523106078", name: "Karthik Raja", dept: "ECE", hall: "Hall 305", floor: "3rd Floor, Block B", desk: "Desk #29", session: "Morning (09:30 AM)", course: "EC8551 - Microcontrollers & Embedded Systems" }
    ],
    render() {
      return `
        <div class="sim-box">
          <div class="sim-header">
            <span class="sim-badge"><i class="fas fa-microchip"></i> GuidEx Kiosk Simulator (Tkinter + IoT Emulation)</span>
            <span class="sim-status-live"><span class="pulse-dot"></span> System Ready</span>
          </div>
          <div class="sim-grid">
            <div class="sim-panel">
              <h4>1. Tap RFID & Scan Biometrics</h4>
              <p class="sim-help">Select a student credential or click "Simulate Tap & Scan":</p>
              <div class="sim-input-group">
                <label>Select Student RFID Card:</label>
                <select id="sim-guidex-select" class="sim-select">
                  ${this.students.map((s, idx) => `<option value="${idx}">${s.name} (${s.roll} - ${s.id})</option>`).join('')}
                </select>
              </div>
              <div class="sim-actions">
                <button class="btn btn-primary btn-sm" onclick="projectSimulators.guidex.triggerAuth()">
                  <i class="fas fa-id-card"></i> Tap Card & Verify
                </button>
                <button class="btn btn-outline btn-sm" onclick="projectSimulators.guidex.triggerUnknown()">
                  <i class="fas fa-user-slash"></i> Test Unregistered Card
                </button>
              </div>
              <div class="sim-sensor-visual" id="guidex-sensor-anim">
                <div class="rfid-tag"><i class="fas fa-wifi"></i> RFID Ready</div>
                <div class="biometric-pad"><i class="fas fa-fingerprint"></i> Biometric Standby</div>
              </div>
            </div>

            <div class="sim-panel sim-display-panel">
              <h4>2. Tkinter UI Output (Real-Time Terminal)</h4>
              <div id="guidex-result" class="kiosk-screen">
                <div class="kiosk-placeholder">
                  <i class="fas fa-id-badge fa-3x"></i>
                  <p>Awaiting Student Card Tap...</p>
                  <span class="kiosk-note">Tkinter listener waiting for UART / Serial byte feed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },
    triggerAuth() {
      const idx = document.getElementById('sim-guidex-select').value;
      const student = this.students[idx];
      const animBox = document.getElementById('guidex-sensor-anim');
      const screen = document.getElementById('guidex-result');

      animBox.innerHTML = `
        <div class="rfid-tag active-sensor"><i class="fas fa-wifi fa-spin"></i> Reading ${student.id}...</div>
        <div class="biometric-pad active-sensor"><i class="fas fa-fingerprint pulse-anim"></i> Matching Print...</div>
      `;

      screen.innerHTML = `
        <div class="kiosk-loading">
          <div class="spinner"></div>
          <p>Querying CSV Student Master Database...</p>
          <code>[QUERY] SELECT * FROM exam_registry WHERE rfid = '${student.id}'</code>
        </div>
      `;

      setTimeout(() => {
        animBox.innerHTML = `
          <div class="rfid-tag success-sensor"><i class="fas fa-check-circle"></i> Authenticated</div>
          <div class="biometric-pad success-sensor"><i class="fas fa-check-circle"></i> Match Score 99.4%</div>
        `;
        screen.innerHTML = `
          <div class="kiosk-ticket fade-in">
            <div class="ticket-header">
              <span class="badge badge-success"><i class="fas fa-check-circle"></i> AUTHENTICATED</span>
              <span class="ticket-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <h3 class="ticket-name">${student.name}</h3>
            <p class="ticket-roll">Roll No: <strong>${student.roll}</strong> | Dept: <strong>${student.dept}</strong></p>
            <div class="ticket-route-box">
              <div class="route-item">
                <span class="label">Assigned Hall</span>
                <span class="value hall-glow">${student.hall}</span>
              </div>
              <div class="route-item">
                <span class="label">Floor & Wing</span>
                <span class="value">${student.floor}</span>
              </div>
              <div class="route-item">
                <span class="label">Seating Desk</span>
                <span class="value desk-glow">${student.desk}</span>
              </div>
            </div>
            <div class="ticket-course">
              <span><strong>Subject:</strong> ${student.course}</span>
              <span><strong>Timing:</strong> ${student.session}</span>
            </div>
            <div class="ticket-footer">
              <span>GuidEx Automated Dispatch System</span>
              <button class="btn btn-ghost btn-xs" onclick="projectSimulators.guidex.reset()"><i class="fas fa-redo"></i> Reset</button>
            </div>
          </div>
        `;
      }, 700);
    },
    triggerUnknown() {
      const animBox = document.getElementById('guidex-sensor-anim');
      const screen = document.getElementById('guidex-result');

      animBox.innerHTML = `
        <div class="rfid-tag fail-sensor"><i class="fas fa-exclamation-triangle"></i> Unknown Card</div>
        <div class="biometric-pad fail-sensor"><i class="fas fa-times-circle"></i> No Match</div>
      `;

      screen.innerHTML = `
        <div class="kiosk-ticket error-ticket shake-anim">
          <div class="ticket-header">
            <span class="badge badge-danger"><i class="fas fa-times-circle"></i> ACCESS DENIED</span>
          </div>
          <h3 style="color:#ef4444; margin:10px 0;">Student Record Not Found</h3>
          <p>Card ID: <code>RFID-00000_UNREGISTERED</code></p>
          <p class="text-muted">No active exam registration or session assigned for this credential.</p>
          <div style="margin-top:15px;">
            <button class="btn btn-outline btn-sm" onclick="projectSimulators.guidex.reset()">Try Again</button>
          </div>
        </div>
      `;
    },
    reset() {
      const screen = document.getElementById('guidex-result');
      const animBox = document.getElementById('guidex-sensor-anim');
      if (screen) {
        screen.innerHTML = `
          <div class="kiosk-placeholder">
            <i class="fas fa-id-badge fa-3x"></i>
            <p>Awaiting Student Card Tap...</p>
            <span class="kiosk-note">Tkinter listener waiting for UART / Serial byte feed</span>
          </div>
        `;
      }
      if (animBox) {
        animBox.innerHTML = `
          <div class="rfid-tag"><i class="fas fa-wifi"></i> RFID Ready</div>
          <div class="biometric-pad"><i class="fas fa-fingerprint"></i> Biometric Standby</div>
        `;
      }
    }
  },

  // 2. Rain Sensing Clothesline Simulator
  rain: {
    title: "Automatic Rain-Sensing Retractable Clothesline Simulator",
    state: { weather: "sunny", sensorValue: 1023, motorState: "EXTENDED (Sunny Area)", clothesState: "Drying Outdoor" },
    render() {
      return `
        <div class="sim-box">
          <div class="sim-header">
            <span class="sim-badge"><i class="fas fa-cloud-rain"></i> Rain Sensor & Motor Controller (Arduino Emulation)</span>
            <span class="sim-status-live"><span class="pulse-dot"></span> Telemetry Active</span>
          </div>
          <div class="sim-grid">
            <div class="sim-panel">
              <h4>1. Environmental Weather Control</h4>
              <p class="sim-help">Toggle weather conditions to observe the rain sensor ADC threshold and automated motor actuation:</p>
              
              <div class="weather-btn-group">
                <button class="btn btn-outline ${this.state.weather === 'sunny' ? 'active' : ''}" onclick="projectSimulators.rain.setWeather('sunny')">
                  <i class="fas fa-sun text-yellow"></i> Sunny Day
                </button>
                <button class="btn btn-outline ${this.state.weather === 'drizzle' ? 'active' : ''}" onclick="projectSimulators.rain.setWeather('drizzle')">
                  <i class="fas fa-cloud-rain text-blue"></i> Drizzle Rain
                </button>
                <button class="btn btn-outline ${this.state.weather === 'downpour' ? 'active' : ''}" onclick="projectSimulators.rain.setWeather('downpour')">
                  <i class="fas fa-cloud-showers-heavy text-cyan"></i> Heavy Downpour
                </button>
              </div>

              <div class="telemetry-box" style="margin-top:15px;">
                <div class="tele-item">
                  <span>Sensor Pin (A0 ADC):</span>
                  <strong id="rain-adc-val">${this.state.sensorValue} / 1023</strong>
                </div>
                <div class="tele-item">
                  <span>Rain Threshold Trigger:</span>
                  <strong style="color:var(--accent-primary)">&lt; 500 (Rain Detected)</strong>
                </div>
                <div class="tele-item">
                  <span>Microcontroller Mode:</span>
                  <strong id="rain-mcu-mode">INTERRUPT_WATCH</strong>
                </div>
              </div>
            </div>

            <div class="sim-panel">
              <h4>2. Actuator & Enclosure Physical State</h4>
              <div class="clothesline-visual" id="clothesline-stage">
                <div class="shelter-roof"><i class="fas fa-home"></i> Covered Shelter Enclosure</div>
                <div class="clothesline-track">
                  <div class="clothes-cart ${this.state.weather !== 'sunny' ? 'retracted' : 'extended'}" id="clothes-cart">
                    <span class="cart-label"><i class="fas fa-tshirt"></i> Laundry Pulley</span>
                    <span class="cart-status" id="cart-status-text">${this.state.clothesState}</span>
                  </div>
                </div>
                <div class="motor-indicator">
                  <span>Motor Driver (L298N): <strong id="motor-status">${this.state.motorState}</strong></span>
                </div>
              </div>
              <div id="rain-alert-banner" class="alert-banner ${this.state.weather === 'sunny' ? 'alert-info' : 'alert-danger'}">
                ${this.state.weather === 'sunny' ? '☀️ Weather dry: Laundry placed in open sunlight for quick drying.' : '🌧️ Rain detected: Motor rotated counter-clockwise to pull clothesline inside shelter!'}
              </div>
            </div>
          </div>
        </div>
      `;
    },
    setWeather(type) {
      this.state.weather = type;
      const adcElem = document.getElementById('rain-adc-val');
      const cart = document.getElementById('clothes-cart');
      const cartStatus = document.getElementById('cart-status-text');
      const motorStatus = document.getElementById('motor-status');
      const banner = document.getElementById('rain-alert-banner');
      const mode = document.getElementById('rain-mcu-mode');

      // Update button active state
      document.querySelectorAll('.weather-btn-group .btn').forEach(btn => btn.classList.remove('active'));
      event.currentTarget.classList.add('active');

      if (type === 'sunny') {
        this.state.sensorValue = 1018;
        this.state.motorState = "IDLE (Extended)";
        this.state.clothesState = "Drying Outdoor";
        if (adcElem) adcElem.textContent = "1018 / 1023 (Dry)";
        if (mode) mode.textContent = "STANDBY_MONITOR";
        if (cart) {
          cart.classList.remove('retracted');
          cart.classList.add('extended');
        }
        if (cartStatus) cartStatus.textContent = "Drying Outdoor";
        if (motorStatus) motorStatus.textContent = "RESTORING -> EXTENDED";
        if (banner) {
          banner.className = "alert-banner alert-info";
          banner.innerHTML = "☀️ Weather Dry: Motor extended clothesline outdoors for sun exposure.";
        }
      } else if (type === 'drizzle') {
        this.state.sensorValue = 420;
        this.state.motorState = "PULLING IN (CW Motor Pulse)";
        this.state.clothesState = "Sheltered & Protected";
        if (adcElem) adcElem.textContent = "420 / 1023 (Moisture Trigger)";
        if (mode) mode.textContent = "ISR_TRIGGERED";
        if (cart) {
          cart.classList.remove('extended');
          cart.classList.add('retracted');
        }
        if (cartStatus) cartStatus.textContent = "Safely Sheltered";
        if (motorStatus) motorStatus.textContent = "RETRACTED TO SHELTER";
        if (banner) {
          banner.className = "alert-banner alert-danger";
          banner.innerHTML = "🌦️ Light Drizzle detected: System triggered rapid retraction into shelter enclosure!";
        }
      } else if (type === 'downpour') {
        this.state.sensorValue = 110;
        this.state.motorState = "LOCKED IN SHELTER";
        this.state.clothesState = "Sheltered & Dry";
        if (adcElem) adcElem.textContent = "110 / 1023 (Heavy Rain Saturation)";
        if (mode) mode.textContent = "EMERGENCY_LOCKOUT";
        if (cart) {
          cart.classList.remove('extended');
          cart.classList.add('retracted');
        }
        if (cartStatus) cartStatus.textContent = "Safely Sheltered";
        if (motorStatus) motorStatus.textContent = "LOCKED IN SHELTER";
        if (banner) {
          banner.className = "alert-banner alert-danger";
          banner.innerHTML = "🌧️ Heavy Downpour detected: Limit switches engaged; clothes safe inside shelter.";
        }
      }
    }
  },

  // 3. Smart Fingerprint Door Lock Simulator
  fingerprint: {
    title: "Smart Fingerprint Door Lock Access Simulator",
    render() {
      return `
        <div class="sim-box">
          <div class="sim-header">
            <span class="sim-badge"><i class="fas fa-fingerprint"></i> Arduino Biometric Access Controller</span>
            <span class="sim-status-live"><span class="pulse-dot"></span> Lock Energized</span>
          </div>
          <div class="sim-grid">
            <div class="sim-panel">
              <h4>1. Optical Fingerprint Sensor Pad</h4>
              <p class="sim-help">Place authorized or unauthorized finger onto the optical scanner:</p>
              
              <div class="biometric-scanner-large" id="lock-scanner-box">
                <div class="scanner-ring">
                  <i class="fas fa-fingerprint fa-4x" id="lock-finger-icon"></i>
                </div>
                <span class="scanner-text" id="lock-scan-msg">Touch Scanner to Authenticate</span>
              </div>

              <div class="sim-actions" style="margin-top:15px; justify-content:center;">
                <button class="btn btn-primary btn-sm" onclick="projectSimulators.fingerprint.testAuth(true, 'ID #01 (Admin - Sujaya)')">
                  <i class="fas fa-check"></i> Scan Authorized Finger
                </button>
                <button class="btn btn-outline btn-sm" onclick="projectSimulators.fingerprint.testAuth(false, 'Unknown Visitor')">
                  <i class="fas fa-times"></i> Scan Unregistered Finger
                </button>
              </div>
            </div>

            <div class="sim-panel">
              <h4>2. Relay & Solenoid Lock Telemetry</h4>
              <div class="kiosk-screen" id="lock-lcd-screen">
                <div class="lcd-matrix">
                  <div class="lcd-line-1" id="lcd-l1">> SECURE DOOR LOCK</div>
                  <div class="lcd-line-2" id="lcd-l2">> PLACE FINGER...</div>
                </div>
              </div>

              <div class="lock-visual-state" id="lock-visual-state">
                <div class="solenoid-bolt locked" id="solenoid-bolt">
                  <i class="fas fa-lock fa-2x"></i>
                  <span id="bolt-text">BOLT: ENGAGED (LOCKED)</span>
                </div>
              </div>

              <div class="telemetry-box" style="margin-top:15px;">
                <div class="tele-item">
                  <span>Relay Channel 1:</span>
                  <strong id="relay-status">OFF (Normally Open)</strong>
                </div>
                <div class="tele-item">
                  <span>EEPROM Users:</span>
                  <strong>100 Slots Available (12 Enrolled)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },
    testAuth(authorized, userLabel) {
      const scanner = document.getElementById('lock-scanner-box');
      const msg = document.getElementById('lock-scan-msg');
      const l1 = document.getElementById('lcd-l1');
      const l2 = document.getElementById('lcd-l2');
      const bolt = document.getElementById('solenoid-bolt');
      const boltText = document.getElementById('bolt-text');
      const relay = document.getElementById('relay-status');

      scanner.className = "biometric-scanner-large scanning";
      msg.textContent = "Scanning optical template...";
      l1.textContent = "> SCANNING PRINT...";
      l2.textContent = "> MATCHING IN FLASH";

      setTimeout(() => {
        if (authorized) {
          scanner.className = "biometric-scanner-large scan-success";
          msg.textContent = `Matched: ${userLabel}`;
          l1.textContent = `WELCOME: ${userLabel}`;
          l2.textContent = "> ACCESS GRANTED [OPEN]";
          bolt.className = "solenoid-bolt unlocked";
          bolt.innerHTML = `<i class="fas fa-unlock-alt fa-2x"></i> <span id="bolt-text">BOLT: RETRACTED (UNLOCKED)</span>`;
          relay.textContent = "ON (12V Pulsed for 5.0s)";
          relay.style.color = "#10b981";

          // Auto relock after 5s
          setTimeout(() => {
            scanner.className = "biometric-scanner-large";
            msg.textContent = "Touch Scanner to Authenticate";
            l1.textContent = "> SECURE DOOR LOCK";
            l2.textContent = "> PLACE FINGER...";
            bolt.className = "solenoid-bolt locked";
            bolt.innerHTML = `<i class="fas fa-lock fa-2x"></i> <span id="bolt-text">BOLT: ENGAGED (LOCKED)</span>`;
            relay.textContent = "OFF (Normally Open)";
            relay.style.color = "";
          }, 5000);
        } else {
          scanner.className = "biometric-scanner-large scan-fail";
          msg.textContent = "Fingerprint Not Recognized";
          l1.textContent = "> ERROR: NO MATCH";
          l2.textContent = "> ACCESS DENIED [ALERT]";
          relay.textContent = "LOCKOUT (Alarm Triggered)";
          relay.style.color = "#ef4444";

          setTimeout(() => {
            scanner.className = "biometric-scanner-large";
            msg.textContent = "Touch Scanner to Authenticate";
            l1.textContent = "> SECURE DOOR LOCK";
            l2.textContent = "> PLACE FINGER...";
            relay.textContent = "OFF (Normally Open)";
            relay.style.color = "";
          }, 3000);
        }
      }, 600);
    }
  },

  // 4. SIH Civic Issue Simulator
  sih: {
    title: "SIH 2025: Crowdsourced Civic Issue Reporting Simulator",
    issues: [
      { id: "ISSUE-9401", cat: "Clean & Green Sanitation", loc: "Gandhipuram Bus Stand, Coimbatore", status: "In Progress", priority: "High", time: "10 mins ago" },
      { id: "ISSUE-9398", cat: "Defective Street Light", loc: "Avinashi Road Junction, Coimbatore", status: "Resolved", priority: "Medium", time: "2 hours ago" },
      { id: "ISSUE-9385", cat: "Road Pothole Hazard", loc: "Dr. NGP College Main Gate, Coimbatore", status: "Under Review", priority: "Critical", time: "Yesterday" }
    ],
    render() {
      return `
        <div class="sim-box">
          <div class="sim-header">
            <span class="sim-badge"><i class="fas fa-recycle"></i> Smart India Hackathon 2025 Platform Prototype</span>
            <span class="sim-status-live"><span class="pulse-dot"></span> SIH Clean & Green Portal</span>
          </div>
          <div class="sim-grid">
            <div class="sim-panel">
              <h4>1. Report a Local Civic Issue</h4>
              <p class="sim-help">Simulate citizen reporting workflow with automated geotagging:</p>
              
              <div class="sim-input-group">
                <label>Issue Category:</label>
                <select id="sih-category" class="sim-select">
                  <option value="Garbage / Waste Overflow (Clean & Green)">Garbage / Waste Overflow (Clean & Green)</option>
                  <option value="Street Lighting Malfunction">Street Lighting Malfunction</option>
                  <option value="Water Leakage & Stagnation">Water Leakage & Stagnation</option>
                  <option value="Damaged Public Infrastructure">Damaged Public Infrastructure</option>
                </select>
              </div>

              <div class="sim-input-group">
                <label>Location & GPS Coordinates:</label>
                <input type="text" id="sih-location" class="sim-input" value="Coimbatore City (11.0168° N, 76.9558° E)" readonly />
              </div>

              <div class="sim-input-group">
                <label>Short Description:</label>
                <input type="text" id="sih-desc" class="sim-input" placeholder="e.g. Overflowing garbage bin requiring municipal pickup" value="Accumulated dry & wet waste near local square" />
              </div>

              <button class="btn btn-primary btn-sm" onclick="projectSimulators.sih.submitIssue()">
                <i class="fas fa-paper-plane"></i> Submit Civic Report
              </button>
            </div>

            <div class="sim-panel">
              <h4>2. Municipal Dispatch Queue (Live Tracker)</h4>
              <div class="issue-queue" id="sih-issue-queue">
                ${this.issues.map(iss => `
                  <div class="issue-card">
                    <div class="issue-header">
                      <span class="issue-id">${iss.id}</span>
                      <span class="badge ${iss.status === 'Resolved' ? 'badge-success' : iss.status === 'In Progress' ? 'badge-warning' : 'badge-danger'}">${iss.status}</span>
                    </div>
                    <div class="issue-body">
                      <strong>${iss.cat}</strong>
                      <p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${iss.loc}</p>
                      <span class="issue-meta"><i class="fas fa-clock"></i> ${iss.time} | Priority: <strong>${iss.priority}</strong></span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    },
    submitIssue() {
      const cat = document.getElementById('sih-category').value;
      const loc = document.getElementById('sih-location').value;
      const desc = document.getElementById('sih-desc').value;
      const queue = document.getElementById('sih-issue-queue');

      const newId = "ISSUE-" + Math.floor(1000 + Math.random() * 9000);
      const newCard = document.createElement('div');
      newCard.className = "issue-card fade-in highlight-card";
      newCard.innerHTML = `
        <div class="issue-header">
          <span class="issue-id">${newId}</span>
          <span class="badge badge-warning">Dispatched</span>
        </div>
        <div class="issue-body">
          <strong>${cat}</strong>
          <p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${loc}</p>
          <span class="issue-meta"><i class="fas fa-clock"></i> Just Now | Priority: <strong>High (Auto-Routed)</strong></span>
          <p style="font-size:0.82rem; margin-top:4px; color:var(--text-secondary);">${desc}</p>
        </div>
      `;
      queue.insertBefore(newCard, queue.firstChild);
    }
  }
};

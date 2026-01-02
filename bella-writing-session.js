'use strict';

// ========================================
// BELLA SESJA PISARSKA v6.0 HYPERDRIVE ⚡
// ETERNIVERSE + data.js + core.js + session.js FULL INTEGRATION
// MOC NA MAKSIMUM — AI-POWERED WRITING MACHINE
// ========================================

class BellaHyperSession {
  constructor() {
    this.version = '6.0-HYPER';
    this.mocLevel = 0; // 0-10
    this.hyperMode = false;
    this.aiBoost = false;
    this.startTime = 0;
    this.godModeTimer = null;
    this.sprintHistory = [];
    
    // HYPER STATS
    this.hyperStats = {
      words: 0, time: 0, wpm: 0, peakWPM: 0,
      sprints: 0, pomodoros: 0, aiBlocks: 0,
      flowState: 0, focusScore: 0
    };
    
    this.initHyperdrive();
  }

  // 🚀 HYPER INIT — MOC 100%
  initHyperdrive() {
    console.log('🔥 BELLA v6.0 HYPERDRIVE — MOC NA MAKSIMUM!');
    
    // FULL SYSTEM DETECT
    this.editor = this.detectHyperEditor();
    this.terniverse = window.EterSession || this.detectETERNIVERSE();
    
    if (!this.editor) {
      console.warn('HYPER: Brak edytora');
      return;
    }
    
    // MOC LEVEL 1: BASE SETUP
    this.injectHyperforgeUI();
    this.bindHyperControls();
    this.hyperSync();
    
    // MOC LEVEL 5: GLOBAL LISTENERS
    this.bindHyperShortcuts();
    this.startHyperMonitoring();
    
    // MOC LEVEL 10: GOD MODE READY
    console.log('⚡ HYPERDRIVE FULLY ARMED — Ctrl+Shift+X = GOD MODE');
  }

  detectHyperEditor() {
    return document.getElementById('book') || // ETERNIVERSE
           document.getElementById('editor') ||
           document.querySelector('textarea, [contenteditable="true"]');
  }

  detectETERNIVERSE() {
    return window.EterAPI || window.expandScene ? { api: window.EterAPI } : null;
  }

  // 🔥 HYPERFORGE UI — NEXT LEVEL VISUALS
  injectHyperforgeUI() {
    if (document.getElementById('hyperforge')) return;
    
    const hyperUI = document.createElement('div');
    hyperUI.id = 'hyperforge';
    hyperUI.innerHTML = this.generateHyperHTML();
    document.body.appendChild(hyperUI);
    
    this.injectHyperStyles();
  }

  generateHyperHTML() {
    return `
    <div class="hyper-panel">
      <div class="hyper-header">
        <span class="hyper-logo">⚡ HYPERDRIVE v6.0</span>
        <span class="moc-meter" id="mocMeter">MOC: 0/10</span>
      </div>
      
      <div class="hyper-stats">
        <div class="stat-line">
          <span>WPM: <span id="hyperWPM">0</span></span>
          <span>Słowa: <span id="hyperWords">0</span></span>
          <span>Peak: <span id="hyperPeak">0</span></span>
        </div>
        <div class="stat-line">
          <span>Czas: <span id="hyperTime">00:00</span></span>
          <span>Flow: <span id="hyperFlow">0%</span></span>
          <span>AI: <span id="hyperAI">0</span></span>
        </div>
      </div>
      
      <div class="hyper-controls">
        <button id="godModeBtn" class="hyper-btn god">🦾 GOD MODE</button>
        <button id="aiBoostBtn" class="hyper-btn ai">🤖 AI BOOST</button>
        <button id="hyperSprintBtn" class="hyper-btn sprint">⚡ SPRINT x3</button>
        <button id="pomoHyper" class="hyper-btn pomo">🍅 50min</button>
      </div>
      
      <div class="hyper-flow">
        <div class="flow-bar" id="flowBar"></div>
        <span id="flowStatus">Gotowy do startu</span>
      </div>
      
      <div class="hyper-footer">
        <span>Brama: <span id="hyperBrama">-</span></span>
        <span>Sesja: <span id="hyperID">-</span></span>
        <span id="hyperMocBadge">MOC 0</span>
      </div>
    </div>`;
  }

  injectHyperStyles() {
    const style = document.createElement('style');
    style.textContent = `
    /* HYPERDRIVE VISUALS — CYBERPUNK MAX */
    #hyperforge {
      position: fixed; top: 20px; right: 20px; z-index: 2147483647;
      min-width: 380px; backdrop-filter: blur(40px);
    }
    
    .hyper-panel {
      background: linear-gradient(135deg, 
        #0a0a1f 0%, #1a0a3f 30%, #0f1a4f 70%, #0a1a2f 100%);
      border: 2px solid #00ffdd; border-radius: 20px; padding: 24px;
      box-shadow: 0 0 100px #00ffdd40, inset 0 0 40px rgba(0,255,221,0.1);
      font-family: 'Orbitron', monospace; color: #e0f0ff; font-size: 13px;
    }
    
    .hyper-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px; padding-bottom: 12px;
      border-bottom: 1px solid #00ffdd40;
    }
    
    .hyper-logo {
      font-size: 18px; font-weight: 900; 
      background: linear-gradient(45deg, #00ffdd, #ff00ff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px #00ffdd80;
    }
    
    .moc-meter {
      font-weight: 700; color: #ffaa00; text-shadow: 0 0 10px #ffaa0040;
    }
    
    .hyper-stats { margin-bottom: 20px; }
    .stat-line { display: flex; justify-content: space-between; margin-bottom: 8px; }
    
    .hyper-controls {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;
    }
    
    .hyper-btn {
      padding: 14px; border: none; border-radius: 12px; font-weight: 800;
      font-size: 12px; text-transform: uppercase; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      letter-spacing: 1px;
    }
    
    .hyper-btn.god { 
      background: linear-gradient(45deg, #ff0066, #cc00ff);
      color: white; box-shadow: 0 0 30px #ff006640;
    }
    
    .hyper-btn.ai { 
      background: linear-gradient(45deg, #00ff88, #00cc66);
      color: #000; box-shadow: 0 0 30px #00ff8840;
    }
    
    .hyper-btn.sprint { 
      background: linear-gradient(45deg, #ffaa00, #ff6600);
      color: #000; box-shadow: 0 0 30px #ffaa0040;
    }
    
    .hyper-btn:hover {
      transform: scale(1.05) translateY(-3px) !important;
      box-shadow: 0 20px 40px rgba(0,255,221,0.6) !important;
    }
    
    .hyper-flow {
      background: rgba(0,255,221,0.1); border-radius: 12px; padding: 12px;
      border: 1px solid #00ffdd40; margin-bottom: 16px;
    }
    
    .flow-bar {
      height: 8px; background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00);
      border-radius: 4px; transition: width 0.3s; margin-bottom: 8px;
    }
    
    .hyper-footer {
      font-size: 11px; opacity: 0.8; display: flex; justify-content: space-between;
    }
    
    /* HYPER FOCUS MODE */
    body.hyperdrive-active * {
      transition: all 0.5s !important;
    }
    
    body.hyperdrive-active header:not(.hyper-panel),
    body.hyperdrive-active nav,
    body.hyperdrive-active button:not(.hyper-btn) {
      opacity: 0.05 !important; pointer-events: none !important;
    }
    
    body.hyperdrive-active #book {
      border: 4px solid #00ffdd !important;
      box-shadow: 0 0 80px #00ffdd80 !important;
      background: #000011 !important;
    }
    `;
    document.head.appendChild(style);
  }

  // 🦾 GOD MODE — MOC 10/10
  activateGodMode() {
    this.mocLevel = 10;
    this.hyperMode = true;
    
    document.body.classList.add('hyperdrive-active');
    document.getElementById('godModeBtn').textContent = '🦾 GOD MODE ON';
    document.getElementById('godModeBtn').style.background = '#00ff00';
    
    // FULLSCREEN WRITING
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    
    // DISABLE DISTRACTIONS
    document.querySelectorAll('a, button, input:not(#book)').forEach(el => {
      el.style.pointerEvents = 'none';
    });
    
    this.godModeTimer = setTimeout(() => {
      this.deactivateGodMode();
    }, 25 * 60 * 1000); // 25 min
    
    console.log('🦾 GOD MODE AKTYWNY — MOC 10/10!');
  }

  deactivateGodMode() {
    this.hyperMode = false;
    document.body.classList.remove('hyperdrive-active');
    clearTimeout(this.godModeTimer);
  }

  // 🤖 AI BOOST — ETERNIVERSE INTEGRATION
  aiBoost() {
    if (!this.terniverse) return;
    
    this.aiBoost = true;
    this.hyperStats.aiBlocks++;
    
    // AUTO EXPAND SCENE
    if (window.expandScene) {
      window.expandScene();
    }
    
    // SET RANDOM GATE FOR MAX VARIETY
    const gates = ['inter', 'eter', 'obfi'];
    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    document.getElementById('gate').value = randomGate;
    
    document.getElementById('aiBoostBtn').textContent = '🤖 BOOST x2';
  }

  // ⚡ HYPER SPRINT — 3x SPEED
  hyperSprint() {
    this.hyperStats.sprints++;
    this.currentSprint = (this.currentSprint || 0) + 1;
    
    // VISUAL FEEDBACK
    const sprintEffect = document.createElement('div');
    sprintEffect.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
      font-size: 48px; color: #ffaa00; font-weight: 900; z-index: 999999;
      animation: sprintPulse 2s ease-out; pointer-events: none;
    `;
    sprintEffect.textContent = `SPRINT ${this.currentSprint} ⚡`;
    sprintEffect.id = 'sprintEffect';
    
    document.body.appendChild(sprintEffect);
    setTimeout(() => sprintEffect.remove(), 2000);
  }

  // 📊 HYPER MONITORING — 60fps
  startHyperMonitoring() {
    this.monitor = setInterval(() => this.hyperUpdate(), 16); // 60fps
  }

  hyperUpdate() {
    const now = Date.now();
    const elapsed = Math.floor((now - this.startTime) / 1000);
    const words = this.countHyperWords();
    const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
    
    this.hyperStats.words = words;
    this.hyperStats.wpm = wpm;
    this.hyperStats.time = elapsed;
    this.hyperStats.peakWPM = Math.max(this.hyperStats.peakWPM, wpm);
    
    // MOC CALCULATION
    this.mocLevel = Math.min(10, Math.floor(wpm / 10) + (words > 500 ? 2 : 0));
    
    // UI UPDATE
    document.getElementById('hyperWPM').textContent = wpm;
    document.getElementById('hyperWords').textContent = words;
    document.getElementById('hyperPeak').textContent = this.hyperStats.peakWPM;
    document.getElementById('hyperTime').textContent = this.formatHyperTime(elapsed);
    document.getElementById('mocMeter').textContent = `MOC: ${this.mocLevel}/10`;
    document.getElementById('hyperAI').textContent = this.hyperStats.aiBlocks;
    document.getElementById('hyperMocBadge').textContent = `MOC ${this.mocLevel}`;
    
    // FLOW STATE
    this.updateFlowState(wpm);
    
    // ETERNIVERSE SYNC
    this.syncBramaInfo();
  }

  countHyperWords() {
    const text = this.editor.value || this.editor.innerText || '';
    return text.trim().split(/s+/).filter(Boolean).length;
  }

  formatHyperTime(s) {
    const m = Math.floor(s / 60);
    const ss = (s % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  }

  updateFlowState(wpm) {
    const flow = Math.min(100, (wpm * 2) + (this.mocLevel * 5));
    document.getElementById('hyperFlow').textContent = `${flow}%`;
    document.getElementById('flowBar').style.width = `${flow}%`;
    
    const status = flow > 80 ? 'ZONE' : flow > 50 ? 'FLOW' : 'WARMUP';
    document.getElementById('flowStatus').textContent = status;
  }

  // 🔌 FULL BINDINGS
  bindHyperControls() {
    document.getElementById('godModeBtn').onclick = () => this.activateGodMode();
    document.getElementById('aiBoostBtn').onclick = () => this.aiBoost();
    document.getElementById('hyperSprintBtn').onclick = () => this.hyperSprint();
    document.getElementById('pomoHyper').onclick = () => this.hyperPomodoro();
  }

  bindHyperShortcuts() {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey) {
        switch(e.key.toLowerCase()) {
          case 'x': this.activateGodMode(); break;
          case 'a': this.aiBoost(); break;
          case 's': this.hyperSprint(); break;
        }
      }
    });
  }

  syncBramaInfo() {
    const gateEl = document.getElementById('gate');
    if (gateEl) {
      const bramaMap = {
        inter: 'CIEN', eter: 'ETER', obfi: 'OBFITOSC'
      };
      document.getElementById('hyperBrama').textContent = 
        bramaMap[gateEl.value] || '-';
    }
  }

  hyperPomodoro() {
    // 50 MIN HYPER POMO
    const end = Date.now() + 50 * 60 * 1000;
    const pomoInt = setInterval(() => {
      const rem = Math.floor((end - Date.now()) / 1000);
      if (rem <= 0) {
        clearInterval(pomoInt);
        this.hyperCelebrate('50MIN UKOŃCZONY! 🚀');
        return;
      }
      document.getElementById('hyperTime').textContent = `POMO ${this.formatHyperTime(rem)}`;
    }, 1000);
  }

  hyperCelebrate(msg) {
    const celeb = document.createElement('div');
    celeb.style.cssText = `
      position: fixed; top: 40%; left: 50%; transform: translate(-50%,-50%);
      font-size: 64px; font-weight: 900; color: #00ffdd;
      text-shadow: 0 0 50px #00ffdd; z-index: 999999;
      animation: celebrate 3s ease-out;
    `;
    celeb.textContent = msg;
    document.body.appendChild(celeb);
    setTimeout(() => celeb.remove(), 3000);
  }
}

// GLOBAL HYPERDRIVE LAUNCH
document.addEventListener('DOMContentLoaded', () => {
  window.BellaHyperSession = new BellaHyperSession();
  
  // AUTO-DETECT ETERNIVERSE INTEGRATION
  if (window.expandScene || document.getElementById('book')) {
    console.log('🔥 ETERNIVERSE DETEKTOWANY — FULL SYNC');
  }
});
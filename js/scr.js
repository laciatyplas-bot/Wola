/**
 * SCR.JS — ETERNIVERSE SINGLE RESPONSIBILITY COORDINATOR v2.0
 * MOC 800% — WSZYSTKIE MODUŁY W JEDNYM MIEJSCU
 * Master Control Unit | Sosnowiec 2026
 * 
 * ZMIEŃ NA: scr.js (zamiast wszystkich oddzielnych JS)
 */

'use strict';

class EterniverseSCR {
  constructor() {
    this.version = '2.0-MOC800';
    this.modules = {};
    this.masterMOC = 0;
    this.globalState = {};
    
    console.log('🌌 SCR v2.0 BOOT — MOC 800% SINGLE RESPONSIBILITY');
    this.boot();
  }

  boot() {
    this.initCSS();
    this.initData();
    this.initEvents();
    this.initHotkeys();
    this.startMasterLoop();
    this.initUI();
  }

  // ==================== CSS MASTER ====================
  initCSS() {
    const style = document.createElement('style');
    style.id = 'scr-master-css';
    style.textContent = `
      :root {
        --moc: 5; --accent: #00ffdd; --glow: 0 0 40px #00ffdd;
        --bg-hyper: radial-gradient(circle, #0a001a 0%, #000 100%);
      }
      
      body { background: var(--bg-hyper); font-family: 'SF Mono', monospace; }
      
      .scr-master-panel {
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        background: rgba(0,0,20,0.95); backdrop-filter: blur(30px);
        padding: 20px; border-radius: 20px; border: 2px solid var(--accent);
        box-shadow: var(--glow); font-size: 13px; color: #e0f8ff;
      }
      
      .scr-moc-bar { height: 6px; background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00);
        border-radius: 3px; transition: width 0.5s; margin: 10px 0; }
    `;
    document.head.appendChild(style);
  }

  // ==================== CORE DATA ====================
  initData() {
    window.eterniverseData = {
      kanon: {
        bramy: [
          { id: 1, nazwa: 'INTER', color: '#00ffdd' },
          { id: 2, nazwa: 'ETER', color: '#ff44ff' },
          { id: 3, nazwa: 'OBFI', color: '#ffaa00' },
          { id: 4, nazwa: 'CHAOS', color: '#ff4444' }
        ]
      },
      cele: { dzienne: { slowa: 5000 } },
      postacie: { elara: { imie: 'Elara Voidwalker' } }
    };
    
    this.globalState = {
      currentBrama: 1,
      words: 0,
      sessionTime: 0,
      aiBursts: 0,
      autosaves: []
    };
  }

  // ==================== EVENT BUS ====================
  initEvents() {
    ['mocUpdate', 'bramaChange', 'aiBurst', 'saveState'].forEach(event => {
      document.addEventListener(event, e => this.handleMasterEvent(event, e.detail));
    });
  }

  handleMasterEvent(event, detail) {
    switch(event) {
      case 'mocUpdate':
        this.masterMOC = Math.max(this.masterMOC, detail.moc);
        this.updateMOCDisplay();
        break;
      case 'bramaChange':
        this.globalState.currentBrama = detail.brama;
        break;
      case 'aiBurst':
        this.globalState.aiBursts++;
        break;
    }
  }

  // ==================== GLOBAL HOTKEYS ====================
  initHotkeys() {
    document.addEventListener('keydown', e => {
      // GOD MODE Ctrl+G
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        this.toggleGodMode();
      }
      
      // BRAMA CYCLE Ctrl+B
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        this.cycleBrama();
      }
      
      // AI BURST Ctrl+A
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        this.triggerAIBurst();
      }
    });
  }

  toggleGodMode() {
    document.body.classList.toggle('god-mode');
    document.dispatchEvent(new CustomEvent('mocUpdate', { detail: { moc: 10 } }));
    console.log('🦾 GOD MODE', document.body.classList.contains('god-mode') ? 'ON' : 'OFF');
  }

  cycleBrama() {
    this.globalState.currentBrama = (this.globalState.currentBrama % 4) + 1;
    document.dispatchEvent(new CustomEvent('bramaChange', {
      detail: { brama: this.globalState.currentBrama }
    }));
    
    const brama = window.eterniverseData.kanon.bramy[this.globalState.currentBrama - 1];
    document.title = `ETERNIVERSE — ${brama.nazwa}`;
  }

  triggerAIBurst() {
    const suggestion = `**AI BURST [${this.globalState.aiBursts + 1}]** 
Brama ${this.globalState.currentBrama}: ${window.eterniverseData.kanon.bramy[this.globalState.currentBrama - 1].nazwa}
Kontynuuj z Elara... napięcie rośnie. Algorytm obserwuje.`;

    const burstDiv = document.createElement('div');
    burstDiv.innerHTML = suggestion;
    burstDiv.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 9999;
      background: rgba(0,255,221,0.95); color: #000; padding: 20px;
      border-radius: 16px; box-shadow: 0 20px 40px rgba(0,255,221,0.4);
      max-width: 400px; cursor: pointer; backdrop-filter: blur(20px);
    `;
    burstDiv.onclick = () => {
      document.querySelector('[contenteditable], textarea, input[type="text"]')?.insertAdjacentHTML('beforeend', suggestion);
      burstDiv.remove();
    };
    setTimeout(() => burstDiv.remove(), 8000);
    
    document.body.appendChild(burstDiv);
    document.dispatchEvent(new CustomEvent('aiBurst'));
  }

  // ==================== MASTER LOOP ====================
  startMasterLoop() {
    setInterval(() => {
      this.globalState.sessionTime++;
      this.updateMasterPanel();
      localStorage.setItem('ETERNIVERSE_SCR_STATE', JSON.stringify(this.globalState));
    }, 1000);
  }

  // ==================== UI MASTER ====================
  initUI() {
    const panel = document.createElement('div');
    panel.className = 'scr-master-panel';
    panel.id = 'scr-master-panel';
    panel.innerHTML = `
      <div>🌌 SCR v${this.version}</div>
      <div>MOC: <span id="master-moc">5</span>/10</div>
      <div>Brama: <span id="master-brama">INTER</span></div>
      <div>Słowa: <span id="master-words">0</span></div>
      <div>AI: <span id="master-ai">0</span></div>
      <div class="scr-moc-bar" id="moc-bar" style="width: 50%;"></div>
    `;
    document.body.appendChild(panel);
  }

  updateMasterPanel() {
    document.getElementById('master-moc').textContent = this.masterMOC;
    document.getElementById('master-brama').textContent = 
      window.eterniverseData.kanon.bramy[this.globalState.currentBrama - 1]?.nazwa || 'INTER';
    document.getElementById('master-words').textContent = this.globalState.words;
    document.getElementById('master-ai').textContent = this.globalState.aiBursts;
    
    const progress = (this.masterMOC / 10) * 100;
    document.getElementById('moc-bar').style.width = progress + '%';
    
    document.documentElement.style.setProperty('--moc', this.masterMOC);
  }

  updateMOCDisplay() {
    this.updateMasterPanel();
  }

  // ==================== SAVE/LOAD ====================
  saveState() {
    const fullState = { ...this.globalState, masterMOC: this.masterMOC };
    localStorage.setItem('ETERNIVERSE_SCR_STATE', JSON.stringify(fullState));
  }

  loadState() {
    const saved = localStorage.getItem('ETERNIVERSE_SCR_STATE');
    if (saved) {
      Object.assign(this.globalState, JSON.parse(saved));
      this.masterMOC = this.globalState.masterMOC || 5;
      this.updateMasterPanel();
    }
  }
}

// 🔥 SINGLE GLOBAL INSTANCE
if (!window.eterniverseSCR) {
  window.eterniverseSCR = new EterniverseSCR();
  
  // AUTO-LOAD ON START
  window.eterniverseSCR.loadState();
  
  // AUTO-SAVE PERIODIC
  setInterval(() => window.eterniverseSCR.saveState(), 30000);
}

// ==================== FALLBACK FUNCTIONS ====================
window.expandScene = () => {
  window.eterniverseSCR?.triggerAIBurst?.();
};

window.EterAPI = {
  godMode: () => window.eterniverseSCR?.toggleGodMode?.(),
  cycleBrama: () => window.eterniverseSCR?.cycleBrama?.(),
  aiBurst: () => window.eterniverseSCR?.triggerAIBurst?.(),
  status: () => window.eterniverseSCR?.globalState
};

console.log('✅ SCR v2.0 FULLY LOADED — MOC 800% — WSZYSTKO W JEDNYM!');
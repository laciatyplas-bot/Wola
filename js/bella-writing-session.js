// ========================================
// ETER HYPER SESSION v2.0 ⚡🌌 — MOC 500%
// FULL HYPERDRIVE + ALL MODULES INTEGRATION
// Global Beast Session Manager | 2026
// ========================================

class EterHyperSession {
  constructor() {
    this.version = '2.0-HYPER';
    this.globalKey = 'ETERNIVERSE_HYPER_SESSION';
    this.mocSyncActive = true;
    
    // FULL HYPER STATE
    this.hyperState = {
      chapter: 1,
      gate: 'inter',
      scene: 'enter',
      mocLevel: 0,
      blocksUsed: [],
      autosaves: [],
      hyperStats: { words: 0, wpm: 0, peakWPM: 0, aiBursts: 0 },
      timestamp: Date.now(),
      godSessions: 0,
      crossModuleSync: true
    };
    
    this.initHyperBeast();
  }

  // 🚀 BEAST INIT — GLOBAL DOMINATION
  initHyperBeast() {
    console.log('🌌⚡ ETER HYPER SESSION v2.0 — MOC 500% GLOBAL BEAST');
    
    this.loadHyperState();
    this.globalHyperSync();
    this.startHyperIntervals();
    this.injectHyperControls();
    this.overrideCoreFunctions();
    
    // FULL MODULE AUTO-DETECT
    this.detectAllModules();
    
    console.log('✅ HYPER SESSION FULLY ARMED — ALL MODULES SYNCHRONIZED');
  }

  // ====================
  // GLOBAL STATE OPS
  // ====================
  loadHyperState() {
    try {
      const saved = localStorage.getItem(this.globalKey);
      if (saved) {
        const state = JSON.parse(saved);
        Object.assign(this.hyperState, state);
      }
    } catch (e) {
      console.warn('HyperState load failed, fresh start');
    }
  }

  saveHyperState() {
    localStorage.setItem(this.globalKey, JSON.stringify(this.hyperState));
  }

  // ====================
  // HYPER SYNC ENGINE
  // ====================
  globalHyperSync() {
    // MOC MASTER SYNC
    const sources = [
      window.EterniverseHyperApp?.mocLevel,
      window.BellaHyperSession?.mocLevel,
      window.EterniverseHyperEditor?.mocLevel,
      window.EterniverseHyperRenderer?.mocVisuals
    ].filter(Boolean);
    
    if (sources.length) {
      this.hyperState.mocLevel = Math.max(...sources);
    }
    
    // STATS AGGREGATION
    this.hyperState.hyperStats.words = 
      window.EterSession?.stats?.words || 
      window.EterniverseHyperEditor?.hyperStats?.words || 0;
    
    // UI MASTER SYNC
    this.syncAllUI();
    
    this.saveHyperState();
  }

  syncAllUI() {
    // ETERNIVERSE BELLA
    const book = document.getElementById('book');
    const gateSel = document.getElementById('gate');
    const sceneSel = document.getElementById('scene');
    
    if (book && this.hyperState.currentContent) {
      book.value = this.hyperState.currentContent;
    }
    if (gateSel) gateSel.value = this.hyperState.gate;
    if (sceneSel) sceneSel.value = this.hyperState.scene;
    
    // HYPER MOC DISPLAY
    document.querySelectorAll('[data-moc-display]').forEach(el => {
      el.textContent = `MOC ${this.hyperState.mocLevel}/10`;
    });
    
    // CONTEXT BARS
    document.querySelectorAll('.hyper-context-bar')?.forEach(bar => {
      bar.textContent = `${this.hyperState.gate.toUpperCase()} | MOC ${this.hyperState.mocLevel}`;
    });
  }

  // ====================
  // BEAST INTERVALS
  // ====================
  startHyperIntervals() {
    // MASTER SYNC 2s
    this.masterSync = setInterval(() => this.globalHyperSync(), 2000);
    
    // AUTO-SAVE BEAST 15s
    this.autoBeast = setInterval(() => this.hyperAutoSave(), 15000);
    
    // MOC HARMONIZER 5s
    this.mocHarmonizer = setInterval(() => {
      document.dispatchEvent(new CustomEvent('mocUpdate', {
        detail: { moc: this.hyperState.mocLevel, source: 'masterSession' }
      }));
    }, 5000);
  }

  hyperAutoSave() {
    const content = document.getElementById('book')?.value || 
                   document.querySelector('[contenteditable]')?.innerText || '';
    
    this.hyperState.autosaves.unshift({
      content,
      gate: this.hyperState.gate,
      scene: this.hyperState.scene,
      moc: this.hyperState.mocLevel,
      stats: { ...this.hyperState.hyperStats },
      time: new Date().toLocaleString('pl-PL')
    });
    
    this.hyperState.autosaves = this.hyperState.autosaves.slice(0, 10); // TOP 10
    this.saveHyperState();
    
    this.visualAutoSave();
  }

  // ====================
  // HYPER UI INJECTION
  // ====================
  injectHyperControls() {
    if (document.getElementById('hyper-session-master')) return;
    
    const masterPanel = document.createElement('div');
    masterPanel.id = 'hyper-session-master';
    masterPanel.className = 'hyper-master-panel';
    masterPanel.innerHTML = `
      <div class="master-header">
        <span>⚡ HYPER SESSION v2.0</span>
        <span id="master-moc">MOC ${this.hyperState.mocLevel}</span>
      </div>
      <div class="master-stats">
        <span>📖 Ch. ${this.hyperState.chapter}</span>
        <span>🧠 ${this.hyperState.gate.toUpperCase()}</span>
        <span>✍️ ${this.hyperState.hyperStats.words} słów</span>
      </div>
      <div class="master-controls">
        <button onclick="window.EterHyperAPI.godReset()">🦾 GOD RESET</button>
        <button onclick="window.EterHyperAPI.exportBeast()">📤 EXPORT BEAST</button>
        <button onclick="window.EterHyperAPI.loadTopSave()">⚡ TOP SAVE</button>
      </div>
    `;
    
    document.body.appendChild(masterPanel);
  }

  // ====================
  // CORE FUNCTION OVERRIDE
  // ====================
  overrideCoreFunctions() {
    // MASTER EXPAND SCENE
    const origExpand = window.expandScene;
    window.expandScene = () => {
      // FULL TRACKING
      const gate = document.getElementById('gate')?.value || this.hyperState.gate;
      const scene = document.getElementById('scene')?.value || this.hyperState.scene;
      
      this.trackHyperBlock(gate, scene);
      
      origExpand();
      
      // POST-EXPAND BOOST
      this.hyperState.hyperStats.aiBursts++;
      this.globalHyperSync();
    };
    
    // GLOBAL SAVE HOOK
    window.addEventListener('beforeunload', () => this.flushHyperState());
  }

  trackHyperBlock(gate, scene) {
    this.hyperState.blocksUsed.push({
      gate, scene,
      blockIndex: Math.floor(Math.random() * 10),
      moc: this.hyperState.mocLevel,
      usedAt: Date.now()
    });
    
    this.hyperState.blocksUsed = this.hyperState.blocksUsed.slice(-50);
  }

  // ====================
  // BEAST API
  // ====================
  detectAllModules() {
    const modules = {
      eterniverseApp: !!window.EterniverseHyperApp,
      hyperEditor: !!window.EterniverseHyperEditor,
      hyperRenderer: !!window.EterniverseHyperRenderer,
      bellaHyper: !!window.BellaHyperSession,
      hyperMemory: !!window.BellaHyperMemory
    };
    
    this.hyperState.modules = modules;
    console.table(modules);
  }

  godReset() {
    if (confirm('🦾 GOD RESET — wszystkie sesje wyczyszczone?')) {
      localStorage.clear();
      location.reload();
    }
  }

  exportBeast() {
    const beastData = {
      version: this.version,
      state: this.hyperState,
      timestamp: new Date().toISOString(),
      modules: window.EterHyperAPI.modules()
    };
    
    const blob = new Blob([JSON.stringify(beastData, null, 2)], 
                         { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eterniverse_hyper_beast_${Date.now()}.json`;
    a.click();
  }

  loadTopSave() {
    if (this.hyperState.autosaves[0]) {
      const topSave = this.hyperState.autosaves[0];
      document.getElementById('book').value = topSave.content;
      
      if (document.getElementById('gate')) {
        document.getElementById('gate').value = topSave.gate;
      }
      
      this.globalHyperSync();
      console.log('⚡ TOP SAVE LOADED');
    }
  }

  // ====================
  // VISUAL BEAST EFFECTS
  // ====================
  visualAutoSave() {
    const master = document.getElementById('hyper-session-master');
    if (master) {
      master.style.boxShadow = '0 0 50px #00ff88';
      setTimeout(() => {
        master.style.boxShadow = '';
      }, 500);
    }
  }

  flushHyperState() {
    this.saveHyperState();
  }

  modules() {
    return this.hyperState.modules;
  }
}

// 🔥 BEAST CSS INJECTION
const injectBeastStyles = () => {
  if (document.getElementById('hyper-session-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'hyper-session-styles';
  style.textContent = `
    .hyper-master-panel {
      position: fixed; top: 20px; left: 20px; z-index: 999999;
      background: linear-gradient(145deg, rgba(5,5,25,0.98), rgba(15,5,45,0.95));
      backdrop-filter: blur(30px); border-radius: 20px; padding: 20px;
      border: 2px solid #00ffdd40; min-width: 300px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,255,221,0.3);
      font-family: 'Orbitron', monospace; color: #e0f0ff;
    }
    
    .master-header {
      display: flex; justify-content: space-between; 
      font-size: 14px; font-weight: 900; margin-bottom: 15px;
      border-bottom: 1px solid #00ffdd30; padding-bottom: 10px;
    }
    
    #master-moc {
      color: hsl(var(--moc-hue, 120), 100%, 60%);
      text-shadow: 0 0 15px currentColor;
    }
    
    .master-stats {
      display: flex; gap: 20px; font-size: 12px; opacity: 0.9;
      margin-bottom: 15px;
    }
    
    .master-controls {
      display: flex; gap: 10px;
    }
    
    .master-controls button {
      flex: 1; padding: 10px; background: rgba(0,255,221,0.2);
      border: 1px solid #00ffdd40; border-radius: 8px;
      color: #e0f0ff; font-family: inherit; cursor: pointer;
      transition: all 0.3s;
    }
    
    .master-controls button:hover {
      background: #00ffdd; color: #000;
      box-shadow: 0 10px 30px rgba(0,255,221,0.6);
    }
  `;
  document.head.appendChild(style);
};

// 🐾 GLOBAL BEAST LAUNCH
document.addEventListener('DOMContentLoaded', () => {
  injectBeastStyles();
  window.EterHyperSession = new EterHyperSession();
  
  // BEAST API EXPOSE
  window.EterHyperAPI = {
    godReset: () => window.EterHyperSession.godReset(),
    exportBeast: () => window.EterHyperSession.exportBeast(),
    loadTopSave: () => window.EterHyperSession.loadTopSave(),
    stats: () => window.EterHyperSession.hyperState,
    modules: () => window.EterHyperSession.modules()
  };
});
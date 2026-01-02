// ========================================
// BELLA HYPER MEMORY v3.0 ⚡🧠🌌
// FULL ETERNIVERSE + HYPERDRIVE MEMORY SYSTEM
// Brama → AI Context + MOC + Cross-Session Sync
// bella-hyper-memory.js | MOC 400% | 2026
// ========================================

'use strict';

class BellaHyperMemory {
  constructor() {
    this.version = '3.0-HYPER';
    this.hyperPrefix = 'ETERNIVERSE_HYPER_MEMORY_';
    this.mocMemory = {};  // Dynamic MOC-based recall
    
    // GATE-SPECIFIC MEMORY STRUCTURE
    this.memoryStructure = {
      inter: { core: '', scenes: [], traits: [], mocHistory: [] },
      eter: { core: '', decisions: [], archetypes: [], mocHistory: [] },
      obfi: { core: '', flows: [], outcomes: [], mocHistory: [] },
      chaos: { core: '', fragments: [], wildcards: [], mocHistory: [] }
    };
    
    this.activeGate = null;
    this.sessionMoc = 0;
    
    this.initHyperMemory();
  }

  // 🚀 HYPER MEMORY INIT — FULL SYNC
  initHyperMemory() {
    console.log('🧠⚡ Bella Hyper Memory v3.0 — MOC 400% CONTEXT BEAST');
    
    // FULL EVENT SYSTEM
    this.bindHyperEvents();
    
    // AUTO-DETECT CURRENT CONTEXT
    this.detectHyperContext();
    
    // MOC SYNC LOOP
    this.mocSyncInterval = setInterval(() => {
      this.syncMocMemory();
    }, 2000);
    
    // CROSS-SESSION HARMONIZATION
    this.harmonizeAllGates();
  }

  // ====================
  // HYPER EVENT BINDING
  // ====================
  bindHyperEvents() {
    // GATE CHANGES
    document.addEventListener('gateChanged', e => {
      this.switchHyperContext(e.detail.gate);
    });
    
    document.addEventListener('hyperProfileApplied', e => {
      this.injectProfileMemory(e.detail.profile);
    });
    
    // EDITOR SYNC
    document.addEventListener('editorContentChanged', e => {
      if (e.detail?.source === 'bella-ai' || e.detail?.source === 'ai-burst') {
        this.captureHyperOutput(e.detail.content);
      }
    });
    
    // MOC UPDATES
    document.addEventListener('mocUpdate', e => {
      this.updateMocMemory(e.detail.moc);
    });
    
    // HYPER SAVE EVENTS
    document.addEventListener('hyperSave', () => {
      this.flushMemoryToStorage();
    });
  }

  // ====================
  // CONTEXT DETECTION + SWITCH
  // ====================
  detectHyperContext() {
    const gateEl = document.getElementById('gate') || 
                   document.querySelector('[data-gate]');
    
    if (gateEl?.value || gateEl?.dataset.gate) {
      const gateId = gateEl.value || gateEl.dataset.gate;
      this.switchHyperContext(gateId);
    }
  }

  switchHyperContext(gateId) {
    const resolvedGate = this.resolveGateId(gateId);
    if (!resolvedGate || resolvedGate === this.activeGate) return;
    
    console.log(`🧠 MEMORY SWITCH: ${this.activeGate || '?'} → ${resolvedGate}`);
    
    this.activeGate = resolvedGate;
    this.injectActiveMemory();
    
    // PROFILE + VISUAL CASCADE
    if (window.BellaHyperAutoProfile) {
      window.BellaHyperAutoProfile.applyHyperProfile(resolvedGate);
    }
    
    document.dispatchEvent(new CustomEvent('memoryContextSwitched', {
      detail: { gate: resolvedGate, memory: this.memoryStructure[resolvedGate] }
    }));
  }

  resolveGateId(gateId) {
    const direct = ['inter', 'eter', 'obfi', 'chaos'].find(g => 
      gateId.includes(g));
    
    if (direct) return direct;
    
    // Roman numeral parsing
    const romanMatch = gateId.match(/([IVX]+)/i);
    if (romanMatch) {
      const romanMap = { I: 'inter', II: 'eter', III: 'eter', IV: 'eter', V: 'obfi' };
      return romanMap[romanMatch[1].toUpperCase()];
    }
    
    return 'inter'; // default
  }

  // ====================
  // MOC-REACTIVE MEMORY
  // ====================
  injectActiveMemory() {
    if (!this.activeGate) return;
    
    const memory = this.memoryStructure[this.activeGate];
    const mocFiltered = this.filterByMoc(memory);
    
    // INJECT TO AI PROMPT
    const aiInputs = document.querySelectorAll('#aiPrompt, [data-ai-prompt], .bella-input');
    aiInputs.forEach(input => {
      const context = this.formatMemoryForPrompt(mocFiltered);
      input.value = `[${this.activeGate.toUpperCase()} | MOC ${this.sessionMoc}] CONTEXT:
${context}

` + input.value;
    });
    
    // EDITOR CONTEXT BAR
    this.updateContextBar();
  }

  filterByMoc(memory) {
    const threshold = Math.max(1, this.sessionMoc - 2);
    return {
      core: memory.core,
      recent: memory.scenes?.slice(-5) || [],
      highMoc: memory.mocHistory?.filter(m => m.moc >= threshold) || []
    };
  }

  formatMemoryForPrompt(memory) {
    let prompt = `CORE: ${memory.core.slice(-300)}...

`;
    
    if (memory.recent.length) {
      prompt += `RECENT (${memory.recent.length}):
`;
      prompt += memory.recent.slice(-3).map(s => `• ${s.slice(0, 100)}...`).join('
');
      prompt += '

';
    }
    
    return prompt.slice(0, 2000); // context window limit
  }

  // ====================
  // CAPTURE + STORAGE
  // ====================
  captureHyperOutput(content) {
    if (!this.activeGate || !content?.trim()) return;
    
    const memory = this.memoryStructure[this.activeGate];
    
    // GATE-SPECIFIC STORAGE
    if (!memory.core) memory.core = content;
    else memory.core += '

' + content.slice(-800);
    
    // STRUCTURED CAPTURE
    if (this.activeGate === 'inter') {
      memory.scenes.push({ text: content.slice(-400), moc: this.sessionMoc, time: Date.now() });
    } else if (this.activeGate === 'eter') {
      memory.decisions.push(content.slice(-300));
    } else if (this.activeGate === 'obfi') {
      memory.flows.push({ input: content.slice(-200), moc: this.sessionMoc });
    }
    
    // MOC HISTORY
    memory.mocHistory.push({
      moc: this.sessionMoc,
      snippet: content.slice(-150),
      timestamp: Date.now()
    });
    
    // LIMIT STORAGE
    Object.keys(memory).forEach(key => {
      if (Array.isArray(memory[key])) {
        memory[key] = memory[key].slice(-20); // max 20 entries
      }
    });
    
    this.visualMemoryCapture();
  }

  updateMocMemory(moc) {
    this.sessionMoc = moc;
    
    // MOC-BASED MEMORY PRUNING
    if (moc >= 8 && this.activeGate) {
      this.pruneLowMocMemory();
    }
  }

  pruneLowMocMemory() {
    if (!this.activeGate) return;
    
    const memory = this.memoryStructure[this.activeGate];
    memory.mocHistory = memory.mocHistory.filter(m => m.moc >= 4);
  }

  // ====================
  // PERSISTENCE + SYNC
  // ====================
  flushMemoryToStorage() {
    const fullState = {
      version: this.version,
      activeGate: this.activeGate,
      sessionMoc: this.sessionMoc,
      memory: this.memoryStructure
    };
    
    localStorage.setItem(this.hyperPrefix + 'GLOBAL', JSON.stringify(fullState));
    
    // GATE-SPECIFIC BACKUPS
    Object.entries(this.memoryStructure).forEach(([gate, mem]) => {
      localStorage.setItem(this.hyperPrefix + gate, JSON.stringify(mem));
    });
  }

  loadHyperMemory() {
    // GLOBAL STATE
    const globalState = localStorage.getItem(this.hyperPrefix + 'GLOBAL');
    if (globalState) {
      const state = JSON.parse(globalState);
      this.activeGate = state.activeGate;
      this.sessionMoc = state.sessionMoc;
      Object.assign(this.memoryStructure, state.memory);
    }
    
    // GATE-SPECIFIC
    Object.keys(this.memoryStructure).forEach(gate => {
      const gateMemory = localStorage.getItem(this.hyperPrefix + gate);
      if (gateMemory) {
        Object.assign(this.memoryStructure[gate], JSON.parse(gateMemory));
      }
    });
  }

  harmonizeAllGates() {
    // CROSS-GATE LEARNING
    const allCores = Object.values(this.memoryStructure)
      .map(m => m.core).filter(Boolean);
    
    const sharedWisdom = allCores.join('

').slice(-1000);
    
    Object.values(this.memoryStructure).forEach(memory => {
      memory.sharedWisdom = sharedWisdom;
    });
  }

  // ====================
  // UI INTEGRATION
  // ====================
  updateContextBar() {
    const contextBar = document.getElementById('memory-context') || 
                      this.createContextBar();
    
    contextBar.innerHTML = `
      🧠 <strong>${this.activeGate?.toUpperCase()}</strong> 
      | MOC ${this.sessionMoc} 
      | 📝 ${this.memoryStructure[this.activeGate]?.scenes?.length || 0} scen
    `;
  }

  createContextBar() {
    const bar = document.createElement('div');
    bar.id = 'memory-context';
    bar.className = 'hyper-memory-bar';
    document.querySelector('.hyper-editor-header, header')?.appendChild(bar);
    return bar;
  }

  visualMemoryCapture() {
    // SUBTLE FLASH EFFECT
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed; top: 10px; right: 10px; z-index: 9999;
      background: #00ff8840; color: #00ff88; padding: 8px 16px;
      border-radius: 20px; font-family: monospace; font-size: 12px;
      animation: memoryFlash 0.6s ease-out;
    `;
    flash.textContent = `🧠 MEMORY CAPTURED | ${this.activeGate?.toUpperCase()}`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  }

  // ====================
  // MOC SYNC
  // ====================
  syncMocMemory() {
    const globalMoc = window.EterniverseHyperApp?.mocLevel || 
                     window.BellaHyperSession?.mocLevel || 0;
    
    if (globalMoc !== this.sessionMoc) {
      this.sessionMoc = globalMoc;
      if (this.activeGate) {
        this.injectActiveMemory(); // re-filter by new MOC
      }
    }
  }
}

// 🔥 HYPER MEMORY CSS
const injectMemoryStyles = () => {
  if (document.getElementById('hyper-memory-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'hyper-memory-styles';
  style.textContent = `
    @keyframes memoryFlash {
      0% { opacity: 0; transform: scale(0.5) translateY(-20px); }
      50% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 0; transform: scale(0.8) translateY(20px); }
    }
    
    .hyper-memory-bar {
      background: rgba(0,255,136,0.15); 
      padding: 8px 16px; border-radius: 20px;
      font-family: 'Orbitron', monospace; font-size: 13px;
      border: 1px solid #00ff8840;
      backdrop-filter: blur(10px);
    }
  `;
  document.head.appendChild(style);
};

// 🧠 GLOBAL HYPER MEMORY LAUNCH
document.addEventListener('DOMContentLoaded', () => {
  injectMemoryStyles();
  window.BellaHyperMemory = new BellaHyperMemory();
  
  // LOAD ON START
  window.BellaHyperMemory.loadHyperMemory();
  
  // AUTO-FLUSH EVERY 30s
  setInterval(() => window.BellaHyperMemory.flushMemoryToStorage(), 30000);
});
// ========================================
// ETERNIVERSE CORE 2026 v3.0 MEGA
// World + Brama Registry • AI Context Bridge • Live Sync
// Wzmacniane pod data.js + render.js + editor.js
// ========================================

'use strict';

window.ETERNIVERSE = {
  meta: {
    system: 'ETERNIVERSE',
    version: '3.0',
    architect: 'Maciej Maciuszek | Sosnowiec 2026',
    kanon: true,
    status: 'MEGA ACTIVE',
    lastSync: new Date().toISOString()
  },

  worlds: {},
  bramas: [],
  connections: [],
  sessions: [],

  activeWorld: null,
  activeBrama: null,
  bellaContext: null,

  // =========================
  // 🔥 MEGA INIT z data.js
  // =========================
  init(data = null) {
    // Auto-load z data.js jeśli brak
    if (!data) {
      data = this.loadFromDataJS();
    }

    if (!data.worlds || !data.bramas) {
      console.error('ETERNIVERSE: Brak danych - ładuję z data.js');
      data = this.loadFromDataJS();
    }

    this.worlds = data.worlds.list || data.worlds;
    this.bramas = data.bramas || [];
    this.connections = data.connections || [];
    this.sessions = window.eterniverseData?.sesje || [];

    this.syncWithEditor();
    this.startLiveSync();
    
    console.log('🚀 ETERNIVERSE CORE v3.0 MEGA READY');
    console.table({ 
      worlds: Object.keys(this.worlds).length, 
      bramas: this.bramas.length,
      activeBrama: this.activeBrama?.id 
    });
    
    this.dispatchCoreReady();
  },

  loadFromDataJS() {
    return {
      worlds: window.eterniverseData?.kanon || {},
      bramas: window.eterniverseData?.kanon.bramy || [],
      connections: window.githubData || {}
    };
  },

  // =========================
  // 🌌 ADVANCED WORLD/BRAMA
  // =========================
  selectWorld(worldId) {
    const world = this.worlds[worldId] || this.getWorldById(worldId);
    if (!world) return false;

    this.activeWorld = world;
    this.bellaContext = this.generateAIContext(world);
    
    this.dispatchEvent('worldSelected', { world });
    this.renderWorldPreview(world);
    
    return true;
  },

  selectBrama(bramaId) {
    const brama = this.getBramaById(bramaId) || 
                 window.eterniverseData.kanon.bramas.find(b => b.id === bramaId);
    
    if (!brama) return false;

    this.activeBrama = brama;
    this.bellaContext = this.generateBellaContext(brama);
    
    // Update editor + render
    window.EterniverseEditor?.switchBramaTo(brama.id);
    window.EterniverseRenderer?.renderKanonPreview();
    
    this.dispatchEvent('bramaSelected', { brama });
    console.log('🎯 Brama aktywna:', brama.nazwa || brama.fullName);
    
    return true;
  },

  // =========================
  // 🧠 BELLA AI CONTEXT BRIDGE
  // =========================
  generateBellaContext(brama) {
    const context = {
      system: 'ETERNIVERSE Kanon',
      brama: brama.id || brama.nazwa,
      prompt: `
BRAMA ${brama.id || 'N/A'}: ${brama.nazwa || brama.fullName}

STATUS: ${brama.status}
SCENY: ${brama.sceny || 0} | SŁOWA: ${brama.slowa || 0}

KONTEXT:
${brama.opis || brama.description || 'Brak opisu'}

POSTACIE: ${brama.postacie?.join(', ') || 'N/A'}

PYTANIE DLA BELLA:
Kontynuuj narrację w stylu ${brama.kolor ? this.getMoodByColor(brama.kolor) : 'cyberpunk'}.
Użyj napięcia z poprzedniej bramy. Skup się na ${brama.postacie?.[0] || 'głównej postaci'}.

EMOCJE: napięcie=${this.getTensionLevel(brama.sceny)}, nadzieja=65, chaos=78
      `.trim()
    };

    this.bellaContext = context;
    window.EterniverseEditor?.injectBellaSuggestion(context.prompt);
    
    return context;
  },

  getMoodByColor(color) {
    const moods = {
      '#00ff88': 'nadzieja + technologia',
      '#ffaa00': 'konflikt + chaos', 
      '#00ffff': 'tajemnica + cyberpunk',
      '#ff4444': 'destrukcja + furia',
      '#aa88ff': 'introspekcja + kod'
    };
    return moods[color] || 'cyberpunk narracyjny';
  },

  getTensionLevel(scenes) {
    if (scenes < 5) return 30;
    if (scenes < 15) return 65;
    return 90;
  },

  // =========================
  // 🎨 RENDER INTEGRATION
  // =========================
  renderWorldPreview(world) {
    if (window.EterniverseRenderer) {
      window.EterniverseRenderer.renderKanonPreview();
    }
  },

  syncWithEditor() {
    if (window.EterniverseEditor) {
      window.EterniverseEditor.wordGoal = window.eterniverseData?.cele.dzienne.slowa;
    }
  },

  // =========================
  // 🔄 LIVE SYNC + GITHUB
  // =========================
  startLiveSync() {
    // Sync z data.js co 10s
    setInterval(() => {
      this.refreshFromDataJS();
    }, 10000);
    
    // GitHub status
    setInterval(() => {
      this.checkGitHubStatus();
    }, 60000);
  },

  refreshFromDataJS() {
    if (window.eterniverseData) {
      this.bramas = window.eterniverseData.kanon.bramy;
      this.sessions = window.eterniverseData.sesje;
      this.dispatchEvent('dataRefreshed');
    }
  },

  checkGitHubStatus() {
    // Mock - zastąp real API
    this.meta.lastSync = new Date().toISOString();
    console.log('🔄 GitHub sync:', window.githubData?.lastCommit);
  },

  // =========================
  // 📡 EVENTS SYSTEM
  // =========================
  dispatchEvent(eventName, detail = {}) {
    document.dispatchEvent(new CustomEvent(eventName, { detail }));
  },

  dispatchCoreReady() {
    document.dispatchEvent(new CustomEvent('eterniverseReady', { 
      detail: this.meta 
    }));
  },

  // =========================
  // 🔍 HELPERS + QUERIES
  // =========================
  getBramaById(id) {
    return this.bramas.find(b => b.id == id || b.nazwa?.includes(id));
  },

  getWorldById(id) {
    return this.worlds[id];
  },

  getActiveSession() {
    return window.EterniverseApp?.sessionActive;
  },

  // =========================
  // 💾 SESSION BRIDGE
  // =========================
  saveSessionToCore(session) {
    this.sessions.unshift(session);
    window.eterniverseData.sesje = this.sessions;
  }
};

// =========================
// 🚀 AUTO MEGA INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  // Czekaj na data.js
  const initCore = () => {
    if (window.eterniverseData || window.__ETERNIVERSE_BRAMAS__) {
      ETERNIVERSE.init();
      
      // Auto-select ostatnią aktywną bramę
      const lastBrama = localStorage.getItem('activeBrama');
      if (lastBrama) {
        ETERNIVERSE.selectBrama(parseInt(lastBrama));
      } else {
        ETERNIVERSE.selectBrama(1); // Brama Alfa domyślnie
      }
    } else {
      setTimeout(initCore, 100);
    }
  };
  
  initCore();
});

// =========================
// 🌉 GLOBAL EXPORTS
// =========================
window.getBellaContext = () => ETERNIVERSE.bellaContext;
window.selectETERNIVERSEBrama = (id) => ETERNIVERSE.selectBrama(id);

console.log('🌌 ETERNIVERSE CORE v3.0 - Ładowanie...');
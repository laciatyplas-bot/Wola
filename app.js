// ======================================================
// ETERNIVERSE BOOK MASTER v3.1
// HYPER-CONTROL ORCHESTRATOR
// ABSOLUTNA DOMINACJA | Maciej Maciuszek | 2026
// ======================================================

(function(global) {
  'use strict';

  class HyperControl {
    constructor() {
      this.version = '3.1.0';
      this.isInitialized = false;
      this.godMode = false;
      
      // CORE STATE - PEŁNA KONTROLA
      this.state = {
        worlds: [], bramy: [], projects: [], chapters: [],
        active: { world: 1, brama: 1, project: null, chapter: 1 },
        editor: { content: '', selection: null, cursor: 0 },
        ui: { activeTab: 'book', loading: false },
        bella: { synced: false, commands: [] },
        plugins: new Map(),
        ai: { model: 'gemini-2.0-flash', context: {} }
      };
      
      // DOM REFERENCES - NATYCHMIASTOWA KONTROLA
      this.elements = {};
      this.init();
    }

    // ================================
    // 🔥 INICJALIZACJA ABSOLUTNA
    // ================================
    async init() {
      if (this.isInitialized) return;
      
      console.log('🔥 HYPER-CONTROL v3.1 INITIATING...');
      
      // 1. DOM MASTERY
      this.captureDOM();
      
      // 2. STORAGE DOMINATION
      await this.conquerStorage();
      
      // 3. DATA EMPIRE
      await this.buildEmpire();
      
      // 4. UI SUPREMACY
      this.enslaveUI();
      
      // 5. PLUGIN LEGION
      await this.summonLegion();
      
      // 6. BELLA PACT
      this.forgeBellaPact();
      
      // 7. PWA EMPIRE
      this.claimPWA();
      
      // 8. EVENT EMPIRE
      this.ruleEvents();
      
      this.isInitialized = true;
      this.broadcast('SYSTEM_READY');
      console.log('👑 ETERNIVERSE v3.1 - FULL CONTROL ACHIEVED');
    }

    // ================================
    // 🕷️ DOM CAPTURE
    // ================================
    captureDOM() {
      const selectors = {
        header: '#header-grid, .header-grid',
        worldSelector: '#worldSelector, .world-selector',
        tabNav: '#mainTabNav, .tab-nav',
        sidebar: '#mainSidebar, .sidebar',
        content: '#dynamicContent, .content-area',
        status: '#status, .status',
        loading: '#loadingOverlay',
        bellaFrame: '#bellaFrame'
      };
      
      Object.entries(selectors).forEach(([key, sel]) => {
        this.elements[key] = document.querySelector(sel);
      });
    }

    // ================================
    // 💾 STORAGE CONQUEST
    // ================================
    async conquerStorage() {
      this.storage = {
        local: window.localStorage,
        session: window.sessionStorage,
        indexed: await this.initIndexedDB()
      };
      
      // Migrate legacy data
      this.migrateLegacy();
      
      // Load empire
      Object.assign(this.state, await this.storage.indexed.get('hyper_state') || {});
    }

    async initIndexedDB() {
      return new Promise((resolve) => {
        const req = indexedDB.open('EterniverseHyper', 3);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          ['state','worlds','bramy','projects','chapters','ai_history'].forEach(store => {
            if (!db.objectStoreNames.contains(store)) {
              db.createObjectStore(store, { keyPath: 'id' });
            }
          });
        };
        req.onsuccess = () => resolve(new HyperStorage(req.result));
      });
    }

    // ================================
    // 🏛️ EMPIRE BUILDING
    // ================================
    async buildEmpire() {
      // Generate worlds/bramy if empty
      if (!this.state.worlds.length) {
        this.state.worlds = this.forgeWorlds();
        this.state.bramy = this.forgeBramy();
      }
      
      // Active defaults
      if (!this.state.active.project) {
        this.state.active.project = await this.forgeProject('Hyper Projekt Alpha');
      }
      
      await this.saveState();
    }

    forgeWorlds() {
      return [
        {id:1,name:'INTER',emoji:'🌀',color:'#8b5cf6'},
        {id:2,name:'ETER',emoji:'🌌',color:'#06b6d4'},
        {id:3,name:'OBFI',emoji:'🔮',color:'#ec4899'},
        {id:4,name:'CHAOS',emoji:'💥',color:'#f59e0b'},
        {id:5,name:'NEURAL',emoji:'⚡',color:'#10b981'},
        {id:6,name:'AQUA',emoji:'🌊',color:'#3b82f6'},
        {id:7,name:'IGNIS',emoji:'🔥',color:'#ef4444'},
        {id:8,name:'LUNAR',emoji:'🌙',color:'#a855f7'}
      ];
    }

    forgeBramy() {
      return Array.from({length:12}, (_,i) => ({
        id: i+1,
        name: ['VOID','NEXUS','PHANTOM','AETHER','CRONOS','QUANTUM','SHADOW','PRISM','HELIX','VECTOR','OMEGA','INFINI'][i] || `Brama ${i+1}`,
        emoji: '🚪',
        color: '#64748b'
      }));
    }

    async forgeProject(name) {
      const project = {
        id: `proj_${Date.now()}`,
        name,
        created: new Date().toISOString(),
        worlds: [...this.state.worlds],
        stats: { words: 0, chapters: 0 }
      };
      
      this.state.projects.push(project);
      this.state.active.project = project;
      await this.saveState();
      return project;
    }

    // ================================
    // 🎨 UI ENSLAVEMENT
    // ================================
    enslaveUI() {
      // World selector
      this.renderWorlds();
      
      // Bramy sidebar  
      this.renderBramy();
      
      // Tabs
      this.renderTabs();
      
      // Title
      this.updateTitle();
      
      // Status
      this.elements.status.textContent = `v${this.version} | ${this.state.active.project.name}`;
    }

    renderWorlds() {
      if (!this.elements.worldSelector) return;
      this.elements.worldSelector.innerHTML = this.state.worlds.map(w => `
        <button class="world-btn ${w.id === this.state.active.world ? 'active' : ''}" 
                data-world="${w.id}" style="--world-color:${w.color}">
          ${w.emoji} ${w.name}
        </button>
      `).join('');
    }

    renderBramy() {
      const gateList = this.elements.sidebar?.querySelector('#gateList');
      if (!gateList) return;
      
      gateList.innerHTML = this.state.bramy.map(b => `
        <div class="world-item ${b.id === this.state.active.brama ? 'active' : ''}" 
             data-brama="${b.id}" style="--brama-color:${b.color}">
          ${b.emoji} ${b.name}
        </div>
      `).join('');
    }

    renderTabs() {
      if (!this.elements.tabNav) return;
      this.elements.tabNav.innerHTML = `
        <button class="tab-btn active" data-tab="book">📖 Książka</button>
        <button class="tab-btn" data-tab="cover">🖼 Okładka</button>
        <button class="tab-btn" data-tab="audio">🎧 Audio</button>
        <button class="tab-btn" data-tab="bella">🧠 Bella</button>
        <button class="tab-btn" data-tab="ai">🤖 AI</button>
        <button class="tab-btn" data-tab="projects">📁 Projekty</button>
      `;
    }

    updateTitle() {
      const titleEl = document.getElementById('bookTitle');
      if (titleEl) {
        const world = this.state.worlds.find(w => w.id === this.state.active.world);
        const brama = this.state.bramy.find(b => b.id === this.state.active.brama);
        titleEl.textContent = `${world?.name || '?'} | ${brama?.name || '?'}`;
      }
    }

    // ================================
    // 🧠 PLUGIN LEGION
    // ================================
    async summonLegion() {
      const legion = [
        {id:'book', module:'./plugins/bookEditor.js'},
        {id:'cover', module:'./plugins/coverGenerator.js'},
        {id:'audio', module:'./plugins/audioTts.js'},
        {id:'ai', module:'./plugins/aiConsole.js'}
      ];
      
      for (const {id, module} of legion) {
        try {
          const { default: Plugin } = await import(module);
          this.plugins.set(id, new Plugin(this));
          await this.plugins.get(id).init?.();
        } catch(e) {
          console.warn(`⚠️ Plugin ${id} offline:`, e.message);
        }
      }
    }

    // ================================
    // 🤝 BELLA PACT
    // ================================
    forgeBellaPact() {
      // Listen for Bella commands
      window.addEventListener('message', (e) => {
        if (e.data.type === 'BELLA_COMMAND') {
          this.executeBellaCommand(e.data);
        }
      });
      
      // Periodic sync
      setInterval(() => this.syncBella(), 1000);
    }

    syncBella() {
      const bella = this.elements.bellaFrame?.contentWindow;
      if (bella) {
        bella.postMessage({
          type: 'ETERNIVERSE_STATE',
          data: {
            active: this.state.active,
            editor: this.state.editor,
            timestamp: Date.now()
          }
        }, '*');
      }
    }

    async executeBellaCommand({command, data}) {
      console.log('🧠 BELLA EXEC:', command, data);
      
      const commands = {
        'SET_BRAMA': () => this.setBrama(data.bramaId),
        'SET_WORLD': () => this.setWorld(data.worldId),
        'AI_BURST': async () => {
          const plugin = this.plugins.get('ai');
          if (plugin?.burst) await plugin.burst(data.type);
        },
        'GOD_MODE': (enabled) => {
          this.godMode = enabled;
          document.documentElement.style.setProperty('--god-mode', enabled ? '1' : '0');
        },
        'INSERT_TEXT': async () => {
          const bookPlugin = this.plugins.get('book');
          if (bookPlugin?.insertText) await bookPlugin.insertText(data.text);
        }
      };
      
      commands[command]?.(data);
    }

    // ================================
    // 👑 ABSOLUTE CONTROL COMMANDS
    // ================================
    setWorld(id) {
      this.state.active.world = id;
      this.renderWorlds();
      this.updateTitle();
      this.saveState();
      this.broadcast('WORLD_CHANGED', id);
    }

    setBrama(id) {
      this.state.active.brama = id;
      this.renderBramy();
      this.updateTitle();
      this.saveState();
      this.broadcast('BRAMA_CHANGED', id);
    }

    async newChapter(name = 'Nowy Rozdział') {
      const chapter = {
        id: `ch_${Date.now()}`,
        name,
        content: '',
        wordCount: 0,
        created: new Date().toISOString()
      };
      
      this.state.chapters.push(chapter);
      this.state.active.chapter = chapter.id;
      await this.saveState();
      this.broadcast('CHAPTER_CREATED', chapter);
    }

    // ================================
    // 🌐 EVENT BROADCAST
    // ================================
    broadcast(event, data) {
      const eventObj = new CustomEvent(`eterniverse:${event}`, { detail: data });
      document.dispatchEvent(eventObj);
      
      // Notify plugins
      this.plugins.forEach(plugin => plugin[event]?.(data));
    }

    // ================================
    // 🛡️ EVENT RULE
    // ================================
    ruleEvents() {
      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-control]');
        if (!target) return;
        
        const [action, param] = target.dataset.control.split(':');
        this.executeControl(action, param);
      });
      
      // Keyboard mastery
      document.addEventListener('keydown', (e) => {
        if (!e.ctrlKey && !e.metaKey) return;
        
        const shortcuts = {
          's': () => this.saveState(),
          'e': () => this.exportAll(),
          'n': () => this.newChapter(),
          'g': () => this.toggleGodMode(),
          'b': () => this.cycleBrama()
        };
        
        shortcuts[e.key.toLowerCase()]?.();
        e.preventDefault();
      });
    }

    executeControl(action, param) {
      const controls = {
        'set-world': (id) => this.setWorld(parseInt(id)),
        'set-brama': (id) => this.setBrama(parseInt(id)),
        'switch-tab': (tab) => this.switchTab(tab),
        'new-chapter': () => this.newChapter(),
        'export': () => this.exportAll()
      };
      
      controls[action]?.(param);
    }

    switchTab(tabId) {
      this.state.ui.activeTab = tabId;
      
      // UI update
      document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
        el.classList.toggle('active', el.dataset.tab === tabId);
      });
      
      // Plugin activation
      const plugin = this.plugins.get(tabId);
      plugin?.activate?.();
      
      this.broadcast('TAB_SWITCHED', tabId);
    }

    cycleBrama() {
      const next = (this.state.active.brama % this.state.bramy.length) + 1;
      this.setBrama(next);
    }

    toggleGodMode() {
      this.godMode = !this.godMode;
      document.documentElement.toggleAttribute('god-mode', this.godMode);
      this.broadcast('GOD_MODE', this.godMode);
    }

    // ================================
    // 💾 STATE SUPREMACY
    // ================================
    async saveState() {
      await this.storage.indexed.set('hyper_state', this.state);
      this.elements.status.textContent = `Zapisano | ${this.state.active.project.name}`;
      
      // Quick fade status
      setTimeout(() => {
        this.elements.status.textContent = `v${this.version}`;
      }, 1500);
    }

    async exportAll() {
      const empire = {
        version: this.version,
        timestamp: new Date().toISOString(),
        ...this.state
      };
      
      const blob = new Blob([JSON.stringify(empire, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `eterniverse_${this.state.active.project.name}_${Date.now()}.hyper.json`;
      a.click();
      
      URL.revokeObjectURL(url);
    }

    // ================================
    // 🌐 PWA CLAIM
    // ================================
    claimPWA() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(reg => {
          console.log('🏰 PWA territory claimed');
        });
      }
    }

    // ================================
    // 🧹 UTILITY
    // ================================
    showLoading(text = 'Ładowanie...') {
      if (this.elements.loading) {
        this.elements.loading.style.opacity = '1';
        this.elements.loading.innerHTML = `<div>${text}</div>`;
      }
    }

    hideLoading() {
      if (this.elements.loading) {
        this.elements.loading.style.opacity = '0';
      }
    }

    migrateLegacy() {
      // Legacy localStorage migration
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('eterniverse_')) {
          this.storage.indexed.set(key, localStorage.getItem(key));
          localStorage.removeItem(key);
        }
      }
    }
  }

  // ================================
  // 🗄️ HYPER STORAGE WRAPPER
  // ================================
  class HyperStorage {
    constructor(db) {
      this.db = db;
    }
    
    async get(key) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(key, 'readonly');
        const store = tx.objectStore(key);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result);
      });
    }
    
    async set(key, value) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(key, 'readwrite');
        const store = tx.objectStore(key);
        const req = store.put({id: key, value});
        req.onsuccess = resolve;
      });
    }
  }

  // ================================
  // 🌍 GLOBAL EXPOSE
  // ================================
  let Eterniverse;

  document.addEventListener('DOMContentLoaded', () => {
    Eterniverse = new HyperControl();
    global.Eterniverse = Eterniverse;
    global.EterAPI = {
      setBrama: (id) => Eterniverse.setBrama(id),
      setWorld: (id) => Eterniverse.setWorld(id),
      godMode: () => Eterniverse.toggleGodMode(),
      newChapter: () => Eterniverse.newChapter(),
      broadcast: (event, data) => Eterniverse.broadcast(event, data)
    };
  });

})(window);
// ======================================================
// ETERNIVERSE BOOK MASTER v3.2
// PEŁNY CSR ROUTER INTEGRATED
// SPA BEZ FRAMEWORKÓW | Maciej Maciuszek | 2026
// ======================================================

(function(global) {
  'use strict';

  class EterniverseSPA {
    constructor() {
      this.version = '3.2.0';
      this.router = null;
      this.plugins = new Map();
      this.state = {
        route: { path: '/', params: {} },
        active: { world: 1, brama: 1, project: null, tab: 'book' },
        data: { worlds: [], bramy: [], projects: [], chapters: [] }
      };
      
      this.init();
    }

    // ================================
    // 🔥 FULL SPA INIT
    // ================================
    async init() {
      console.log('🌌 ETERNIVERSE SPA v3.2 - CSR ROUTING ONLINE');
      
      // 1. DOM + Storage
      await Promise.all([this.captureDOM(), this.initStorage()]);
      
      // 2. Data Empire
      await this.loadData();
      
      // 3. SPA Router (KLUCZOWE!)
      this.initRouter();
      
      // 4. UI + Plugins
      this.renderApp();
      await this.loadPlugins();
      
      // 5. Event Empire
      this.bindEvents();
      
      // 6. PWA + Bella
      this.initPWA();
      this.initBellaSync();
      
      console.log('👑 FULL SPA CONTROL ACHIEVED');
    }

    // ================================
    // 🕷️ DOM CAPTURE
    // ================================
    captureDOM() {
      this.elements = {
        app: document.getElementById('app') || document.body,
        header: '.header-grid',
        sidebar: '.sidebar',
        content: '#dynamicContent, .content-area',
        tabs: '.tab-nav'
      };
      
      // Route indicators
      document.body.setAttribute('data-route', '/');
    }

    // ================================
    // 🌐 CSR ROUTER CORE
    // ================================
    initRouter() {
      this.router = new SPARouter(this);
      this.router.start();
      
      // Initial route
      this.router.navigate(window.location.pathname);
    }

    // ================================
    // 🏗️ RENDER ENGINE
    // ================================
    renderApp() {
      this.renderHeader();
      this.renderSidebar();
      this.renderTabs();
      this.router.renderCurrentRoute();
    }

    renderHeader() {
      const header = document.querySelector(this.elements.header);
      if (header) {
        header.innerHTML = `
          <div class="logo-section">
            <div class="logo">ETERNIVERSE</div>
            <div class="route-info">
              <span data-route-path></span> | 
              <span data-world-name></span> | 
              <span data-brama-name></span>
            </div>
          </div>
          <div class="header-actions">
            <a href="/" class="action-btn" title="Home">🏠</a>
            <a href="/book" class="action-btn" title="Book">📖</a>
            <a href="/bella" class="action-btn" title="Bella">🧠</a>
            <button class="action-btn god-toggle" title="God Mode">🦾</button>
            <span class="status">SPA v${this.version}</span>
          </div>
        `;
      }
    }

    renderSidebar() {
      const sidebar = document.querySelector(this.elements.sidebar);
      if (sidebar) {
        sidebar.innerHTML = `
          <div class="sidebar-section">
            <h3>🚪 Bramy</h3>
            <div class="bramy-list">${this.renderBramy()}</div>
          </div>
          <div class="sidebar-section">
            <h3>🌌 Światy</h3>
            <div class="worlds-list">${this.renderWorlds()}</div>
          </div>
          <div class="sidebar-section">
            <h3>📁 Projekty</h3>
            <div class="projects-list">${this.renderProjects()}</div>
          </div>
        `;
      }
    }

    renderTabs() {
      const tabs = document.querySelector(this.elements.tabs);
      if (tabs) {
        tabs.innerHTML = `
          <a href="/" class="tab-btn active" data-tab="home">🏠</a>
          <a href="/book" class="tab-btn" data-tab="book">📖 Książka</a>
          <a href="/cover" class="tab-btn" data-tab="cover">🖼 Okładka</a>
          <a href="/audio" class="tab-btn" data-tab="audio">🎧 Audio</a>
          <a href="/bella" class="tab-btn" data-tab="bella">🧠 Bella</a>
          <a href="/ai" class="tab-btn" data-tab="ai">🤖 AI</a>
          <a href="/projects" class="tab-btn" data-tab="projects">📁 Projekty</a>
        `;
      }
    }

    renderWorlds() {
      return this.state.data.worlds.map(w => 
        `<a href="/world/${w.id}" class="world-item" data-world="${w.id}">
           ${w.emoji} ${w.name}
         </a>`
      ).join('');
    }

    renderBramy() {
      return this.state.data.bramy.map(b => 
        `<a href="/brama/${b.id}" class="world-item brama-item" data-brama="${b.id}">
           ${b.emoji} ${b.name}
         </a>`
      ).join('');
    }

    renderProjects() {
      return this.state.data.projects.map(p => 
        `<a href="/project/${p.id}" class="project-item">
           📖 ${p.name} (${p.stats?.words || 0} słów)
         </a>`
      ).join('');
    }

    // ================================
    // 🔌 PLUGIN SYSTEM
    // ================================
    async loadPlugins() {
      const plugins = {
        book: await import('./plugins/bookEditor.js'),
        cover: await import('./plugins/coverGenerator.js'),
        ai: await import('./plugins/aiConsole.js')
      };
      
      Object.entries(plugins).forEach(([id, mod]) => {
        this.plugins.set(id, new mod.default(this));
      });
    }

    // ================================
    // 🎛️ EVENT BINDINGS
    // ================================
    bindEvents() {
      // Global click handler (SPA links)
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (link && link.href.startsWith(window.location.origin)) {
          e.preventDefault();
          const path = new URL(link.href).pathname;
          this.router.navigate(path);
        }
      });
      
      // Keyboard SPA
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
          const nav = {
            '1': '/', '2': '/book', '3': '/bella', '4': '/projects'
          }[e.key];
          if (nav) {
            e.preventDefault();
            this.router.navigate(nav);
          }
        }
      });
    }

    // ================================
    // 🧠 BELLA SPA SYNC
    // ================================
    initBellaSync() {
      window.addEventListener('message', (e) => {
        if (e.data.type === 'BELLA_COMMAND') {
          const cmd = e.data.command;
          switch(cmd) {
            case 'SET_BRAMA':
              this.router.navigate(`/brama/${e.data.data.bramaId}`);
              break;
            case 'SWITCH_TAB':
              this.router.navigate(`/${e.data.data.tab}`);
              break;
          }
        }
      });
    }

    // ================================
    // 💾 STORAGE + PWA
    // ================================
    async initStorage() {
      // Mock data dla demo
      this.state.data.worlds = [
        {id:1,name:'INTER',emoji:'🌀'},
        {id:2,name:'ETER',emoji:'🌌'},
        {id:3,name:'OBFI',emoji:'🔮'}
      ];
      this.state.data.bramy = [
        {id:1,name:'VOID',emoji:'🚪'},
        {id:2,name:'NEXUS',emoji:'🔗'}
      ];
    }

    initPWA() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
      }
    }
  }

  // ================================
  // 🌐 SPA ROUTER CLASS
  // ================================
  class SPARouter {
    constructor(app) {
      this.app = app;
      this.routes = new Map();
    }
    
    start() {
      this.defineRoutes();
      window.addEventListener('popstate', () => this.navigate());
      this.navigate(); // Initial
    }
    
    defineRoutes() {
      this.routes.set('/', { component: 'home', title: 'Home' });
      this.routes.set('/book', { component: 'book', title: 'Książka', action: () => this.app.plugins.get('book')?.activate() });
      this.routes.set('/cover', { component: 'cover', title: 'Okładka' });
      this.routes.set('/audio', { component: 'audio', title: 'Audio' });
      this.routes.set('/bella', { component: 'bella', title: 'Bella AI', action: () => document.querySelector('#bellaFrame')?.scrollIntoView() });
      this.routes.set('/ai', { component: 'ai', title: 'AI Console' });
      this.routes.set('/projects', { component: 'projects', title: 'Projekty' });
      
      // Dynamic
      this.routes.set(//world/(d+)/, { component: 'world', params: ['worldId'], action: (id) => this.app.setWorld(parseInt(id)) });
      this.routes.set(//brama/(d+)/, { component: 'brama', params: ['bramaId'], action: (id) => this.app.setBrama(parseInt(id)) });
      this.routes.set(//project/([a-z0-9]+)/, { component: 'project', params: ['projectId'] });
    }
    
    navigate(path = window.location.pathname) {
      const cleanPath = path === '/' || path === '' ? '/' : path.slice(1);
      
      let route = this.routes.get(cleanPath);
      let params = {};
      
      if (!route) {
        // Dynamic match
        for (let [pattern, r] of this.routes) {
          if (pattern instanceof RegExp) {
            const match = cleanPath.match(pattern);
            if (match) {
              route = r;
              params = Object.fromEntries(
                r.params.map((name, i) => [name, match[i+1]])
              );
              break;
            }
          }
        }
      }
      
      if (!route) {
        route = { component: '404', title: 'Not Found' };
      }
      
      // Update history
      window.history.pushState({ path: cleanPath }, '', path);
      
      // Render
      this.renderRoute(route, params);
    }
    
    renderRoute(route, params) {
      this.app.state.route = { path: route.component, params };
      
      // Update UI
      document.body.setAttribute('data-route', route.component);
      document.title = `ETERNIVERSE | ${route.title}`;
      document.querySelector('[data-route-path]')?.textContent = route.component;
      
      // Content
      const content = document.querySelector(this.app.elements.content);
      content.innerHTML = this.getRouteContent(route.component);
      
      // Route action
      route.action?.(params);
      
      console.log(`🌐 Navigated: /${route.component}`, params);
    }
    
    getRouteContent(component) {
      const templates = {
        home: '<h1>🏠 Witaj w ETERNIVERSE SPA</h1><p>Klikaj linki - zero reloads!</p>',
        book: '<div id="bookTab">📖 BOOK EDITOR ŁADUJE SIĘ...</div>',
        cover: '<canvas class="cover-canvas" id="coverCanvas"></canvas>',
        bella: '<iframe id="bellaFrame" src="./bella-assistant.html"></iframe>',
        '404': '<h1>🚫 404 - Brama zamknięta</h1>'
      };
      return templates[component] || '<h1>Ładowanie...</h1>';
    }
  }

  // ================================
  // 🧠 CONTROL METHODS
  // ================================
  EterniverseSPA.prototype.setWorld = function(id) {
    this.state.active.world = id;
    this.renderSidebar();
  };
  
  EterniverseSPA.prototype.setBrama = function(id) {
    this.state.active.brama = id;
    this.renderSidebar();
    this.router.navigate(`/brama/${id}`);
  };

  // ================================
  // GLOBAL EXPOSE
  // ================================
  document.addEventListener('DOMContentLoaded', () => {
    window.Eterniverse = new EterniverseSPA();
    
    // API
    window.EterAPI = {
      go: (path) => window.Eterniverse.router.navigate(path),
      brama: (id) => window.Eterniverse.setBrama(id),
      world: (id) => window.Eterniverse.setWorld(id)
    };
  });

})(window);
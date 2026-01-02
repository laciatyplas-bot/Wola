/**
 * ETERNIVERSE - HYPERDRIVE APP.JS v3.0 ⚡
 * FULL INTEGRATION: BellaHyper + EterSession + Core
 * Landing + Editor + AI Core | 2026 | Sosnowiec
 * MOC 100% — UNIFIED WRITING MACHINE
 */

class EterniverseHyperApp {
  constructor() {
    this.version = '3.0-HYPER';
    this.isMobile = window.innerWidth <= 768;
    this.mocLevel = 0;
    this.hyperSync = true;
    
    // FULL MODULE INTEGRATION
    this.modules = {
      bella: null,
      session: window.EterSession,
      hyper: window.BellaHyperSession
    };
    
    this.shortcuts = {
      godmode: 'Ctrl+Shift+X',
      aiburst: 'Ctrl+Shift+A',
      hypersprint: 'Ctrl+Shift+S',
      bramy: 'Ctrl+B',
      session: 'Ctrl+Shift+W'
    };
    
    this.initHyperdrive();
  }

  // 🚀 HYPERDRIVE INIT — MOC MAX
  initHyperdrive() {
    console.log('🌌⚡ ETERNIVERSE v3.0 HYPERDRIVE — FULLY ARMED');
    
    this.autoLoadModules();
    this.enhanceHyperNavigation();
    this.setupHyperShortcuts();
    this.initHyperReveal();
    this.startHyperSync();
    this.hyperHeartbeat();
    
    // MOBILE HYPER MODE
    window.addEventListener('resize', () => this.checkMobileHyper());
  }

  // 🔌 AUTO MODULE LOADING & SYNC
  autoLoadModules() {
    // Bella Hyper Session
    if (!window.BellaHyperSession && !this.modules.bella) {
      const script = document.createElement('script');
      script.src = 'bella-hyper-session.js'; // lub inline load
      document.head.appendChild(script);
      this.modules.bella = true;
    }
    
    // Eter Session sync
    if (this.modules.session) {
      console.log('✅ EterSession SYNCHRONIZED');
    }
    
    // Hyper monitoring
    this.hyperMonitor = setInterval(() => this.syncAllModules(), 5000);
  }

  // 🌟 HYPER NAVIGATION — ALL MODES
  enhanceHyperNavigation() {
    const buttons = document.querySelectorAll('nav button, .mode-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.hyperButtonEffect(btn);
        
        const target = btn.dataset.mode || btn.textContent.toLowerCase();
        this.launchHyperMode(target);
      });
    });
  }

  hyperButtonEffect(btn) {
    btn.style.transform = 'scale(1.1) rotate(5deg)';
    btn.style.boxShadow = '0 0 30px #00ffdd';
    setTimeout(() => {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    }, 200);
  }

  launchHyperMode(mode) {
    const hyperTargets = {
      'writing': () => {
        this.activateWritingHyper();
        window.location.hash = 'writing';
      },
      'bella': () => {
        this.launchBellaHyper();
        window.location.href = 'bella-assistant.html#hyper';
      },
      'session': () => {
        this.toggleHyperSession();
      },
      'bramy': () => {
        window.location.hash = 'bramy';
        this.bramyHyperEffect();
      },
      'god': () => {
        if (window.BellaHyperSession) {
          window.BellaHyperSession.activateGodMode();
        }
      }
    };
    
    hyperTargets[mode]?.();
  }

  // 🦾 HYPER SESSION — UNIFIED CONTROL
  toggleHyperSession() {
    if (this.modules.session?.sessionActive) {
      this.modules.session.clearSession();
    } else {
      if (this.modules.session) {
        this.modules.session.newChapter(1);
      }
      this.startUnifiedSession();
    }
  }

  startUnifiedSession() {
    this.sessionActive = true;
    this.mocLevel = 5;
    
    // MULTI-MODULE SYNC
    if (this.modules.session) this.modules.session.startWritingSession?.();
    if (window.BellaHyperSession) window.BellaHyperSession.enter?.();
    
    this.updateHyperStatus('HYPER SESJA AKTYWNA ⚡');
    this.hyperSyncLoop();
  }

  // ⌨️ HYPER SHORTCUTS — GLOBAL MASTERY
  setupHyperShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName.match(/INPUT|TEXTAREA/)) return;
      
      // HYPER COMBOS
      if (e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        const key = e.key.toLowerCase();
        
        switch(key) {
          case 'x': this.globalGodMode(); break;
          case 'a': this.globalAIBurst(); break;
          case 's': this.globalHyperSprint(); break;
          case 'w': this.toggleHyperSession(); break;
        }
      }
      
      // BRAMY FAST ACCESS
      if (e.ctrlKey && e.key.toLowerCase() === 'b') {
        this.cycleBramy();
      }
  }
  }

  // 🌌 GLOBAL GOD MODE — CROSS-MODULE
  globalGodMode() {
    this.mocLevel = 10;
    document.body.classList.add('hyperdrive-active', 'god-mode');
    
    // ALL MODULES GOD MODE
    if (window.BellaHyperSession) window.BellaHyperSession.activateGodMode();
    if (this.modules.session) this.modules.session.godMode?.();
    
    this.fullscreenHyper();
    this.disableDistractions();
    console.log('🦾 GLOBAL GOD MODE — MOC 10/10!');
  }

  globalAIBurst() {
    // ETERNIVERSE AI EXPAND
    if (window.expandScene) {
      window.expandScene();
    }
    
    // RANDOM BRAMA BOOST
    const gates = document.getElementById('gate');
    if (gates) {
      const options = Array.from(gates.options);
      const random = options[Math.floor(Math.random() * options.length)];
      gates.value = random.value;
    }
  }

  globalHyperSprint() {
    if (window.BellaHyperSession) {
      window.BellaHyperSession.hyperSprint();
    }
    this.visualSprintBoost();
  }

  // 📱 MOBILE HYPER ADAPT
  checkMobileHyper() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      document.body.classList.add('mobile-hyper');
      this.injectMobileControls();
    }
  }

  injectMobileControls() {
    if (!document.getElementById('mobile-hyper-bar')) {
      const bar = document.createElement('div');
      bar.id = 'mobile-hyper-bar';
      bar.innerHTML = `
        <button onclick="window.EterniverseHyperApp.globalGodMode()">🦾</button>
        <button onclick="window.EterniverseHyperApp.globalAIBurst()">🤖</button>
        <button onclick="window.EterniverseHyperApp.globalHyperSprint()">⚡</button>
      `;
      document.body.appendChild(bar);
    }
  }

  // 🎥 HYPER VISUALS & ANIMATIONS
  initHyperReveal() {
    const hyperObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.classList.add('hyper-revealed');
        }
      });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('section, .hero, header').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px) scale(0.95)';
      el.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
      hyperObserver.observe(el);
    });
  }

  // 🔄 HYPER SYNC ENGINE
  startHyperSync() {
    this.syncInterval = setInterval(() => {
      this.syncAllModules();
      this.updateHyperStatus();
    }, 2000);
  }

  syncAllModules() {
    // Session sync
    if (this.modules.session) {
      this.wordCount = this.modules.session.stats?.words || 0;
      this.sessionTime = this.modules.session.stats?.time || 0;
    }
    
    // Hyper stats
    if (window.BellaHyperSession) {
      this.mocLevel = window.BellaHyperSession.mocLevel || 0;
    }
  }

  // ❤️ HYPER HEARTBEAT — PERFORMANCE + STATS
  hyperHeartbeat() {
    setInterval(() => {
      const mem = performance.memory || {};
      const stats = {
        moc: this.mocLevel,
        words: this.wordCount,
        time: this.formatHyperTime(this.sessionTime),
        modules: Object.keys(this.modules).filter(k => this.modules[k]).length,
        mobile: this.isMobile
      };
      
      console.log(`💓 HYPERBEAT | ${JSON.stringify(stats)} | RAM: ${(mem.usedJSHeapSize/1048576).toFixed(1)}MB`);
    }, 15000);
  }

  // 🛡️ UTILITY FUNCTIONS
  updateHyperStatus(msg = '') {
    const statusEl = document.querySelector('.status, section p, #status');
    if (statusEl) {
      statusEl.innerHTML = `⚡ HYPER v3.0 | MOC ${this.mocLevel}/10 | ${msg} | ${this.wordCount} słów`;
      statusEl.style.color = `hsl(${this.mocLevel * 36}, 100%, 50%)`;
    }
  }

  formatHyperTime(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    return h ? `${h}:${m.toString().padStart(2,'0')}:${ss.toString().padStart(2,'0')}` : `${m}:${ss.toString().padStart(2,'0')}`;
  }

  fullscreenHyper() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  disableDistractions() {
    document.querySelectorAll('a[href]:not([href="#"]), button:not(.hyper-btn), [onclick]').forEach(el => {
      el.style.pointerEvents = 'none';
      el.style.opacity = '0.1';
    });
  }

  cycleBramy() {
    const gate = document.getElementById('gate');
    if (gate) {
      const idx = (parseInt(gate.selectedIndex) + 1) % gate.options.length;
      gate.selectedIndex = idx;
      gate.dispatchEvent(new Event('change'));
    }
  }

  visualSprintBoost() {
    const boost = document.createElement('div');
    boost.innerHTML = '⚡ BOOST!';
    Object.assign(boost.style, {
      position: 'fixed',
      top: '40vh',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '48px',
      fontWeight: '900',
      color: '#ffaa00',
      zIndex: '999999',
      pointerEvents: 'none',
      animation: 'sprintPulse 1.5s ease-out forwards'
    });
    document.body.appendChild(boost);
    setTimeout(() => boost.remove(), 1500);
  }

  bramyHyperEffect() {
    document.body.style.setProperty('--brama-glow', '#00ff88');
    setTimeout(() => {
      document.body.style.setProperty('--brama-glow', '');
    }, 2000);
  }
}

// 🎬 HYPER LAUNCH SEQUENCE
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.EterniverseHyperApp = new EterniverseHyperApp();
  });
} else {
  window.EterniverseHyperApp = new EterniverseHyperApp();
}

// 🌐 GLOBAL EXPORT
window.EterniverseApp = EterniverseHyperApp;
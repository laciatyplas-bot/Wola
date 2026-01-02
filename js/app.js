/**
 * ETERNIVERSE - WZMOCNIONY APP.JS
 * Landing + Editor Core | v2.6 | 2026
 * Maciej Maciuszek | Sosnowiec
 */

class EterniverseApp {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.sessionActive = false;
    this.wordCount = 0;
    this.sessionTime = 0;
    this.shortcuts = {
      writing: 'Ctrl+Shift+W',
      bella: 'Ctrl+Shift+B', 
      session: 'Ctrl+Shift+S',
      bramy: 'Ctrl+B'
    };
    
    this.init();
  }

  init() {
    console.log('🌌 ETERNIVERSE v2.6 - Initialized');
    this.enhanceNavigation();
    this.setupKeyboardShortcuts();
    this.loadSessionState();
    this.initScrollReveal();
    this.startHeartbeat();
    
    // Mobile detection change handler
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  // 🔄 Enhanced Navigation
  enhanceNavigation() {
    const buttons = document.querySelectorAll('nav button');
    
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.animateButtonClick(btn);
        
        const mode = btn.textContent.toLowerCase().includes('pisanie') ? 'writing' :
                    btn.textContent.toLowerCase().includes('bella') ? 'bella' : 'session';
        
        this.switchMode(mode);
      });
    });
  }

  animateButtonClick(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  switchMode(mode) {
    const transitions = {
      writing: () => window.location.href = "index.html#writing",
      bella: () => window.location.href = "bella-assistant.html",
      session: () => this.startWritingSession()
    };
    
    transitions[mode]?.();
  }

  // ⌨️ Supercharged Keyboard Shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      // Ctrl+Shift combos
      if (e.ctrlKey && e.shiftKey) {
        switch (true) {
          case e.key.toLowerCase() === 'w':
            e.preventDefault();
            this.openWriting();
            break;
          case e.key.toLowerCase() === 'b':
            e.preventDefault();
            this.openBella();
            break;
          case e.key.toLowerCase() === 's':
            e.preventDefault();
            this.toggleSession();
            break;
        }
      }
      
      // Single Ctrl+B for bramy
      if (e.ctrlKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        this.openBramy();
      }
    });
  }

  // 📱 Mobile-First Scroll Reveal
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section, header').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(el);
    });
  }

  // ⏱️ Enhanced Writing Session Manager
  toggleSession() {
    if (this.sessionActive) {
      this.stopSession();
    } else {
      this.startWritingSession();
    }
  }

  startWritingSession() {
    this.sessionActive = true;
    this.sessionTime = 0;
    this.wordCount = 0;
    
    // UI feedback
    const status = document.querySelector('section p');
    if (status) {
      status.innerHTML = '🟢 <strong>SESJA AKTYWNA</strong> | ⏱️ ' + 
        this.formatTime(0) + ' | ✍️ ' + this.wordCount + ' słów';
      status.style.color = '#00ff88';
    }
    
    this.sessionInterval = setInterval(() => {
      this.sessionTime++;
      this.updateSessionUI();
    }, 1000);
    
    this.saveSessionState();
    console.log('📝 Sesja pisarska uruchomiona');
  }

  stopSession() {
    this.sessionActive = false;
    clearInterval(this.sessionInterval);
    this.saveSessionState();
    
    const status = document.querySelector('section p');
    if (status) {
      status.innerHTML = '🟢 Repo kompletne · 📱 Mobile OK · 🧠 Bella aktywna';
      status.style.color = '';
    }
    
    console.log(`✅ Sesja zakończona: ${this.formatTime(this.sessionTime)} | ${this.wordCount} słów`);
  }

  updateSessionUI() {
    const status = document.querySelector('section p');
    if (status && this.sessionActive) {
      status.innerHTML = `🟢 <strong>SESJA #${this.sessionId}</strong> | ⏱️ ${this.formatTime(this.sessionTime)} | ✍️ ${this.wordCount} słów`;
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // 💾 LocalStorage Persistence
  loadSessionState() {
    const saved = localStorage.getItem('eterniverse-session');
    if (saved) {
      const data = JSON.parse(saved);
      this.sessionActive = data.active || false;
      this.sessionTime = data.time || 0;
      this.wordCount = data.words || 0;
      this.sessionId = data.id || Date.now();
      
      if (this.sessionActive) {
        this.startWritingSession();
      }
    } else {
      this.sessionId = Date.now();
    }
  }

  saveSessionState() {
    localStorage.setItem('eterniverse-session', JSON.stringify({
      active: this.sessionActive,
      time: this.sessionTime,
      words: this.wordCount,
      id: this.sessionId
    }));
  }

  // ❤️ System Heartbeat (performance monitoring)
  startHeartbeat() {
    setInterval(() => {
      const mem = performance.memory || {};
      console.log(`💓 ETERNIVERSE Heartbeat | RAM: ${(mem.usedJSHeapSize/1024/1024).toFixed(1)}MB | Mobile: ${this.isMobile}`);
    }, 30000);
  }

  // Quick actions
  openWriting() { window.location.href = "index.html#writing"; }
  openBella() { window.location.href = "bella-assistant.html"; }
  openBramy() { 
    if (location.hash !== '#bramy') {
      window.location.href = "index.html#bramy";
    }
  }
}

// 🚀 Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new EterniverseApp());
} else {
  new EterniverseApp();
}

// 🌐 Export dla innych modułów
window.EterniverseApp = EterniverseApp;
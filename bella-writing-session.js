'use strict';

// ========================================
// BELLA SESJA PISARSKA v5.0 ULTRA
// ETERNIVERSE + data.js + core.js INTEGRATION
// ========================================

class BellaWritingSession {
  constructor() {
    this.version = '5.0';
    this.active = false;
    this.startTime = 0;
    this.startWords = 0;
    this.currentSprint = 0;
    this.totalSprints = 0;
    this.sessionStats = { words: 0, time: 0, wpm: 0 };
    this.editor = null;
    this.pomodoroActive = false;
    
    this.init();
  }

  init() {
    console.log('⏱️ Bella Writing Session v5.0 ULTRA — Ładowanie...');
    
    this.editor = this.detectEditor();
    if (!this.editor) {
      console.warn('Session: Edytor nie wykryty');
      return;
    }

    this.bindGlobalShortcuts();
    this.loadSessionState();
    this.injectUltraUI();
    
    // ETERNIVERSE sync
    this.bindETERNIVERSE();
    
    console.log('✅ Bella Session v5.0 ULTRA — FULLY OPERATIONAL');
  }

  detectEditor() {
    return document.getElementById('editor') ||
           document.getElementById('mainEditor') ||
           document.querySelector('[contenteditable="true"]') ||
           document.querySelector('.editor-pane, .monospace');
  }

  // =========================
  // 🎨 ULTRA UI INJECTION
  // =========================
  injectUltraUI() {
    if (document.getElementById('bella-session-ultra')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'bella-session-ultra';
    overlay.className = 'session-overlay-ultra';
    overlay.innerHTML = this.generateUltraHTML();
    document.body.appendChild(overlay);
    
    this.injectUltraStyles();
    this.bindUIEvents();
  }

  generateUltraHTML() {
    return `
      <div class="ultra-panel">
        <!-- Header -->
        <div class="panel-header">
          <div class="session-title">⏱️ SESJA ULTRA</div>
          <div class="brama-info" id="sessionBramaInfo">-</div>
        </div>
        
        <!-- Main Stats -->
        <div class="stats-grid">
          <div class="stat-card time">
            <div class="stat-label">Czas</div>
            <div class="stat-value" id="wsTime">00:00:00</div>
          </div>
          <div class="stat-card words">
            <div class="stat-label">Słowa</div>
            <div class="stat-value" id="wsWords">0</div>
          </div>
          <div class="stat-card wpm">
            <div class="stat-label">WPM</div>
            <div class="stat-value" id="wsWPM">0</div>
          </div>
          <div class="stat-card sprint">
            <div class="stat-label">Sprint</div>
            <div class="stat-value" id="wsSprint">1/12</div>
          </div>
        </div>
        
        <!-- Controls -->
        <div class="control-section">
          <button id="wsPomodoro" class="control-btn">🍅 Pomodoro (25min)</button>
          <button id="wsSprint" class="control-btn">⚡ Word Sprint</button>
          <button id="wsExit" class="control-btn exit">❌ Wyjście</button>
        </div>
        
        <!-- Motivation -->
        <div class="motivation-section">
          <div id="wsMotivation" class="motivation-text">
            Rozpocznij pisanie...
          </div>
        </div>
        
        <!-- Footer Stats -->
        <div class="footer-stats">
          <span>Session: <span id="wsSessionId">-</span></span>
          <span>Brama: <span id="wsBrama">-</span></span>
        </div>
      </div>
    `;
  }

  injectUltraStyles() {
    if (document.getElementById('bella-session-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'bella-session-styles';
    style.textContent = `
      /* Ultra Focus Mode */
      body.writing-session-ultra * {
        transition: opacity 0.5s ease !important;
      }
      
      body.writing-session-ultra header,
      body.writing-session-ultra nav,
      body.writing-session-ultra .sidebar,
      body.writing-session-ultra footer,
      body.writing-session-ultra .ui-elements {
        opacity: 0.1 !important; pointer-events: none !important;
      }
      
      body.writing-session-ultra #editor,
      body.writing-session-ultra .editor-pane {
        border: 3px solid #00ff88 !important;
        box-shadow: 0 0 50px rgba(0,255,136,0.5) !important;
      }
      
      /* Ultra Panel */
      #bella-session-ultra {
        position: fixed; top: 24px; right: 24px; z-index: 999999;
        backdrop-filter: blur(30px); border-radius: 24px;
        box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0,255,255,0.3);
      }
      
      .ultra-panel {
        background: linear-gradient(145deg, rgba(5,5,16,0.98), rgba(10,10,42,0.95));
        backdrop-filter: blur(25px); border: 2px solid #00ffff40;
        border-radius: 24px; padding: 24px; min-width: 320px; max-width: 360px;
        color: #e0ffff; font-family: 'SF Mono', monospace; font-size: 13px;
      }
      
      .panel-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #00ffff30;
      }
      
      .session-title {
        font-size: 16px; font-weight: 900; color: #00ffff;
        text-shadow: 0 0 15px #00ffff; letter-spacing: 1px;
      }
      
      .stats-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;
      }
      
      .stat-card {
        background: rgba(0,20,40,0.6); padding: 16px; border-radius: 16px;
        border: 1px solid #00ffff20; text-align: center;
      }
      
      .stat-value {
        font-size: 24px; font-weight: 900; color: #00ff88;
        text-shadow: 0 0 10px #00ff88; margin-top: 4px;
      }
      
      .control-section {
        display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;
      }
      
      .control-btn {
        padding: 14px; background: linear-gradient(145deg, rgba(0,255,255,0.25), rgba(0,204,255,0.15));
        color: #e0ffff; border: 1px solid #00ffff40; border-radius: 12px;
        font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.3s;
        text-transform: uppercase; letter-spacing: 1px;
      }
      
      .control-btn:hover {
        background: #00ffff; color: #000; transform: translateY(-2px);
        box-shadow: 0 15px 30px rgba(0,255,255,0.4);
      }
      
      .control-btn.exit {
        background: linear-gradient(145deg, rgba(255,68,68,0.3), rgba(255,0,0,0.15));
        border-color: #ff444440;
      }
      
      .control-btn.exit:hover { background: #ff4444; color: #fff; }
      
      .motivation-section {
        background: rgba(0,255,136,0.1); padding: 16px; border-radius: 12px;
        border-left: 4px solid #00ff88; margin-bottom: 16px; text-align: center;
      }
      
      .motivation-text {
        font-style: italic; opacity: 0.9; font-size: 12px;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.9; }
        50% { opacity: 1; }
      }
      
      .footer-stats {
        font-size: 11px; opacity: 0.7; display: flex; justify-content: space-between;
      }
    `;
    document.head.appendChild(style);
  }

  // =========================
  // ⌨️ GLOBAL SHORTCUTS
  // =========================
  bindGlobalShortcuts() {
    document.addEventListener('keydown', e => {
      // Ctrl+Shift+S = toggle session
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        this.toggle();
      }
      
      // Ctrl+Shift+P = pomodoro
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        this.startPomodoro();
      }
    });
  }

  // =========================
  // 🚀 MAIN CONTROLS
  // =========================
  toggle() {
    this.active ? this.exit() : this.enter();
  }

  enter() {
    this.active = true;
    this.startTime = Date.now();
    this.startWords = this.countWords();
    this.currentSprint = 1;
    this.sessionId = `session-${Date.now()}`;
    
    document.body.classList.add('writing-session-ultra');
    document.getElementById('wsExit').onclick = () => this.exit();
    
    this.timer = setInterval(() => this.update(), 1000);
    this.updateMotivation();
    
    this.saveSessionState();
    this.announceSession();
  }

  exit() {
    this.active = false;
    clearInterval(this.timer);
    clearTimeout(this.pomodoroTimer);
    
    document.body.classList.remove('writing-session-ultra');
    document.getElementById('bella-session-ultra')?.remove();
    
    this.saveSessionStats();
    console.log('✅ Sesja zakończona:', this.sessionStats);
  }

  // =========================
  // 📊 LIVE UPDATES
  // =========================
  update() {
    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const words = Math.max(0, this.countWords() - this.startWords);
    const wpm = Math.round((words / elapsed) * 60);
    
    this.sessionStats.words = words;
    this.sessionStats.time = elapsed;
    this.sessionStats.wpm = wpm;
    
    // UI
    document.getElementById('wsTime').textContent = this.formatTime(elapsed);
    document.getElementById('wsWords').textContent = words;
    document.getElementById('wsWPM').textContent = wpm;
    document.getElementById('wsSprint').textContent = `${this.currentSprint}/12`;
    document.getElementById('wsSessionId').textContent = this.sessionId.slice(-6);
    
    this.updateMotivation();
  }

  countWords() {
    return this.editor?.innerText?.trim().split(/s+/).filter(Boolean).length || 0;
  }

  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h ? h+':' : ''}${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  // =========================
  // 🍅 POMO + SPRINTS
  // =========================
  startPomodoro() {
    if (this.pomodoroActive) return;
    
    this.pomodoroActive = true;
    const endTime = Date.now() + 25 * 60 * 1000; // 25 min
    
    this.pomodoroTimer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      document.getElementById('wsTime').textContent = 
        `POMO: ${this.formatTime(remaining)} ⏳`;
      
      if (remaining === 0) {
        this.pomodoroComplete();
      }
    }, 1000);
  }

  pomodoroComplete() {
    this.pomodoroActive = false;
    clearTimeout(this.pomodoroTimer);
    
    // Celebration
    document.getElementById('wsMotivation').innerHTML = 
      '🎉 POMODORO UKOŃCZONY! <strong>Weź 5min przerwy</strong>';
    
    setTimeout(() => this.updateMotivation(), 5000);
  }

  // =========================
  // 💾 PERSISTENCE
  // =========================
  saveSessionState() {
    localStorage.setItem('bella-session-state', JSON.stringify({
      active: this.active,
      startTime: this.startTime,
      startWords: this.startWords,
      sessionId: this.sessionId
    }));
  }

  loadSessionState() {
    const state = JSON.parse(localStorage.getItem('bella-session-state') || '{}');
    if (state.active && state.sessionId) {
      this.enter(); // Auto-resume
    }
  }

  saveSessionStats() {
    const stats = window.eterniverseData?.sesje || [];
    stats.unshift({
      id: this.sessionId,
      data: new Date().toISOString(),
      czas: this.formatTime(this.sessionStats.time),
      slowa: this.sessionStats.words,
      wpm: this.sessionStats.wpm,
      brama: this.activeBramaId,
      efektywnosc: Math.min(100, this.sessionStats.wpm * 2)
    });
    
    window.eterniverseData.sesje = stats.slice(0, 50); // Top 50
    localStorage.setItem('bella-session-stats', JSON.stringify(stats[0]));
  }

  // =========================
  // 🎯 MOTIVATION ENGINE
  // =========================
  updateMotivation() {
    const words = this.sessionStats.words;
    const wpm = this.sessionStats.wpm;
    
    const motivations = {
      0: 'Naciśnij Enter i zacznij pisać...',
      50: 'Dobry start! Kontynuuj!',
      100: 'Świetne tempo! 💪',
      250: `Brawo! ${words} słów! Jeszcze 10 minut.`,
      500: 'JESTEŚ MASZYNĄ! 🔥'
    };
    
    for (const [target, msg] of Object.entries(motivations)) {
      if (words >= target) {
        document.getElementById('wsMotivation').textContent = msg;
      }
    }
  }

  // =========================
  // 🔌 ETERNIVERSE BIND
  // =========================
  bindETERNIVERSE() {
    document.addEventListener('bramaSelected', e => {
      this.activeBramaId = e.detail.brama.id;
      document.getElementById('wsBrama').textContent = e.detail.brama.nazwa;
    });
  }

  // =========================
  // 📡 EVENTS BINDING
  // =========================
  bindUIEvents() {
    document.getElementById('wsPomodoro').onclick = () => this.startPomodoro();
    document.getElementById('wsSprint').onclick = () => this.nextSprint();
    document.getElementById('wsExit').onclick = () => this.exit();
  }

  nextSprint() {
    this.currentSprint++;
    this.totalSprints++;
    document.getElementById('wsMotivation').textContent = 
      `⚡ SPRINT ${this.currentSprint} START! Pisz jak szalony!`;
  }

  announceSession() {
    console.log(`⏱️ SESJA ULTRA #${this.sessionId} Rozpoczęta | Brama ${this.activeBramaId}`);
  }
}

// =========================
// GLOBAL START
// =========================
document.addEventListener('DOMContentLoaded', () => {
  window.BellaWritingSession = new BellaWritingSession();
});
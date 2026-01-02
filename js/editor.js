/**
 * ETERNIVERSE - HYPER EDITOR v5.0 ⚡✍️
 * FULL HYPERDRIVE + AI + MOC 300% INTEGRATION
 * God Mode Writing Beast | 2026 | Sosnowiec
 */

class EterniverseHyperEditor {
  constructor() {
    this.version = '5.0-MOCCC';
    this.mocLevel = 0;
    this.godMode = false;
    this.aiBurstActive = false;
    this.wordGoal = 5000; // HYPER GOAL
    this.hyperStats = { words: 0, chars: 0, time: 0, wpm: 0, peakWPM: 0, aiBlocks: 0 };
    
    // FULL MODULE REFERENCES
    this.hyperSync = {
      renderer: window.EterniverseHyperRenderer,
      profile: window.BellaHyperAutoProfile,
      session: window.EterSession,
      app: window.EterniverseHyperApp,
      bella: window.BellaHyperSession
    };
    
    this.initHyperBeast();
  }

  // 🚀 HYPER BEAST INIT — MOC 300%
  initHyperBeast() {
    console.log('✍️⚡ HYPER EDITOR v5.0 — MOC 300% BEAST MODE');
    
    this.injectHyperEditor();
    this.setupHyperEditor();
    this.bindHyperControls();
    this.startHyperTracking();
    this.loadHyperState();
    this.syncAllHyperModules();
    
    // GOD MODE READY
    console.log('🦾 GOD EDITOR READY | Ctrl+Shift+G = BEAST MODE');
  }

  // 🖥️ HYPER EDITOR UI — NEXT GEN
  injectHyperEditor() {
    const container = document.getElementById('editor-section') || this.createHyperContainer();
    
    container.innerHTML = `
      <div class="hyper-editor-header">
        <div class="hyper-brama-nav">
          <button id="hyper-prev">⬅️</button>
          <div class="brama-moc-display">
            <span id="hyper-brama">INTER</span>
            <div class="moc-bar" id="editor-moc-bar"></div>
            <span id="hyper-moc">MOC 0/10</span>
          </div>
          <button id="hyper-next">➡️</button>
        </div>
        
        <div class="hyper-controls-grid">
          <button id="god-editor-btn" class="hyper-btn god">🦾 GOD MODE</button>
          <button id="ai-burst-btn" class="hyper-btn ai">🤖 AI BURST</button>
          <button id="hyper-focus" class="hyper-btn focus">🎯 BEAST FOCUS</button>
          <button id="hyper-save" class="hyper-btn save">💾 HYPER SAVE</button>
        </div>
        
        <div class="hyper-stats-row">
          <span>✍️ <span id="hyper-words">0</span> / ${this.wordGoal}</span>
          <span>⚡ <span id="hyper-wpm">0</span> PEAK:<span id="peak-wpm">0</span></span>
          <span>⏱️ <span id="hyper-time">00:00</span></span>
          <span>🤖 <span id="ai-blocks">0</span></span>
        </div>
      </div>
      
      <div class="hyper-editor-container">
        <div id="hyper-editor" class="hyper-editor-pane god-cursor"></div>
        <div id="hyper-preview" class="hyper-preview-pane"></div>
      </div>
      
      <div class="hyper-footer">
        Ctrl+Shift+G = God | Alt+1-5 = Bramy | Ctrl+B = Cycle
      </div>
    `;
    
    // FULLSCREEN GOD MODE READY
    document.body.classList.add('hyper-editor-ready');
  }

  createHyperContainer() {
    const container = document.createElement('section');
    container.id = 'editor-section';
    container.className = 'hyper-editor-section';
    document.body.appendChild(container);
    return container;
  }

  // ⌨️ HYPER EDITOR ENGINE
  setupHyperEditor() {
    this.hyperEditor = document.getElementById('hyper-editor');
    this.hyperPreview = document.getElementById('hyper-preview');
    
    // ULTIMATE EDITOR CONFIG
    this.hyperEditor.contentEditable = true;
    this.hyperEditor.innerHTML = `
      <h1>🌌 ETERNIVERSE HYPER EDITOR v5.0</h1>
      <p><strong>MOCCC MODE AKTYWNY</strong> — pisz z mocą 300%!</p>
      <p>Ctrl+Shift+G = <em>GOD MODE</em> | AI Burst na każde wezwanie</p>
    `;
    
    // HYPER TYPING EFFECTS
    this.setupHyperTyping();
    this.setupLivePreview();
  }

  setupHyperTyping() {
    let lastText = '';
    
    this.hyperEditor.addEventListener('input', () => {
      const text = this.hyperEditor.textContent;
      
      // HYPER WPM BOOST VISUALS
      if (text.length % 50 === 0 && text.length > lastText.length) {
        this.triggerTypingBoost();
      }
      
      lastText = text;
      this.updateHyperPreview();
    });
    
    // FOCUS GOD MODE
    this.hyperEditor.addEventListener('focus', () => {
      document.body.classList.add('hyper-writing');
      this.syncTypingMoc();
    });
  }

  // 🎯 HYPER CONTROLS BINDING
  bindHyperControls() {
    // GOD MODE BUTTON
    document.getElementById('god-editor-btn').onclick = () => this.activateGodEditor();
    
    // AI BURST
    document.getElementById('ai-burst-btn').onclick = () => this.aiHyperBurst();
    
    // BEAST FOCUS
    document.getElementById('hyper-focus').onclick = () => this.toggleBeastFocus();
    
    // HYPER SAVE
    document.getElementById('hyper-save').onclick = () => this.hyperSave();
    
    // BRAMA NAV
    document.getElementById('hyper-prev').onclick = () => this.cycleBrama(-1);
    document.getElementById('hyper-next').onclick = () => this.cycleBrama(1);
    
    // GLOBAL KEYBOARD BEAST
    this.bindHyperKeyboard();
  }

  bindHyperKeyboard() {
    document.addEventListener('keydown', (e) => {
      // GOD SHORTCUT
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        this.activateGodEditor();
      }
      
      // AI BURST
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        this.aiHyperBurst();
      }
      
      // BRAMA NUMBERS
      if (e.altKey && /[1-5]/.test(e.key)) {
        e.preventDefault();
        this.switchBramaTo(parseInt(e.key));
      }
      
      // CYCLE BRAMA
      if (e.ctrlKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        this.cycleBrama(1);
      }
      
      // HYPER MARKDOWN
      if ((e.ctrlKey || e.metaKey) && this.hyperEditor === document.activeElement) {
        e.preventDefault();
        this.hyperMarkdown(e.key);
      }
    });
  }

  // 🦾 GOD EDITOR MODE — ULTIMATE
  activateGodEditor() {
    this.godMode = !this.godMode;
    
    if (this.godMode) {
      document.body.classList.add('god-editor-mode');
      document.documentElement.requestFullscreen();
      this.disableAllDistractions();
      this.mocLevel = 10;
      document.getElementById('god-editor-btn').textContent = '🦾 GOD ON';
      this.triggerGodActivation();
    } else {
      document.body.classList.remove('god-editor-mode');
      document.exitFullscreen();
      this.mocLevel = 5;
    }
    
    this.syncGodMoc();
  }

  disableAllDistractions() {
    document.querySelectorAll('nav, button:not(.hyper-btn), a, .ui:not(#editor-section)')
      .forEach(el => {
        el.style.opacity = '0.05';
        el.style.pointerEvents = 'none';
      });
  }

  // 🤖 AI HYPER BURST — ETERNIVERSE SYNC
  aiHyperBurst() {
    this.aiBurstActive = true;
    this.hyperStats.aiBlocks++;
    
    // ETERNIVERSE EXPAND
    if (window.expandScene) {
      window.expandScene();
    }
    
    // GATE DETECT + PROFILE BOOST
    const gateEl = document.getElementById('gate');
    if (gateEl && window.BellaHyperAutoProfile) {
      window.BellaHyperAutoProfile.applyHyperProfile(gateEl.value);
    }
    
    // INSERT BURST MARKER
    const burst = document.createElement('div');
    burst.innerHTML = `<em style="color:#00ff88">[AI BURST #${this.hyperStats.aiBlocks}]</em><br>`;
    this.hyperEditor.appendChild(burst);
    
    this.triggerAIBurstEffect();
  }

  // ⚡ BRAMA HYPER NAVIGATION
  cycleBrama(direction) {
    const gateEl = document.getElementById('gate');
    if (!gateEl) return;
    
    const gates = Array.from(gateEl.options).map(opt => opt.value);
    const current = gates.indexOf(gateEl.value);
    const next = (current + direction + gates.length) % gates.length;
    
    gateEl.value = gates[next];
    gateEl.dispatchEvent(new Event('change'));
    
    // AUTO-PROFILE + VISUAL SYNC
    if (window.BellaHyperAutoProfile) {
      window.BellaHyperAutoProfile.applyHyperProfile(gates[next]);
    }
    
    document.getElementById('hyper-brama').textContent = 
      gates[next].toUpperCase();
  }

  switchBramaTo(num) {
    const gateMap = {1: 'inter', 2: 'eter', 3: 'obfi', 4: 'chaos', 5: 'eter'};
    const gateId = gateMap[num];
    const gateEl = document.getElementById('gate');
    
    if (gateEl) {
      gateEl.value = gateId;
      gateEl.dispatchEvent(new Event('change'));
      document.getElementById('hyper-brama').textContent = gateId.toUpperCase();
    }
  }

  // 📊 HYPER STATS — 60FPS TRACKING
  startHyperTracking() {
    let lastWords = 0;
    let lastTime = performance.now();
    
    this.tracker = setInterval(() => {
      this.updateHyperStats();
      
      // WPM + PEAK
      const now = performance.now();
      const deltaTime = (now - lastTime) / 60000; // minutes
      const wpm = Math.round((this.hyperStats.words - lastWords) / deltaTime);
      
      this.hyperStats.wpm = wpm;
      this.hyperStats.peakWPM = Math.max(this.hyperStats.peakWPM, wpm);
      
      this.updateHyperUI();
      lastWords = this.hyperStats.words;
      lastTime = now;
      
      // MOC CALC DYNAMIC
      this.calculateDynamicMoc();
    }, 16); // 60fps
  }

  updateHyperStats() {
    const text = this.hyperEditor.textContent || '';
    this.hyperStats.words = text.trim().split(/s+/).filter(Boolean).length;
    this.hyperStats.chars = text.length;
    this.hyperStats.time++;
  }

  updateHyperUI() {
    document.getElementById('hyper-words').textContent = this.hyperStats.words;
    document.getElementById('hyper-wpm').textContent = this.hyperStats.wpm;
    document.getElementById('peak-wpm').textContent = this.hyperStats.peakWPM;
    document.getElementById('hyper-time').textContent = this.formatHyperTime();
    document.getElementById('ai-blocks').textContent = this.hyperStats.aiBlocks;
    
    // MOC BAR
    const progress = (this.hyperStats.words / this.wordGoal) * 100;
    document.getElementById('editor-moc-bar').style.width = `${Math.min(100, progress)}%`;
  }

  calculateDynamicMoc() {
    const wpmBoost = Math.min(3, this.hyperStats.wpm / 50);
    const wordBoost = Math.min(3, this.hyperStats.words / 1000);
    const aiBoost = Math.min(2, this.hyperStats.aiBlocks / 5);
    const godBoost = this.godMode ? 2 : 0;
    
    this.mocLevel = Math.floor(wpmBoost + wordBoost + aiBoost + godBoost);
    
    document.getElementById('hyper-moc').textContent = `MOC ${this.mocLevel}/10`;
    
    // GLOBAL MOC SYNC
    if (this.hyperSync.app) this.hyperSync.app.mocLevel = this.mocLevel;
    if (this.hyperSync.bella) this.hyperSync.bella.mocLevel = this.mocLevel;
    
    document.dispatchEvent(new CustomEvent('mocUpdate', { detail: { moc: this.mocLevel } }));
  }

  // 🎨 LIVE PREVIEW + HYPER MARKDOWN
  setupLivePreview() {
    this.updateHyperPreview = () => {
      const text = this.hyperEditor.innerHTML;
      this.hyperPreview.innerHTML = this.markdownToHtml(text);
    };
  }

  hyperMarkdown(key) {
    const actions = {
      'b': () => this.wrapSelection('**'),
      'i': () => this.wrapSelection('*'),
      '1': () => this.wrapSelection('# '),
      '2': () => this.wrapSelection('## '),
      '`': () => this.wrapSelection('`')
    };
    
    actions[key]?.();
    this.updateHyperPreview();
  }

  wrapSelection(wrap) {
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      
      const start = document.createTextNode(wrap);
      const end = document.createTextNode(wrap);
      
      range.insertNode(start);
      range.collapse(false);
      range.insertNode(document.createElement('span'));
      range.collapse(false);
      range.insertNode(end);
      
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  markdownToHtml(md) {
    return md
      .replace(/**(.*?)**/g, '<strong>$1</strong>')
      .replace(/*(.*?)*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/

/g, '<br><br>');
  }

  // 💾 HYPER SAVE SYSTEM
  hyperSave() {
    const state = {
      brama: document.getElementById('gate')?.value || 'inter',
      content: this.hyperEditor.innerHTML,
      stats: { ...this.hyperStats },
      moc: this.mocLevel,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('hyper-editor-state', JSON.stringify(state));
    
    // ETERSESSION SYNC
    if (this.hyperSync.session) {
      this.hyperSync.session.save();
    }
    
    this.visualHyperSave();
  }

  loadHyperState() {
    const saved = localStorage.getItem('hyper-editor-state');
    if (saved) {
      const state = JSON.parse(saved);
      this.hyperEditor.innerHTML = state.content;
      Object.assign(this.hyperStats, state.stats);
      this.mocLevel = state.moc;
    }
  }

  // 🔥 VISUAL HYPER EFFECTS
  triggerTypingBoost() {
    const boost = document.createElement('span');
    boost.textContent = '⚡';
    boost.className = 'typing-boost';
    this.hyperEditor.appendChild(boost);
    setTimeout(() => boost.remove(), 500);
  }

  triggerGodActivation() {
    const godEffect = document.createElement('div');
    godEffect.textContent = '🦾 GOD MODE ACTIVATED';
    Object.assign(godEffect.style, {
      position: 'fixed', top: '30vh', left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '48px', color: '#00ff88', fontWeight: '900',
      textShadow: '0 0 60px currentColor', zIndex: '999999',
      animation: 'godPulse 2s infinite'
    });
    document.body.appendChild(godEffect);
    setTimeout(() => godEffect.remove(), 3000);
  }

  triggerAIBurstEffect() {
    // FULLSCREEN BURST VIA RENDERER
    if (this.hyperSync.renderer) {
      this.hyperSync.renderer.triggerHyperBurst();
    }
  }

  visualHyperSave() {
    document.getElementById('hyper-save').style.background = '#00ff88';
    setTimeout(() => {
      document.getElementById('hyper-save').style.background = '';
    }, 300);
  }

  toggleBeastFocus() {
    document.body.classList.toggle('beast-focus');
  }

  formatHyperTime() {
    const m = Math.floor(this.hyperStats.time / 60);
    const s = this.hyperStats.time % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // 🔄 FULL HYPER MODULE SYNC
  syncAllHyperModules() {
    // Profile sync
    if (this.hyperSync.profile && document.getElementById('gate')?.value) {
      this.hyperSync.profile.applyHyperProfile(document.getElementById('gate').value);
    }
    
    // Renderer sync
    if (this.hyperSync.renderer) {
      this.hyperSync.renderer.mocVisuals = this.mocLevel;
    }
  }

  syncGodMoc() {
    document.dispatchEvent(new CustomEvent('mocUpdate', { 
      detail: { moc: this.mocLevel, source: 'godEditor' } 
    }));
  }
}

// 🔥 HYPER CSS BEAST MODE
const injectHyperEditorStyles = () => {
  if (document.getElementById('hyper-editor-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'hyper-editor-styles';
  style.textContent = `
    /* GOD EDITOR MODE */
    .god-editor-mode body { 
      background: #000 !important; 
      overflow: hidden; 
    }
    
    .god-editor-mode #hyper-editor {
      border: 5px solid #00ff88 !important;
      box-shadow: 0 0 100px #00ff88, inset 0 0 50px rgba(0,255,136,0.1) !important;
      background: #000011 !important;
      font-size: 18px !important;
    }
    
    .hyper-editor-pane {
      min-height: 70vh; padding: 40px; 
      font-family: 'SF Mono', monospace; 
      line-height: 1.8; font-size: 16px;
      background: linear-gradient(180deg, #0a0a1a 0%, #000 100%);
      border-radius: 20px; border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    .hyper-editor-pane:focus {
      outline: none; box-shadow: 0 0 60px #00ffdd80;
    }
    
    .hyper-editor-header {
      display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px;
      margin-bottom: 20px; padding: 20px; 
      background: rgba(10,10,40,0.8); border-radius: 16px;
      backdrop-filter: blur(20px);
    }
    
    .moc-bar {
      height: 8px; background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00);
      border-radius: 4px; transition: width 0.3s;
    }
    
    .hyper-controls-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
    }
    
    .hyper-btn {
      padding: 16px; border: none; border-radius: 12px;
      font-weight: 800; cursor: pointer; transition: all 0.3s;
      text-transform: uppercase; font-size: 12px;
    }
    
    .hyper-btn.god { background: linear-gradient(45deg, #ff0066, #cc00ff); color: white; }
    .hyper-btn.ai { background: linear-gradient(45deg, #00ff88, #00cc66); color: #000; }
    .hyper-btn.focus { background: linear-gradient(45deg, #ffaa00, #ff6600); color: #000; }
    .hyper-btn.save { background: linear-gradient(45deg, #00ccff, #0099cc); color: white; }
    
    .hyper-btn:hover { transform: scale(1.08) !important; box-shadow: 0 15px 40px rgba(0,255,221,0.6); }
    
    .hyper-stats-row { 
      display: flex; justify-content: space-around; 
      font-family: monospace; font-size: 14px; opacity: 0.9;
    }
    
    .typing-boost {
      animation: typingBoost 0.5s ease-out;
      color: #00ff88 !important; font-size: 1.2em !important;
    }
    
    @keyframes typingBoost {
      0% { transform: scale(0) rotate(0deg); opacity: 0; }
      50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
      100% { transform: scale(1) rotate(360deg); opacity: 0; }
    }
    
    @keyframes godPulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.8; }
    }
    
    body.hyper-writing * { transition: opacity 0.5s; }
    body.hyper-writing nav, body.hyper-writing button:not(.hyper-btn) { opacity: 0.1; }
  `;
  document.head.appendChild(style);
};

// 🌌 BEAST LAUNCH
document.addEventListener('DOMContentLoaded', () => {
  injectHyperEditorStyles();
  
  if (location.hash.includes('writing') || document.getElementById('editor-section')) {
    window.EterniverseHyperEditor = new EterniverseHyperEditor();
  }
});
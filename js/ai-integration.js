// ========================================
// ETERNIVERSE MASTER 2026 v4.0 MEGA
// Bella AI • Offline AI Engine • Full Stack Integration
// ai-integration.js v4.0 MEGA
// ========================================

'use strict';

class BellaAI {
  constructor() {
    this.version = '4.0';
    this.isMega = true;
    
    // DOM elements
    this.promptInput = document.getElementById('aiPrompt');
    this.output = document.getElementById('aiOutput');
    this.generateBtn = document.getElementById('generateContent');
    
    // Editor detection
    this.editor = this.detectEditor();
    
    // Core state
    this.activeProfile = 'eterseeker';
    this.isProcessing = false;
    this.contextStack = [];
    
    // MEGA Profiles z data.js
    this.profiles = this.loadProfiles();
    
    // Stats
    this.generationStats = { total: 0, words: 0, bramaSync: 0 };
    
    this.init();
  }

  // =========================
  // 🔥 MEGA INIT
  // =========================
  init() {
    this.injectUI();
    this.bindEvents();
    this.syncWithETERNIVERSE();
    
    if (!this.editor) {
      console.warn('🧠 Bella v4.0: Edytor nie wykryty');
    }
    
    console.log('🧠 Bella AI v4.0 MEGA READY | Profiles:', Object.keys(this.profiles).length);
    this.announceReady();
  }

  detectEditor() {
    return document.getElementById('editor') ||
           document.getElementById('mainEditor') ||
           document.querySelector('[contenteditable="true"]') ||
           document.querySelector('.editor-pane, .monospace');
  }

  // =========================
  // 🎨 DYNAMIC UI INJECTION
  // =========================
  injectUI() {
    if (document.getElementById('bella-mega-studio')) return;
    
    const studio = document.createElement('div');
    studio.id = 'bella-mega-studio';
    studio.className = 'bella-studio-mega';
    studio.innerHTML = this.generateStudioHTML();
    
    document.body.appendChild(studio);
    this.injectMegaStyles();
  }

  generateStudioHTML() {
    return `
      <div class="studio-header">
        <h3>🧠 BELLA AI MEGA v${this.version}</h3>
        <div class="profile-selector">
          ${Object.entries(this.profiles).map(([key, profile]) => 
            `<button data-profile="${key}" class="profile-btn">${profile.emoji} ${profile.name}</button>`
          ).join('')}
        </div>
      </div>
      
      <div class="studio-body">
        <textarea id="aiPrompt" placeholder="Wpisz prompt... (Ctrl+Enter = generate)"></textarea>
        <button id="generateContent" class="generate-btn">✨ GENERUJ</button>
      </div>
      
      <div class="studio-output">
        <div id="aiOutput" class="output-pane"></div>
        <div class="output-actions">
          <button id="injectEditor">➕ Do Edytora</button>
          <button id="copyOutput">📋 Kopiuj</button>
          <button id="newPrompt">🔄 Nowy</button>
        </div>
      </div>
      
      <div class="studio-footer">
        <span id="aiStats">0 generacji | 0 słów</span>
        <span id="contextInfo">-</span>
      </div>
    `;
  }

  injectMegaStyles() {
    if (document.getElementById('bella-mega-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'bella-mega-styles';
    style.textContent = `
      #bella-mega-studio {
        max-width: 800px; margin: 20px auto; padding: 24px;
        background: rgba(5,5,16,0.95); backdrop-filter: blur(30px);
        border: 2px solid #00ffff50; border-radius: 24px;
        box-shadow: 0 30px 60px rgba(0,255,255,0.2);
        font-family: 'SF Mono', monospace;
      }
      
      .studio-header h3 { 
        margin: 0 0 16px 0; color: #00ffff; 
        text-shadow: 0 0 20px #00ffff; letter-spacing: 2px;
      }
      
      .profile-selector {
        display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;
      }
      
      .profile-btn {
        padding: 10px 16px; background: rgba(0,255,255,0.2);
        color: #e0ffff; border: 1px solid #00ffff50; border-radius: 20px;
        font-size: 12px; cursor: pointer; transition: all 0.3s;
      }
      
      .profile-btn.active, .profile-btn:hover {
        background: #00ffff; color: #000; box-shadow: 0 0 20px #00ffff;
        transform: scale(1.05);
      }
      
      #aiPrompt {
        width: 100%; height: 120px; padding: 16px;
        background: rgba(10,10,26,0.8); color: #e0ffff;
        border: 1px solid #00ffff50; border-radius: 12px;
        font-family: monospace; font-size: 14px; resize: vertical;
      }
      
      #aiPrompt:focus { 
        outline: none; border-color: #00ffff; box-shadow: 0 0 20px #00ffff50;
      }
      
      .generate-btn {
        width: 100%; padding: 16px; margin: 12px 0;
        background: linear-gradient(145deg, #00ffff, #00ccff);
        color: #000; font-weight: 900; font-size: 16px;
        border: none; border-radius: 12px; cursor: pointer;
        text-transform: uppercase; letter-spacing: 1px;
      }
      
      .generate-btn:hover:not(:disabled) {
        transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0,255,255,0.4);
      }
      
      .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      
      .output-pane {
        background: rgba(0,15,30,0.9); padding: 20px; border-radius: 12px;
        min-height: 200px; max-height: 400px; overflow-y: auto;
        border: 1px solid #00ffff30; font-family: monospace;
        white-space: pre-wrap; line-height: 1.6;
      }
      
      .output-actions { display: flex; gap: 12px; margin-top: 12px; }
      .output-actions button { 
        flex: 1; padding: 10px; background: rgba(0,255,255,0.2);
        border: 1px solid #00ffff50; border-radius: 8px; color: #e0ffff;
      }
      
      .studio-footer { 
        margin-top: 20px; font-size: 12px; opacity: 0.7;
        display: flex; justify-content: space-between;
      }
    `;
    document.head.appendChild(style);
  }

  // =========================
  // 📡 EVENTS + INTEGRATION
  // =========================
  bindEvents() {
    // Generate
    document.getElementById('generateContent').onclick = () => this.generate();
    
    // Outputs
    document.getElementById('injectEditor').onclick = () => this.injectToEditor();
    document.getElementById('copyOutput').onclick = () => this.copyToClipboard();
    document.getElementById('newPrompt').onclick = () => this.newPrompt();
    
    // Profiles
    document.querySelectorAll('.profile-btn').forEach(btn => {
      btn.onclick = () => this.setProfile(btn.dataset.profile);
    });
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.generate();
      }
    });
    
    // ETERNIVERSE sync
    ['worldSelected', 'bramaSelected', 'eterniverseReady'].forEach(event => {
      document.addEventListener(event, (e) => this.onETERNIVERSEEvent(e));
    });
  }

  // =========================
  // 🌌 ETERNIVERSE SYNC
  // =========================
  loadProfiles() {
    const baseProfiles = {
      amazon: {
        name: 'Amazon', emoji: '🛒', tone: 'sprzedażowy, klarowny',
        rules: ['200+ słów', 'korzyści', 'CTA']
      },
      wattpad: {
        name: 'Wattpad', emoji: '📖', tone: 'emocjonalny, cliffhanger',
        rules: ['krótkie zdania', 'emocje', 'pytania']
      },
      eterseeker: {
        name: 'EterSeeker', emoji: '✨', tone: 'manifest, metafizyka',
        rules: ['symbolika', 'pytania egzystencjalne']
      }
    };
    
    // Dynamiczne profile z data.js
    Object.entries(window.eterniverseData?.postacie || {}).forEach(([key, postac]) => {
      baseProfiles[`postac-${key}`] = {
        name: postac.imie, emoji: '👤', tone: postac.osobowosc,
        rules: [`perspektywa ${postac.imie}`, `cele: ${postac.cele?.[0]}`]
      };
    });
    
    return baseProfiles;
  }

  syncWithETERNIVERSE() {
    if (window.ETERNIVERSE) {
      this.setProfile(window.ETERNIVERSE.activeBrama?.id || 'eterseeker');
      this.injectContext(window.ETERNIVERSE.bellaContext);
    }
  }

  onETERNIVERSEEvent(e) {
    const detail = e.detail;
    if (detail.brama) {
      this.setProfile(`postac-elara`); // Default dla bramy
      this.injectContext(detail);
    }
  }

  // =========================
  // 🚀 AI CORE ENGINE
  // =========================
  generate() {
    if (this.isProcessing) return;
    
    const prompt = document.getElementById('aiPrompt').value.trim();
    if (!prompt) return this.showToast('Wpisz prompt!', 'warn');
    
    this.isProcessing = true;
    this.setLoading(true);
    
    // Mock AI z profile context
    setTimeout(() => {
      try {
        const result = this.generateMegaAI(prompt);
        this.displayResult(result);
        this.generationStats.total++;
        this.generationStats.words += result.length;
        this.updateStats();
      } finally {
        this.isProcessing = false;
        this.setLoading(false);
      }
    }, 800 + Math.random() * 1200);
  }

  generateMegaAI(prompt) {
    const profile = this.profiles[this.activeProfile];
    const context = window.ETERNIVERSE?.bellaContext || {};
    
    const templates = {
      amazon: `SPRZEDAŻ POWER: ${prompt} → Konwersja max!`,
      wattpad: `CLIFFHANGER MODE: ${prompt} → Czytelnik MUSI czytać dalej!`,
      eterseeker: `MANIFEST ŚWIADOMOŚCI: ${prompt} → Przebudzenie kodera.`,
      default: `${prompt} [BELLA MEGA]`
    };
    
    return templates[this.activeProfile] || templates.default;
  }

  // =========================
  // 🎯 OUTPUT HANDLING
  // =========================
  displayResult(text) {
    document.getElementById('aiOutput').textContent = text;
  }

  injectToEditor() {
    const text = document.getElementById('aiOutput').textContent;
    if (this.editor && text) {
      if (this.editor.isContentEditable) {
        this.editor.innerText += '

' + text;
      }
      this.showToast('✅ Wklejono do edytora!', 'success');
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(document.getElementById('aiOutput').textContent);
    this.showToast('📋 Skopiowano!', 'success');
  }

  newPrompt() {
    document.getElementById('aiPrompt').value = '';
    document.getElementById('aiOutput').textContent = '';
  }

  // =========================
  // 🛠️ UTILS
  // =========================
  setProfile(profileId) {
    this.activeProfile = profileId;
    
    document.querySelectorAll('.profile-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.profile === profileId);
    });
    
    document.getElementById('contextInfo').textContent = 
      `${this.profiles[profileId]?.emoji} ${this.profiles[profileId]?.name}`;
  }

  injectContext(context) {
    const prompt = document.getElementById('aiPrompt');
    if (prompt && context) {
      prompt.value = `[KONTEXT: ${context.brama || context.name}]
${prompt.value}`;
    }
  }

  setLoading(loading) {
    const btn = document.getElementById('generateContent');
    btn.disabled = loading;
    btn.textContent = loading ? '⏳ Generuję...' : '✨ GENERUJ';
  }

  updateStats() {
    document.getElementById('aiStats').textContent = 
      `${this.generationStats.total} generacji | ${this.generationStats.words.toLocaleString()} słów`;
  }

  showToast(message, type = 'info') {
    // Mock toast - zastąp realnym systemem
    console.log(`🧠 Bella Toast [${type}]: ${message}`);
  }

  announceReady() {
    document.dispatchEvent(new CustomEvent('bellaReady', { 
      detail: { version: this.version, profiles: Object.keys(this.profiles) } 
    }));
  }
}

// =========================
// 🚀 GLOBAL INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  window.BellaAI = new BellaAI();
  
  // Auto-init z ETERNIVERSE
  if (window.ETERNIVERSE) {
    window.ETERNIVERSE.addEventListener('bramaSelected', () => {
      window.BellaAI?.syncWithETERNIVERSE();
    });
  }
});

console.log('🧠 Bella AI v4.0 MEGA — Ładowanie kompletne!');
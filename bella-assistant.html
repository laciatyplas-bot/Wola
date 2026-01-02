// === BELLA v4.0 MEGA — PEŁNA INTEGRACJA ETERNIVERSE ===
class BellaV4 {
  constructor() {
    this.version = '4.0';
    this.currentProfile = 'eterseeker';
    this.recognition = null;
    this.isRecording = false;
    this.activeBramaId = 1;
    this.stats = { words: 0, chars: 0, sessions: 0 };
    
    this.init();
    this.startEterniverseSync();
    this.startAutoSave();
  }

  init() {
    console.log('🧠 Bella v4.0 MEGA — Inicjalizacja...');
    this.injectMegaUI();
    this.bindElements();
    this.initSpeechRecognition();
    this.loadDraft();
    this.updateStats();
    this.bindEterniverse();
    console.log('✅ Bella v4.0 MEGA — FULLY OPERATIONAL');
  }

  // =========================
  // 🎨 MEGA UI INJECTION
  // =========================
  injectMegaUI() {
    if (document.getElementById('bella-mega-container')) return;
    
    const container = document.createElement('div');
    container.id = 'bella-mega-container';
    container.innerHTML = this.generateMegaHTML();
    document.body.appendChild(container);
    
    this.injectMegaStyles();
  }

  generateMegaHTML() {
    return `
      <div id="bella-mega-panel" class="bella-panel-mega">
        <!-- Profile Switcher -->
        <div class="profile-bar">
          <button class="profile-btn active" data-profile="wattpad">📖 Wattpad</button>
          <button class="profile-btn" data-profile="eterseeker">✨ EterSeeker</button>
          <button class="profile-btn" data-profile="amazon">🛒 Amazon</button>
          <button class="profile-btn" data-profile="kanon">📚 Kanon</button>
        </div>
        
        <!-- Console + Controls -->
        <div class="console-section">
          <textarea id="console" placeholder="Konsola Bella (Enter = wykonaj)"></textarea>
          <div class="control-bar">
            <button id="startRec">🎤 Start</button>
            <button id="stopRec" disabled>⏹️ Stop</button>
            <button id="aiAnalyze">🔍 Analizuj</button>
            <button id="aiGenerate">✨ Generuj</button>
          </div>
        </div>
        
        <!-- Editor -->
        <div class="editor-section">
          <textarea id="editor" placeholder="Główny edytor..."></textarea>
        </div>
        
        <!-- Stats + Export -->
        <div class="stats-bar">
          <span id="wordCount">0 słów</span>
          <span id="readability">😐</span>
          <span id="bramaInfo">-</span>
          <button id="exportDocx">📄 DOCX</button>
          <button id="exportPdf">🖨️ PDF</button>
        </div>
        
        <!-- Suggestions -->
        <div id="suggestions" class="suggestions-panel"></div>
      </div>
    `;
  }

  injectMegaStyles() {
    if (document.getElementById('bella-mega-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'bella-mega-styles';
    style.textContent = `
      #bella-mega-panel {
        max-width: 900px; margin: 0 auto; padding: 24px;
        background: linear-gradient(145deg, rgba(5,5,16,0.95), rgba(10,10,42,0.9));
        backdrop-filter: blur(25px); border-radius: 24px;
        border: 2px solid #00ffff40; box-shadow: 0 40px 80px rgba(0,255,255,0.15);
        font-family: 'SF Mono', monospace; color: #e0ffff;
      }
      
      .profile-bar {
        display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;
      }
      
      .profile-btn {
        padding: 12px 20px; background: rgba(0,255,255,0.15);
        color: #e0ffff; border: 1px solid #00ffff30; border-radius: 20px;
        font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.3s;
        text-transform: uppercase; letter-spacing: 1px;
      }
      
      .profile-btn.active, .profile-btn:hover {
        background: #00ffff; color: #000; box-shadow: 0 0 25px #00ffff;
        transform: translateY(-3px) scale(1.05);
      }
      
      #console, #editor {
        width: 100%; height: 160px; padding: 16px;
        background: rgba(10,10,26,0.85); color: #e0ffff; border-radius: 16px;
        border: 1px solid #00ffff40; font-family: monospace; font-size: 14px;
        resize: vertical; margin-bottom: 16px;
      }
      
      #console:focus, #editor:focus {
        outline: none; border-color: #00ffff; box-shadow: 0 0 30px #00ffff50;
      }
      
      .control-bar {
        display: flex; gap: 12px; margin-bottom: 20px;
      }
      
      .control-bar button {
        flex: 1; padding: 14px; background: linear-gradient(145deg, #00ffff44, #00ccff33);
        color: #e0ffff; border: 1px solid #00ffff30; border-radius: 12px;
        font-weight: 700; cursor: pointer; transition: all 0.3s;
      }
      
      .control-bar button:hover:not(:disabled) {
        background: #00ffff; color: #000; transform: translateY(-2px);
        box-shadow: 0 15px 30px rgba(0,255,255,0.4);
      }
      
      .control-bar button:disabled { opacity: 0.4; cursor: not-allowed; }
      
      .stats-bar {
        display: flex; gap: 20px; align-items: center; justify-content: space-between;
        padding: 16px; background: rgba(0,15,30,0.7); border-radius: 12px;
        font-size: 13px; margin-bottom: 16px;
      }
      
      .suggestions-panel {
        background: rgba(0,20,40,0.6); padding: 16px; border-radius: 12px;
        border-left: 4px solid #00ffff; max-height: 200px; overflow-y: auto;
      }
      
      .suggestion-item {
        padding: 8px; margin: 4px 0; background: rgba(0,255,255,0.1);
        border-radius: 8px; cursor: pointer; transition: all 0.2s;
      }
      
      .suggestion-item:hover { background: rgba(0,255,255,0.3); transform: translateX(8px); }
    `;
    document.head.appendChild(style);
  }

  // =========================
  // 🔌 BIND EVENTS
  // =========================
  bindElements() {
    this.el = {
      console: document.getElementById('console'),
      editor: document.getElementById('editor'),
      suggestions: document.getElementById('suggestions'),
      profileBtns: document.querySelectorAll('.profile-btn'),
      startRec: document.getElementById('startRec'),
      stopRec: document.getElementById('stopRec'),
      aiAnalyze: document.getElementById('aiAnalyze'),
      aiGenerate: document.getElementById('aiGenerate'),
      exportDocx: document.getElementById('exportDocx'),
      exportPdf: document.getElementById('exportPdf'),
      wordCount: document.getElementById('wordCount'),
      readability: document.getElementById('readability'),
      sentiment: document.getElementById('sentiment') || document.getElementById('bramaInfo'),
      bramaInfo: document.getElementById('bramaInfo')
    };

    // Events
    this.el.profileBtns.forEach(btn => btn.onclick = () => this.setProfile(btn.dataset.profile));
    this.el.startRec.onclick = () => this.startRecording();
    this.el.stopRec.onclick = () => this.stopRecording();
    this.el.aiAnalyze.onclick = () => this.analyze();
    this.el.aiGenerate.onclick = () => this.generate();
    this.el.exportDocx.onclick = () => this.exportDocx();
    this.el.exportPdf.onclick = () => this.exportPdf();

    // Console Enter
    this.el.console.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.processCommand(this.el.console.value.trim());
        this.el.console.value = '';
      }
    });

    // Live stats
    this.el.console.oninput = this.el.editor.oninput = () => this.updateStats();
  }

  // =========================
  // 🌌 ETERNIVERSE MEGA SYNC
  // =========================
  bindEterniverse() {
    ['worldSelected', 'bramaSelected', 'eterniverseReady'].forEach(event => {
      document.addEventListener(event, e => this.onETERNIVERSEEvent(e), { once: false });
    });
  }

  startEterniverseSync() {
    setInterval(() => {
      if (window.ETERNIVERSE?.activeBrama) {
        this.syncBrama(window.ETERNIVERSE.activeBrama);
      }
    }, 2000);
  }

  onETERNIVERSEEvent(e) {
    const detail = e.detail;
    if (detail.brama) {
      this.syncBrama(detail.brama);
    }
  }

  syncBrama(brama) {
    this.activeBramaId = brama.id;
    this.el.bramaInfo.textContent = `Brama ${brama.id}: ${brama.nazwa}`;
    
    // Auto-profile z data.js
    const profileMap = {
      1: 'wattpad', 2: 'eterseeker', 3: 'eterseeker', 4: 'kanon',
      5: 'amazon', 6: 'eterseeker', 7: 'wattpad'
    };
    
    this.setProfile(profileMap[brama.id] || 'eterseeker');
    
    // Load brama memory
    const memKey = `ETERNIVERSE_AI_MEMORY_BRAMA_${brama.id}`;
    const mem = localStorage.getItem(memKey);
    if (mem && this.el.console) {
      this.el.console.value = `📚 PAMIĘĆ BRAMY ${brama.id}:
${mem.slice(-1500)}`;
    }
  }

  // =========================
  // 🎯 CORE FUNCTIONS
  // =========================
  setProfile(profile) {
    this.currentProfile = profile;
    document.querySelectorAll('.profile-btn').forEach(b => 
      b.classList.toggle('active', b.dataset.profile === profile)
    );
    this.saveDraft();
  }

  processCommand(cmd) {
    if (!cmd) return;
    
    const output = this.generateCommandOutput(cmd);
    this.el.editor.value += `

> ${cmd}
${output}`;
    
    this.saveToBramaMemory(cmd + '
' + output);
    this.updateStats();
  }

  generateCommandOutput(cmd) {
    const templates = {
      amazon: `Analiza rynku: ${cmd} → Potencjał konwersji wysoki. CTA: "Kup teraz!"`,
      wattpad: `${cmd}... Ale wtedy stało się coś nieoczekiwanego. Co dalej?`,
      eterseeker: `Nie pytasz o ${cmd}. Pytasz o przestrzeń między słowami.`,
      kanon: `Kanon bramy ${this.activeBramaId}: ${cmd} zapisane w pamięci ETERNIVERSE.`
    };
    return templates[this.currentProfile] || cmd;
  }

  analyze() {
    const text = this.el.editor.value;
    const suggestions = this.getMegaSuggestions(text);
    this.renderSuggestions(suggestions);
  }

  generate() {
    const base = {
      amazon: 'Wyobraź sobie produkt, który zmienia reguły gry. Zamów teraz.',
      wattpad: 'Serce biło jak szalone. Drzwi się otworzyły. A za nimi...',
      eterseeker: 'Świadomość nie jest celem. Jest przestrzenią, w której cel się pojawia.',
      kanon: `[KANON BRAMA ${this.activeBramaId}] Narracja zapisana w wieczności.`
    };
    
    this.el.editor.value += '

' + base[this.currentProfile];
    this.saveToBramaMemory(base[this.currentProfile]);
    this.updateStats();
  }

  // =========================
  // 🎙️ SPEECH RECOGNITION
  // =========================
  initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) return;
    
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'pl-PL';
    
    this.recognition.onresult = e => this.onSpeechResult(e);
    this.recognition.onerror = e => console.error('Speech error:', e);
  }

  startRecording() {
    this.isRecording = true;
    this.el.startRec.disabled = true;
    this.el.stopRec.disabled = false;
    this.recognition.start();
  }

  stopRecording() {
    this.isRecording = false;
    this.el.startRec.disabled = false;
    this.el.stopRec.disabled = true;
    this.recognition.stop();
  }

  onSpeechResult(e) {
    let final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        final += e.results[i][0].transcript;
      }
    }
    if (final) {
      this.el.console.value += final + ' ';
      this.processCommand(final);
    }
  }

  // =========================
  // 💾 MEMORY + PERSISTENCE
  // =========================
  saveToBramaMemory(text) {
    if (!this.activeBramaId) return;
    const key = `ETERNIVERSE_AI_MEMORY_BRAMA_${this.activeBramaId}`;
    const old = localStorage.getItem(key) || '';
    const newMem = (old + '
' + text).slice(-5000);
    localStorage.setItem(key, newMem);
  }

  loadDraft() {
    const draft = JSON.parse(localStorage.getItem('bella_draft') || '{}');
    if (draft.content) {
      this.el.editor.value = draft.content;
      this.setProfile(draft.profile || 'eterseeker');
    }
  }

  saveDraft() {
    localStorage.setItem('bella_draft', JSON.stringify({
      content: this.el.editor.value,
      profile: this.currentProfile,
      brama: this.activeBramaId,
      saved: new Date().toISOString()
    }));
  }

  startAutoSave() {
    setInterval(() => this.saveDraft(), 3000);
  }

  // =========================
  // 📊 STATS + ANALYSIS
  // =========================
  updateStats() {
    const text = this.el.editor.value;
    const words = text.trim().split(/s+/).filter(Boolean).length;
    const chars = text.length;
    
    this.stats.words = words;
    this.stats.chars = chars;
    
    this.el.wordCount.textContent = `${words} słów | ${chars} znaków`;
    
    // Readability/Sentiment z data.js emocji
    const readability = Math.min(100, 40 + words / 5);
    this.el.readability.textContent = `📊 ${readability.toFixed(0)}%`;
    
    // Sentiment analysis
    const sentiment = this.analyzeSentiment(text);
    this.el.sentiment.textContent = sentiment.emoji;
  }

  analyzeSentiment(text) {
    const positive = /(miłość|nadzieja|wolność|światło)/i.test(text);
    const negative = /(ból|strach|ciemność|zniszczenie)/i.test(text);
    return positive ? '😊' : negative ? '😔' : '😐';
  }

  getMegaSuggestions(text) {
    const brama = window.ETERNIVERSE?.activeBrama;
    return [
      `Kontynuuj Bramę ${brama?.id || this.activeBramaId}`,
      `Perspektywa ${window.eterniverseData?.postacie.elara?.imie || 'Elara'}`, 
      `Wstaw cytat z kanonu`,
      `Zwiększ napięcie o 20%`
    ];
  }

  renderSuggestions(sugs) {
    this.el.suggestions.innerHTML = sugs.map(s => 
      `<div class="suggestion-item" onclick="BellaV4.injectSuggestion('${s}')">${s}</div>`
    ).join('');
  }

  static injectSuggestion(suggestion) {
    document.querySelector('#editor').value += `

${suggestion}`;
    BellaV4.instance.updateStats();
  }

  // =========================
  // 📤 EXPORT PRO
  // =========================
  async exportDocx() {
    try {
      const { Document, Packer, Paragraph, TextRun } = await import('https://cdn.skypack.dev/docx');
      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({
              children: [new TextRun({
                text: `ETERNIVERSE Export | Brama ${this.activeBramaId}`,
                bold: true, size: 28
              })]
            }),
            new Paragraph(this.el.editor.value)
          ]
        }]
      });
      
      const blob = await Packer.toBlob(doc);
      this.download(blob, `eterniverse-brama-${this.activeBramaId}.docx`);
    } catch (e) {
      this.showToast('DOCX wymaga docx lib', 'warn');
    }
  }

  exportPdf() {
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>ETERNIVERSE PDF</title>
      <style>body{font-family:monospace;padding:40px;background:#050510;color:#e0ffff;line-height:1.6}</style></head>
      <body>
        <h1 style="color:#00ffff;text-shadow:0 0 20px #00ffff">Brama ${this.activeBramaId}</h1>
        <pre style="white-space:pre-wrap">${this.el.editor.value}</pre>
      </body></html>
    `);
    win.document.close();
    win.print();
  }

  download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  showToast(msg, type) {
    console.log(`🧠 Bella [${type}]: ${msg}`);
  }
}

// Global instance
BellaV4.instance = new BellaV4();

// Static method dla suggestions
window.BellaV4 = BellaV4;
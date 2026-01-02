/**
 * ETERNIVERSE - WZMOCNIONY EDITOR.JS v4.0
 * AI-Assisted Writing + GitHub Sync | 2026
 * Maciej Maciuszek | Sosnowiec
 */

class EterniverseEditor {
  constructor() {
    this.editor = null;
    this.preview = null;
    this.currentBrama = 1;
    this.isFocusMode = false;
    this.wordGoal = window.eterniverseData?.cele.dzienne.slowa || 2500;
    this.sessionStats = { words: 0, chars: 0, time: 0 };
    this.bellaActive = false;
    
    this.init();
  }

  init() {
    console.log('✍️ EterniverseEditor v4.0 - Edytor online');
    this.createEditorUI();
    this.setupEditor();
    this.loadCurrentContent();
    this.bindEvents();
    this.startStatsTracker();
    this.setupBellaAI();
  }

  // 🖥️ Create Editor Interface
  createEditorUI() {
    const editorSection = document.getElementById('editor-section') || 
                         this.createEditorSection();
    
    editorSection.innerHTML = `
      <div class="editor-header">
        <div class="brama-nav">
          <button id="prev-brama">⬅️ Poprzednia</button>
          <span id="brama-title">Brama ${this.currentBrama}: <span id="brama-name"></span></span>
          <button id="next-brama">Następna ➡️</button>
        </div>
        <div class="editor-controls">
          <button id="bella-btn">🧠 Bella AI</button>
          <button id="focus-btn">🎯 Focus</button>
          <button id="autosave">💾 Auto-save</button>
          <span id="word-stats">0 / ${this.wordGoal} słów</span>
        </div>
      </div>
      
      <div class="editor-container">
        <div id="editor" class="editor-pane"></div>
        <div id="preview" class="preview-pane"></div>
      </div>
      
      <div class="session-footer">
        ⏱️ <span id="session-timer">00:00:00</span> | 
        ✍️ <span id="live-words">0</span> słów | 
        📊 <span id="wpm">0</span> WPM
      </div>
    `;
    
    document.body.appendChild(editorSection);
    this.updateBramaTitle();
  }

  createEditorSection() {
    const section = document.createElement('section');
    section.id = 'editor-section';
    section.className = 'editor-section';
    return section;
  }

  // ⌨️ Advanced Editor Setup
  setupEditor() {
    this.editor = document.getElementById('editor');
    this.preview = document.getElementById('preview');
    
    // Contenteditable z superpowers
    this.editor.contentEditable = true;
    this.editor.className = 'monospace glow-focus';
    this.editor.innerHTML = '# Zacznij pisać tutaj...

**Witaj w ETERNIVERSE**';
    
    // Focus styling
    this.editor.addEventListener('focus', () => {
      this.editor.classList.add('focused');
      document.body.classList.add('editor-active');
    });
    
    this.editor.addEventListener('blur', () => {
      this.editor.classList.remove('focused');
      this.saveContent();
    });
  }

  // 🔗 Bramy Navigation
  bindEvents() {
    // Bramy
    document.getElementById('prev-brama').addEventListener('click', () => 
      this.switchBrama(-1));
    document.getElementById('next-brama').addEventListener('click', () => 
      this.switchBrama(1));
    
    // Controls
    document.getElementById('bella-btn').addEventListener('click', () => 
      this.toggleBella());
    document.getElementById('focus-btn').addEventListener('click', () => 
      this.toggleFocus());
    document.getElementById('autosave').addEventListener('click', () => 
      this.manualSave());
    
    // Keyboard suite
    this.setupKeyboardSuite();
  }

  setupKeyboardSuite() {
    document.addEventListener('keydown', (e) => {
      if (document.activeElement !== this.editor) return;
      
      // Markdown shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch(e.key) {
          case 'b': e.preventDefault(); this.wrapSelection('**'); break;
          case 'i': e.preventDefault(); this.wrapSelection('*'); break;
          case 'k': e.preventDefault(); this.insertLink(); break;
          case 'Enter':
            if (e.shiftKey) return;
            e.preventDefault();
            document.execCommand('insertHTML', false, '

');
            break;
        }
      }
      
      // Bramy quick switch
      if (e.altKey) {
        const num = parseInt(e.key);
        if (num > 0 && num < 10) {
          this.switchBramaTo(num);
        }
      }
    });
  }

  // 🧠 Bella AI Integration
  setupBellaAI() {
    this.bellaBtn = document.getElementById('bella-btn');
  }

  toggleBella() {
    this.bellaActive = !this.bellaActive;
    this.bellaBtn.textContent = this.bellaActive ? '❌ Bella OFF' : '🧠 Bella AI';
    this.bellaBtn.style.background = this.bellaActive ? '#ff4444' : '';
    
    if (this.bellaActive) {
      this.injectBellaSuggestion();
    }
  }

  injectBellaSuggestion() {
    const suggestion = window.eterniverseAPI?.getBellaSuggestion?.() || 
      `**Bella sugeruje:** Kontynuuj z perspektywy ${window.eterniverseData.postacie.elara.imie}. 
       Użyj napięcia z Bramy Gamma - Algorytm obserwuje każdy ruch.`;
    
    const suggestDiv = document.createElement('div');
    suggestDiv.className = 'bella-suggestion';
    suggestDiv.innerHTML = suggestion;
    suggestDiv.onclick = () => this.insertSuggestion(suggestion);
    
    this.editor.parentNode.insertBefore(suggestDiv, this.editor.nextSibling);
    
    setTimeout(() => suggestDiv.remove(), 10000);
  }

  // ⏱️ Real-time Stats
  startStatsTracker() {
    let lastWords = 0;
    let lastTime = Date.now();
    
    this.statsInterval = setInterval(() => {
      this.updateStats();
      
      // WPM calculation
      const now = Date.now();
      const minutes = (now - lastTime) / 60000;
      const wpm = Math.round((this.sessionStats.words - lastWords) / minutes);
      
      document.getElementById('wpm').textContent = wpm;
      lastWords = this.sessionStats.words;
      lastTime = now;
    }, 1000);
  }

  updateStats() {
    const text = this.editor.textContent;
    this.sessionStats.words = text.trim().split(/s+/).length;
    this.sessionStats.chars = text.length;
    this.sessionStats.time++;
    
    const progress = Math.min(100, (this.sessionStats.words / this.wordGoal) * 100);
    
    document.getElementById('live-words').textContent = this.sessionStats.words;
    document.getElementById('word-stats').innerHTML = 
      `${this.sessionStats.words} / ${this.wordGoal} słów <span style="color:#00ff88">${progress.toFixed(0)}%</span>`;
    document.getElementById('session-timer').textContent = 
      this.formatTime(this.sessionStats.time);
    
    // Goal reached celebration
    if (progress >= 100 && !this.celebrated) {
      this.celebrateGoal();
      this.celebrated = true;
    }
  }

  // 🚀 Bramy System
  switchBrama(direction) {
    const bramy = window.eterniverseData.kanon.bramy;
    this.currentBrama = Math.max(1, Math.min(bramy.length, this.currentBrama + direction));
    this.saveContent();
    this.loadContentForBrama();
    this.updateBramaTitle();
  }

  switchBramaTo(num) {
    this.currentBrama = Math.max(1, Math.min(10, num));
    this.loadContentForBrama();
    this.updateBramaTitle();
  }

  updateBramaTitle() {
    const brama = window.eterniverseData.kanon.bramy[this.currentBrama - 1];
    document.getElementById('brama-name').textContent = brama?.nazwa || 'Nowa Brama';
    document.title = `ETERNIVERSE - ${brama?.nazwa || 'Edytor'}`;
  }

  // 💾 Save/Load System
  saveContent() {
    const content = {
      brama: this.currentBrama,
      content: this.editor.innerHTML,
      timestamp: new Date().toISOString(),
      stats: { ...this.sessionStats }
    };
    
    localStorage.setItem(`eterniverse-brama-${this.currentBrama}`, JSON.stringify(content));
    window.eterniverseAPI?.saveSesja?.({
      id: `brama${this.currentBrama}-${Date.now()}`,
      slowa: this.sessionStats.words,
      brama: this.currentBrama
    });
    
    document.getElementById('autosave').textContent = '💾 Saved';
    setTimeout(() => {
      document.getElementById('autosave').textContent = '💾 Auto-save';
    }, 2000);
  }

  loadContentForBrama() {
    const saved = localStorage.getItem(`eterniverse-brama-${this.currentBrama}`);
    if (saved) {
      const content = JSON.parse(saved);
      this.editor.innerHTML = content.content;
      this.sessionStats = content.stats || { words: 0, chars: 0, time: 0 };
    }
  }

  loadCurrentContent() {
    if (location.hash) {
      const bramaNum = parseInt(location.hash.match(/brama-?(d+)/)?.[1]) || 1;
      this.currentBrama = bramaNum;
    }
    this.loadContentForBrama();
  }

  // 🎉 Celebrations & UX
  celebrateGoal() {
    this.editor.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
    setTimeout(() => {
      this.editor.style.background = '';
    }, 2000);
    
    // Sound feedback (mobile-friendly)
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAo');
    audio.play().catch(() => {});
  }

  toggleFocus() {
    this.isFocusMode = !this.isFocusMode;
    document.body.classList.toggle('focus-mode', this.isFocusMode);
    document.getElementById('focus-btn').textContent = 
      this.isFocusMode ? '❌ Focus OFF' : '🎯 Focus';
  }

  // Markdown helpers
  wrapSelection(wrapChar) {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      
      const wrapStart = document.createTextNode(wrapChar);
      const wrapEnd = document.createTextNode(wrapChar);
      const span = document.createElement('span');
      
      range.insertNode(wrapStart);
      range.collapse(false);
      range.insertNode(span);
      range.collapse(false);
      range.insertNode(wrapEnd);
    }
  }

  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h ? h+':' : ''}${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  // Utils
  manualSave() { this.saveContent(); }
  insertSuggestion(text) { 
    this.editor.innerHTML += `<p>${text}</p>`; 
  }
}

// 🚀 Initialize when #writing or editor visible
if (location.hash.includes('writing') || document.readyState === 'complete') {
  window.EterniverseEditor = new EterniverseEditor();
}

document.addEventListener('DOMContentLoaded', () => {
  if (location.hash.includes('writing')) {
    new EterniverseEditor();
  }
});
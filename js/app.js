// app.js — ETERNIVERSE BOOK MASTER v2.0 — KWANTOWE PIÓRO
// Architektura 8 Światów × 10 Bram | Wydawnictwo Architekta Woli
// 2026 | Maciej Maciuszek — Pełna funkcjonalność narracyjna

class EterNiverse {
  constructor() {
    this.currentWorld = 1;
    this.currentBrama = 1;
    this.currentChapter = 1;
    this.data = this.loadData();
    this.init();
  }

  // 🌌 INICJALIZACJA POLA NARRACJI
  init() {
    this.bindEvents();
    this.updateUI();
    this.loadCurrentContent();
    this.startAutoSave();
    this.initAnimations();
    console.log('🚀 ETERNIVERSE BOOK MASTER 2.0 zainicjowany');
  }

  // 🔗 WIĄZANIE IMPULSÓW
  bindEvents() {
    // Światy
    document.querySelectorAll('.world-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchWorld(e.target.dataset.world));
    });

    // Bramy
    document.querySelectorAll('.world-item').forEach(item => {
      item.addEventListener('click', (e) => this.switchBrama(e.currentTarget.dataset.brama));
    });

    // Zakładki
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });

    // Rozdziały
    document.getElementById('chaptersList').addEventListener('click', (e) => {
      if (e.target.classList.contains('chapter-item')) {
        this.switchChapter(e.target);
      }
    });

    // Editor
    document.getElementById('mainEditor').addEventListener('input', () => {
      this.debounceSave();
    });

    // AI Console
    document.getElementById('aiCommand').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.executeAI();
    });
    document.querySelector('.ai-input button').addEventListener('click', () => this.executeAI());

    // Cover
    this.initCoverControls();
    this.initAudioControls();

    // Hotkeys
    document.addEventListener('keydown', (e) => this.handleHotkeys(e));
  }

  // 🌍 PRZEŁĄCZANIE ŚWIATÓW
  switchWorld(worldId) {
    this.currentWorld = parseInt(worldId);
    document.querySelectorAll('.world-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-world="${worldId}"]`).classList.add('active');
    this.updateUI();
    this.loadCurrentContent();
    this.notify(`Aktywowano Świat ${worldId}`, 'world');
  }

  // 🚪 PRZEŁĄCZANIE BRAM
  switchBrama(bramaId) {
    this.currentBrama = parseInt(bramaId);
    document.querySelectorAll('.world-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-brama="${bramaId}"]`).classList.add('active');
    this.updateUI();
    this.loadCurrentContent();
    this.notify(`Otwarto Bramę ${bramaId}`, 'gate');
  }

  // 📑 PRZEŁĄCZANIE ZAKŁADEK
  switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId + 'Tab').classList.add('active');
  }

  // 📖 PRZEŁĄCZANIE ROZDZIAŁÓW
  switchChapter(chapterEl) {
    document.querySelectorAll('.chapter-item').forEach(ch => ch.classList.remove('active'));
    chapterEl.classList.add('active');
    this.currentChapter = Array.from(document.querySelectorAll('.chapter-item')).indexOf(chapterEl) + 1;
    this.notify(`Aktywny rozdział: ${chapterEl.textContent}`, 'chapter');
  }

  // ✨ AKTUALIZACJA INTERFEJSU
  updateUI() {
    document.getElementById('currentWorld').textContent = this.currentWorld;
    document.getElementById('currentBrama').textContent = this.currentBrama;
    document.getElementById('bookTitle').textContent = 
      `Świat ${this.currentWorld} • Brama ${this.currentBrama}`;
    
    document.getElementById('audioTitle').textContent = 
      `Rozdział ${this.currentChapter} - Świat ${this.currentWorld}`;
    
    document.querySelector('.cover-canvas').dataset.world = this.currentWorld;
  }

  // 💾 SYSTEM ZAPISÓW
  loadData() {
    const data = {};
    for (let world = 1; world <= 8; world++) {
      data[world] = {};
      for (let brama = 1; brama <= 10; brama++) {
        data[world][brama] = {
          chapters: this.getSavedChapters(world, brama),
          metadata: JSON.parse(localStorage.getItem(`eter-world${world}-brama${brama}`) || '{}')
        };
      }
    }
    return data;
  }

  getSavedChapters(world, brama) {
    const chapters = localStorage.getItem(`eter-chapters-w${world}b${brama}`);
    return chapters ? JSON.parse(chapters) : ['Rozdział 1: Początek'];
  }

  saveData() {
    const editorContent = document.getElementById('mainEditor').innerText;
    const key = `eter-w${this.currentWorld}b${this.currentBrama}-ch${this.currentChapter}`;
    
    localStorage.setItem(key, editorContent);
    
    // Metadata
    const metadata = {
      title: document.getElementById('bookTitle').textContent,
      lastEdit: new Date().toISOString(),
      wordCount: editorContent.split(/s+/).length,
      world: this.currentWorld,
      brama: this.currentBrama
    };
    
    localStorage.setItem(`eter-world${this.currentWorld}-brama${this.currentBrama}`, JSON.stringify(metadata));
  }

  loadCurrentContent() {
    const key = `eter-w${this.currentWorld}b${this.currentBrama}-ch${this.currentChapter}`;
    const content = localStorage.getItem(key) || 
      `Witaj w Świecie ${this.currentWorld}, Bramie ${this.currentBrama}!

Rozpocznij swoją narrację...`;
    
    document.getElementById('mainEditor').innerText = content;
  }

  // ⏱️ AUTOZAPIS
  startAutoSave() {
    this.saveTimeout = null;
    this.lastSave = Date.now();
  }

  debounceSave() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saveData();
      document.getElementById('status').textContent = 
        `Zapisano: ${new Date().toLocaleTimeString()}`;
      this.lastSave = Date.now();
    }, 1500);
  }

  // 🤖 AI CONSOLE
  executeAI() {
    const command = document.getElementById('aiCommand').value.trim().toLowerCase();
    const output = document.getElementById('aiOutput');
    
    if (!command) return;
    
    const response = this.processAICommand(command);
    output.innerHTML += `<div style="color: var(--gate-teal); margin-top: 0.5rem;">[AI] ${response}</div>`;
    output.scrollTop = output.scrollHeight;
    document.getElementById('aiCommand').value = '';
  }

  processAICommand(cmd) {
    if (cmd.includes('add chapter')) {
      this.addChapter();
      return '📖 Nowy rozdział dodany';
    }
    
    if (cmd.includes('generate plot')) {
      this.generatePlot();
      return '✨ Fabuła wygenerowana dla bieżącego świata';
    }
    
    if (cmd.includes('create cover')) {
      this.generateCover();
      return '🖼️ Okładka AI wygenerowana';
    }
    
    if (cmd.includes('tts') || cmd.includes('audio')) {
      this.generateTTS();
      return '🎧 Audiobook generowany...';
    }
    
    if (cmd.includes('expand')) {
      this.expandContent();
      return '📝 Treść rozbudowana';
    }
    
    return '❓ Nieznana komenda. Spróbuj: "add chapter", "generate plot", "create cover"';
  }

  addChapter() {
    const chaptersList = document.getElementById('chaptersList');
    const newChapter = document.createElement('div');
    newChapter.className = 'chapter-item active';
    newChapter.textContent = `Rozdział ${chaptersList.children.length + 1}: Nowy`;
    newChapter.addEventListener('click', (e) => this.switchChapter(newChapter));
    chaptersList.appendChild(newChapter);
    this.currentChapter = chaptersList.children.length;
  }

  generatePlot() {
    const plots = [
      `W Świecie ${this.currentWorld} rozpoczyna się kosmiczna epopeja...`,
      `Brama ${this.currentBrama} otwiera portal do nieznanych wymiarów...`,
      `Postać główna staje przed niemożliwym wyborem...`
    ];
    
    const editor = document.getElementById('mainEditor');
    editor.innerText += `

${plots[Math.floor(Math.random() * plots.length)]}

`;
    editor.scrollTop = editor.scrollHeight;
  }

  generateCover() {
    const canvas = document.querySelector('.cover-canvas');
    canvas.style.background = `linear-gradient(135deg, var(--world-${this.currentWorld}), hsl(${Math.random()*360}, 70%, 60%))`;
  }

  generateTTS() {
    const utterance = new SpeechSynthesisUtterance(
      `Bella czyta rozdział ${this.currentChapter} z Świata ${this.currentWorld}. `
      + document.getElementById('mainEditor').innerText.slice(0, 200) + '...'
    );
    utterance.lang = 'pl-PL';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }

  expandContent() {
    const editor = document.getElementById('mainEditor');
    const currentText = editor.innerText;
    editor.innerText = currentText + 
      `

[Rozbudowa AI]
Nowa warstwa narracji rozwija konflikt w Bramie ${this.currentBrama}...`;
  }

  // 🖼️ COVER CONTROLS
  initCoverControls() {
    const canvas = document.querySelector('.cover-canvas');
    let isDragging = false;
    let rotation = 0;

    canvas.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        rotation += e.movementX * 0.5;
        canvas.style.transform = `rotateY(${rotation}deg)`;
      }
    });
    document.addEventListener('mouseup', () => isDragging = false);

    document.querySelectorAll('input[type="color"]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.id === 'bgColor') {
          canvas.style.backgroundColor = e.target.value;
        }
      });
    });
  }

  // 🎧 AUDIO CONTROLS
  initAudioControls() {
    const playBtn = document.querySelector('.audiobook-panel button[style*="▶️"]');
    const stopBtn = document.querySelector('.audiobook-panel button[style*="⏹️"]');
    
    playBtn.addEventListener('click', () => {
      this.generateTTS();
      playBtn.style.display = 'none';
      stopBtn.style.display = 'inline-block';
    });
    
    stopBtn.addEventListener('click', () => {
      speechSynthesis.cancel();
      playBtn.style.display = 'inline-block';
      stopBtn.style.display = 'none';
    });
  }

  // ⌨️ HOTKEYS
  handleHotkeys(e) {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 's': 
          e.preventDefault();
          this.saveData();
          this.notify('💾 Ręczny zapis', 'save');
          break;
        case 'n':
          e.preventDefault();
          this.addChapter();
          break;
        case 'Enter':
          e.preventDefault();
          this.executeAI();
          break;
      }
    }
  }

  // 🔔 NOTYFIKACJE
  notify(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `🌌 ${message}`;
    toast.style.background = type === 'world' ? 'linear-gradient(135deg, var(--world-1), var(--world-2))' :
                             type === 'gate' ? 'linear-gradient(135deg, var(--gate-gold), var(--gate-teal))' :
                             type === 'save' ? 'linear-gradient(135deg, var(--gate-purple), #A57EFF)' : 
                             'linear-gradient(135deg, var(--gate-teal), var(--gate-gold))';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // 🎭 ANIMACJE
  initAnimations() {
    // Pulsujące światy
    document.querySelectorAll('.world-btn.active').forEach(btn => {
      btn.style.animation = 'worldPulse 2s ease-in-out infinite';
    });
  }
}

// 🚀 URUCHOMIENIE MISTRZA
document.addEventListener('DOMContentLoaded', () => {
  window.eterNiverse = new EterNiverse();
  
  // PWA Ready
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
});

// Export dla Bella Bridge
window.exportToBella = () => {
  const content = document.getElementById('mainEditor').innerText;
  window.parent.postMessage({
    type: 'BELLA_EXPORT',
    payload: content,
    world: window.eterNiverse.currentWorld,
    brama: window.eterNiverse.currentBrama
  }, '*');
};
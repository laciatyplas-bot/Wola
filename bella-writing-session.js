'use strict';

// ========================================
// BELLA — SESJA PISARSKA
// DLA: ETERNIVERSE BOOK MASTER v4.0
// ========================================

class BellaWritingSession {
  constructor() {
    this.active = false;
    this.startTime = 0;
    this.startWords = 0;
    this.editor = null;

    this.init();
  }

  init() {
    this.editor = document.getElementById('mainEditor');

    if (!this.editor) {
      console.warn('BellaWritingSession: brak #mainEditor');
      return;
    }

    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        this.toggle();
      }
    });

    console.log('Bella Writing Session READY');
  }

  toggle() {
    this.active ? this.exit() : this.enter();
  }

  enter() {
    this.active = true;
    this.startTime = Date.now();
    this.startWords = this.countWords();

    document.body.classList.add('writing-session');
    this.injectOverlay();

    this.timer = setInterval(() => this.update(), 1000);
  }

  exit() {
    this.active = false;
    clearInterval(this.timer);

    document.body.classList.remove('writing-session');
    document.getElementById('writingSessionOverlay')?.remove();
  }

  update() {
    const time = Math.floor((Date.now() - this.startTime) / 1000);
    const words = this.countWords() - this.startWords;

    document.getElementById('wsTime').textContent = this.formatTime(time);
    document.getElementById('wsWords').textContent = words;
  }

  countWords() {
    return this.editor.innerText
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  injectOverlay() {
    const el = document.createElement('div');
    el.id = 'writingSessionOverlay';
    el.innerHTML = `
      <div class="ws-panel">
        <strong>SESJA PISARSKA</strong>
        <div><span id="wsTime">00:00</span></div>
        <div><span id="wsWords">0</span> słów</div>
        <button id="wsExit">Zakończ</button>
      </div>
    `;
    document.body.appendChild(el);

    document.getElementById('wsExit').onclick = () => this.exit();
  }
}

// STYLE
const style = document.createElement('style');
style.textContent = `
.writing-session header,
.writing-session .tab-nav,
.writing-session .sidebar,
.writing-session .chapters-panel,
.writing-session .editor-header {
  display:none !important;
}

.writing-session .main-container {
  grid-template-columns: 1fr !important;
}

#writingSessionOverlay {
  position:fixed;
  top:20px;
  right:20px;
  background:#000;
  color:#0ff;
  padding:14px;
  border-radius:12px;
  z-index:99999;
}

#wsExit {
  margin-top:8px;
  padding:6px 10px;
  font-weight:bold;
}
`;
document.head.appendChild(style);

// START
window.BellaWritingSession = new BellaWritingSession();
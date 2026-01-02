'use strict';

/*
========================================
BELLA WRITING SESSION — SAFE MODE
ETERNIVERSE BOOK MASTER v4.x
========================================
CTRL + SHIFT + S → start / stop
========================================
*/

(function () {
  // ===== BEZPIECZNIKI =====
  if (window.__BELLA_WRITING_SESSION__) return;
  window.__BELLA_WRITING_SESSION__ = true;

  const STATE = {
    active: false,
    startTime: 0,
    startWords: 0,
    editor: null,
    timer: null
  };

  // ===== SZUKAMY EDYTORA (NA PEWNO) =====
  function findEditor() {
    return (
      document.getElementById('mainEditor') ||
      document.querySelector('[contenteditable="true"]')
    );
  }

  // ===== LICZENIE SŁÓW =====
  function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  // ===== OVERLAY =====
  function createOverlay() {
    const el = document.createElement('div');
    el.id = 'bellaWritingSessionOverlay';
    el.innerHTML = `
      <div style="
        background:#000;
        color:#0ff;
        padding:14px;
        border-radius:12px;
        font-weight:bold;
        text-align:center;
        min-width:160px;
      ">
        <div>SESJA PISARSKA</div>
        <div id="bws-time">00:00</div>
        <div><span id="bws-words">0</span> słów</div>
        <button id="bws-exit"
          style="margin-top:8px;padding:6px 10px;font-weight:bold;">
          Zakończ
        </button>
      </div>
    `;
    document.body.appendChild(el);

    document.getElementById('bws-exit').onclick = stopSession;
  }

  function removeOverlay() {
    document.getElementById('bellaWritingSessionOverlay')?.remove();
  }

  // ===== START =====
  function startSession() {
    STATE.editor = findEditor();
    if (!STATE.editor) return;

    STATE.active = true;
    STATE.startTime = Date.now();
    STATE.startWords = countWords(STATE.editor.innerText);

    document.body.classList.add('bella-writing-session');

    createOverlay();
    update();

    STATE.timer = setInterval(update, 1000);
  }

  // ===== STOP =====
  function stopSession() {
    STATE.active = false;
    clearInterval(STATE.timer);
    STATE.timer = null;

    document.body.classList.remove('bella-writing-session');
    removeOverlay();
  }

  // ===== UPDATE =====
  function update() {
    if (!STATE.active || !STATE.editor) return;

    const time = Math.floor((Date.now() - STATE.startTime) / 1000);
    const words =
      countWords(STATE.editor.innerText) - STATE.startWords;

    document.getElementById('bws-time').textContent = formatTime(time);
    document.getElementById('bws-words').textContent = words;
  }

  // ===== TOGGLE =====
  function toggleSession() {
    STATE.active ? stopSession() : startSession();
  }

  // ===== KLATURA =====
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      toggleSession();
    }
  });

  // ===== STYLE (SAFE) =====
  const style = document.createElement('style');
  style.textContent = `
    body.bella-writing-session header,
    body.bella-writing-session nav,
    body.bella-writing-session aside,
    body.bella-writing-session .chapters-panel,
    body.bella-writing-session .editor-header,
    body.bella-writing-session #toastContainer {
      display:none !important;
    }

    body.bella-writing-session .main-container {
      grid-template-columns:1fr !important;
    }

    #bellaWritingSessionOverlay {
      position:fixed;
      top:20px;
      right:20px;
      z-index:99999;
    }
  `;
  document.head.appendChild(style);

})();
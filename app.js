// app.js — ETERNIVERSE PRO MASTER v1.3 — KSIĘGI DZIAŁAJĄ!
// Architekt: Maciej Maciuszek | Data: 28 grudnia 2025

class Eterniverse {
  constructor() {
    this.VERSION = '1.3';
    this.STORAGE_KEY = 'eterniverse-pro-master-v1.3';
    this.data = { meta: { version: this.VERSION }, gates: [] };
    this.mode = 'ARCHITEKT';
    this.elements = {};
    this.editContext = null;
    this.init();
  }

  init() {
    this.forceStartData(); // 🔥 NOWE - FORCUJE KSIĘGI!
    this.cacheElements();
    this.loadData();
    this.render();
    this.removeLoadingScreen();
    this.bindGlobalEvents();
  }

  // 🔥 NOWA FUNKCJA - FORCUJE KSIĘGI OD RAZU!
  forceStartData() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) return;

    const START_DATA = {
      meta: { version: '1.3' },
      gates: [
        {
          id: 1, name: "BRAMA I — INTERSEEKER", sub: "Psychika · Cień · Trauma", tag: "CORE/PSYCHE",
          books: [{
            title: "ShadowSeeker – Anatomia Cienia",
            status: "idea",
            desc: "Twój cień zna cię lepiej niż ty.",
            content: "**Rozdział 1**

Wola to nie życzenie — to broń."
          }]
        },
        {
          id: 3, name: "BRAMA III — ETERSEEKER", sub: "Wola · Pole · Architektura", tag: "CORE/FIELD",
          books: [{
            title: "EterSeeker – Architektura Woli",
            status: "writing",
            desc: "System tworzenia rzeczywistości.",
            content: "**Wstęp**

Wola = broń przeciwko chaosowi."
          }]
        },
        { id: 2, name: "BRAMA II — CUSTOS / GENEZA", sub: "Strażnik · Rdzeń · Początek", tag: "CORE/ORIGIN", books: [] },
        { id: 4, name: "BRAMA IV — ARCHETYPY / WOLA", sub: "Konstrukcja · Role · Przeznaczenie", tag: "CORE/WILL", books: [] },
        { id: 5, name: "BRAMA V — OBFITOSEEKER", sub: "Materia · Przepływ · Obfitość", tag: "EMBODIED/FLOW", books: [] },
        { id: 6, name: "BRAMA VI — BIOSEEKER", sub: "Ciało · Biologia · Hardware", tag: "EMBODIED/BIO", books: [] },
        { id: 7, name: "BRAMA VII — SPLĄTANIE / AI", sub: "Obserwator · Technologia", tag: "META/TECH", books: [] },
        { id: 8, name: "BRAMA VIII — TRAJEKTORIE", sub: "Linie Czasu · Fizyka Duszy", tag: "META/PHYSICS", books: [] },
        { id: 9, name: "BRAMA IX — ETERNIONY", sub: "Węzły Pola · Kolektyw", tag: "COLLECTIVE", books: [] },
        { id: 10, name: "BRAMA X — ETERUNIVERSE", sub: "Integracja · Absolut", tag: "INTEGRATION", books: [] }
      ]
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(START_DATA));
    console.log('🔥 KSIĘGI START OWANE!');
  }

  getDefaultData() {
    return {
      meta: { version: this.VERSION },
      gates: [
        { id: 1, name: "BRAMA I — INTERSEEKER", sub: "Psychika · Cień · Trauma · Mechanizmy przetrwania", tag: "CORE/PSYCHE", books: [] },
        // ... reszta 9 pustych
        { id: 10, name: "BRAMA X — ETERUNIVERSE", sub: "Integracja · Jedność · Architekt · Absolut", tag: "INTEGRATION", books: [] }
      ]
    };
  }

  loadData() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) {
      this.data = this.getDefaultData();
      return;
    }
    try {
      this.data = JSON.parse(saved);
      console.log('📚 WCZYTANO', this.data.gates.filter(g => g.books.length > 0).length, 'bram z księgami');
    } catch (e) {
      console.error('BŁĄD:', e);
      this.data = this.getDefaultData();
    }
  }

  saveData() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  // RESZTA FUNKCJI BEZ ZMIAN (cacheElements, render, etc...)
  cacheElements() {
    this.elements = {
      app: document.getElementById('app'),
      modalBackdrop: document.getElementById('modalBackdrop'),
      modalTitle: document.getElementById('modalTitle'),
      modalContent: document.getElementById('modalContent'),
      toastContainer: document.getElementById('toastContainer')
    };
  }

  removeLoadingScreen() {
    const loading = this.elements.app?.querySelector('.loading-screen');
    if (loading) loading.remove();
  }

  escapeHtml(str = '') {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  render() {
    if (!this.elements.app) return;
    
    this.elements.app.innerHTML = `
      <header class="dashboard-header">
        <h1>ETERNIVERSE PRO MASTER</h1>
        <p class="dashboard-subtitle">Wydawnictwo Architekta Woli • 10 Bram • v1.3</p>
        <div class="mode-switch">
          <button id="modeArchitekt" class="${this.mode === 'ARCHITEKT' ? 'active' : ''}">🛠️ Architekt</button>
          <button id="modeCzytelnik" class="${this.mode === 'CZYTELNIK' ? 'active' : ''}">📖 Czytelnik</button>
        </div>
      </header>
      <section class="gates-grid" id="gatesGrid"></section>
      <div class="master-actions">
        <button id="exportWattpadAll">📤 Eksportuj całe uniwersum do Wattpada</button>
        <button id="exportJSON">💾 Backup JSON</button>
        <button id="importJSON">📥 Import JSON</button>
      </div>
    `;

    const grid = this.elements.app.querySelector('#gatesGrid');
    this.data.gates.forEach((gate, gateIdx) => {
      const card = document.createElement('div');
      card.className = 'gate-card';
      const booksCount = gate.books?.length || 0;
      
      card.innerHTML = `
        <div class="gate-header">
          <h3>${this.escapeHtml(gate.name)}</h3>
          <span class="gate-tag">${this.escapeHtml(gate.tag)}</span>
        </div>
        <p class="gate-sub">${this.escapeHtml(gate.sub)}</p>
        <div class="books-count">${booksCount} ksiąg</div>
        <div class="books-list">
          ${booksCount > 0 ? gate.books.map((book, bookIdx) => `
            <div class="book-item" data-gate="${gateIdx}" data-book="${bookIdx}">
              <div class="book-cover" data-initials="${book.title.slice(0,2).toUpperCase()}"></div>
              <div class="book-info">
                <div class="book-title">${this.escapeHtml(book.title)}</div>
                ${book.desc ? `<div class="book-desc">${this.escapeHtml(book.desc)}</div>`
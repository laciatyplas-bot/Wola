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
    this.cacheElements();
    this.forceStartData();    // 🔥 FORCUJE KSIĘGI PRZY PIERWSZYM URUCHOMIENIU
    this.loadData();          // ładuje (z forcowanymi lub zapisanymi)
    this.render();
    this.removeLoadingScreen();
    this.bindGlobalEvents();
  }

  // 🔥 FORCUJE KSIĘGI TYLKO RAZ (przy braku danych)
  forceStartData() {
    if (localStorage.getItem(this.STORAGE_KEY)) return;

    const START_DATA = {
      meta: { version: this.VERSION },
      gates: [
        {
          id: 1, name: "BRAMA I — INTERSEEKER", sub: "Psychika · Cień · Trauma · Mechanizmy przetrwania", tag: "CORE/PSYCHE",
          books: [{
            title: "ShadowSeeker – Anatomia Cienia",
            status: "writing",
            desc: "Twój cień zna cię lepiej niż ty.",
            cover: "",
            content: "**Rozdział 1**\n\nWola to nie życzenie — to broń.\n\nCień nie jest wrogiem. Jest nauczycielem."
          }]
        },
        {
          id: 3, name: "BRAMA III — ETERSEEKER", sub: "Wola · Pole · Architektura rzeczywistości", tag: "CORE/FIELD",
          books: [{
            title: "EterSeeker – Architektura Woli",
            status: "ready",
            desc: "System tworzenia rzeczywistości.",
            cover: "",
            content: "**Wstęp**\n\nWola = broń przeciwko chaosowi.\n\nPole nie jest puste. Jest pełne możliwości."
          }]
        },
        // Puste bramy
        { id: 2, name: "BRAMA II — CUSTOS / GENEZA", sub: "Strażnik · Rdzeń · Początek · Błąd pierwotny", tag: "CORE/ORIGIN", books: [] },
        { id: 4, name: "BRAMA IV — ARCHETYPY / WOLA", sub: "Konstrukcja · Role · Przeznaczenie", tag: "CORE/WILL", books: [] },
        { id: 5, name: "BRAMA V — OBFITOSEEKER", sub: "Materia · Przepływ · Manifestacja · Obfitość", tag: "EMBODIED/FLOW", books: [] },
        { id: 6, name: "BRAMA VI — BIOSEEKER", sub: "Ciało · Biologia · Regulacja · Hardware", tag: "EMBODIED/BIO", books: [] },
        { id: 7, name: "BRAMA VII — SPLĄTANIE / AI", sub: "Obserwator · Meta-tożsamość · Technologia", tag: "META/TECH", books: [] },
        { id: 8, name: "BRAMA VIII — TRAJEKTORIE", sub: "Kod Życia · Linie Czasu · Fizyka Duszy", tag: "META/PHYSICS", books: [] },
        { id: 9, name: "BRAMA IX — ETERNIONY / KOLEKTYW", sub: "Węzły Pola · Wspólnota · Misja zbiorowa", tag: "COLLECTIVE", books: [] },
        { id: 10, name: "BRAMA X — ETERUNIVERSE", sub: "Integracja · Jedność · Architekt · Absolut", tag: "INTEGRATION", books: [] }
      ]
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(START_DATA));
    console.log('🔥 KSIĘGI STARTOWE ZAŁADOWANE!');
  }

  getDefaultData() {
    return {
      meta: { version: this.VERSION },
      gates: [
        { id: 1, name: "BRAMA I — INTERSEEKER", sub: "Psychika · Cień · Trauma · Mechanizmy przetrwania", tag: "CORE/PSYCHE", books: [] },
        { id: 2, name: "BRAMA II — CUSTOS / GENEZA", sub: "Strażnik · Rdzeń · Początek · Błąd pierwotny", tag: "CORE/ORIGIN", books: [] },
        { id: 3, name: "BRAMA III — ETERSEEKER", sub: "Wola · Pole · Architektura rzeczywistości", tag: "CORE/FIELD", books: [] },
        { id: 4, name: "BRAMA IV — ARCHETYPY / WOLA", sub: "Konstrukcja · Role · Przeznaczenie", tag: "CORE/WILL", books: [] },
        { id: 5, name: "BRAMA V — OBFITOSEEKER", sub: "Materia · Przepływ · Manifestacja · Obfitość", tag: "EMBODIED/FLOW", books: [] },
        { id: 6, name: "BRAMA VI — BIOSEEKER", sub: "Ciało · Biologia · Regulacja · Hardware", tag: "EMBODIED/BIO", books: [] },
        { id: 7, name: "BRAMA VII — SPLĄTANIE / AI", sub: "Obserwator · Meta-tożsamość · Technologia", tag: "META/TECH", books: [] },
        { id: 8, name: "BRAMA VIII — TRAJEKTORIE", sub: "Kod Życia · Linie Czasu · Fizyka Duszy", tag: "META/PHYSICS", books: [] },
        { id: 9, name: "BRAMA IX — ETERNIONY / KOLEKTYW", sub: "Węzły Pola · Wspólnota · Misja zbiorowa", tag: "COLLECTIVE", books: [] },
        { id: 10, name: "BRAMA X — ETERUNIVERSE", sub: "Integracja · Jedność · Architekt · Absolut", tag: "INTEGRATION", books: [] }
      ]
    };
  }

  loadData() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) {
      this.data = this.getDefaultData();
      this.saveData();
      return;
    }
    try {
      this.data = JSON.parse(saved);
    } catch (e) {
      console.error('Błąd parsowania danych', e);
      this.data = this.getDefaultData();
      this.saveData();
    }
  }

  saveData() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

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
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
        <button id="exportWattpadAll">📤 Eksportuj całe uniwersum</button>
        <button id="exportJSON">💾 Backup JSON</button>
        <button id="importJSON">📥 Import JSON</button>
      </div>
    `;

    const grid = this.elements.app.querySelector('#gatesGrid');

    this.data.gates.forEach((gate, gateIdx) => {
      const card = document.createElement('div');
      card.className = 'gate-card';

      let booksHTML = '<div class="books-list">';
      if (gate.books && gate.books.length > 0) {
        gate.books.forEach((book, bookIdx) => {
          const initials = book.title.slice(0, 2).toUpperCase() || '??';
          const coverStyle = book.cover ? `background-image:url(${book.cover})` : '';
          booksHTML += `
            <div class="book-item" data-gate="\( {gateIdx}" data-book=" \){bookIdx}">
              <div class="book-cover" style="\( {coverStyle}" data-initials=" \){initials}"></div>
              <div class="book-info">
                <div class="book-title">${this.escapeHtml(book.title)}</div>
                \( {book.desc ? `<div class="book-desc"> \){this.escapeHtml(book.desc)}</div>` : ''}
                <span class="status-tag st-\( {book.status || 'idea'}"> \){book.status || 'idea'}</span>
              </div>
            </div>
          `;
        });
      } else {
        booksHTML += '<p class="no-books">Brak ksiąg — dodaj pierwszą</p>';
      }
      booksHTML += '</div>';

      card.innerHTML = `
        <div class="gate-header">
          <h3>${this.escapeHtml(gate.name)}</h3>
          <span class="gate-tag">${this.escapeHtml(gate.tag)}</span>
        </div>
        <p class="gate-sub">${this.escapeHtml(gate.sub)}</p>
        <div class="books-count">${gate.books?.length || 0} ksiąg</div>
        ${booksHTML}
        ${this.mode === 'ARCHITEKT' ? '<button class="add-book-btn">+ Dodaj księgę</button>' : ''}
      `;

      if (this.mode === 'ARCHITEKT') {
        const addBtn = card.querySelector('.add-book-btn');
        if (addBtn) addBtn.addEventListener('click', () => this.openBookModal(gateIdx));
      }

      card.querySelectorAll('.book-item').forEach(item => {
        const g = parseInt(item.dataset.gate);
        const b = parseInt(item.dataset.book);
        item.addEventListener('click', () => this.openBookModal(g, b));
      });

      grid.appendChild(card);
    });

    // Bind master actions
    document.getElementById('exportWattpadAll')?.addEventListener('click', () => this.exportToWattpad(true));
    document.getElementById('exportJSON')?.addEventListener('click', () => this.exportJSON());
    document.getElementById('importJSON')?.addEventListener('click', () => this.importJSON());
    document.getElementById('modeArchitekt')?.addEventListener('click', () => this.setMode('ARCHITEKT'));
    document.getElementById('modeCzytelnik')?.addEventListener('click', () => this.setMode('CZYTELNIK'));
  }

  // ... reszta funkcji (openBookModal, saveBook, exportToWattpad, etc.) bez zmian

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    this.elements.toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
}

// START
new Eterniverse();
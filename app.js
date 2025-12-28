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
    this.loadData();
    this.render();
    this.removeLoadingScreen();
    this.bindGlobalEvents();
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
      this.resetToDefault();
      this.showToast('ETERNIVERSE PRO MASTER v1.3 — system gotowy.');
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (parsed.meta?.version === this.VERSION) {
        this.data = parsed;
      } else {
        this.migrateData(parsed);
      }
    } catch (e) {
      console.warn('Błąd danych — reset', e);
      this.resetToDefault();
    }
  }

  migrateData(old) {
    this.data = {
      meta: { version: this.VERSION },
      gates: old.gates?.map(g => ({
        ...g,
        books: Array.isArray(g.books) ? g.books.map(b => ({
          title: b.title || '',
          status: b.status || 'idea',
          desc: b.desc || '',
          cover: b.cover || '',
          content: b.content || '',
          audio: Array.isArray(b.audio) ? b.audio : []
        })) : []
      })) || this.getDefaultData().gates
    };
    this.saveData();
    this.showToast('Dane zaktualizowane do v1.3');
  }

  saveData() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  resetToDefault() {
    this.data = this.getDefaultData();
    this.saveData();
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
    
    const gatesHtml = this.data.gates.map(gate => this.renderGate(gate)).join('');
    this.elements.app.innerHTML = `
      <header class="dashboard-header">
        <h1>ETERNIVERSE PRO MASTER v${this.VERSION}</h1>
        <p>Twoje centrum zarządzania bramami i książkami</p>
      </header>
      <section class="gates-grid">
        ${gatesHtml}
      </section>
      <div id="toastContainer" class="toast-container"></div>
    `;

    this.bindGateEvents();
  }

  renderGate(gate) {
    const booksHtml = gate.books.length > 0 ? gate.books.map((book, i) => `
      <div class="book-item" data-gate-id="gate.id"data−book−index="{gate.id}" data-book-index="gate.id"data−book−index="{i}">
        <span class="book-title">${this.escapeHtml(book.title)}</span>
        <div class="book-actions">
          <button class="chapter-btn">Rozdziały</button>
          <button class="audio-btn">Audiobooki</button>
        </div>
      </div>
    `).join('') : `<p>Brak książek</p>`;

    return `
      <article class="gate-card" data-gate-id="${gate.id}">
        <div class="gate-header">
          <h2>${this.escapeHtml(gate.name)}</h2>
          <span class="gate-tag">${this.escapeHtml(gate.tag)}</span>
        </div>
        <p class="gate-sub">${this.escapeHtml(gate.sub)}</p>
        <div class="books-list">${booksHtml}</div>
        <button class="add-book-btn" data-gate-id="${gate.id}">Dodaj książkę</button>
      </article>
    `;
  }

  bindGateEvents() {
    // Dodaj obsługę przycisków książek i dodawania
    const bookItems = this.elements.app.querySelectorAll('.book-item');
    bookItems.forEach(item => {
      const gateId = +item.dataset.gateId;
      const bookIndex = +item.dataset.bookIndex;

      const chapterBtn = item.querySelector('.chapter-btn');
      chapterBtn.addEventListener('click', e => {
        e.stopPropagation();
        this.openModalChapters(gateId, bookIndex);
      });

      const audioBtn = item.querySelector('.audio-btn');
      audioBtn.addEventListener('click', e => {
        e.stopPropagation();
        this.openModalAudio(gateId, bookIndex);
      });
    });

    // Obsługa dodawania książek
    const addBookBtns = this.elements.app.querySelectorAll('.add-book-btn');
    addBookBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const gateId = +btn.dataset.gateId;
        this.openAddBookModal(gateId);
      });
    });
  }

  openModalChapters(gateId, bookIndex) {
    const book = this.findBook(gateId, bookIndex);
    if (!book) return;
    const chapters = book.content ? book.content.split('\n').filter(line => line.trim()) : ['Brak rozdziałów'];
    this.openModal(`${book.title} - Rozdziały`, chapters);
  }

  openModalAudio(gateId, bookIndex) {
    const book = this.findBook(gateId, bookIndex);
    if (!book) return;
    const audioList = book.audio.length > 0 ? book.audio : ['Brak audiobooków'];
    this.openModal(`${book.title} - Audiobooki`, audioList);
  }

  findBook(gateId, bookIndex) {
    const gate = this.data.gates.find(g => g.id === gateId);
    if (!gate) return null;
    return gate.books[bookIndex];
  }

  openModal(title, items) {
    this.elements.modalTitle.textContent = title;
    this.elements.modalContent.innerHTML = `<ul>{items.map(i => `<li>{this.escapeHtml(i)}</li>`).join('')}</ul>`;
    this.elements.modalBackdrop.style.display = 'flex';
  }

  closeModal() {
    this.elements.modalBackdrop.style.display = 'none';
  }

  openAddBookModal(gateId) {
    // Prosty prompt - można rozbudować na pełny formularz modalny
    const title = prompt('Podaj tytuł książki:');
    if (!title) return;
    const desc = prompt('Opis książki (opcjonalnie):') || '';
    const newBook = {
      title: title.trim(),
      status: 'idea',
      desc: desc.trim(),
      cover: '',
      content: '',
      audio: []
    };
    const gate = this.data.gates.find(g => g.id === gateId);
    if (gate) {
      gate.books.push(newBook);
      this.saveData();
      this.render(); // odśwież widok
      this.showToast(`Dodano książkę "newBook.title"dobramy"{newBook.title}" do bramy "newBook.title"dobramy"{gate.name}"`);
    }
  }

  showToast(message, duration = 3000) {
    if (!this.elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    this.elements.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  bindGlobalEvents() {
    // Zamknięcie modala po kliknięciu poza i ESC
    this.elements.modalBackdrop.addEventListener('click', e => {
      if (e.target === this.elements.modalBackdrop) this.closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeModal();
    });
  }
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  window.eterniverse = new Eterniverse();
});

// app.js — ETERNIVERSE PRO MASTER v1.3 — 100% POPRAWIONE TEMPLATE STRINGS
// Architekt: Maciej Maciuszek | Data: 27 grudnia 2025

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

      let booksHTML = '<div class="books-list">';
      if (gate.books?.length > 0) {
        gate.books.forEach((book, bookIdx) => {
          const initials = book.title.slice(0, 2).toUpperCase() || '??';
          const coverStyle = book.cover ? `background-image:url(${book.cover})` : '';
          booksHTML += `
            <div class="book-item" data-gate="${gateIdx}" data-book="${bookIdx}">
              <div class="book-cover" style="${coverStyle}" data-initials="${initials}"></div>
              <div class="book-info">
                <div class="book-title">${this.escapeHtml(book.title)}</div>
                ${book.desc ? `<div class="book-desc">${this.escapeHtml(book.desc)}</div>` : ''}
                <span class="status-tag st-${book.status || 'idea'}">${book.status || 'idea'}</span>
                ${book.audio?.length > 0 ? `<span class="audio-indicator">🎧 ${book.audio.length}</span>` : ''}
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

        const cover = item.querySelector('.book-cover');
        if (cover && cover.style.backgroundImage) {
          cover.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = cover.style.backgroundImage.slice(5, -2);
            this.showCover(url);
          });
        }
      });

      grid.appendChild(card);
    });

    this.bindMasterActions();
  }

  bindMasterActions() {
    const exportBtn = document.getElementById('exportWattpadAll');
    const jsonExport = document.getElementById('exportJSON');
    const jsonImport = document.getElementById('importJSON');
    const modeArch = document.getElementById('modeArchitekt');
    const modeCzyt = document.getElementById('modeCzytelnik');

    if (exportBtn) exportBtn.addEventListener('click', () => this.exportToWattpad(true));
    if (jsonExport) jsonExport.addEventListener('click', () => this.exportJSON());
    if (jsonImport) jsonImport.addEventListener('click', () => this.importJSON());
    if (modeArch) modeArch.addEventListener('click', () => this.setMode('ARCHITEKT'));
    if (modeCzyt) modeCzyt.addEventListener('click', () => this.setMode('CZYTELNIK'));
  }

  setMode(mode) {
    this.mode = mode;
    this.render();
    this.showToast(`Tryb: ${mode}`);
  }

  openBookModal(gateIdx, bookIdx = null) {
    if (this.mode !== 'ARCHITEKT') return;

    this.editContext = { gateIdx, bookIdx };
    this.elements.modalTitle.textContent = bookIdx !== null ? 'Edytuj księgę' : 'Nowa księga';

    const book = bookIdx !== null ? this.data.gates[gateIdx].books[bookIdx] : { 
      title: '', status: 'idea', desc: '', cover: '', content: '', audio: [] 
    };

    this.elements.modalContent.innerHTML = `
      <div class="modal-row">
        <label>Tytuł</label>
        <input type="text" id="bookTitle" value="${this.escapeHtml(book.title)}">
      </div>
      <div class="modal-row">
        <label>Opis (krótki)</label>
        <textarea id="bookDesc">${this.escapeHtml(book.desc || '')}</textarea>
      </div>
      <div class="modal-row">
        <label>Treść rozdziału (format Wattpad)</label>
        <textarea id="bookContent" class="content-editor">${this.escapeHtml(book.content || '')}</textarea>
        <p class="editor-hint">**bold**, *italic*, ### Nagłówek, --- separator</p>
      </div>
      <div class="modal-row">
        <label>Status</label>
        <select id="bookStatus">
          <option value="idea" ${book.status === 'idea' ? 'selected' : ''}>💡 Pomysł</option>
          <option value="writing" ${book.status === 'writing' ? 'selected' : ''}>✍️ W pisaniu</option>
          <option value="ready" ${book.status === 'ready' ? 'selected' : ''}>🟡 Gotowa</option>
          <option value="published" ${book.status === 'published' ? 'selected' : ''}>✅ Opublikowana</option>
        </select>
      </div>
      <div class="modal-row">
        <label>URL okładki</label>
        <input type="url" id="bookCover" value="${this.escapeHtml(book.cover || '')}">
      </div>
      <div class="modal-row">
        <label>Audiobooki (linki, jeden na linię)</label>
        <textarea id="bookAudio">${(book.audio || []).join('\n')}</textarea>
      </div>
      <div class="modal-actions">
        ${bookIdx !== null ? '<button id="modalDelete">🗑️ Usuń</button>' : ''}
        <button id="modalCancel">Anuluj</button>
        <button id="modalSave">Zapisz</button>
        <button id="modalExportWattpad">📤 Eksportuj do Wattpada</button>
      </div>
    `;

    this.elements.modalBackdrop.style.display = 'flex';

    document.getElementById('modalSave').addEventListener('click', () => this.saveBook());
    document.getElementById('modalCancel').addEventListener('click', () => this.closeModal());
    const del = document.getElementById('modalDelete');
    if (del) del.addEventListener('click', () => this.deleteBook());
    document.getElementById('modalExportWattpad').addEventListener('click', () => this.exportToWattpad(false));
  }

  saveBook() {
    const title = document.getElementById('bookTitle').value.trim();
    if (!title) return this.showToast('Tytuł jest wymagany');

    const { gateIdx, bookIdx } = this.editContext;
    const gate = this.data.gates[gateIdx];
    if (!gate.books) gate.books = [];

    const audioLines = document
  .getElementById('bookAudio')
  .value
  .trim()
  .split('\n')
  .filter(l => l.trim());

    const book = {
      title,
      status: document.getElementById('bookStatus').value,
      desc: document.getElementById('bookDesc').value.trim(),
      cover: document.getElementById('bookCover').value.trim(),
      content: document.getElementById('bookContent').value,
      audio: audioLines
    };

    if (bookIdx !== null) {
      gate.books[bookIdx] = book;
    } else {
      gate.books.push(book);
    }

    this.saveData();
    this.closeModal();
    this.render();
    this.showToast('Księga zapisana');
  }

  deleteBook() {
    if (!confirm('Na pewno usunąć tę księgę?')) return;
    const { gateIdx, bookIdx } = this.editContext;
    this.data.gates[gateIdx].books.splice(bookIdx, 1);
    this.saveData();
    this.closeModal();
    this.render();
    this.showToast('Księga usunięta');
  }

  closeModal() {
    if (this.elements.modalBackdrop) {
      this.elements.modalBackdrop.style.display = 'none';
    }
    this.editContext = null;
  }

  exportToWattpad(all = true) {
    let text = '';
    if (all) {
      text += `# ETERNIVERSE — Pełne wydanie PRO MASTER

`;
      this.data.gates.forEach(gate => {
        if (gate.books?.length > 0) {
          text += `**${gate.name}**
_${gate.sub}_

`;
          gate.books.forEach(book => {
            text += `### ${book.title}

${book.content || ''}

_Status: ${book.status} | Opis: ${book.desc || 'brak'}_

---

`;
          });
        }
      });
    } else {
      const { gateIdx, bookIdx } = this.editContext;
      if (bookIdx === null) return;
      const book = this.data.gates[gateIdx].books[bookIdx];
      text += `### ${book.title}

${book.content || ''}

`;
    }

    navigator.clipboard.writeText(text).then(() => {
      this.showToast(all ? 'Całe uniwersum skopiowane!' : 'Rozdział skopiowany do Wattpada!');
    }).catch(() => {
      this.showToast('Błąd kopiowania — tekst w konsoli');
      console.log(text);
    });
  }

  exportJSON() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ETERNIVERSE_BACKUP_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Backup JSON pobrany');
  }

  importJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const imported = JSON.parse(ev.target.result);
          this.data = imported;
          this.saveData();
          this.render();
          this.showToast('Projekt zaimportowany');
        } catch (err) {
          this.showToast('Błąd importu JSON');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  showToast(message) {
    const toastContainer = document.getElementById('toastContainer') || this.elements.toastContainer;
    if (!toastContainer) return console.log(message);
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  showCover(url) {
    const img = document.getElementById('coverImg');
    const preview = document.getElementById('coverPreview');
    if (!img || !preview) return;
    img.src = url;
    preview.style.display = 'flex';
  }

  bindGlobalEvents() {
    if (this.elements.modalBackdrop) {
      this.elements.modalBackdrop.addEventListener('click', e => {
        if (e.target === this.elements.modalBackdrop) this.closeModal();
      });
    }
    
    const coverClose = document.getElementById('coverClose');
    if (coverClose) {
      coverClose.addEventListener('click', () => {
        const preview = document.getElementById('coverPreview');
        if (preview) preview.style.display = 'none';
      });
    }
  }
}

// START — PEŁNA MOC
new Eterniverse();
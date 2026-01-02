// js/editor.js — Master Editor Logic v3.0
// Foton B w splątaniu z Architektem

class EterniverseEditor {
  constructor() {
    this.currentWorld = null;
    this.currentGate = null;
    this.currentBook = null;
    this.chapters = [];

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadFromLocalStorage();
    this.updateStatus('Gotowy do pracy');
  }

  bindEvents() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
      });
    });

    // Światy
    document.querySelectorAll('.world-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.world-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentWorld = btn.dataset.world;
        this.updateTitle();
      });
    });

    // Bramy
    document.querySelectorAll('.world-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.world-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this.currentGate = item.dataset.brama;
        this.updateTitle();
      });
    });

    // Edytor treści
    const editor = document.getElementById('mainEditor');
    editor.addEventListener('input', () => this.autoSave());

    // Zapisz
    document.getElementById('saveBookBtn')?.addEventListener('click', () => this.saveBook());

    // Nowa książka
    document.getElementById('newBookBtn')?.addEventListener('click', () => this.newBook());

    // Usuń
    document.getElementById('deleteBookBtn')?.addEventListener('click', () => this.deleteBook());

    // AI command
    const aiInput = document.getElementById('aiCommand');
    if (aiInput) {
      aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.runAICommand(aiInput.value);
      });
    }
  }

  updateTitle() {
    const title = document.getElementById('bookTitle');
    if (title) {
      title.textContent = `Świat ${this.currentWorld || '?'} | Brama ${this.currentGate || '?'}`;
    }
  }

  autoSave() {
    const data = {
      title: document.getElementById('editor-title')?.value || '',
      content: document.getElementById('mainEditor')?.innerText || '',
      world: this.currentWorld,
      gate: this.currentGate,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('eterniverse_draft', JSON.stringify(data));
    this.updateStatus('Autosave...');
    setTimeout(() => this.updateStatus('Zapisano lokalnie'), 1000);
  }

  saveBook() {
    const book = {
      title: document.getElementById('editor-title')?.value || 'Bez tytułu',
      content: document.getElementById('mainEditor')?.innerText || '',
      status: document.getElementById('editor-status')?.value || 'draft',
      format: Array.from(document.querySelectorAll('#editor-format input:checked')).map(cb => cb.value),
      cover: document.getElementById('editor-cover')?.value || '',
      links: this.collectLinks()
    };

    // Tu w przyszłości: zapis do mapa.json lub backend
    localStorage.setItem('eterniverse_last_book', JSON.stringify(book));
    this.toast('Książka zapisana!');
  }

  newBook() {
    if (confirm('Rozpocząć nową książkę? Bieżąca treść zostanie wyczyszczona.')) {
      document.getElementById('mainEditor').innerHTML = '';
      document.getElementById('editor-title').value = '';
      this.toast('Nowa książka rozpoczęta');
    }
  }

  deleteBook() {
    if (confirm('Na pewno usunąć bieżącą książkę?')) {
      document.getElementById('mainEditor').innerHTML = '';
      localStorage.removeItem('eterniverse_draft');
      this.toast('Książka usunięta');
    }
  }

  collectLinks() {
    const links = {};
    document.querySelectorAll('.links-group input').forEach(input => {
      if (input.value) {
        const platform = input.dataset.platform || input.placeholder.toLowerCase();
        links[platform] = input.value;
      }
    });
    return links;
  }

  runAICommand(command) {
    const output = document.getElementById('aiOutput');
    output.innerHTML += `<p><strong>> ${command}</strong></p>`;
    output.innerHTML += `<p>AI przetwarza... (symulacja)</p>`;
    output.scrollTop = output.scrollHeight;
    document.getElementById('aiCommand').value = '';
  }

  loadFromLocalStorage() {
    const draft = localStorage.getItem('eterniverse_draft');
    if (draft) {
      const data = JSON.parse(draft);
      document.getElementById('mainEditor').innerText = data.content || '';
      document.getElementById('editor-title').value = data.title || '';
      this.updateStatus('Wczytano autosave');
    }
  }

  updateStatus(msg) {
    document.getElementById('status').textContent = msg;
  }

  toast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

// Uruchomienie edytora
document.addEventListener('DOMContentLoaded', () => {
  new EterniverseEditor();
});
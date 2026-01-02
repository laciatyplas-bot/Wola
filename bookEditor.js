// ======================================================
// ETERNIVERSE BOOK EDITOR PLUGIN v3.1
// HYPER-RICH TEXT EDITOR Z AI AUTOCOMPLETE
// PEŁNA INTEGRACJA Z BELLA + HYPER-CONTROL
// ======================================================

export default class BookEditorPlugin {
  constructor(app) {
    this.app = app;
    this.editor = null;
    this.toolbar = null;
    this.aiAutocomplete = null;
    this.isActive = false;
    
    // Editor state
    this.state = {
      content: '',
      chapters: [],
      activeChapter: 0,
      wordCount: 0,
      selection: { start: 0, end: 0 },
      aiSuggestions: [],
      autosaveTimer: null
    };
  }

  // ================================
  // 🔥 INICJALIZACJA PLUGINU
  // ================================
  async init() {
    console.log('📖 BookEditor initializing...');
    
    // Wait for DOM
    await this.waitForEditorDOM();
    
    // Build editor
    this.buildEditor();
    this.buildToolbar();
    this.initAI();
    this.initEvents();
    
    // Load last state
    await this.loadEditorState();
    
    console.log('✅ BookEditor ready');
  }

  async waitForEditorDOM() {
    return new Promise(resolve => {
      const check = () => {
        const container = document.getElementById('bookTab') || 
                         document.querySelector('.tab-content[data-tab="book"]');
        if (container) {
          this.container = container;
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }

  // ================================
  // 🏗️ BUDOWA EDYTOR UI
  // ================================
  buildEditor() {
    this.container.innerHTML = `
      <div class="book-header">
        <div class="book-stats">
          <span class="word-count">0 słów</span>
          <span class="chapter-info">Rozdział 1</span>
          <span class="autosave">💾 Autozapis</span>
        </div>
        <div class="chapter-nav">
          <button class="nav-btn" data-action="prev-chapter">⬅️</button>
          <select class="chapter-select"></select>
          <button class="nav-btn" data-action="next-chapter">➡️</button>
          <button class="nav-btn" data-action="new-chapter">📄 Nowy</button>
        </div>
      </div>
      
      <div class="editor-toolbar" id="editorToolbar"></div>
      
      <div class="rich-editor-container">
        <div class="editor-area" 
             id="mainEditor" 
             contenteditable="true" 
             spellcheck="false"
             placeholder="Rozpocznij pisanie swojej historii... Eter czeka...">
        </div>
        <div class="ai-suggestions" id="aiSuggestions"></div>
      </div>
    `;
    
    this.editor = document.getElementById('mainEditor');
    this.toolbar = document.getElementById('editorToolbar');
    this.aiSuggestions = document.getElementById('aiSuggestions');
  }

  buildToolbar() {
    this.toolbar.innerHTML = `
      <div class="toolbar-group">
        <button class="toolbar-btn" data-format="bold" title="Pogrubienie (Ctrl+B)">𝐁</button>
        <button class="toolbar-btn" data-format="italic" title="Kursywa (Ctrl+I)">𝑖</button>
        <button class="toolbar-btn" data-format="underline" title="Podkreślenie (Ctrl+U)">𝐔</button>
        <button class="toolbar-btn" data-format="strike" title="Przekreślenie">𝐒</button>
      </div>
      
      <div class="toolbar-group">
        <select class="format-select" data-format="fontSize">
          <option value="12">12px</option>
          <option value="16" selected>16px</option>
          <option value="20">20px</option>
          <option value="24">24px</option>
          <option value="32">32px</option>
        </select>
        <select class="format-select" data-format="fontFamily">
          <option value="Crimson Text, serif">Literatura</option>
          <option value="Inter, sans-serif">UI</option>
          <option value="'JetBrains Mono', monospace">Kod</option>
          <option value="Orbitron, monospace">Tytuł</option>
        </select>
      </div>
      
      <div class="toolbar-group">
        <button class="toolbar-btn ai-btn" data-action="ai-suggest" title="AI Sugestia (Ctrl+Space)">🤖 AI</button>
        <button class="toolbar-btn" data-action="ai-continue" title="Kontynuuj AI (Ctrl+Enter)">➡️ Kontynuuj</button>
        <button class="toolbar-btn" data-action="ai-polish" title="Popraw tekst">✨ Polish</button>
      </div>
      
      <div class="toolbar-group right">
        <button class="toolbar-btn" data-action="save-chapter" title="Zapisz (Ctrl+S)">💾</button>
        <button class="toolbar-btn" data-action="export-md" title="Markdown">📄</button>
      </div>
    `;
  }

  // ================================
  // 🧠 AI INTEGRACJA
  // ================================
  initAI() {
    this.aiAutocomplete = new AIAutocomplete(this);
  }

  async triggerAI(action, context = {}) {
    const prompts = {
      suggest: `Kontynuuj historię w stylu ${this.app.state.active.brama.name}: "${context.text}"`,
      continue: `Rozwiń ten fragment w kontekście ${this.app.state.active.world.name}: "${context.text}"`,
      polish: `Popraw stylistycznie ten tekst fantasy: "${context.text}"`
    };

    const response = await this.aiAutocomplete.generate(prompts[action] || action, context);
    return response;
  }

  // ================================
  // 🎛️ EVENT HANDLERY
  // ================================
  initEvents() {
    // Formatowanie
    this.toolbar.addEventListener('click', (e) => {
      const btn = e.target.closest('.toolbar-btn, .format-select');
      if (!btn) return;
      
      if (btn.dataset.format) {
        this.applyFormat(btn.dataset.format, btn.value);
      } else if (btn.dataset.action) {
        this.handleAction(btn.dataset.action);
      }
    });

    // Editor events
    this.editor.addEventListener('input', () => this.onEditorInput());
    this.editor.addEventListener('keydown', (e) => this.onEditorKeydown(e));
    this.editor.addEventListener('selectionchange', () => this.updateToolbarState());

    // Chapter nav
    this.container.addEventListener('change', (e) => {
      if (e.target.classList.contains('chapter-select')) {
        this.switchChapter(e.target.value);
      }
    });

    // Global events
    document.addEventListener('eterniverse:BRAMA_CHANGED', () => {
      this.updateChapterContext();
    });
  }

  onEditorInput() {
    this.updateWordCount();
    this.startAutosave();
    this.aiAutocomplete.onInput();
  }

  onEditorKeydown(e) {
    // AI Shortcuts
    if (e.ctrlKey) {
      switch(e.key) {
        case ' ': this.handleAction('ai-suggest'); e.preventDefault(); break;
        case 'Enter': this.handleAction('ai-continue'); e.preventDefault(); break;
        case 'b': this.applyFormat('bold'); e.preventDefault(); break;
        case 'i': this.applyFormat('italic'); e.preventDefault(); break;
        case 'u': this.applyFormat('underline'); e.preventDefault(); break;
      }
    }
  }

  // ================================
  // ✂️ FORMATOWANIE
  // ================================
  applyFormat(format, value = null) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const sel = window.getSelection().getRangeAt(0);
    
    switch(format) {
      case 'bold':
        this.wrapSelectionWithTag('strong');
        break;
      case 'italic':
        this.wrapSelectionWithTag('em');
        break;
      case 'underline':
        document.execCommand('underline');
        break;
      case 'strike':
        document.execCommand('strikeThrough');
        break;
      case 'fontSize':
        document.execCommand('fontSize', false, value);
        break;
      case 'fontFamily':
        document.execCommand('fontName', false, value);
        break;
    }
    
    this.editor.focus();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  wrapSelectionWithTag(tag) {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const span = document.createElement(tag);
      span.appendChild(range.extractContents());
      range.insertNode(span);
      range.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  // ================================
  // 📚 ROZDZIAŁY
  // ================================
  async handleAction(action) {
    switch(action) {
      case 'new-chapter':
        await this.newChapter();
        break;
      case 'save-chapter':
        await this.saveCurrentChapter();
        break;
      case 'ai-suggest':
        await this.triggerAI('suggest', { text: this.getSelectedText() });
        break;
      case 'ai-continue':
        await this.triggerAI('continue', { text: this.getLastSentence() });
        break;
      case 'ai-polish':
        await this.triggerAI('polish', { text: this.editor.textContent });
        break;
      case 'export-md':
        this.exportMarkdown();
        break;
    }
  }

  async newChapter() {
    const name = prompt('Nazwa rozdziału:') || `Rozdział ${this.state.chapters.length + 1}`;
    this.state.chapters.push({
      id: `ch_${Date.now()}`,
      name,
      content: '',
      wordCount: 0
    });
    
    this.renderChapterSelect();
    await this.switchChapter(this.state.chapters.length - 1);
  }

  renderChapterSelect() {
    const select = this.container.querySelector('.chapter-select');
    select.innerHTML = this.state.chapters.map((ch, i) => 
      `<option value="${i}" ${i === this.state.activeChapter ? 'selected' : ''}>
         ${ch.name} (${ch.wordCount} słów)
       </option>`
    ).join('');
  }

  async switchChapter(index) {
    this.state.activeChapter = parseInt(index);
    
    // Save current
    if (this.state.chapters[this.state.activeChapter]) {
      this.state.chapters[this.state.activeChapter].content = this.editor.innerHTML;
      this.state.chapters[this.state.activeChapter].wordCount = this.getWordCount();
    }
    
    // Load new
    const chapter = this.state.chapters[this.state.activeChapter];
    this.editor.innerHTML = chapter?.content || '';
    
    this.renderChapterSelect();
    this.updateStats();
    await this.saveEditorState();
  }

  // ================================
  // 💾 STAN + AUTOSAVE
  // ================================
  async saveEditorState() {
    this.state.content = this.editor.innerHTML;
    await this.app.storage.indexed.set('book_editor_state', this.state);
  }

  async loadEditorState() {
    const saved = await this.app.storage.indexed.get('book_editor_state');
    if (saved) {
      Object.assign(this.state, saved);
      this.editor.innerHTML = this.state.content;
      this.renderChapterSelect();
      this.updateStats();
    }
  }

  startAutosave() {
    clearTimeout(this.state.autosaveTimer);
    this.state.autosaveTimer = setTimeout(async () => {
      await this.saveEditorState();
      this.updateAutosaveStatus(true);
    }, 2000);
  }

  // ================================
  // 📊 STATYSTYKI
  // ================================
  updateWordCount() {
    const count = this.getWordCount();
    this.state.wordCount = count;
    const countEl = this.container.querySelector('.word-count');
    if (countEl) countEl.textContent = `${count} słów`;
  }

  getWordCount() {
    return this.editor.textContent.trim().split(/s+/).length;
  }

  updateStats() {
    const chapterInfo = this.container.querySelector('.chapter-info');
    if (chapterInfo && this.state.chapters[this.state.activeChapter]) {
      chapterInfo.textContent = this.state.chapters[this.state.activeChapter].name;
    }
  }

  updateAutosaveStatus(saved) {
    const autosaveEl = this.container.querySelector('.autosave');
    if (autosaveEl) {
      autosaveEl.textContent = saved ? '💾 Zapisano' : '💾 Zapisuję...';
      autosaveEl.style.opacity = saved ? '0.7' : '1';
    }
  }

  // ================================
  // 📤 EKSPORT
  // ================================
  exportMarkdown() {
    const markdown = this.editor.innerHTML
      .replace(/<strong>(.*?)</strong>/g, '**$1**')
      .replace(/<em>(.*?)</em>/g, '*$1*')
      .replace(/<u>(.*?)</u>/g, '_$1_')
      .replace(/<br>/g, '
')
      .replace(/</?(p|div)[^>]*>/g, '

')
      .replace(/<[^>]*>/g, '');
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eterniverse_${this.app.state.active.brama.name}_${Date.now()}.md`;
    a.click();
  }

  // ================================
  // 🎨 TOOLBAR UPDATE
  // ================================
  updateToolbarState() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const formats = ['bold', 'italic', 'underline'];
    formats.forEach(fmt => {
      const btn = this.toolbar.querySelector(`[data-format="${fmt}"]`);
      if (btn) {
        btn.classList.toggle('active', document.queryCommandState(fmt));
      }
    });
  }

  // ================================
  // PLUGIN LIFECYCLE
  // ================================
  activate() {
    if (this.isActive) return;
    this.isActive = true;
    this.editor.focus();
    this.updateToolbarState();
    this.app.broadcast('EDITOR_ACTIVATED', this.state);
  }

  deactivate() {
    this.isActive = false;
    this.saveEditorState();
  }

  // Utils
  getSelectedText() {
    return window.getSelection().toString().trim();
  }

  getLastSentence() {
    const text = this.editor.textContent;
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentences[sentences.length - 1] || text.slice(-100);
  }
}

// ================================
// 🤖 AI AUTOCOMPLETE
// ================================
class AIAutocomplete {
  constructor(editor) {
    this.editor = editor;
    this.isTyping = false;
    this.debounceTimer = null;
  }

  async onInput() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.suggest();
    }, 800);
  }

  async generate(prompt, context) {
    // Mock AI - zastąp Gemini/GPT
    const mockResponses = [
      'Elara spojrzała w otchłań. Cienie poruszyły się...',
      'Wtem z mgły wyłoniła się sylwetka. Nie był to człowiek...',
      'Portal zamigotał. Czas się złamał. Przyszłość napłynęła falą wspomnień...'
    ];
    
    // Symulacja AI delay
    await new Promise(r => setTimeout(r, 1200));
    
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  async suggest() {
    const text = this.editor.getLastSentence();
    if (text.length < 20) return;

    const suggestion = await this.generate('suggest', { text });
    
    const suggestionsEl = document.getElementById('aiSuggestions');
    suggestionsEl.innerHTML = `
      <div class="ai-suggestion">
        🤖 "${suggestion}"
        <button class="accept-btn">Akceptuj</button>
        <button class="reject-btn">Odrzuć</button>
      </div>
    `;
    
    suggestionsEl.style.opacity = '1';
  }
}

// CSS dla pluginu (inline)
const style = document.createElement('style');
style.textContent = `
  .book-header { 
    display: flex; justify-content: space-between; align-items: center; 
    margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(139,92,246,0.3);
  }
  
  .book-stats { display: flex; gap: 1.5rem; font-size: 0.9rem; color: #94a3b8; }
  
  .chapter-nav { display: flex; gap: 0.5rem; align-items: center; }
  .chapter-nav select { padding: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(139,92,246,0.3); color: white; }
  
  .editor-toolbar { 
    display: flex; gap: 0.5rem; padding: 1rem; background: rgba(15,34,63,0.8); 
    border-radius: 16px; margin-bottom: 1rem; flex-wrap: wrap;
  }
  
  .toolbar-group { display: flex; gap: 0.25rem; }
  .toolbar-group.right { margin-left: auto; }
  
  .toolbar-btn { 
    padding: 0.5rem 0.75rem; border: 1px solid rgba(139,92,246,0.3); 
    background: transparent; color: white; border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
  }
  .toolbar-btn:hover, .toolbar-btn.active { 
    background: rgba(139,92,246,0.3); border-color: #8b5cf6; 
  }
  .ai-btn { background: rgba(16,185,129,0.2); border-color: #10b981; }
  
  .format-select { 
    padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.1); 
    border: 1px solid rgba(139,92,246,0.3); color: white; border-radius: 6px;
  }
  
  .rich-editor-container { position: relative; height: 70vh; }
  .editor-area {
    width: 100%; height: 100%; padding: 2rem; 
    background: linear-gradient(180deg, rgba(10,26,54,0.95) 0%, rgba(2,5,15,0.98) 100%);
    border: 2px solid rgba(139,92,246,0.2); border-radius: 24px;
    font-family: 'Crimson Text', serif; font-size: 1.2rem; line-height: 1.8;
    color: #f8fbff; outline: none; overflow-y: auto;
    backdrop-filter: blur(20px);
  }
  .editor-area:focus { border-color: #8b5cf6; box-shadow: 0 0 40px rgba(139,92,246,0.4); }
  .editor-area::placeholder { color: #64748b; }
  
  .ai-suggestions {
    position: absolute; bottom: 20px; left: 20px; right: 20px;
    opacity: 0; transition: opacity 0.3s; pointer-events: none;
  }
  .ai-suggestions.show { opacity: 1; pointer-events: all; }
  
  .ai-suggestion {
    background: linear-gradient(145deg, rgba(139,92,246,0.9), rgba(6,182,212,0.9));
    padding: 1.25rem; border-radius: 16px; color: white;
    box-shadow: 0 20px 40px rgba(139,92,246,0.4);
  }
  .accept-btn, .reject-btn {
    margin-left: 1rem; padding: 0.5rem 1rem; border: none;
    border-radius: 6px; cursor: pointer; font-weight: 600;
  }
  .accept-btn { background: #10b981; color: white; }
  .reject-btn { background: rgba(255,255,255,0.2); color: white; }
  
  .nav-btn { 
    padding: 0.5rem; background: rgba(139,92,246,0.2); 
    border: 1px solid rgba(139,92,246,0.4); border-radius: 6px; 
    color: white; cursor: pointer;
  }
`;
document.head.appendChild(style);

console.log('📖 BookEditor plugin loaded');
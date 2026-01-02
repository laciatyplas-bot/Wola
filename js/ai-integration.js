// ========================================
// ETERNIVERSE MASTER 2026 - ai-integration.js v2.1
// Bella AI • Profiles • Editor Integration • Offline AI Engine
// ========================================

'use strict';

class BellaAI {
  constructor() {
    this.promptInput = document.getElementById('aiPrompt');
    this.output = document.getElementById('aiOutput');
    this.generateBtn = document.getElementById('generateContent');

    this.editor =
      document.getElementById('editor-content') ||
      document.querySelector('.rich-editor');

    this.activeProfile = 'eterseeker';
    this.isProcessing = false;

    this.profiles = {
      amazon: {
        name: 'Amazon',
        tone: 'sprzedażowy, klarowny, konkretny',
        rules: [
          'minimum 200 słów',
          'jasne korzyści',
          'wezwanie do działania'
        ]
      },
      wattpad: {
        name: 'Wattpad',
        tone: 'emocjonalny, narracyjny, cliffhanger',
        rules: [
          'krótkie zdania',
          'emocje',
          'pytania końcowe'
        ]
      },
      eterseeker: {
        name: 'EterSeeker',
        tone: 'manifest, metafizyka, świadomość',
        rules: [
          'język symboliczny',
          'pytania egzystencjalne',
          'brak banałów'
        ]
      }
    };

    this.init();
  }

  // =========================
  // INIT
  // =========================
  init() {
    this.bindEvents();
    this.detectProfileButtons();

    console.log('🤖 Bella AI v2.1 READY');
  }

  // =========================
  // EVENTS
  // =========================
  bindEvents() {
    if (this.generateBtn) {
      this.generateBtn.addEventListener('click', () => this.generate());
    }

    document.addEventListener('initAIStudio', () => {
      this.focusPrompt();
    });

    document.addEventListener('worldSelected', e => {
      this.injectContext(e.detail.world);
    });
  }

  detectProfileButtons() {
    document.querySelectorAll('[data-profile]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setProfile(btn.dataset.profile);
      });
    });
  }

  setProfile(profile) {
    if (!this.profiles[profile]) return;
    this.activeProfile = profile;

    document
      .querySelectorAll('[data-profile]')
      .forEach(b => b.classList.remove('active'));

    document
      .querySelector(`[data-profile="${profile}"]`)
      ?.classList.add('active');

    CoreEngine?.showToast(
      `🤖 Bella: tryb ${this.profiles[profile].name}`,
      'info'
    );
  }

  // =========================
  // AI CORE
  // =========================
  generate() {
    if (this.isProcessing) return;

    const prompt = this.promptInput?.value.trim();
    if (!prompt) {
      CoreEngine?.showToast('⚠️ Wpisz polecenie dla AI', 'warn');
      return;
    }

    this.isProcessing = true;
    this.showLoading();

    // OFFLINE AI MOCK (STABILNE)
    setTimeout(() => {
      const result = this.mockAI(prompt);
      this.displayResult(result);
      this.injectToEditor(result);
      this.isProcessing = false;
    }, 1200);
  }

  mockAI(prompt) {
    const profile = this.profiles[this.activeProfile];

    return `
${profile.name.toUpperCase()} MODE

${prompt}

—
Styl: ${profile.tone}
Zasady:
${profile.rules.map(r => `• ${r}`).join('\n')}

Tekst:

${
  this.activeProfile === 'amazon'
    ? 'To nie jest zwykły produkt. To decyzja, która zmienia codzienność. Zamów teraz i poczuj różnicę.'
    : this.activeProfile === 'wattpad'
    ? 'Zatrzymała się. Oddech zamarł. A potem świat pękł dokładnie w tym miejscu.'
    : 'Nie jesteś myślą. Jesteś przestrzenią, w której myśl się pojawia.'
}
`.trim();
  }

  // =========================
  // OUTPUT
  // =========================
  showLoading() {
    if (!this.output) return;
    this.output.innerHTML = '🤖 Bella analizuje…';
  }

  displayResult(text) {
    if (!this.output) return;
    this.output.textContent = text;
  }

  injectToEditor(text) {
    if (!this.editor) return;

    this.editor.focus();
    document.execCommand('insertText', false, '\n\n' + text);

    document.dispatchEvent(
      new CustomEvent('editorContentChanged', {
        detail: { source: 'bella-ai' }
      })
    );
  }

  // =========================
  // CONTEXT
  // =========================
  injectContext(world) {
    if (!this.promptInput) return;

    this.promptInput.value =
      `Kontekst świata:\n${world.name}\n${world.description}\n\n` +
      this.promptInput.value;
  }

  focusPrompt() {
    this.promptInput?.focus();
  }
}

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  window.BellaAI = new BellaAI();
});
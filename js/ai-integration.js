// ========================================
// ETERNIVERSE MASTER 2026
// Bella AI • Offline AI Engine • Editor Integration
// ai-integration.js v2.2 STABLE
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

    this.dynamicProfileContext = {};

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

    if (!this.editor) {
      console.warn('Bella AI: brak edytora');
      window.CoreEngine?.showToast(
        '⚠️ Bella: nie wykryto edytora tekstu',
        'warn'
      );
    }

    console.log('Bella AI v2.2 READY');
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

    window.CoreEngine?.showToast(
      `Bella: tryb ${this.profiles[profile].name}`,
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
      window.CoreEngine?.showToast('⚠️ Wpisz polecenie dla AI', 'warn');
      return;
    }

    this.isProcessing = true;
    this.showLoading();

    setTimeout(() => {
      try {
        const result = this.mockAI(prompt);
        this.displayResult(result);
        this.injectToEditor(result);
      } finally {
        this.isProcessing = false;
      }
    }, 1000);
  }

  mockAI(prompt) {
    const profile = this.profiles[this.activeProfile];
    const extra = this.dynamicProfileContext[this.activeProfile] || '';

    let generatedText = '';

    if (this.activeProfile === 'amazon') {
      generatedText =
        'To nie jest zwykły produkt. To decyzja, która zmienia codzienność. Każdy element tej historii prowadzi do jednego wyboru. Zamów teraz.';
    } else if (this.activeProfile === 'wattpad') {
      generatedText =
        'Zatrzymała się. Oddech zamarł. Świat nie pękł głośno — pękł dokładnie tam, gdzie bolało najbardziej. A ty? Czytasz dalej?';
    } else {
      generatedText =
        'Nie jesteś myślą. Jesteś przestrzenią, w której myśl się pojawia. System działa tylko tak długo, jak długo w niego wierzysz.';
    }

    return `
${profile.name.toUpperCase()} MODE

PROMPT:
${prompt}

STYL:
${profile.tone}

ZASADY:
${profile.rules.map(r => `• ${r}`).join('\n')}

${extra}

TEKST:
${generatedText}
`.trim();
  }

  // =========================
  // OUTPUT
  // =========================
  showLoading() {
    if (!this.output) return;
    this.output.textContent = 'Bella analizuje…';
  }

  displayResult(text) {
    if (!this.output) return;
    this.output.textContent = text;
  }

  injectToEditor(text) {
    if (!this.editor) return;

    this.editor.focus();

    if (this.editor.isContentEditable) {
      this.editor.innerText += '\n\n' + text;
    } else if ('value' in this.editor) {
      this.editor.value += '\n\n' + text;
    }

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
    if (!this.promptInput || !world) return;

    this.promptInput.value =
      `KONTEKST ŚWIATA:\n${world.name}\n${world.description || ''}\n\n` +
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
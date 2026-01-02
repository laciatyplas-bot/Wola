// ========================================
// BELLA AI MEMORY — BRAMA CONTEXT STORAGE
// Offline AI Memory per Brama
// bella-ai-memory.js v1.0 STABLE
// ========================================

'use strict';

class BellaAIMemory {
  constructor() {
    this.storagePrefix = 'ETERNIVERSE_AI_MEMORY_BRAMA_';
    this.activeBramaId = null;

    this.init();
  }

  // =========================
  // INIT
  // =========================
  init() {
    document.addEventListener('worldSelected', e => {
      this.detectBramaContext(e.detail.world);
    });

    document.addEventListener('editorContentChanged', e => {
      if (e.detail?.source === 'bella-ai') {
        this.captureEditorOutput();
      }
    });

    console.log('Bella AI Memory READY');
  }

  // =========================
  // CONTEXT DETECTION
  // =========================
  detectBramaContext(world) {
    if (!world || !world.name) return;

    // Próbujemy wyciągnąć ID BRAMY z nazwy (BRAMA III — ...)
    const match = world.name.match(/BRAMA\s+([IVX]+)/i);
    if (!match) return;

    const roman = match[1];
    const bramaId = this.romanToNumber(roman);

    if (!bramaId) return;

    this.activeBramaId = bramaId;

    const memory = this.loadMemory(bramaId);
    if (memory) {
      this.injectMemoryToPrompt(memory);
    }
  }

  // =========================
  // MEMORY OPS
  // =========================
  storageKey(bramaId) {
    return this.storagePrefix + bramaId;
  }

  loadMemory(bramaId) {
    return localStorage.getItem(this.storageKey(bramaId));
  }

  saveMemory(bramaId, text) {
    localStorage.setItem(this.storageKey(bramaId), text);
  }

  appendMemory(bramaId, text) {
    const existing = this.loadMemory(bramaId) || '';
    const updated = existing + '\n\n' + text;
    this.saveMemory(bramaId, updated);
  }

  // =========================
  // INTEGRATION
  // =========================
  injectMemoryToPrompt(memory) {
    const input = document.getElementById('aiPrompt');
    if (!input) return;

    input.value =
      `PAMIĘĆ BRAMY (nie powtarzaj dosłownie):\n${memory}\n\n` +
      input.value;
  }

  captureEditorOutput() {
    if (!this.activeBramaId) return;

    const editor =
      document.getElementById('editor-content') ||
      document.querySelector('.rich-editor');

    if (!editor) return;

    let content = '';

    if (editor.isContentEditable) {
      content = editor.innerText.trim();
    } else if ('value' in editor) {
      content = editor.value.trim();
    }

    if (!content) return;

    // zapisujemy TYLKO ostatni fragment (delta)
    const delta = content.slice(-1200);

    this.appendMemory(this.activeBramaId, delta);
  }

  // =========================
  // HELPERS
  // =========================
  romanToNumber(roman) {
    const map = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 5,
      VI: 6,
      VII: 7,
      VIII: 8,
      IX: 9,
      X: 10
    };
    return map[roman.toUpperCase()] || null;
  }
}

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  window.BellaAIMemory = new BellaAIMemory();
});
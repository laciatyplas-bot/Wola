// ========================================
// BELLA AI MEMORY COMPRESSOR
// Limit + Auto-Streszczenie Pamięci Bramy
// bella-ai-memory-compressor.js v1.0 STABLE
// ========================================

'use strict';

class BellaAIMemoryCompressor {
  constructor() {
    this.storagePrefix = 'ETERNIVERSE_AI_MEMORY_BRAMA_';

    this.MAX_CHARS = 6000;      // twardy limit pamięci
    this.KEEP_TAIL = 2000;      // ile najnowszego tekstu zostawić
    this.SUMMARY_SIZE = 1500;   // docelowa długość streszczenia

    this.init();
  }

  // =========================
  // INIT
  // =========================
  init() {
    document.addEventListener('editorContentChanged', e => {
      if (e.detail?.source === 'bella-ai') {
        this.checkAllMemories();
      }
    });

    console.log('Bella AI Memory Compressor READY');
  }

  // =========================
  // CORE
  // =========================
  checkAllMemories() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(this.storagePrefix))
      .forEach(key => {
        const memory = localStorage.getItem(key);
        if (!memory) return;

        if (memory.length > this.MAX_CHARS) {
          const compressed = this.compress(memory);
          localStorage.setItem(key, compressed);
        }
      });
  }

  compress(fullMemory) {
    const tail = fullMemory.slice(-this.KEEP_TAIL);
    const head = fullMemory.slice(0, fullMemory.length - this.KEEP_TAIL);

    const summary = this.summarize(head);

    return `
STRESZCZENIE PAMIĘCI (zachowaj sens, nie cytuj):
${summary}

--- OSTATNIE ZDARZENIA ---
${tail}
`.trim();
  }

  // =========================
  // OFFLINE "STRESZCZANIE"
  // (deterministyczne, stabilne)
  // =========================
  summarize(text) {
    // czyszczenie
    const cleaned = text
      .replace(/\n{2,}/g, '\n')
      .replace(/[^\S\r\n]+/g, ' ')
      .trim();

    if (cleaned.length <= this.SUMMARY_SIZE) {
      return cleaned;
    }

    // heurystyka: wybieramy zdania kluczowe
    const sentences = cleaned
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.length > 40);

    const step = Math.max(1, Math.floor(sentences.length / 8));

    let summary = [];
    for (let i = 0; i < sentences.length; i += step) {
      summary.push(sentences[i]);
      if (summary.join(' ').length >= this.SUMMARY_SIZE) break;
    }

    return summary.join(' ').slice(0, this.SUMMARY_SIZE).trim();
  }
}

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  window.BellaAIMemoryCompressor = new BellaAIMemoryCompressor();
});
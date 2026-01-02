// data.js — ETERNIVERSE BOOK MASTER v2.1
// Stabilna struktura danych | 8 Światów × 10 Bram
// 2026 | Maciej Maciuszek

'use strict';

class EterData {
  constructor() {
    this.version = '2.1';
    this.created = new Date().toISOString();

    this.universe = {
      worlds: 8,
      gates: 10,
      defaultChapters: 1
    };

    this.worldPresets = this.initWorldPresets();
    this.gateTemplates = this.initGateTemplates();
    this.aiPrompts = this.initAIPrompts();
    this.audioVoices = this.initVoices();
    this.coverStyles = this.initCoverStyles();

    this.ensureStorage();
  }

  // ===============================
  // 🌌 ŚWIATY
  // ===============================
  initWorldPresets() {
    return {
      1: { name: 'Pasja', color: '#FF6B6B', starter: 'Płomienie pochłaniają horyzont…' },
      2: { name: 'Harmonia', color: '#4ECDC4', starter: 'Fale szepczą pradawne sekrety…' },
      3: { name: 'Głębia', color: '#45B7D1', starter: 'Wiatr niesie echo zapomnianych gwiazd…' },
      4: { name: 'Wzrost', color: '#96CEB4', starter: 'Korzenie sięgają ku wieczności…' },
      5: { name: 'Mądrość', color: '#FFEAA7', starter: 'Złote światło przebija mgłę czasu…' },
      6: { name: 'Tajemnica', color: '#DDA0DD', starter: 'W mroku kryje się prawda…' },
      7: { name: 'Moc', color: '#F7DC6F', starter: 'Grom przecina niebiosa…' },
      8: { name: 'Transcendencja', color: '#BB8FCE', starter: 'Poza czasem istnieje nieskończoność…' }
    };
  }

  // ===============================
  // 🚪 BRAMY
  // ===============================
  initGateTemplates() {
    return [
      { id: 1, name: 'Wstęp', targetWords: 500 },
      { id: 2, name: 'Wezwanie', targetWords: 800 },
      { id: 3, name: 'Odmowa', targetWords: 700 },
      { id: 4, name: 'Mentor', targetWords: 900 },
      { id: 5, name: 'Próg', targetWords: 1200 },
      { id: 6, name: 'Próby', targetWords: 1500 },
      { id: 7, name: 'Punkt Zwrotny', targetWords: 1800 },
      { id: 8, name: 'Ordeal', targetWords: 2000 },
      { id: 9, name: 'Nagroda', targetWords: 1400 },
      { id: 10, name: 'Powrót', targetWords: 1600 }
    ];
  }

  // ===============================
  // 🤖 AI PROMPTS
  // ===============================
  initAIPrompts() {
    return {
      plot: [
        'Rozwiń fabułę dla Świata {world} i Bramy {gate}',
        'Dodaj konflikt i stawkę emocjonalną',
        'Zaproponuj punkt zwrotny'
      ]
    };
  }

  // ===============================
  // 🎧 GŁOSY
  // ===============================
  initVoices() {
    return [
      { name: 'Bella', lang: 'pl-PL', rate: 0.9, pitch: 1.1 },
      { name: 'Narrator', lang: 'pl-PL', rate: 0.85, pitch: 0.9 }
    ];
  }

  // ===============================
  // 🖼️ OKŁADKI
  // ===============================
  initCoverStyles() {
    return {
      cosmic: '#667eea',
      fantasy: '#ff6b6b',
      noir: '#1a1a1a'
    };
  }

  // ===============================
  // 💾 STORAGE
  // ===============================
  ensureStorage() {
    for (let w = 1; w <= 8; w++) {
      for (let g = 1; g <= 10; g++) {
        const key = this.contentKey(w, g, 1);
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, this.getDefaultContent(w, g));
        }
      }
    }
  }

  contentKey(world, gate, chapter) {
    return `eter-w${world}b${gate}-ch${chapter}`;
  }

  // ===============================
  // 📊 STATYSTYKI
  // ===============================
  getStats() {
    let totalWords = 0;
    let completedGates = 0;

    for (let w = 1; w <= 8; w++) {
      for (let g = 1; g <= 10; g++) {
        const txt = localStorage.getItem(this.contentKey(w, g, 1)) || '';
        const words = txt.trim().split(/\s+/).filter(Boolean).length;
        totalWords += words;

        if (words >= this.gateTemplates[g - 1].targetWords) {
          completedGates++;
        }
      }
    }

    return {
      totalWords,
      avgWords: Math.round(totalWords / 80),
      completedGates,
      progress: Math.round((completedGates / 80) * 100),
      worldsActive: 8
    };
  }

  // ===============================
  // 📦 EXPORT / IMPORT
  // ===============================
  exportUniverse() {
    const payload = {
      version: this.version,
      exported: new Date().toISOString(),
      data: {}
    };

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('eter-')) {
        payload.data[k] = localStorage.getItem(k);
      }
    }

    return payload;
  }

  importUniverse(json) {
    if (!json || json.version !== this.version) {
      throw new Error('Niekompatybilna wersja danych');
    }

    Object.entries(json.data).forEach(([k, v]) => {
      localStorage.setItem(k, v);
    });
  }

  // ===============================
  // 🧱 DEFAULT CONTENT
  // ===============================
  getDefaultContent(world, gate) {
    const w = this.worldPresets[world];
    const g = this.gateTemplates[gate - 1];

    return `=== ${w.name} — Brama ${g.name} ===

${w.starter}

Cel bramy: ${g.targetWords} słów

[Tu zaczyna się narracja]
`;
  }
}

// ===============================
// 🌍 GLOBAL
// ===============================
window.EterData = EterData;

document.addEventListener('DOMContentLoaded', () => {
  window.eterData = new EterData();
  console.log('📚 EterData v2.1 gotowa', window.eterData.getStats());
});

// ===============================
// 🔌 API DLA APP / RENDER
// ===============================
window.eterDataAPI = {
  getWorld: (id) => window.eterData.worldPresets[id],
  getGate: (id) => window.eterData.gateTemplates[id - 1],
  getStats: () => window.eterData.getStats(),
  exportUniverse: () => window.eterData.exportUniverse()
};
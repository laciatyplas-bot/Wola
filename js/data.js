// js/data.js — ETERNIVERSE BOOK MASTER v2.2
// Stabilna struktura danych | 8 Światów × 10 Bram × wiele rozdziałów
// Master Edition 2026 | Maciej Maciuszek

'use strict';

class EterData {
  constructor() {
    this.version = '2.2';
    this.created = new Date().toISOString();

    this.universe = {
      worlds: 8,
      gatesPerWorld: 10,
      defaultChaptersPerGate: 1
    };

    this.worldPresets = this.initWorldPresets();
    this.gateTemplates = this.initGateTemplates();
    this.aiPrompts = this.initAIPrompts();
    this.audioVoices = this.initVoices();
    this.coverStyles = this.initCoverStyles();

    this.ensureStorage();
  }

  /* ===============================
     🌌 ŚWIATY
  =============================== */
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

  /* ===============================
     🚪 BRAMY
  =============================== */
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

  /* ===============================
     🤖 AI PROMPTY
  =============================== */
  initAIPrompts() {
    return {
      plot: [
        'Rozwiń fabułę dla Świata {world} i Bramy {gate}',
        'Dodaj konflikt i stawkę emocjonalną',
        'Zaproponuj punkt zwrotny'
      ],
      style: [
        'Styl surowy, filozoficzny',
        'Unikaj banałów',
        'Zakończ pytaniem'
      ]
    };
  }

  /* ===============================
     🎧 AUDIO
  =============================== */
  initVoices() {
    return [
      { name: 'Bella', rate: 0.9, pitch: 1.1 },
      { name: 'Narrator', rate: 0.85, pitch: 0.9 }
    ];
  }

  /* ===============================
     🖼️ OKŁADKI
  =============================== */
  initCoverStyles() {
    return {
      cosmic: { bg: '#050510', accent: '#00ffff' },
      fire: { bg: '#1a0000', accent: '#ff6b6b' }
    };
  }

  /* ===============================
     💾 STORAGE
  =============================== */
  ensureStorage() {
    for (let w = 1; w <= this.universe.worlds; w++) {
      for (let g = 1; g <= this.universe.gatesPerWorld; g++) {
        const key = this.contentKey(w, g, 1);
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, this.getDefaultContent(w, g));
        }
      }
    }
  }

  contentKey(world, gate, chapter = 1) {
    return `eter-w${world}b${gate}-ch${chapter}`;
  }

  getDefaultContent(world, gate) {
    const w = this.worldPresets[world];
    const g = this.gateTemplates[gate - 1];

    return `=== ${w.name} — ${g.name} ===

${w.starter}

Cel bramy: ~${g.targetWords} słów

[Zacznij pisać tutaj]
`;
  }

  /* ===============================
     📊 STATYSTYKI
  =============================== */
  getStats() {
    let totalWords = 0;
    let completedGates = 0;

    for (let w = 1; w <= this.universe.worlds; w++) {
      for (let g = 1; g <= this.universe.gatesPerWorld; g++) {
        let words = 0;
        let ch = 1;
        let key;

        do {
          key = this.contentKey(w, g, ch);
          const text = localStorage.getItem(key);
          if (!text) break;
          words += text.trim().split(/\s+/).filter(Boolean).length;
          ch++;
        } while (true);

        totalWords += words;
        if (words >= this.gateTemplates[g - 1].targetWords * 0.9) {
          completedGates++;
        }
      }
    }

    const totalGates = this.universe.worlds * this.universe.gatesPerWorld;

    return {
      totalWords,
      completedGates,
      totalGates,
      progress: Math.round((completedGates / totalGates) * 100)
    };
  }
}

/* ===============================
   🌍 GLOBAL
=============================== */
window.EterData = EterData;

document.addEventListener('DOMContentLoaded', () => {
  window.eterData = new EterData();
  console.log('📚 ETERDATA v2.2 READY');
});

/* ===============================
   🔌 API
=============================== */
window.eterDataAPI = {
  getWorld: id => window.eterData.worldPresets[id],
  getGate: id => window.eterData.gateTemplates[id - 1],
  getStats: () => window.eterData.getStats(),
  contentKey: (w, g, ch) => window.eterData.contentKey(w, g, ch)
};
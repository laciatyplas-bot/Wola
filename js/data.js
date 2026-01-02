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

  // ===============================
  // 🌌 PRESETY ŚWIATÓW
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
  // 🚪 SZABLONY BRAM
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
  // 🤖 PROMPTY AI
  // ===============================
  initAIPrompts() {
    return {
      plot: [
        'Rozwiń fabułę dla Świata {world} i Bramy {gate}',
        'Dodaj konflikt i stawkę emocjonalną',
        'Zaproponuj punkt zwrotny',
        'Wprowadź bohatera z wewnętrznym konfliktem'
      ],
      style: [
        'Napisz w stylu Macieja Maciuszka – surowo, filozoficznie, bez ozdobników',
        'Użyj metafory ognia, cienia, oddechu',
        'Zakończ rozdział pytaniem do czytelnika'
      ]
    };
  }

  // ===============================
  // 🎧 GŁOSY SYNTEZY
  // ===============================
  initVoices() {
    return [
      { name: 'Bella', voice: 'pl-PL-Standard-A', rate: 0.9, pitch: 1.1 },
      { name: 'Narrator Głęboki', voice: 'pl-PL-Standard-B', rate: 0.85, pitch: 0.9 },
      { name: 'Eter', voice: 'pl-PL-Standard-C', rate: 0.95, pitch: 1.0 }
    ];
  }

  // ===============================
  // 🖼️ STYLE OKŁADEK
  // ===============================
  initCoverStyles() {
    return {
      cosmic: { bg: '#0a001f', accent: '#00ffff', secondary: '#ff00ff' },
      fire: { bg: '#1a0000', accent: '#ff6b6b', secondary: '#ffd700' },
      shadow: { bg: '#000011', accent: '#8b5cf6', secondary: '#ffffff' },
      ocean: { bg: '#001a1a', accent: '#28d3c6', secondary: '#ffffff' }
    };
  }

  // ===============================
  // 💾 STORAGE – inicjalizacja defaultów
  // ===============================
  ensureStorage() {
    for (let w = 1; w <= this.universe.worlds; w++) {
      for (let g = 1; g <= this.universe.gatesPerWorld; g++) {
        for (let ch = 1; ch <= this.universe.defaultChaptersPerGate; ch++) {
          const key = this.contentKey(w, g, ch);
          if (!localStorage.getItem(key)) {
            localStorage.setItem(key, this.getDefaultContent(w, g));
          }
        }
      }
    }
  }

  contentKey(world, gate, chapter = 1) {
    return `eter_w\( {world}_g \){gate}_ch${chapter}`;
  }

  getDefaultContent(world, gate) {
    const w = this.worldPresets[world];
    const g = this.gateTemplates.find(t => t.id === gate);

    return `=== ${w.name} — ${g.name} ===

${w.starter}

Cel bramy: ~${g.targetWords} słów

[Tu zaczyna się Twoja narracja]

`;
  }

  // ===============================
  // 📊 STATYSTYKI PROJEKTU
  // ===============================
  getStats() {
    let totalWords = 0;
    let completedGates = 0;
    let totalGates = this.universe.worlds * this.universe.gatesPerWorld;

    for (let w = 1; w <= this.universe.worlds; w++) {
      for (let g = 1; g <= this.universe.gatesPerWorld; g++) {
        let gateWords = 0;
        let ch = 1;
        let key;
        do {
          key = this.contentKey(w, g, ch);
          const text = localStorage.getItem(key) || '';
          const words = text.trim().split(/\s+/).filter(Boolean).length;
          gateWords += words;
          ch++;
        } while (localStorage.getItem(key));

        totalWords += gateWords;

        const target = this.gateTemplates[g - 1].targetWords;
        if (gateWords >= target * 0.9) completedGates++; // 90% = ukończona
      }
    }

    return {
      totalWords,
      totalGates,
      completedGates,
      progress: Math.round((completedGates / totalGates) * 100),
      avgWordsPerGate: Math.round(totalWords / totalGates),
      worldsActive: this.universe.worlds
    };
  }

  // ===============================
  // 📦 EKSPORT / IMPORT CAŁEGO UNIWERSUM
  // ===============================
  exportUniverse() {
    const payload = {
      app: 'ETERNIVERSE BOOK MASTER',
      version: this.version,
      exportedAt: new Date().toISOString(),
      stats: this.getStats(),
      data: {}
    };

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('eter_')) {
        payload.data[key] = localStorage.getItem(key);
      }
    }

    return payload;
  }

  importUniverse(jsonString) {
    try {
      const payload = JSON.parse(jsonString);
      if (payload.app !== 'ETERNIVERSE BOOK MASTER') throw new Error('Nieprawidłowy format');

      Object.entries(payload.data).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      location.reload();
    } catch (err) {
      console.error('Błąd importu:', err);
      alert('Błąd importu danych');
    }
  }

  clearUniverse() {
    if (confirm('Na pewno wyczyścić cały wszechświat? To nieodwracalne.')) {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('eter_')) {
          localStorage.removeItem(key);
        }
      }
      this.ensureStorage();
      location.reload();
    }
  }
}

// ===============================
  // 🌍 GLOBALNY DOSTĘP
  // ===============================
window.EterData = EterData;

document.addEventListener('DOMContentLoaded', () => {
  window.eterData = new EterData();
  console.log('📚 ETERNIVERSE BOOK MASTER v2.2 załadowany');
  console.log('Statystyki:', window.eterData.getStats());
});

// ===============================
  // 🔌 PUBLIC API DLA APP / RENDER
  // ===============================
window.eterDataAPI = {
  getWorld: (id) => window.eterData.worldPresets[id],
  getGate: (id) => window.eterData.gateTemplates[id - 1],
  getStats: () => window.eterData.getStats(),
  exportUniverse: () => JSON.stringify(window.eterData.exportUniverse(), null, 2),
  importUniverse: (json) => window.eterData.importUniverse(json),
  clearUniverse: () => window.eterData.clearUniverse(),
  contentKey: (w, g, ch) => window.eterData.contentKey(w, g, ch)
};
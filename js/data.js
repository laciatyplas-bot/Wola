// data.js — ETERNIVERSE BOOK MASTER v2.0 — STRUKTURA DANYCH
// 8 Światów × 10 Bram × Dynamiczne Rozdziały
// Wydawnictwo Architekta Woli | 2026

class EterData {
  constructor() {
    this.version = '2.0.0';
    this.created = new Date().toISOString();
    this.universe = {
      worlds: 8,
      gates: 10,
      maxChapters: 50,
      totalSlots: 800 // 8×10×10 default chapters
    };
    
    this.worldPresets = this.initWorldPresets();
    this.gateTemplates = this.initGateTemplates();
    this.aiPrompts = this.initAIPrompts();
    this.audioVoices = this.initVoices();
    this.coverStyles = this.initCoverStyles();
    
    this.initStorage();
  }

  // 🌌 PRESETY 8 ŚWIATÓW
  initWorldPresets() {
    return {
      1: { 
        name: 'Pasja', 
        color: '#FF6B6B', 
        theme: 'ogień, walka, emocje',
        mood: 'intensywny, dramatyczny',
        starter: 'Płomienie pochłaniają horyzont...'
      },
      2: { 
        name: 'Harmonia', 
        color: '#4ECDC4', 
        theme: 'woda, uzdrowienie, miłość',
        mood: 'spokojny, refleksyjny',
        starter: 'Fale szepczą pradawne sekrety...'
      },
      3: { 
        name: 'Głębia', 
        color: '#45B7D1', 
        theme: 'powietrze, mądrość, podróż',
        mood: 'mistyczny, filozoficzny',
        starter: 'Wiatr niesie echo zapomnianych gwiazd...'
      },
      4: { 
        name: 'Wzrost', 
        color: '#96CEB4', 
        theme: 'ziemia, natura, rozwój',
        mood: 'optymistyczny, inspirujący',
        starter: 'Korzenie sięgają ku wieczności...'
      },
      5: { 
        name: 'Mądrość', 
        color: '#FFEAA7', 
        theme: 'światło, wiedza, przeznaczenie',
        mood: 'szlachetny, epicki',
        starter: 'Złote światło przebija mgłę czasu...'
      },
      6: { 
        name: 'Tajemnica', 
        color: '#DDA0DD', 
        theme: 'cień, sekrety, magia',
        mood: 'tajemniczy, niepokojący',
        starter: 'W mroku kryje się prawda...'
      },
      7: { 
        name: 'Moc', 
        color: '#F7DC6F', 
        theme: 'grom, siła, konflikt',
        mood: 'potężny, heroiczny',
        starter: 'Grom przecina niebiosa...'
      },
      8: { 
        name: 'Transcendencja', 
        color: '#BB8FCE', 
        theme: 'eter, jedność, wieczność',
        mood: 'duchowy, kosmiczny',
        starter: 'Poza czasem istnieje nieskończoność...'
      }
    };
  }

  // 🚪 SZABLONY 10 BRAM
  initGateTemplates() {
    return [
      { id: 1, name: 'Wstęp', prompt: 'przedstaw świat i bohatera', words: 500 },
      { id: 2, name: 'Wezwanie', prompt: 'pierwsze wyzwanie', words: 800 },
      { id: 3, name: 'Odmowa', prompt: 'bohater unika przeznaczenia', words: 700 },
      { id: 4, name: 'Mentor', prompt: 'spotkanie z przewodnikiem', words: 900 },
      { id: 5, name: 'Próg', prompt: 'wejście w nieznane', words: 1200 },
      { id: 6, name: 'Próby', prompt: 'seria wyzwań', words: 1500 },
      { id: 7, name: 'Punkt zwrotny', prompt: 'najgłębsze pragnienie', words: 1800 },
      { id: 8, name: 'Ordeal', prompt: 'śmierć i odrodzenie', words: 2000 },
      { id: 9, name: 'Nagroda', prompt: 'zdobycze i refleksja', words: 1400 },
      { id: 10, name: 'Powrót', prompt: 'nowe życie, przemiana', words: 1600 }
    ];
  }

  // 🤖 PROMPTY AI
  initAIPrompts() {
    return {
      plot: [
        'Wygeneruj epicką fabułę dla Świata {world} w Bramie {gate}',
        'Stwórz konflikt z elementami {worldTheme}',
        'Opisz kluczową scenę transformacji bohatera'
      ],
      characters: [
        'Stwórz 3 archetypy postaci dla Świata {world}',
        'Mentor dla Bramy {gate} z unikalną historią',
        'Antagonista z motywacją i słabością'
      ],
      dialogue: [
        'Dialog kluczowy dla Bramy {gate}',
        'Konfrontacja emocjonalna z {worldMood}',
        'Mistyczne proroctwo lub przepowiednia'
      ]
    };
  }

  // 🎧 GŁOSY TTS
  initVoices() {
    return [
      { name: 'Bella - Eteryczna', lang: 'pl-PL', rate: 0.9, pitch: 1.1 },
      { name: 'Narrator - Epicki', lang: 'pl-PL', rate: 0.85, pitch: 0.9 },
      { name: 'Męski - Głęboki', lang: 'pl-PL', rate: 0.8, pitch: 0.8 },
      { name: 'Żeński - Delikatny', lang: 'pl-PL', rate: 0.95, pitch: 1.2 }
    ];
  }

  // 🖼️ STYLE OKŁADEK
  initCoverStyles() {
    return {
      cyberpunk: 'linear-gradient(135deg, #0f0f23, #1a0033, #2d1b69)',
      fantasy: 'radial-gradient(circle at 30% 30%, #ff9a56, #ff6b6b, #4ecdc4)',
      cosmic: 'radial-gradient(circle at 20% 80%, #667eea 0%, #764ba2 50%, #f093fb 75%, #f5576c)',
      steampunk: 'linear-gradient(145deg, #2c1810, #3d2b1f, #5a4032)',
      noir: 'linear-gradient(145deg, #1a1a1a, #2d2d2d, #0f0f0f)'
    };
  }

  // 💾 STORAGE MANAGER
  initStorage() {
    // Czyszczenie starych danych
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('eter-') && !key.includes('v2')) {
        localStorage.removeItem(key);
      }
    }
    
    // Inicjalizacja pustych slotów
    this.ensureMinimumData();
  }

  ensureMinimumData() {
    for (let world = 1; world <= 8; world++) {
      for (let gate = 1; gate <= 10; gate++) {
        const key = `eter-w${world}b${gate}-ch1`;
        if (!localStorage.getItem(key)) {
          const starter = this.worldPresets[world].starter;
          localStorage.setItem(key, starter);
        }
      }
    }
  }

  // 📊 ANALITYKA
  getStats() {
    let totalWords = 0;
    let completedGates = 0;
    
    for (let world = 1; world <= 8; world++) {
      for (let gate = 1; gate <= 10; gate++) {
        const content = localStorage.getItem(`eter-w${world}b${gate}-ch1`) || '';
        totalWords += content.split(/s+/).length;
        
        if (content.length > 500) completedGates++;
      }
    }
    
    return {
      totalWords,
      avgWords: Math.round(totalWords / 80),
      completedGates,
      progress: Math.round((completedGates / 80) * 100),
      worldsActive: new Set(
        Array.from(localStorage)
          .filter(([k]) => k.includes('eter-w') && localStorage.getItem(k).length > 100)
          .map(([k]) => k.match(/w(d+)/)?.[1])
      ).size
    };
  }

  // 🔄 EXPORT/IMPORT
  exportUniverse() {
    const data = {
      version: this.version,
      stats: this.getStats(),
      worlds: this.worldPresets,
      data: {}
    };
    
    // Zbierz wszystkie dane
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('eter-')) {
        data.data[key] = localStorage.getItem(key);
      }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eterniverse-world${this.currentWorld}-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importUniverse(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.version === this.version) {
          Object.entries(data.data).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          window.eterNiverse.loadCurrentContent();
          window.eterNiverse.notify('✅ Import zakończony pomyślnie', 'success');
        }
      } catch (err) {
        window.eterNiverse.notify('❌ Błąd importu: niekompatybilny format', 'error');
      }
    };
    reader.readAsText(file);
  }

  // 🎨 GENERATOR OKŁADEK
  generateCover(world, style = 'cosmic') {
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 640;
    
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 480, 640);
    
    // Kolory świata
    gradient.addColorStop(0, this.worldPresets[world].color);
    gradient.addColorStop(0.5, this.coverStyles[style]);
    gradient.addColorStop(1, '#0a0a1a');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 480, 640);
    
    // Tytuł
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 20;
    ctx.fillText(`ŚWIAT ${world}`, 240, 320);
    
    return canvas.toDataURL('image/png');
  }

  // 📈 METRYKI DLA ANALITYKI
  getWorldProgress(world) {
    let words = 0;
    let gates = 0;
    
    for (let gate = 1; gate <= 10; gate++) {
      const content = localStorage.getItem(`eter-w${world}b${gate}-ch1`) || '';
      words += content.split(/s+/).length;
      if (content.length > 1000) gates++;
    }
    
    return {
      world,
      name: this.worldPresets[world].name,
      totalWords: words,
      completedGates: gates,
      progress: Math.round((gates / 10) * 100)
    };
  }

  // 🔥 DEFAULT GENERATOR
  getDefaultContent(world, gate) {
    const worldData = this.worldPresets[world];
    const gateData = this.gateTemplates[gate - 1];
    
    return `=== ${worldData.name} | Brama ${gateData.name} ===

${worldData.starter}

${gateData.prompt.toUpperCase()}

[SZABLON DO ROZWOJU - ${gateData.words} słów]
- Wprowadzenie: ${gateData.prompt}
- Konflikt: 
- Kulminacja:
- Rozwiązanie:

AI gotowe do pomocy z: ${this.aiPrompts.plot[0].replace('{world}', worldData.name).replace('{gate}', gateData.name)}
`;
  }
}

// 🌟 GLOBALNY EKSPORT
window.EterData = EterData;

// Automatyczne inicjalizacja przy ładowaniu
document.addEventListener('DOMContentLoaded', () => {
  window.eterData = new EterData();
  console.log('📚 EterData v2.0 zainicjowana:', {
    worlds: window.eterData.universe.worlds,
    gates: window.eterData.universe.gates,
    stats: window.eterData.getStats()
  });
});

// API dla app.js
window.eterDataAPI = {
  getWorldPreset: (world) => window.eterData.worldPresets[world],
  getGateTemplate: (gate) => window.eterData.gateTemplates[gate - 1],
  generateCover: (world, style) => window.eterData.generateCover(world, style),
  exportUniverse: () => window.eterData.exportUniverse(),
  getStats: () => window.eterData.getStats()
};
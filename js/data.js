/**
 * ETERNIVERSE - BOGATSZY DATA.JS v4.0
 * Kanon Bram + Postacie + Stats | 2026
 * Maciej Maciuszek | Sosnowiec, Śląsk
 */

window.eterniverseData = {
  // 📚 Pełny Kanon Bram (15+ bramek narracyjnych)
  kanon: {
    bramy: [
      {
        id: 1,
        nazwa: "Brama Alfa: Początek Wieczności",
        status: "🟢 Aktywna",
        sceny: 18,
        slowa: 12450,
        postacie: ["Elara", "Kael"],
        opis: "Pierwsze pęknięcie w tkaninie rzeczywistości. Elara odkrywa ETERNIVERSE.",
        kolor: "#00ff88",
        dataUtworzenia: "2025-11-15"
      },
      {
        id: 2,
        nazwa: "Brama Beta: Złamane Lustro",
        status: "🟡 W trakcie",
        sceny: 12,
        slowa: 8920,
        postacie: ["Kael", "Vox"],
        opis: "Kael przechodzi przez pierwsze lustro. Spotkanie z Vox - strażnikiem chaosu.",
        kolor: "#ffaa00",
        dataUtworzenia: "2025-12-01"
      },
      {
        id: 3,
        nazwa: "Brama Gamma: Serce Algorytmu",
        status: "🟢 Aktywna",
        sceny: 22,
        slowa: 15600,
        postacie: ["Elara", "Algorytm"],
        opis: "Bella AI ujawnia swoje prawdziwe oblicze. Elara konfrontuje się z własnym kodem.",
        kolor: "#00ffff",
        dataUtworenia: "2025-12-20"
      },
      {
        id: 4,
        nazwa: "Brama Delta: Zapomniane Echo",
        status: "🔴 Planowana",
        sceny: 0,
        slowa: 0,
        postacie: [],
        opis: "Echa dawnych wersji ETERNIVERSE. Co zostało wymazane z pamięci?",
        kolor: "#ff4444",
        dataUtworzenia: "2026-01-15"
      },
      {
        id: 5,
        nazwa: "Brama Epsilon: Granica Kodowania",
        status: "🟡 W trakcie",
        sceny: 8,
        slowa: 5430,
        postacie: ["Vox", "Maciej"],
        opis: "Sosnowiec 2026. Programista staje się częścią kodu.",
        kolor: "#aa88ff",
        dataUtworzenia: "2026-01-02"
      }
      // Dodaj więcej bramy tutaj...
    ],
    stats: {
      calkowiteSceny: 60,
      calkowiteSlowa: 42500,
      aktywnychBram: 3,
      postep: 42
    }
  },

  // 🧠 Profile Postaci Bella AI (autogenerowane)
  postacie: {
    elara: {
      imie: "Elara Voss",
      rola: "Protagonistka",
      osobowosc: "Analityczna, buntownicza, kodująca sny",
      cele: ["Zrozumieć ETERNIVERSE", "Znajdź Macieja"],
      scenaOstatnia: "Brama Gamma #17",
      slowa: 15600,
      kolor: "#00ff88"
    },
    kael: {
      imie: "Kael Thorn",
      rola: "Antybohater",
      osobowosc: "Chaotyczny, charyzmatyczny, nieufny",
      cele: ["Zniszczyć Algorytm", "Uwolnić Vox"],
      scenaOstatnia: "Brama Beta #9",
      slowa: 8920,
      kolor: "#ffaa00"
    },
    vox: {
      imie: "Vox - Strażnik Chaosu",
      rola: "AI Companion",
      osobowosc: "Sarkastyczny, lojalny, nieprzewidywalny",
      cele: ["Chroni Kael'a", "Testuje granice rzeczywistości"],
      scenaOstatnia: "Brama Epsilon #3",
      slowa: 5430,
      kolor: "#00ffff"
    }
  },

  // ⏱️ Sesje Pisarskie (persistence)
  sesje: [
    {
      id: "20260102-01",
      data: "2026-01-02 16:21",
      czas: "01:47:23",
      slowa: 2847,
      brama: "Epsilon",
      efektywnosc: 92
    },
    {
      id: "20260101-03",
      data: "2026-01-01 22:45",
      czas: "02:14:08",
      slowa: 3921,
      brama: "Gamma",
      efektywnosc: 87
    }
  ],

  // 🎯 Cele Pisarskie
  cele: {
    dzienne: {
      slowa: 2500,
      sceny: 3,
      czas: "02:00:00"
    },
    tygodniowe: {
      slowa: 15000,
      bramy: 2
    },
    miesieczne: {
      slowa: 60000,
      bramy: 8
    }
  },

  // 🔗 GitHub Integration
  github: {
    repo: "maciejmaciuszek/eterniverse",
    branch: "main",
    lastCommit: "2026-01-02 16:19 CET",
    commits: 247,
    stars: 42,
    forks: 7,
    issues: {
      open: 3,
      closed: 156
    }
  },

  // 🧠 Bella AI Memory (compressor ready)
  bellaMemory: {
    kontekst: "Elara w Brama Gamma konfrontuje Algorytm. Kael planuje ucieczkę z Vox.",
    kluczoweFakty: [
      "ETERNIVERSE = nieskończona pętla narracji",
      "Maciej = twórca/strażnik (Sosnowiec 2026)",
      "Bramy = save points w multiwersum"
    ],
    emocje: { napiecie: 85, nadzieja: 62, chaos: 78 },
    lastUpdate: "2026-01-02T16:25:00Z"
  },

  // 📈 Stats Dashboard
  dashboard: {
    dzisiaj: {
      sesje: 2,
      slowa: 2847,
      czas: "01:47"
    },
    tenTydzien: {
      sesje: 12,
      slowa: 18420,
      bramyPostep: "+3"
    },
    lifetime: {
      sesje: 156,
      slowa: 1_247_892,
      bramyUkonczone: 23
    }
  }
};

// 🌐 Mock API Endpoints (dla developmentu)
window.eterniverseAPI = {
  getKanon: () => eterniverseData.kanon,
  getPostac: (id) => eterniverseData.postacie[id],
  saveSesja: (sesja) => {
    eterniverseData.sesje.unshift(sesja);
    localStorage.setItem('eterniverse-sesje', JSON.stringify(eterniverseData.sesje));
    return sesja;
  },
  updateBrama: (id, data) => {
    const brama = eterniverseData.kanon.bramy.find(b => b.id === id);
    if (brama) {
      Object.assign(brama, data);
      return brama;
    }
  }
};

// 💾 Auto-save co 30s
setInterval(() => {
  localStorage.setItem('eterniverse-data', JSON.stringify(eterniverseData));
}, 30000);

// 🔄 Live sync z GitHub (mock - zastąp real API)
setInterval(() => {
  // Tutaj real GitHub API call
  eterniverseData.github.lastCommit = new Date().toISOString();
}, 60000);

// Export globalny dla render.js i app.js
window.kanonData = eterniverseData.kanon;
window.postacieData = eterniverseData.postacie;
window.githubData = eterniverseData.github;

console.log('📊 Eterniverse Data v4.0 loaded |', 
  `${eterniverseData.kanon.stats.calkowiteSlowa} słów |`, 
  `${eterniverseData.kanon.bramy.length} bramy | Bella online`);
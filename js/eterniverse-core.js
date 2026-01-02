// ========================================
// ETERNIVERSE CORE 2026
// World + Brama Registry • AI Context Bridge
// eterniverse-core.js v1.0 STABLE
// ========================================

'use strict';

window.ETERNIVERSE = {
  meta: {
    system: 'ETERNIVERSE',
    version: '2.1',
    architect: 'Maciej Maciuszek',
    kanon: true
  },

  worlds: {},
  bramas: [],
  connections: [],

  activeWorld: null,
  activeBrama: null,

  // =========================
  // INIT
  // =========================
  init(data) {
    if (!data || !data.worlds || !data.bramas) {
      console.error('ETERNIVERSE: błędne dane wejściowe');
      return;
    }

    this.worlds = data.worlds.list;
    this.bramas = data.bramas;
    this.connections = data.connections || [];

    console.log('ETERNIVERSE CORE READY');
  },

  // =========================
  // WORLD / BRAMA SELECTION
  // =========================
  selectWorld(worldId) {
    const world = this.worlds[worldId];
    if (!world) return;

    this.activeWorld = world;

    document.dispatchEvent(
      new CustomEvent('worldSelected', {
        detail: { world }
      })
    );
  },

  selectBrama(bramaId) {
    const brama = this.bramas.find(b => b.id === bramaId);
    if (!brama) return;

    this.activeBrama = brama;

    const context = {
      name: brama.fullName,
      description: `
PYTANIE:
${brama.question}

FUNKCJA:
${brama.function}

ŚWIAT 1:
${brama.world1.title} — ${brama.world1.description}

ŚWIAT 2:
${brama.world2.title} — ${brama.world2.description}
      `.trim()
    };

    document.dispatchEvent(
      new CustomEvent('worldSelected', {
        detail: { world: context }
      })
    );
  },

  // =========================
  // HELPERS
  // =========================
  getBramaById(id) {
    return this.bramas.find(b => b.id === id);
  },

  getWorldById(id) {
    return this.worlds[id];
  }
};

// =========================
// AUTO INIT (JSON INLINE)
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const DATA = {
    "system": "ETERNIVERSE",
    "version": "2.1",
    "architect": "Maciej Maciuszek",
    "layout": "10-bram-linear-plus-meta",
    "worlds": {
      "total": 2,
      "list": {
        "1": {
          "id": 1,
          "name": "ETERNIVERSE SYSTEM",
          "type": "system-world",
          "description": "Świat wewnętrzny. Psychika, wola, archetypy, integracja.",
          "status": "kanon"
        },
        "2": {
          "id": 2,
          "name": "POLARIS",
          "type": "fantasy-inner-earth",
          "description": "Świat za Lodową Ścianą. Fantazja, mit, manifestacja bez granic.",
          "status": "kanon"
        }
      }
    },
    "bramas": window.__ETERNIVERSE_BRAMAS__ || [],
    "connections": [],
    "kanon": true
  };

  // Bramy wstrzykiwane osobno (bez duplikacji)
  ETERNIVERSE.init({
    worlds: DATA.worlds,
    bramas: window.__ETERNIVERSE_BRAMAS__ || [],
    connections: DATA.connections
  });
});
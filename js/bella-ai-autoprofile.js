// ========================================
// BELLA AI AUTO PROFILE — BRAMA → PROFILE
// Automatyczne mapowanie Bramy na Profil AI
// bella-ai-autoprofile.js v1.0 STABLE
// ========================================

'use strict';

class BellaAIAutoProfile {
  constructor() {
    this.bramaProfileMap = {
      1: 'wattpad',     // CIENIA — narracja, emocja
      2: 'eterseeker',  // GENEZA — pamięć, rdzeń
      3: 'eterseeker',  // WOLA — manifest, decyzja
      4: 'eterseeker',  // ARCHETYPY — struktury, role
      5: 'amazon',      // OBFITOŚĆ — materializacja, wynik
      6: 'eterseeker',  // CIAŁO — integracja
      7: 'eterseeker',  // SPLĄTANIE / AI — meta
      8: 'wattpad',     // CZAS — trajektorie, cliff
      9: 'wattpad',     // KOLEKTYW — dramat egzystencjalny
      10: 'eterseeker'  // INTEGRACJA — meta-poziom
    };

    this.init();
  }

  // =========================
  // INIT
  // =========================
  init() {
    document.addEventListener('worldSelected', e => {
      this.detectAndApplyProfile(e.detail.world);
    });

    console.log('Bella AI AutoProfile READY');
  }

  // =========================
  // CORE
  // =========================
  detectAndApplyProfile(world) {
    if (!world || !world.name) return;

    const match = world.name.match(/BRAMA\s+([IVX]+)/i);
    if (!match) return;

    const bramaId = this.romanToNumber(match[1]);
    if (!bramaId) return;

    const profile = this.bramaProfileMap[bramaId];
    if (!profile) return;

    if (window.BellaAI?.setProfile) {
      window.BellaAI.setProfile(profile);
    }
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
  window.BellaAIAutoProfile = new BellaAIAutoProfile();
});
// ========================================
// BELLA HYPER AUTO-PROFILE v2.0 ⚡🤖
// FULL ETERNIVERSE + HYPERDRIVE INTEGRATION
// Brama → AI Profile + MOC BOOST + Visuals
// bella-hyper-autoprofile.js | 2026
// ========================================

'use strict';

class BellaHyperAutoProfile {
  constructor() {
    // HYPER MAP: Brama → AI Style + MOC Multiplier + Visual Theme
    this.hyperProfileMap = {
      inter: { 
        ai: 'shadow_writer',      // subtelne, psychologiczne
        mocBoost: 3,
        visuals: 'cyberpunk',
        voice: 'whisper_reflective',
        traits: ['introspective', 'nuanced', 'layered']
      },
      eter: { 
        ai: 'will_manifest',      // stanowcze, archetypowe
        mocBoost: 7,
        visuals: 'neon_void', 
        voice: 'commanding_philosopher',
        traits: ['decisive', 'archetypal', 'prophetic']
      },
      obfi: {
        ai: 'abundance_engine',   // ekspansywne, materialistyczne  
        mocBoost: 10,
        visuals: 'eterni_blackhole',
        voice: 'flow_master',
        traits: ['generative', 'expansive', 'pragmatic']
      },
      chaos: {
        ai: 'chaos_poet',
        mocBoost: 5,
        visuals: 'cyber_god',
        voice: 'wild_oracle',
        traits: ['unpredictable', 'raw', 'visceral']
      }
    };

    // ETERNIVERSE GATE SYNONYMS
    this.gateSynonyms = {
      'interseeker': 'inter',
      'eterseeker': 'eter', 
      'obfitoseeker': 'obfi',
      'cienia': 'inter',
      'wola': 'eter',
      'obfitość': 'obfi'
    };

    this.initHyperSync();
  }

  // 🚀 HYPER INIT — FULL SYSTEM SYNC
  initHyperSync() {
    // ETERNIVERSE GATE CHANGE
    document.addEventListener('gateChanged', e => {
      this.applyHyperProfile(e.detail.gate);
    });
    
    // HYPER SESSION MOC SYNC
    document.addEventListener('mocUpdate', e => {
      this.syncMocToProfile(e.detail.moc);
    });
    
    // QUICK GATE CYCLE (Ctrl+B)
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key.toLowerCase() === 'b') {
        this.cycleActiveGate();
      }
    });

    // AUTO-DETECT CURRENT GATE
    this.detectCurrentGate();

    console.log('🤖 Bella Hyper AutoProfile v2.0 — FULLY SYNCHRONIZED');
  }

  // ====================
  // CORE PROFILE ENGINE
  // ====================
  applyHyperProfile(gateId) {
    const profile = this.resolveProfile(gateId);
    if (!profile) return;

    console.log(`⚡ HYPER PROFILE: ${gateId.toUpperCase()} → ${profile.ai}`);

    // 1. AI PROFILE SWITCH
    this.switchAIProfile(profile.ai, profile.traits);
    
    // 2. MOC BOOST
    this.applyMocBoost(profile.mocBoost);
    
    // 3. VISUAL SYNC
    this.syncVisuals(profile.visuals);
    
    // 4. VOICE MODE
    this.setVoiceMode(profile.voice);
    
    // 5. HYPER EVENT DISPATCH
    document.dispatchEvent(new CustomEvent('hyperProfileApplied', {
      detail: { gate: gateId, profile }
    }));

    this.currentProfile = profile;
  }

  resolveProfile(gateId) {
    // Direct match
    if (this.hyperProfileMap[gateId]) return this.hyperProfileMap[gateId];
    
    // Synonym resolution
    for (const [synonym, realGate] of Object.entries(this.gateSynonyms)) {
      if (gateId.includes(synonym)) {
        return this.hyperProfileMap[realGate];
      }
    }
    
    // Roman numeral fallback
    const romanMatch = gateId.match(/BRAMAs*[IVX]+/i);
    if (romanMatch) {
      const romanNum = this.romanToGate(romanMatch[0]);
      return this.hyperProfileMap[romanNum];
    }
    
    return null;
  }

  // 🤖 AI PROFILE SWITCHER
  switchAIProfile(profileName, traits) {
    // ETERNIVERSE BELLA INTEGRATION
    if (window.BellaAI?.setProfile) {
      window.BellaAI.setProfile(profileName, traits);
    }
    
    // HYPER SESSION VOICE
    if (window.BellaHyperSession) {
      window.BellaHyperSession.setVoiceMode?.(profileName);
    }
    
    // VISUAL FEEDBACK
    this.triggerProfileSwitchEffect(profileName);
  }

  // ⚡ MOC BOOST APPLICATION
  applyMocBoost(boost) {
    const currentMoc = window.EterniverseHyperApp?.mocLevel || 0;
    const newMoc = Math.min(10, currentMoc + boost);
    
    if (window.EterniverseHyperApp) {
      window.EterniverseHyperApp.mocLevel = newMoc;
    }
    
    if (window.BellaHyperSession) {
      window.BellaHyperSession.mocLevel = newMoc;
    }
    
    document.dispatchEvent(new CustomEvent('mocUpdate', {
      detail: { moc: newMoc, source: 'profileBoost' }
    }));
  }

  // 🎨 VISUAL THEME SYNC
  syncVisuals(visualTheme) {
    if (window.EterniverseHyperRenderer) {
      window.EterniverseHyperRenderer.currentHyperTheme = visualTheme;
      window.EterniverseHyperRenderer.applyHyperTheme();
    }
  }

  // 🔊 VOICE MODE SETTER
  setVoiceMode(voice) {
    document.body.setAttribute('data-voice-mode', voice);
    document.documentElement.style.setProperty('--voice-hue', 
      voice.includes('shadow') ? '220' : 
      voice.includes('command') ? '300' : '120');
  }

  // ====================
  // UTILITY FUNCTIONS
  // ====================
  detectCurrentGate() {
    const gateEl = document.getElementById('gate');
    if (gateEl && gateEl.value) {
      this.applyHyperProfile(gateEl.value);
    }
  }

  cycleActiveGate() {
    const gateEl = document.getElementById('gate');
    if (!gateEl) return;
    
    const gates = Array.from(gateEl.options)
      .map(opt => opt.value)
      .filter(Boolean);
    
    const currentIdx = gates.indexOf(gateEl.value);
    const nextIdx = (currentIdx + 1) % gates.length;
    
    gateEl.value = gates[nextIdx];
    gateEl.dispatchEvent(new Event('change'));
    
    // AUTO-PROFILE SWITCH
    this.applyHyperProfile(gates[nextIdx]);
  }

  romanToGate(romanStr) {
    const romanMap = {
      'I': 'inter', 'II': 'eter', 'III': 'eter', 
      'IV': 'eter', 'V': 'obfi', 'VI': 'chaos'
    };
    return romanMap[romanStr.toUpperCase().replace(/BRAMAs*/i, '')];
  }

  // ====================
  // VISUAL EFFECTS
  // ====================
  triggerProfileSwitchEffect(profile) {
    const effect = document.createElement('div');
    effect.className = 'profile-switch-effect';
    effect.innerHTML = `⚡ ${profile.toUpperCase()}`;
    
    Object.assign(effect.style, {
      position: 'fixed',
      top: '20vh',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '36px',
      fontWeight: '900',
      color: '#00ffdd',
      textShadow: '0 0 40px currentColor',
      zIndex: '99999',
      pointerEvents: 'none',
      animation: 'profileSwitch 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    });
    
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
  }

  // ====================
  // MOC SYNC
  // ====================
  syncMocToProfile(moc) {
    if (moc >= 8 && this.currentProfile?.mocBoost < 8) {
      // UPGRADE TO GOD MODE PROFILE
      this.applyHyperProfile('chaos');
    }
  }
}

// ====================
// HYPER CSS INJECTION
// ====================
const injectHyperStyles = () => {
  if (document.getElementById('hyper-profile-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'hyper-profile-styles';
  style.textContent = `
    @keyframes profileSwitch {
      0% { 
        opacity: 0; transform: translateX(-50%) translateY(-100px) scale(0.5); 
      }
      50% { 
        opacity: 1; transform: translateX(-50%) translateY(0) scale(1.2); 
      }
      100% { 
        opacity: 0; transform: translateX(-50%) translateY(100px) scale(0.8); 
      }
    }
    
    [data-voice-mode="whisper_reflective"] * { 
      --voice-hue: 220; 
    }
    [data-voice-mode="commanding_philosopher"] * { 
      --voice-hue: 300; 
    }
    [data-voice-mode="flow_master"] * { 
      --voice-hue: 120; 
    }
    
    .profile-switch-effect {
      font-family: 'Orbitron', monospace !important;
      filter: drop-shadow(0 0 20px currentColor);
    }
  `;
  document.head.appendChild(style);
};

// ====================
// GLOBAL HYPER LAUNCH
// ====================
document.addEventListener('DOMContentLoaded', () => {
  injectHyperStyles();
  window.BellaHyperAutoProfile = new BellaHyperAutoProfile();
  
  // AUTO-DETECT INITIAL GATE
  setTimeout(() => {
    const gateEl = document.getElementById('gate');
    if (gateEl?.value) {
      gateEl.dispatchEvent(new Event('change'));
    }
  }, 500);
});
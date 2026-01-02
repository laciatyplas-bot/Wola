/**
 * ETERNIVERSE - HYPER RENDERER v4.0 ⚡🌌
 * FULL HYPERDRIVE INTEGRATION + AI VISUALS
 * Renderer + HyperSession + EterCore | 2026
 * MOC 200% — VISUAL WRITING BEHEMOTH
 */

class EterniverseHyperRenderer {
  constructor() {
    this.version = '4.0-HYPER';
    this.mocVisuals = 0;
    this.hyperCanvas = null;
    this.renderLoop = null;
    
    // HYPER THEMES z MOC LEVEL
    this.hyperThemes = {
      cyber_god: {
        bg: 'radial-gradient(circle at 50% 20%, #ff00aa20 0%, #000 70%)',
        accent: '#00ffdd',
        glow: '0 0 40px #00ffdd, 0 0 80px #ff00aa, 0 0 120px #00ffdd80',
        particles: 150
      },
      neon_void: {
        bg: 'linear-gradient(45deg, #0a001a 0%, #1a0033 40%, #0a001a 100%)',
        accent: '#ff44ff',
        glow: '0 0 30px #ff44ff, 0 0 60px #44ff44, 0 0 100px #ff44ff40',
        particles: 120
      },
      eterni_blackhole: {
        bg: 'conic-gradient(from 0deg at 30% 30%, #000 0deg, #0a0a1a 90deg, #000 180deg, #1a0a2a 270deg)',
        accent: '#00ccff',
        glow: '0 0 60px #00ccff, 0 0 120px #ffaa00, 0 0 200px #00ccff40',
        particles: 200
      }
    };
    
    this.currentHyperTheme = 'cyber_god';
    this.bellaHyperStats = { scenes: 0, words: 0, kanon: 0, moc: 0, aiBursts: 0 };
    this.initHyperforge();
  }

  // 🚀 HYPERFORGE INIT — VISUAL MOC 200%
  initHyperforge() {
    console.log('🌌⚡ HyperRenderer v4.0 — VISUAL HYPERDRIVE ONLINE');
    
    this.setupHyperCanvas();
    this.loadHyperData();
    this.injectHyperControls();
    this.renderHyperStatus();
    this.renderKanonHyperGrid();
    this.startHyperRenderLoop();
    this.initHyperParticles();
    this.bindHyperEvents();
  }

  // 🖼️ FULLSCREEN HYPER CANVAS
  setupHyperCanvas() {
    this.hyperCanvas = document.createElement('canvas');
    Object.assign(this.hyperCanvas.style, {
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: -1,
      background: this.hyperThemes[this.currentHyperTheme].bg
    });
    this.hyperCanvas.id = 'hyper-render-canvas';
    document.body.appendChild(this.hyperCanvas);
    
    this.ctx = this.hyperCanvas.getContext('2d');
    this.resizeHyperCanvas();
    window.addEventListener('resize', () => this.resizeHyperCanvas());
  }

  resizeHyperCanvas() {
    this.hyperCanvas.width = window.innerWidth;
    this.hyperCanvas.height = window.innerHeight;
  }

  // 📊 HYPER STATUS — LIVE MOC SYNC
  renderHyperStatus() {
    const statusEl = document.querySelector('.status, section p, #status, .hero p');
    if (!statusEl) return;

    // FULL MODULE SYNC
    const appMoc = window.EterniverseHyperApp?.mocLevel || 0;
    const hyperMoc = window.BellaHyperSession?.mocLevel || 0;
    const sessionWords = window.EterSession?.stats?.words || 0;
    
    this.mocVisuals = Math.max(appMoc, hyperMoc);
    this.bellaHyperStats.moc = this.mocVisuals;
    this.bellaHyperStats.words = sessionWords;

    statusEl.innerHTML = `
      ⚡ <strong>HYPER v4.0</strong> | 
      MOC <span style="color:hsl(${this.mocVisuals*36},100%,60%)">${this.mocVisuals}/10</span> | 
      ✍️ ${this.bellaHyperStats.words} słów | 
      🤖 ${this.bellaHyperStats.aiBursts} AI | 
      ⏱️ ${this.getHyperUptime()}
    `;
    
    this.applyMocGlow(statusEl);
  }

  applyMocGlow(el) {
    const theme = this.hyperThemes[this.currentHyperTheme];
    el.style.textShadow = theme.glow;
    el.style.background = `linear-gradient(45deg, transparent, ${theme.accent}20)`;
    el.style.webkitBackgroundClip = 'text';
  }

  getHyperUptime() {
    return new Date().toLocaleTimeString('pl-PL', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  // 🌌 KANON HYPERGRID — 3D CARDS
  renderKanonHyperGrid() {
    const container = document.querySelector('main, section, .content');
    if (!container || window.location.hash.includes('writing')) return;

    const hyperGrid = document.createElement('div');
    hyperGrid.className = 'kanon-hypergrid';
    hyperGrid.innerHTML = `
      <h2 class="hyper-title">⚡ KANON HYPERGRID</h2>
      <div class="hyper-grid-3d" id="kanonGrid">${this.generateHyperKanon()}</div>
    `;
    
    container.appendChild(hyperGrid);
    this.animateHyperGrid();
  }

  generateHyperKanon() {
    const hyperBramy = window.kanonData?.bramy || [
      { id: 'inter', name: '🌀 INTERSEEKER', moc: 7, scenes: 24, aiUsed: 12 },
      { id: 'eter', name: '🌌 ETERSEEKER', moc: 9, scenes: 18, aiUsed: 8 },
      { id: 'obfi', name: '💎 OBFITOSEEKER', moc: 10, scenes: 32, aiUsed: 20 },
      { id: 'chaos', name: '🔥 CHAOS GATE', moc: 5, scenes: 6, aiUsed: 3 }
    ];

    return hyperBramy.map(b => `
      <div class="hyper-card-3d" data-moc="${b.moc}" data-id="${b.id}">
        <div class="card-front">
          <div class="card-moc">MOC ${b.moc}/10</div>
          <h3>${b.name}</h3>
          <div class="card-stats">
            📊 ${b.scenes} scen | 🤖 ${b.aiUsed} AI
          </div>
        </div>
        <div class="card-back">
          <div>Expand: Ctrl+Shift+${b.id.charAt(0)}</div>
          <div>Status: HYPER ACTIVE</div>
        </div>
      </div>
    `).join('');
  }

  animateHyperGrid() {
    document.querySelectorAll('.hyper-card-3d').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateZ(-100px) rotateY(90deg)';
      
      setTimeout(() => {
        card.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateZ(0) rotateY(0deg)';
      }, i * 120);
      
      // 3D HOVER
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateZ(60px) rotateY(-15deg) rotateX(10deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateZ(0) rotateY(0deg) rotateX(0deg)';
      });
      
      // QUICK AI EXPAND
      card.addEventListener('click', () => {
        this.quickBramaExpand(card.dataset.id);
      });
    });
  }

  quickBramaExpand(bramaId) {
    if (window.expandScene && document.getElementById('gate')) {
      document.getElementById('gate').value = bramaId;
      window.expandScene();
      this.bellaHyperStats.aiBursts++;
      this.renderHyperStatus();
    }
  }

  // 🎨 HYPER THEME ENGINE + MOC SYNC
  injectHyperControls() {
    const nav = document.querySelector('nav, header');
    if (!nav) return;
    
    const hyperToggle = document.createElement('button');
    hyperToggle.innerHTML = '⚡ HYPER';
    hyperToggle.className = 'hyper-toggle';
    hyperToggle.onclick = () => this.cycleHyperTheme();
    
    nav.appendChild(hyperToggle);
  }

  cycleHyperTheme() {
    const keys = Object.keys(this.hyperThemes);
    const idx = keys.indexOf(this.currentHyperTheme);
    this.currentHyperTheme = keys[(idx + 1) % keys.length];
    
    this.applyHyperTheme();
    localStorage.setItem('hyper-theme', this.currentHyperTheme);
  }

  applyHyperTheme() {
    const theme = this.hyperThemes[this.currentHyperTheme];
    
    document.documentElement.style.setProperty('--hyper-bg', theme.bg);
    document.documentElement.style.setProperty('--hyper-accent', theme.accent);
    document.documentElement.style.setProperty('--hyper-glow', theme.glow);
    
    if (this.hyperCanvas) {
      this.hyperCanvas.style.background = theme.bg;
    }
    
    this.updateHyperParticles(theme.particles);
    this.renderHyperStatus();
  }

  // ✨ HYPER PARTICLES — MOC-REACTIVE
  initHyperParticles() {
    this.hyperParticles = [];
    for (let i = 0; i < 120; i++) {
      this.hyperParticles.push(this.createMocParticle());
    }
  }

  createMocParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() * 360,
      mocPulse: Math.random() * Math.PI * 2
    };
  }

  updateHyperParticles(count) {
    while (this.hyperParticles.length < count) {
      this.hyperParticles.push(this.createMocParticle());
    }
  }

  // 🔄 60FPS HYPER RENDER LOOP
  startHyperRenderLoop() {
    this.renderLoop = () => {
      this.renderHyperFrame();
      requestAnimationFrame(this.renderLoop);
    };
    this.renderLoop();
  }

  renderHyperFrame() {
    const w = this.hyperCanvas.width;
    const h = this.hyperCanvas.height;
    
    // CLEAR + THEME BG
    this.ctx.fillStyle = this.hyperThemes[this.currentHyperTheme].bg;
    this.ctx.fillRect(0, 0, w, h);
    
    // MOC-REACTIVE PARTICLES
    const mocMultiplier = this.mocVisuals / 10;
    this.hyperParticles.forEach(p => {
      // MOC VELOCITY BOOST
      p.vx *= 0.99 + (mocMultiplier * 0.02);
      p.vy *= 0.99 + (mocMultiplier * 0.02);
      
      p.x += p.vx;
      p.y += p.vy;
      
      // WRAP AROUND
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      
      // MOC GLOW RENDER
      const glowSize = p.size * (1 + mocMultiplier);
      const pulse = Math.sin(p.mocPulse + Date.now() * 0.01) * 0.3 + 0.7;
      
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize * 2);
      gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.opacity * pulse})`);
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, glowSize * 2, 0, Math.PI * 2);
      this.ctx.fill();
      
      p.mocPulse += 0.05;
    });
    
    // HYPER GRID LINES (subtelne)
    this.renderHyperGrid();
  }

  renderHyperGrid() {
    this.ctx.strokeStyle = `hsla(200, 80%, 50%, 0.03)`;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    
    for (let x = 0; x < this.hyperCanvas.width; x += 80) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.hyperCanvas.height);
    }
    for (let y = 0; y < this.hyperCanvas.height; y += 80) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.hyperCanvas.width, y);
    }
    
    this.ctx.stroke();
  }

  // 🔌 HYPER EVENT BINDINGS
  bindHyperEvents() {
    // MOC STATUS SYNC
    document.addEventListener('mocUpdate', (e) => {
      this.mocVisuals = e.detail.moc;
      this.renderHyperStatus();
    });
    
    // AI BURST VISUAL
    document.addEventListener('aiBurst', () => {
      this.bellaHyperStats.aiBursts++;
      this.triggerHyperBurst();
    });
  }

  triggerHyperBurst() {
    // FULLSCREEN BURST EFFECT
    const burst = document.createElement('div');
    burst.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle, #00ffdd80 0%, transparent 70%);
      pointer-events: none; z-index: 9999;
      animation: burstExpand 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 800);
  }

  // 💾 HYPER DATA LOAD
  loadHyperData() {
    if (window.kanonData) {
      Object.assign(this.bellaHyperStats, window.kanonData.stats || {});
    }
    
    const saved = localStorage.getItem('hyper-theme');
    if (saved && this.hyperThemes[saved]) {
      this.currentHyperTheme = saved;
      this.applyHyperTheme();
    }
  }
}

// 🎬 HYPER RENDER LAUNCH
document.addEventListener('DOMContentLoaded', () => {
  window.EterniverseHyperRenderer = new EterniverseHyperRenderer();
  
  // CSS INJECTION dla animacji
  const style = document.createElement('style');
  style.textContent = `
    @keyframes burstExpand {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(3); opacity: 0; }
    }
    
    @keyframes sprintPulse {
      0% { transform: scale(1) rotate(0deg); opacity: 1; }
      50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
      100% { transform: scale(0.5) rotate(360deg); opacity: 0; }
    }
    
    .hyper-card-3d {
      perspective: 1000px; transform-style: preserve-3d;
      transition: all 0.4s ease;
    }
    
    .hyper-title {
      background: linear-gradient(45deg, #00ffdd, #ff00ff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-shadow: 0 0 40px currentColor;
    }
  `;
  document.head.appendChild(style);
});
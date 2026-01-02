/**
 * ETERNIVERSE - WZMOCNIONY RENDER.JS v3.0
 * Dynamic Rendering + Visualizations | 2026
 * Maciej Maciuszek | Sosnowiec
 */

class EterniverseRenderer {
  constructor() {
    this.themes = {
      cyberpunk: {
        bg: 'linear-gradient(135deg, #050510 0%, #0a0a1a 50%, #050510 100%)',
        accent: '#00ffff',
        glow: '0 0 20px #00ffff, 0 0 40px #00ffff'
      },
      neon: {
        bg: 'linear-gradient(135deg, #0f0f23 0%, #1a0f2e 50%, #0f0f23 100%)',
        accent: '#ff00ff',
        glow: '0 0 20px #ff00ff, 0 0 40px #ff00ff'
      },
      void: {
        bg: 'radial-gradient(circle at 20% 80%, #1a0f3a 0%, #050510 50%, #000 100%)',
        accent: '#00ccff',
        glow: '0 0 15px #00ccff, 0 0 30px #00ccff80'
      }
    };
    
    this.currentTheme = 'cyberpunk';
    this.bellaStats = { scenes: 0, words: 0, kanon: 0 };
    this.init();
  }

  init() {
    console.log('🎨 EterniverseRenderer v3.0 - Dynamic rendering online');
    this.loadData();
    this.setupThemeSwitcher();
    this.renderStatus();
    this.renderKanonPreview();
    this.startLiveUpdates();
    this.initParticles();
  }

  // 📊 Dynamic Status Rendering
  renderStatus() {
    const statusEl = document.querySelector('section p');
    if (!statusEl) return;

    const statusData = {
      repo: this.checkGitHubStatus(),
      mobile: this.isMobileOptimized(),
      bella: this.bellaStats,
      uptime: this.getUptime()
    };

    statusEl.innerHTML = `
      🟢 <strong>Repo:</strong> ${statusData.repo} | 
      📱 <strong>Mobile:</strong> ${statusData.mobile} | 
      🧠 <strong>Bella:</strong> ${statusData.bella.scenes} scen | 
      ⏱️ <strong>Uptime:</strong> ${statusData.uptime}
    `;
  }

  checkGitHubStatus() {
    // Mock GitHub API check (zastąp swoim repo)
    return '🟢 LIVE (v2.6)';
  }

  isMobileOptimized() {
    return window.innerWidth <= 768 ? '🚀 Optimized' : '✅ Desktop';
  }

  getUptime() {
    const now = new Date();
    return now.toLocaleTimeString('pl-PL', { 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
  }

  // 📚 Kanon Preview Renderer
  renderKanonPreview() {
    const section = document.querySelector('section');
    if (!section || window.location.hash.includes('writing')) return;

    const kanonPreview = document.createElement('div');
    kanonPreview.className = 'kanon-preview';
    kanonPreview.innerHTML = `
      <h3>📖 Kanon Bram - Podgląd</h3>
      <div class="kanon-grid">
        ${this.generateKanonCards()}
      </div>
    `;

    section.appendChild(kanonPreview);
    this.animateKanonCards();
  }

  generateKanonCards() {
    // Integracja z data.js - użyj swoich danych kanonicznych
    const bramy = window.kanonData?.bramy || [
      { name: 'Brama 1: Początek', status: '🟢 Aktywna', scenes: 12 },
      { name: 'Brama 2: Konflikt', status: '🟡 W trakcie', scenes: 8 },
      { name: 'Brama 3: Kulminacja', status: '🔴 Planowana', scenes: 0 }
    ];

    return bramy.map(b => `
      <div class="kanon-card" data-scenes="${b.scenes}">
        <div class="card-header">${b.name}</div>
        <div class="card-status">${b.status}</div>
        <div class="card-metric">📊 ${b.scenes} scen</div>
      </div>
    `).join('');
  }

  animateKanonCards() {
    document.querySelectorAll('.kanon-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px) scale(0.8)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, i * 100);
      
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotateX(5deg)';
        card.style.filter = 'drop-shadow(0 20px 40px rgba(0,255,255,0.4))';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotateX(0)';
        card.style.filter = '';
      });
    });
  }

  // 🎨 Theme Engine
  setupThemeSwitcher() {
    const nav = document.querySelector('nav');
    const toggle = document.createElement('button');
    toggle.innerHTML = '🎨 THEME';
    toggle.style.fontSize = '1rem';
    toggle.style.opacity = '0.8';
    
    toggle.addEventListener('click', () => this.cycleTheme());
    nav.appendChild(toggle);
  }

  cycleTheme() {
    const themeKeys = Object.keys(this.themes);
    const currentIndex = themeKeys.indexOf(this.currentTheme);
    this.currentTheme = themeKeys[(currentIndex + 1) % themeKeys.length];
    
    this.applyTheme();
    localStorage.setItem('eterniverse-theme', this.currentTheme);
  }

  applyTheme() {
    const theme = this.themes[this.currentTheme];
    document.documentElement.style.setProperty('--bg-primary', theme.bg);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--neon-glow', theme.glow);
    
    // Live status update
    this.renderStatus();
  }

  // ✨ Particle Background
  initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-bg';
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      pointer-events: none; z-index: -1; opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    this.particles = new ParticleSystem(canvas);
    this.particles.start();
  }

  // 🔄 Live Data Updates
  startLiveUpdates() {
    setInterval(() => {
      this.renderStatus();
      if (window.EterniverseApp?.sessionActive) {
        this.updateSessionVisualization();
      }
    }, 5000);
  }

  updateSessionVisualization() {
    // Integracja z app.js session
    const session = window.EterniverseApp;
    if (session) {
      this.bellaStats.words += Math.floor(Math.random() * 50); // Mock
      this.renderStatus();
    }
  }

  // Data Loader
  loadData() {
    if (window.kanonData) {
      this.bellaStats = {
        scenes: window.kanonData.scenes || 0,
        words: window.kanonData.words || 0,
        kanon: window.kanonData.bramy?.length || 0
      };
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('eterniverse-theme');
    if (savedTheme && this.themes[savedTheme]) {
      this.currentTheme = savedTheme;
      this.applyTheme();
    }
  }
}

// 🌌 Particle System (natywny, performant)
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = '#00ffff';
      this.ctx.shadowColor = '#00ffff';
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// 🚀 Global Init
document.addEventListener('DOMContentLoaded', () => {
  window.EterniverseRenderer = new EterniverseRenderer();
});
// render.js — ETERNIVERSE BOOK MASTER v2.0 — KWANTOWY RENDER ENGINE
// Dynamiczne renderowanie treści | 8 Światów × 10 Bram
// Wydawnictwo Architekta Woli | 2026 | Renderowanie komponentów

class QuantumRender {
  constructor() {
    this.components = new Map();
    this.cache = new Map();
    this.morphs = 0;
    this.initComponents();
    this.startRenderLoop();
  }

  // 🏗️ REJESTRACJA KOMPONENTÓW
  initComponents() {
    this.components.set('chapter-list', this.renderChapterList.bind(this));
    this.components.set('world-stats', this.renderWorldStats.bind(this));
    this.components.set('cover-generator', this.renderCoverGenerator.bind(this));
    this.components.set('audio-waveform', this.renderAudioWaveform.bind(this));
    this.components.set('ai-console-history', this.renderAIHistory.bind(this));
  }

  // 🔄 GŁÓWNA PĘTLA RENDER
  startRenderLoop() {
    const renderFrame = () => {
      this.morphs++;
      if (this.shouldReRender()) {
        this.renderDirtyComponents();
      }
      requestAnimationFrame(renderFrame);
    };
    renderFrame();
  }

  shouldReRender() {
    return this.morphs % 3 === 0 || document.visibilityState === 'visible';
  }

  // 📦 RENDER KOMPONENTU
  render(componentId, targetSelector, data = {}) {
    const renderer = this.components.get(componentId);
    if (!renderer) return;

    const cacheKey = `${componentId}:${JSON.stringify(data)}`;
    if (this.cache.has(cacheKey)) {
      this.updateDOM(targetSelector, this.cache.get(cacheKey));
      return;
    }

    const html = renderer(data);
    this.cache.set(cacheKey, html);
    this.updateDOM(targetSelector, html);
  }

  updateDOM(selector, html) {
    const target = document.querySelector(selector);
    if (target) {
      target.innerHTML = html;
      this.applyMorphEffects(target);
    }
  }

  applyMorphEffects(element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.95)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'all 0.4s cubic-bezier(0.25,1,0.3,1)';
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  // 📖 RENDER LISTY ROZDZIAŁÓW
  renderChapterList(data) {
    const { world, brama, chapters = [] } = data;
    return chapters.map(chapter => `
      <div class="chapter-morph ${chapter.active ? 'active' : ''}" data-chapter="${chapter.id}">
        <div class="chapter-header">
          <span class="chapter-num">#${chapter.id}</span>
          <h4 class="chapter-title">${chapter.title}</h4>
        </div>
        <div class="chapter-progress">
          <div class="progress-ring" style="--progress: ${chapter.progress}">
            <span>${chapter.progress}%</span>
          </div>
          <div class="chapter-meta">
            <span class="words">${chapter.words.toLocaleString()} słów</span>
            <span class="status ${chapter.status.toLowerCase()}">${chapter.status}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 📊 RENDER STATYSTYK ŚWIATÓW
  renderWorldStats(data) {
    const { stats } = data;
    return `
      <div class="stats-morph">
        <div class="stat-grid">
          <div class="stat-item total-words">
            <div class="stat-number">${stats.totalWords.toLocaleString()}</div>
            <div class="stat-label">Słów w Univerum</div>
          </div>
          <div class="stat-item progress">
            <div class="stat-number">${stats.progress}%</div>
            <div class="stat-label">Postęp Bram</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${stats.progress}%"></div>
            </div>
          </div>
          <div class="stat-item worlds">
            <div class="stat-number">${stats.worldsActive}</div>
            <div class="stat-label">Aktywne Światy</div>
          </div>
          <div class="stat-item avg-gate">
            <div class="stat-number">${stats.avgWords.toLocaleString()}</div>
            <div class="stat-label">Średnio na Bramę</div>
          </div>
        </div>
      </div>
    `;
  }

  // 🖼️ RENDER GENERATORA OKŁADEK
  renderCoverGenerator(data) {
    const { world, style } = data;
    const worldColor = window.eterData?.worldPresets[world]?.color || '#28D3C6';
    
    return `
      <div class="cover-morph">
        <canvas class="cover-canvas" width="480" height="640"></canvas>
        <div class="cover-controls">
          <div class="color-presets">
            ${Object.entries(window.eterData?.coverStyles || {}).map(([name, gradient]) => `
              <button class="color-btn" data-gradient="${gradient}" style="background: ${gradient}">
                ${name}
              </button>
            `).join('')}
          </div>
          <button class="ai-cover-btn">🤖 AI Okładka</button>
          <button class="export-cover-btn">💾 PNG</button>
        </div>
      </div>
    `;
  }

  // 🎧 RENDER FORMY DŹWIĘKOWEJ
  renderAudioWaveform(data) {
    const { duration, progress } = data;
    return `
      <div class="waveform-morph">
        <div class="wave-container">
          <div class="wave-peaks" style="--peaks: 20; --progress: ${progress}">
            ${Array.from({ length: 20 }, (_, i) => `
              <div class="wave-peak" style="--index: ${i}; --height: ${Math.random() * 80 + 20}%"></div>
            `).join('')}
          </div>
        </div>
        <div class="audio-controls">
          <span class="time">${this.formatTime(duration)}</span>
          <div class="transport">
            <button class="rewind">⏮</button>
            <button class="play-pause">▶️</button>
            <button class="stop">⏹️</button>
            <button class="forward">⏭</button>
          </div>
        </div>
      </div>
    `;
  }

  // 💭 RENDER HISTORII AI
  renderAIHistory(data) {
    const { history = [] } = data;
    return history.map((entry, index) => `
      <div class="ai-entry morph-${index % 3}">
        <div class="ai-timestamp">${this.formatTimestamp(entry.time)}</div>
        <div class="ai-command">${entry.command}</div>
        <div class="ai-response">${entry.response}</div>
        <button class="ai-repeat" data-command="${entry.command}">🔄 Powtórz</button>
      </div>
    `).join('');
  }

  // 🔧 RENDER DIRTY COMPONENTS
  renderDirtyComponents() {
    // Automatyczne renderowanie zmienionych komponentów
    if (window.eterNiverse) {
      this.render('chapter-list', '#chaptersList', {
        world: window.eterNiverse.currentWorld,
        brama: window.eterNiverse.currentBrama
      });
      
      this.render('world-stats', '#statsContainer', {
        stats: window.eterDataAPI.getStats()
      });
    }
  }

  // 🎨 UTILITY FUNCTIONS
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  formatTimestamp(isoString) {
    return new Date(isoString).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

// 🖼️ COVER CANVAS RENDERER
class CoverRenderer {
  static generate(world, style = 'cosmic') {
    const canvas = document.querySelector('.cover-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(240, 320, 0, 240, 320, 400);
    
    const worldColor = window.eterData?.worldPresets[world]?.color || '#28D3C6';
    gradient.addColorStop(0, worldColor);
    gradient.addColorStop(0.4, style);
    gradient.addColorStop(0.8, '#0a0a1a');
    gradient.addColorStop(1, '#000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 480, 640);
    
    // Tytuł świata
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 64px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 32;
    ctx.fillText(`ŚWIAT ${world}`, 240, 280);
    
    // Podtytuł
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.shadowBlur = 16;
    ctx.fillText(window.eterData?.worldPresets[world]?.name || 'Nowa opowieść', 240, 340);
  }
}

// 🎵 WAVEFORM ANIMATOR
class WaveformAnimator {
  static animate() {
    const peaks = document.querySelectorAll('.wave-peak');
    peaks.forEach((peak, index) => {
      const progress = parseFloat(peak.parentElement.style.getPropertyValue('--progress') || 0);
      const height = parseFloat(peak.style.getPropertyValue('--height') || 50);
      peak.style.transform = `scaleY(${0.5 + (height / 100) * progress / 100})`;
    });
  }
}

// 🚀 GLOBAL EXPORTS
window.QuantumRender = QuantumRender;
window.CoverRenderer = CoverRenderer;
window.WaveformAnimator = WaveformAnimator;

// INICJALIZACJA
document.addEventListener('DOMContentLoaded', () => {
  window.qRender = new QuantumRender();
  
  // Bind global events
  setInterval(() => {
    WaveformAnimator.animate();
  }, 100);
  
  // Auto-render covers on world change
  document.addEventListener('worldChanged', (e) => {
    CoverRenderer.generate(e.detail.world);
  });
});

// js/render.js — ETERNIVERSE BOOK MASTER v2.2
// Quantum Render Engine — stabilny, deterministyczny, SPA-ready
// 8 Światów × 10 Bram | Master Edition 2026 | Maciej Maciuszek

'use strict';

class QuantumRender {
  constructor() {
    this.components = new Map();
    this.cache = new Map();
    this.dirty = new Set();

    this.initComponents();
    this.bindEvents();
    this.renderAll(); // Pierwsze renderowanie

    console.log('🌀 QuantumRender v2.2 uruchomiony');
  }

  // ===============================
  // REJESTRACJA KOMPONENTÓW
  // ===============================
  initComponents() {
    this.components.set('chapter-list', this.renderChapterList.bind(this));
    this.components.set('world-stats', this.renderWorldStats.bind(this));
    this.components.set('cover-generator', this.renderCoverGenerator.bind(this));
    this.components.set('audio-waveform', this.renderAudioWaveform.bind(this));
    this.components.set('ai-history', this.renderAIHistory.bind(this));
    this.components.set('gate-list', this.renderGateList.bind(this));
  }

  // ===============================
  // EVENTY GLOBALNE
  // ===============================
  bindEvents() {
    document.addEventListener('worldChanged', () => this.markDirty('gate-list', 'cover-generator', 'world-stats'));
    document.addEventListener('gateChanged', () => this.markDirty('chapter-list', 'cover-generator'));
    document.addEventListener('chapterChanged', () => this.markDirty('chapter-list'));
    document.addEventListener('statsUpdated', () => this.markDirty('world-stats'));
    document.addEventListener('contentSaved', () => this.markDirty('world-stats'));
    document.addEventListener('aiResponse', () => this.markDirty('ai-history'));
  }

  markDirty(...components) {
    components.forEach(c => this.dirty.add(c));
    this.renderDirty();
  }

  // ===============================
  // RENDER LOOP
  // ===============================
  renderDirty() {
    if (this.dirty.size === 0) return;

    // Chapter list
    if (this.dirty.has('chapter-list')) {
      this.render('chapter-list', '#chaptersList');
    }

    // Gate list
    if (this.dirty.has('gate-list')) {
      this.render('gate-list', '#gateList');
    }

    // Stats
    if (this.dirty.has('world-stats')) {
      this.render('world-stats', '#statsContainer');
    }

    // Cover
    if (this.dirty.has('cover-generator')) {
      this.render('cover-generator', '#coverContainer');
    }

    // AI history
    if (this.dirty.has('ai-history')) {
      this.render('ai-history', '#aiHistory');
    }

    this.dirty.clear();
  }

  renderAll() {
    this.render('gate-list', '#gateList');
    this.render('chapter-list', '#chaptersList');
    this.render('world-stats', '#statsContainer');
    this.render('cover-generator', '#coverContainer');
    this.render('ai-history', '#aiHistory');
  }

  // ===============================
  // CORE RENDER
  // ===============================
  render(componentId, targetSelector) {
    const renderer = this.components.get(componentId);
    if (!renderer) return;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    const html = renderer();
    target.innerHTML = html;
    this.applyTransition(target);
  }

  applyTransition(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    requestAnimationFrame(() => {
      el.style.transition = 'all 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // ===============================
  // KOMPONENTY
  // ===============================
  renderGateList() {
    const currentWorld = window.eterApp?.state.world || 1;
    return Array.from({ length: 10 }, (_, i) => i + 1).map(gate => `
      <div class="world-item \( {gate === (window.eterApp?.state.gate || 1) ? 'active' : ''}" data-brama=" \){gate}">
        Brama ${gate} — ${window.eterData?.gateTemplates[gate - 1]?.name || 'Nieznana'}
      </div>
    `).join('');
  }

  renderChapterList() {
    // Symulacja rozdziałów – w przyszłości z localStorage
    const chapters = [];
    let ch = 1;
    let key;
    do {
      key = window.eterDataAPI?.contentKey(window.eterApp.state.world, window.eterApp.state.gate, ch);
      if (localStorage.getItem(key)) {
        const text = localStorage.getItem(key);
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        chapters.push({ id: ch, title: `Rozdział ${ch}`, words });
      }
      ch++;
    } while (localStorage.getItem(key));

    if (chapters.length === 0) {
      chapters.push({ id: 1, title: 'Rozdział 1', words: 0 });
    }

    return chapters.map(ch => `
      <div class="chapter-item \( {ch.id === window.eterApp.state.chapter ? 'active' : ''}" data-chapter=" \){ch.id}">
        <div class="chapter-title">${ch.title}</div>
        <div class="chapter-meta">
          <span>${ch.words} słów</span>
        </div>
      </div>
    `).join('');
  }

  renderWorldStats() {
    const stats = window.eterDataAPI?.getStats() || { totalWords: 0, progress: 0 };
    return `
      <div class="stats-grid">
        <div class="stat">
          <strong>${stats.totalWords.toLocaleString()}</strong>
          <span>Słów</span>
        </div>
        <div class="stat">
          <strong>${stats.progress}%</strong>
          <span>Postęp</span>
        </div>
        <div class="stat">
          <strong>${stats.completedGates || 0}/80</strong>
          <span>Ukończone bramy</span>
        </div>
      </div>
    `;
  }

  renderCoverGenerator() {
    const world = window.eterApp?.state.world || 1;
    setTimeout(() => CoverRenderer.generate(world), 100); // Opóźnienie dla canvas

    return `
      <canvas class="cover-canvas" id="coverCanvas" width="480" height="640"></canvas>
      <div class="cover-actions" style="margin-top:1rem;">
        <button class="ai-cover"><i class="fas fa-brain"></i> Generuj AI</button>
        <button class="save-cover"><i class="fas fa-download"></i> Zapisz PNG</button>
      </div>
    `;
  }

  renderAudioWaveform() {
    return `
      <div class="waveform" style="display:flex;gap:4px;height:60px;align-items:end;">
        \( {Array.from({ length: 40 }, () => `<span style="width:4px;background:var(--cyan);border-radius:2px;height: \){Math.random() * 100 + 20}%"></span>`).join('')}
      </div>
    `;
  }

  renderAIHistory() {
    // Symulacja – w przyszłości z AI modułu
    return '<div class="empty" style="opacity:0.6;padding:2rem;text-align:center;">Brak historii AI</div>';
  }
}

// ===============================
// COVER RENDERER – prosty generator
// ===============================
class CoverRenderer {
  static generate(world) {
    const canvas = document.getElementById('coverCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const preset = window.eterData?.worldPresets[world] || { color: '#28d3c6', name: 'Nieznany' };

    // Tło gradient
    const grad = ctx.createLinearGradient(0, 0, 480, 640);
    grad.addColorStop(0, preset.color);
    grad.addColorStop(1, '#000011');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 480, 640);

    // Neonowy tekst
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText(preset.name.toUpperCase(), 240, 280);

    ctx.font = 'bold 36px Orbitron';
    ctx.fillText(`ŚWIAT ${world}`, 240, 340);

    // Glow efekt
    ctx.shadowColor = preset.color;
    ctx.shadowBlur = 40;
    ctx.fillText(preset.name.toUpperCase(), 240, 280);
    ctx.fillText(`ŚWIAT ${world}`, 240, 340);
  }
}

// ===============================
// INIT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  window.qRender = new QuantumRender();

  // Generuj okładkę przy zmianie świata
  document.addEventListener('worldChanged', e => {
    CoverRenderer.generate(e.detail.world);
  });

  // Przyciski cover
  document.addEventListener('click', e => {
    if (e.target.classList.contains('save-cover')) {
      const canvas = document.getElementById('coverCanvas');
      const link = document.createElement('a');
      link.download = `okladka_swiat_${window.eterApp.state.world}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  });
});

// EXPORT
window.QuantumRender = QuantumRender;
window.CoverRenderer = CoverRenderer;
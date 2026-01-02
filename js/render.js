// render.js — ETERNIVERSE BOOK MASTER v2.1
// Quantum Render Engine — stabilny, deterministyczny, SPA-ready
// 8 Światów × 10 Bram | 2026 | Maciej Maciuszek

'use strict';

class QuantumRender {
  constructor() {
    this.components = new Map();
    this.cache = new Map();
    this.dirty = new Set();
    this.lastFrame = 0;

    this.initComponents();
    this.bindEvents();
    this.startRenderLoop();

    console.log('🌀 QuantumRender v2.1 uruchomiony');
  }

  // ===============================
  // REJESTRACJA KOMPONENTÓW
  // ===============================
  initComponents() {
    this.components.set('chapter-list', this.renderChapterList);
    this.components.set('world-stats', this.renderWorldStats);
    this.components.set('cover-generator', this.renderCoverGenerator);
    this.components.set('audio-waveform', this.renderAudioWaveform);
    this.components.set('ai-console-history', this.renderAIHistory);
  }

  // ===============================
  // EVENTY GLOBALNE
  // ===============================
  bindEvents() {
    document.addEventListener('worldChanged', () => this.markDirty('chapter-list', 'world-stats', 'cover-generator'));
    document.addEventListener('bramaChanged', () => this.markDirty('chapter-list'));
    document.addEventListener('chapterChanged', () => this.markDirty('chapter-list'));
    document.addEventListener('statsUpdated', () => this.markDirty('world-stats'));
    document.addEventListener('aiHistoryUpdated', () => this.markDirty('ai-console-history'));
  }

  markDirty(...components) {
    components.forEach(c => this.dirty.add(c));
  }

  // ===============================
  // GŁÓWNA PĘTLA RENDER
  // ===============================
  startRenderLoop() {
    const loop = (ts) => {
      if (ts - this.lastFrame > 120) {
        this.renderDirtyComponents();
        this.lastFrame = ts;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ===============================
  // CORE RENDER
  // ===============================
  render(componentId, targetSelector, data) {
    const renderer = this.components.get(componentId);
    if (!renderer) return;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    const key = componentId + ':' + JSON.stringify(data || {});
    if (this.cache.get(key)) {
      target.innerHTML = this.cache.get(key);
      return;
    }

    const html = renderer.call(this, data);
    this.cache.set(key, html);
    target.innerHTML = html;
    this.applyMorph(target);
  }

  applyMorph(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px) scale(0.98)';
    requestAnimationFrame(() => {
      el.style.transition = 'all 0.25s ease';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // ===============================
  // DIRTY RENDER
  // ===============================
  renderDirtyComponents() {
    if (!window.eterNiverse) return;

    if (this.dirty.has('chapter-list')) {
      this.render('chapter-list', '#chaptersList', {
        chapters: window.eterNiverse.data?.[window.eterNiverse.currentWorld]?.[window.eterNiverse.currentBrama]?.chapters || []
      });
      this.dirty.delete('chapter-list');
    }

    if (this.dirty.has('world-stats') && window.eterDataAPI) {
      this.render('world-stats', '#statsContainer', {
        stats: window.eterDataAPI.getStats()
      });
      this.dirty.delete('world-stats');
    }

    if (this.dirty.has('cover-generator')) {
      this.render('cover-generator', '#coverContainer', {
        world: window.eterNiverse.currentWorld
      });
      this.dirty.delete('cover-generator');
    }

    if (this.dirty.has('ai-console-history')) {
      this.render('ai-console-history', '#aiHistory', {
        history: window.eterAI?.history || []
      });
      this.dirty.delete('ai-console-history');
    }
  }

  // ===============================
  // KOMPONENTY
  // ===============================
  renderChapterList({ chapters }) {
    if (!chapters.length) {
      return `<div class="empty">Brak rozdziałów</div>`;
    }

    return chapters.map((ch, i) => `
      <div class="chapter-item ${ch.active ? 'active' : ''}" data-chapter="${i + 1}">
        <div class="chapter-title">${ch.title || `Rozdział ${i + 1}`}</div>
        <div class="chapter-meta">
          <span>${ch.words || 0} słów</span>
          <span class="status ${ch.status || 'draft'}">${ch.status || 'draft'}</span>
        </div>
      </div>
    `).join('');
  }

  renderWorldStats({ stats }) {
    if (!stats) return '';

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
          <strong>${stats.worldsActive}</strong>
          <span>Światy</span>
        </div>
        <div class="stat">
          <strong>${stats.avgWords.toLocaleString()}</strong>
          <span>Śr./Brama</span>
        </div>
      </div>
    `;
  }

  renderCoverGenerator({ world }) {
    return `
      <canvas class="cover-canvas" width="480" height="640" data-world="${world}"></canvas>
      <div class="cover-actions">
        <button class="ai-cover">🤖 AI</button>
        <button class="save-cover">💾 PNG</button>
      </div>
    `;
  }

  renderAudioWaveform({ progress = 0 }) {
    return `
      <div class="waveform">
        ${Array.from({ length: 24 }).map(() => `<span></span>`).join('')}
        <div class="progress" style="width:${progress}%"></div>
      </div>
    `;
  }

  renderAIHistory({ history }) {
    if (!history.length) return `<div class="empty">Brak historii AI</div>`;

    return history.map(h => `
      <div class="ai-entry">
        <div class="cmd">${h.command}</div>
        <div class="resp">${h.response}</div>
        <small>${new Date(h.time).toLocaleTimeString()}</small>
      </div>
    `).join('');
  }
}

// ===============================
// COVER RENDERER
// ===============================
class CoverRenderer {
  static generate(world) {
    const canvas = document.querySelector('.cover-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 480, 640);

    g.addColorStop(0, '#28D3C6');
    g.addColorStop(1, '#0A0A1A');

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 480, 640);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText(`ŚWIAT ${world}`, 240, 320);
  }
}

// ===============================
// INIT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  window.qRender = new QuantumRender();

  document.addEventListener('worldChanged', e => {
    CoverRenderer.generate(e.detail.world);
  });
});

// EXPORT
window.QuantumRender = QuantumRender;
window.CoverRenderer = CoverRenderer;
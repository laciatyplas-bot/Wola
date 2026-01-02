// js/render.js — ETERNIVERSE BOOK MASTER v2.2
// Quantum Render Engine — STABILNY, SPA-ready
// 8 Światów × 10 Bram | Master Edition 2026

'use strict';

class QuantumRender {
  constructor() {
    this.components = new Map();
    this.dirty = new Set();

    this.initComponents();
    this.bindEvents();
    this.renderAll();

    console.log('🌀 QuantumRender v2.2 READY');
  }

  /* ===============================
     REJESTRACJA KOMPONENTÓW
  =============================== */
  initComponents() {
    this.components.set('gate-list', this.renderGateList.bind(this));
    this.components.set('chapter-list', this.renderChapterList.bind(this));
    this.components.set('world-stats', this.renderWorldStats.bind(this));
    this.components.set('cover-generator', this.renderCoverGenerator.bind(this));
    this.components.set('ai-history', this.renderAIHistory.bind(this));
  }

  /* ===============================
     EVENTY GLOBALNE
  =============================== */
  bindEvents() {
    document.addEventListener('worldChanged', () => this.markDirty('gate-list', 'chapter-list', 'cover-generator', 'world-stats'));
    document.addEventListener('gateChanged', () => this.markDirty('chapter-list'));
    document.addEventListener('chapterChanged', () => this.markDirty('chapter-list'));
    document.addEventListener('contentSaved', () => this.markDirty('world-stats'));
    document.addEventListener('aiResponse', () => this.markDirty('ai-history'));
  }

  markDirty(...components) {
    components.forEach(c => this.dirty.add(c));
    this.renderDirty();
  }

  /* ===============================
     RENDER FLOW
  =============================== */
  renderDirty() {
    this.dirty.forEach(component => {
      const targetId = {
        'gate-list': '#gateList',
        'chapter-list': '#chaptersList',
        'world-stats': '#statsContainer',
        'cover-generator': '#coverContainer',
        'ai-history': '#aiHistory'
      }[component];

      if (targetId) {
        this.render(component, targetId);
      }
    });

    this.dirty.clear();
  }

  renderAll() {
    this.render('gate-list', '#gateList');
    this.render('chapter-list', '#chaptersList');
    this.render('world-stats', '#statsContainer');
    this.render('cover-generator', '#coverContainer');
    this.render('ai-history', '#aiHistory');
  }

  render(componentId, targetSelector) {
    const renderer = this.components.get(componentId);
    const target = document.querySelector(targetSelector);

    if (!renderer || !target) return;

    target.innerHTML = renderer();
    this.animate(target);
  }

  animate(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      el.style.transition = 'all 0.35s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  /* ===============================
     KOMPONENTY
  =============================== */

  // 🚪 BRAMY
  renderGateList() {
    const currentGate = window.eterApp?.state.gate || 1;

    return Array.from({ length: 10 }, (_, i) => {
      const gate = i + 1;
      const name = window.eterData?.gateTemplates?.[gate - 1]?.name || 'Brama';

      return `
        <div class="world-item ${gate === currentGate ? 'active' : ''}"
             data-brama="${gate}">
          Brama ${gate} — ${name}
        </div>
      `;
    }).join('');
  }

  // 📑 ROZDZIAŁY
  renderChapterList() {
    const world = window.eterApp?.state.world || 1;
    const gate = window.eterApp?.state.gate || 1;
    const activeChapter = window.eterApp?.state.chapter || 1;

    const chapters = [];
    let ch = 1;

    while (true) {
      const key = `eter-w${world}b${gate}-ch${ch}`;
      const text = localStorage.getItem(key);
      if (!text) break;

      const words = text.trim().split(/\s+/).filter(Boolean).length;
      chapters.push({ id: ch, words });
      ch++;
    }

    if (chapters.length === 0) {
      chapters.push({ id: 1, words: 0 });
    }

    return chapters.map(chapter => `
      <div class="chapter-item ${chapter.id === activeChapter ? 'active' : ''}"
           data-chapter="${chapter.id}">
        <div class="chapter-title">Rozdział ${chapter.id}</div>
        <div class="chapter-meta">${chapter.words} słów</div>
      </div>
    `).join('');
  }

  // 📊 STATYSTYKI
  renderWorldStats() {
    const stats = window.eterDataAPI?.getStats?.() || {
      totalWords: 0,
      progress: 0,
      completedGates: 0
    };

    return `
      <div class="stats-grid">
        <div class="stat"><strong>${stats.totalWords}</strong><span>Słów</span></div>
        <div class="stat"><strong>${stats.progress}%</strong><span>Postęp</span></div>
        <div class="stat"><strong>${stats.completedGates}/80</strong><span>Bram</span></div>
      </div>
    `;
  }

  // 🖼️ OKŁADKA
  renderCoverGenerator() {
    const world = window.eterApp?.state.world || 1;

    setTimeout(() => {
      CoverRenderer.generate(world);
    }, 50);

    return `
      <canvas id="coverCanvas" class="cover-canvas" width="480" height="640"></canvas>
      <div class="cover-actions">
        <button class="save-cover">💾 Zapisz PNG</button>
      </div>
    `;
  }

  // 🤖 AI
  renderAIHistory() {
    return `<div class="empty" style="opacity:.6;padding:2rem;text-align:center">
      Brak historii AI
    </div>`;
  }
}

/* ===============================
   COVER RENDERER
=============================== */
class CoverRenderer {
  static generate(world) {
    const canvas = document.getElementById('coverCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const preset = window.eterData?.worldPresets?.[world] || { color: '#28d3c6', name: 'ETERNIVERSE' };

    const grad = ctx.createLinearGradient(0, 0, 480, 640);
    grad.addColorStop(0, preset.color);
    grad.addColorStop(1, '#050510');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 480, 640);

    ctx.font = 'bold 48px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = preset.color;
    ctx.shadowBlur = 40;

    ctx.fillText(preset.name.toUpperCase(), 240, 300);
    ctx.fillText(`ŚWIAT ${world}`, 240, 360);
  }
}

/* ===============================
   INIT
=============================== */
document.addEventListener('DOMContentLoaded', () => {
  window.qRender = new QuantumRender();

  document.addEventListener('click', e => {
    if (e.target.classList.contains('save-cover')) {
      const canvas = document.getElementById('coverCanvas');
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `okladka_swiat_${window.eterApp.state.world}.png`;
      a.click();
    }
  });
});

window.QuantumRender = QuantumRender;
window.CoverRenderer = CoverRenderer;
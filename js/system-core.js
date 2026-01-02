(function () {
  'use strict';

  if (window.__BELLA_MEGA__) return;
  window.__BELLA_MEGA__ = true;

  console.log('🧠 BELLA MEGA v3.0 — Ładowanie...');

  // =========================
  // CORE DETECTION
  // =========================
  function getEditor() {
    return document.getElementById('editor') ||
           document.getElementById('mainEditor') ||
           document.querySelector('[contenteditable="true"]') ||
           document.querySelector('.editor-pane');
  }

  function getETERNIVERSEContext() {
    return window.ETERNIVERSE?.bellaContext || 
           window.eterniverseData?.bellaMemory || 
           { system: 'ETERNIVERSE', brama: '1' };
  }

  // =========================
  // 🧠 MEGA BELLA ENGINE
  // =========================
  function bella(action, options = {}) {
    const ed = getEditor();
    if (!ed) {
      console.warn('BELLA: Brak edytora');
      return;
    }

    const text = ed.innerText.trim();
    if (!text) return;

    const context = getETERNIVERSEContext();
    let output = applyBellaAction(text, action, context, options);

    // Smart insert z tagiem
    const tag = generateBellaTag(action, context);
    ed.innerText = output + '

' + tag;
    
    // Stats + sync
    bellaStats(action, text.length, output.length);
    saveBellaEdit(output);
    
    // Visual feedback
    flashEditorSuccess();
  }

  function applyBellaAction(text, action, context, options) {
    switch(action) {
      case 'short':
        return summarizeText(text, context);
        
      case 'expand':
        return expandText(text, context);
        
      case 'rewrite':
        return rewriteText(text, context);
        
      case 'kanon':
        return generateKanonText(text, context);
        
      case 'postac':
        return generateCharacterText(text, context);
        
      case 'brama':
        return generateBramaText(text, context);
        
      default:
        return text;
    }
  }

  // =========================
  // 🎯 SMART ACTIONS
  // =========================
  function summarizeText(text, context) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const summary = sentences.slice(0, 4).join('. ') + '.';
    
    return `[PODSUMOWANIE BRAMY ${context.brama}] ${summary}

[BELLA · ${summary.length} znaków]`;
  }

  function expandText(text, context) {
    const mood = window.ETERNIVERSE?.getMoodByColor?.('#00ffff') || 'cyberpunk';
    const expansion = text + `

${text.split('
')[0]} — ${mood} kontynuacja.` +
      `

W tle: ${context.postacie?.[0] || 'Elara'} obserwuje pęknięcie w kodzie.`;
    
    return expansion;
  }

  function rewriteText(text, context) {
    return text.split('
')
      .map(line => `— ${line.trim()}`)
      .join('

') + 
      `

[PRZEPISANE DLA BRAMY ${context.brama} · styl: ${context.system}]`;
  }

  function generateKanonText(text, context) {
    const kanonBrama = window.eterniverseData?.kanon.bramy?.[0] || {};
    return `${text}

[KANON ${kanonBrama.nazwa || 'Alfa'}]
${kanonBrama.opis}`;
  }

  function generateCharacterText(text, context) {
    const postac = window.eterniverseData?.postacie.elara || {};
    return `${text}

[PERSPEKTYWA: ${postac.imie}]
${postac.osobowosc}`;
  }

  function generateBramaText(text, context) {
    return `[BRAMA ${context.brama} — ${window.ETERNIVERSE?.activeBrama?.nazwa}]

${text}`;
  }

  // =========================
  // 🎨 MEGA PANEL UI
  // =========================
  function injectMegaPanel() {
    if (document.getElementById('bellaMegaPanel')) return;

    const ed = getEditor();
    if (!ed) return;

    const panel = document.createElement('div');
    panel.id = 'bellaMegaPanel';
    panel.className = 'bella-mega-panel';
    panel.innerHTML = `
      <div class="bella-row">
        <button data-action="short">📝 STREŚĆ</button>
        <button data-action="expand">➕ ROZWIŃ</button>
        <button data-action="rewrite">✏️ PRZEPISZ</button>
      </div>
      <div class="bella-row">
        <button data-action="kanon">📚 KANON</button>
        <button data-action="postac">👤 POSTAĆ</button>
        <button data-action="brama">🚪 BRAMA</button>
      </div>
      <div class="bella-status">
        <span id="bella-stats">-</span>
        <button id="bella-clear">🗑️ Wyczyść</button>
      </div>
    `;

    // Styles injection
    injectBellaStyles();
    
    // Events
    panel.querySelectorAll('[data-action]').forEach(btn => {
      btn.onclick = () => bella(btn.dataset.action);
    });
    
    document.getElementById('bella-clear').onclick = clearBellaPanel;
    
    ed.parentNode.insertBefore(panel, ed);
    
    // Live context
    updateBellaStatus();
  }

  function injectBellaStyles() {
    if (document.getElementById('bella-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'bella-styles';
    style.textContent = `
      #bellaMegaPanel {
        display: flex; flex-direction: column; gap: 8px;
        margin: 20px 0; padding: 16px; 
        background: rgba(0,15,30,0.8); backdrop-filter: blur(20px);
        border: 1px solid #00ffff50; border-radius: 16px;
        font-family: monospace;
      }
      
      .bella-row { display: flex; gap: 8px; }
      .bella-row button {
        flex: 1; padding: 12px; background: linear-gradient(145deg, #00ffff, #00ccff);
        color: #000; font-weight: 700; border: none; border-radius: 8px;
        cursor: pointer; transition: all 0.2s; font-size: 13px;
        text-transform: uppercase; letter-spacing: 1px;
      }
      .bella-row button:hover { 
        transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,255,255,0.4);
      }
      
      .bella-status {
        display: flex; gap: 12px; font-size: 12px; opacity: 0.8;
        align-items: center; justify-content: space-between;
      }
      
      .glow-focus { box-shadow: 0 0 20px #00ffff !important; }
    `;
    document.head.appendChild(style);
  }

  // =========================
  // 📊 STATS + SYNC
  // =========================
  let bellaStats = { actions: 0, charsSaved: 0, lastAction: '' };

  function bellaStats(action, inputLen, outputLen) {
    bellaStats.actions++;
    bellaStats.charsSaved += inputLen;
    bellaStats.lastAction = action;
    
    updateBellaStatus();
    
    // Core integration
    if (window.ETERNIVERSE) {
      window.ETERNIVERSE.saveSessionToCore({
        id: `bella-${Date.now()}`,
        action,
        input: inputLen,
        output: outputLen,
        brama: window.ETERNIVERSE.activeBrama?.id
      });
    }
  }

  function updateBellaStatus() {
    const statsEl = document.getElementById('bella-stats');
    if (statsEl) {
      const ctx = getETERNIVERSEContext();
      statsEl.textContent = `Brama ${ctx.brama} | ${bellaStats.actions} akcji | ${bellaStats.charsSaved.toLocaleString()} znaków`;
    }
  }

  function saveBellaEdit(content) {
    localStorage.setItem('BELLA_LAST_EDIT', content);
    localStorage.setItem('BELLA_STATS', JSON.stringify(bellaStats));
  }

  // =========================
  // 🎬 EFFECTS
  // =========================
  function flashEditorSuccess() {
    const ed = getEditor();
    if (ed) {
      ed.classList.add('glow-focus');
      setTimeout(() => ed.classList.remove('glow-focus'), 1000);
    }
  }

  function clearBellaPanel() {
    document.getElementById('bellaMegaPanel')?.remove();
  }

  // =========================
  // 🚀 INIT + LISTENERS
  // =========================
  function initBellaMega() {
    const ed = getEditor();
    if (ed) {
      injectMegaPanel();
      console.log('🧠 BELLA MEGA v3.0 — FULLY ACTIVE | Brama sync OK');
    }
  }

  // Multi-trigger init
  ['DOMContentLoaded', 'eterniverseReady', 'editorReady'].forEach(event => {
    document.addEventListener(event, initBellaMega, { once: true });
  });

  // Mutation observer dla dynamic editors
  const observer = new MutationObserver(() => {
    if (getEditor()) {
      initBellaMega();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      bella('expand');
    }
  });

  console.log('🧠 BELLA MEGA v3.0 — READY (Ctrl+Shift+B dla expand)');
})();
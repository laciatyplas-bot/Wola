// ======================================================
// WOLA - ETERNIVERSE CSR SPA v3.3
// HYPER-CONTROL Z PEŁNYMI TYTUŁAMI KSIĄŻEK
// Client-Side Routing + Book Management
// Maciej Maciuszek | 2026
// ======================================================

class WolaSPA {
  constructor() {
    this.version = '3.3.0';
    this.router = null;
    this.state = {
      route: '/', books: [], activeBook: null,
      active: { world: 'core', gate: 1 }
    };
    this.init();
  }

  async init() {
    console.log('🌌 Wola SPA v3.3 + Books Titles INIT');
    
    this.loadBooksData();
    this.setupDOM();
    this.initCSR();
    this.renderApp();
    this.bindEvents();
    this.initPWA();
    
    console.log('✅ FULL SPA + BOOKS READY');
  }

  // ================================
  // 📚 LOAD ETERNIVERSE BOOKS JSON
  // ================================
  loadBooksData() {
    this.state.books = [];
    
    // Twój JSON → flat books array
    const eterniverse = {
      worlds: [{
        id: "core", name: "ETERUNIVERSE – Rdzeń",
        gates: [
          {
            id: 1, name: "BRAMA I — INTERSEEKER", color: "#28D3C6",
            sub: "Psychika · Trauma · Cień · Tożsamość",
            books: [
              {title: "InterSeeker – Atlas Wewnętrzny", status: "opublikowana", content: "Konfrontacja z cieniem..."},
              {title: "ShadowSeeker – Anatomia Cienia", status: "gotowa", content: "Praca z mrokiem..."},
              {title: "MemorySeeker – Archeologia Wspomnień", status: "w trakcie", content: "Pamięć jako kod..."}
            ]
          },
          {
            id: 2, name: "BRAMA II — CUSTOS / GENEZA", color: "#D9A441",
            books: [
              {title: "RootSeeker – Anatomia Początku", status: "idea", content: "Źródła tożsamości..."}
            ]
          },
          // ... reszta gates z Twojego JSON (skrócone dla demo)
          {
            id: 3, name:
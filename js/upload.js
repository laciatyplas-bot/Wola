// js/upload.js — Upload okładek i MP3 z telefonu
class UploadManager {
  constructor() {
    this.init();
  }

  init() {
    // === OKŁADKA ===
    const coverInput = document.getElementById('coverUpload');
    const coverPreview = document.getElementById('coverPreview');
    const coverInfo = document.getElementById('coverInfo');

    coverInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        this.toast('Tylko pliki obrazów (JPG, PNG)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        coverPreview.src = ev.target.result;
        coverPreview.style.display = 'block';
        coverInfo.textContent = `Załadowano: ${file.name} (${this.formatBytes(file.size)})`;

        localStorage.setItem('eterniverse_cover', ev.target.result);
        localStorage.setItem('eterniverse_cover_name', file.name);
        this.toast('Okładka zapisana lokalnie');
      };
      reader.readAsDataURL(file);
    });

    // === MP3 ===
    const audioInput = document.getElementById('audioUpload');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioInfo = document.getElementById('audioInfo');

    audioInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.includes('audio')) {
        this.toast('Tylko pliki audio (MP3)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        audioPlayer.src = ev.target.result;
        audioInfo.textContent = `Załadowano: ${file.name} (${this.formatBytes(file.size)})`;

        localStorage.setItem('eterniverse_audio', ev.target.result);
        localStorage.setItem('eterniverse_audio_name', file.name);
        this.toast('MP3 zapisane lokalnie');
      };
      reader.readAsDataURL(file);
    });

    this.loadSavedCover();
    this.loadSavedAudio();
  }

  loadSavedCover() {
    const saved = localStorage.getItem('eterniverse_cover');
    const name = localStorage.getItem('eterniverse_cover_name');
    if (saved) {
      const img = document.getElementById('coverPreview');
      img.src = saved;
      img.style.display = 'block';
      document.getElementById('coverInfo').textContent =
        `Załadowano: ${name || 'okładka.jpg'}`;
    }
  }

  loadSavedAudio() {
    const saved = localStorage.getItem('eterniverse_audio');
    const name = localStorage.getItem('eterniverse_audio_name');
    if (saved) {
      document.getElementById('audioPlayer').src = saved;
      document.getElementById('audioInfo').textContent =
        `Załadowano: ${name || 'audio.mp3'}`;
    }
  }

  formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  toast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new UploadManager();
});
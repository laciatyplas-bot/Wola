// js/upload.js — Upload okładek i MP3 z telefonu
class UploadManager {
  constructor() {
    this.init();
  }

  init() {
    // Upload okładki
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
        coverInfo.textContent = `Załadowano: \( {file.name} ( \){this.formatBytes(file.size)})`;

        // Zapis w localStorage
        localStorage.setItem('eterniverse_cover', ev.target.result);
        localStorage.setItem('eterniverse_cover_name', file.name);
        this.toast('Okładka zapisana lokalnie');
      };
      reader.readAsDataURL(file);
    });

    // Upload MP3
    const audioInput = document.getElementById('audioUpload');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioInfo = document.getElementById('audioInfo');

    audioInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.includes('audio') && !file.name.endsWith('.mp3')) {
        this.toast('Tylko pliki MP3');
        return;
      }

      const url = URL.createObjectURL(file);
      audioPlayer.src = url;
      audioInfo.textContent = `Załadowano: \( {file.name} ( \){this.formatBytes(file.size)})`;

      // Zapis w localStorage (URL + nazwa)
      localStorage.setItem('eterniverse_audio_url', url);
      localStorage.setItem('eterniverse_audio_name', file.name);
      this.toast('Plik MP3 zapisany lokalnie');
    });

    // Wczytaj zapisane przy otwarciu
    this.loadSavedCover();
    this.loadSavedAudio();
  }

  loadSavedCover() {
    const saved = localStorage.getItem('eterniverse_cover');
    const name = localStorage.getItem('eterniverse_cover_name');
    if (saved) {
      document.getElementById('coverPreview').src = saved;
      document.getElementById('coverPreview').style.display = 'block';
      document.getElementById('coverInfo').textContent = `Załadowano: ${name || 'okładka.jpg'}`;
    }
  }

  loadSavedAudio() {
    const url = localStorage.getItem('eterniverse_audio_url');
    const name = localStorage.getItem('eterniverse_audio_name');
    if (url) {
      document.getElementById('audioPlayer').src = url;
      document.getElementById('audioInfo').textContent = `Załadowano: ${name || 'audio.mp3'}`;
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

// Uruchomienie
document.addEventListener('DOMContentLoaded', () => {
  new UploadManager();
});
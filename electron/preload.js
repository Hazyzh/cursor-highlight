const { ipcRenderer } = require('electron')

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    ipcRenderer.send('close-window');
  }
})

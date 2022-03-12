// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const { globalShortcut } = require('electron/main');
const path = require('path')

let highlightWindow = null;

function createHighlightWindow () {
  if (highlightWindow) {
    return;
  }
  // Create the browser window.
  highlightWindow = new BrowserWindow({
    // resizable: false,
    // fullscreen: true,
    transparent: true,
    frame:false
  })

  highlightWindow.maximize()
  highlightWindow.resizable = false;
  highlightWindow.show()
  // and load the index.html of the app.
  highlightWindow.loadFile('dist/index.html')

  // Open the DevTools.
  // highlightWindow.webContents.openDevTools()

  highlightWindow.on('closed', () => {
    console.log('closed');
    highlightWindow = null;
  })
}

app.disableHardwareAcceleration();
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createHighlightWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createHighlightWindow()
  })
  globalShortcut.register('Cmd+Ctrl+z', () => createHighlightWindow());
  globalShortcut.register('Esc', () => {
    if (highlightWindow) {
      highlightWindow.close();
      highlightWindow = null;
    }
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

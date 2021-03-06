// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Tray,
  nativeImage,
  Menu,
  shell,
  ipcMain,
  net,
  dialog,
} = require('electron');
const { globalShortcut } = require('electron/main');
const path = require('path');

const isDev = process.env.IS_DEV === 'true';

let highlightWindow = null;
// gray mask
app.disableHardwareAcceleration();

if (app.isPackaged) {
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true,
  });
}

const MacOS = 'darwin';
const Windows = 'win32';

const hideTaskBar = () => {
  switch (process.platform) {
    case MacOS:
      app.dock.hide();

    default:
  }
};

function createHighlightWindow() {
  hideTaskBar();

  if (highlightWindow) {
    return;
  }

  const { screen } = require('electron');
  const cursor = screen.getCursorScreenPoint();
  const distScreen = screen.getDisplayNearestPoint(cursor);
  const {
    bounds: { x, y },
  } = distScreen;
  // Create the browser window.
  highlightWindow = new BrowserWindow({
    // resizable: false,
    // fullscreen: true,
    offscreen: true,
    transparent: true,
    frame: false,
    skipTaskbar: true,
    webPreferences: {
      preload: __dirname + '/preload.js',
    },
    allowRunningInsecureContent: true,
  });
  highlightWindow.setPosition(x, y);
  highlightWindow.maximize();
  highlightWindow.resizable = false;
  highlightWindow.show();
  highlightWindow.setAlwaysOnTop(true, 'screen-saver');
  // and load the index.html of the app.
  highlightWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  // Open the DevTools.
  // if (isDev) {
  //   highlightWindow.webContents.openDevTools();
  // }

  highlightWindow.on('closed', () => {
    highlightWindow = null;
  });
}

let tray = null;
function createTray() {
  if (tray) return;

  hideTaskBar();
  const iconPath = path.join(__dirname, './trayIcon.png');
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon.resize({ width: 16 }));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'About Cursor Highlight',
      click: () =>
        shell.openExternal('https://github.com/Hazyzh/cursor-highlight'),
    },
    { type: 'separator' },
    { label: 'Highlight Mode', click: () => createHighlightWindow() },
    { type: 'separator' },
    { label: 'Check Update', click: () => checkAppUpdate() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setToolTip('Cursor Highlight');
  tray.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const { wasOpenedAsHidden } = app.getLoginItemSettings();
  if (!wasOpenedAsHidden) {
    createHighlightWindow();
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createHighlightWindow();
  });
  globalShortcut.register('Alt+x', () => {
    if (highlightWindow) {
      highlightWindow.close();
      highlightWindow = null;
    } else {
      createHighlightWindow();
    }
  });
  ipcMain.on('close-window', () => {
    if (highlightWindow) {
      highlightWindow.close();
      highlightWindow = null;
    }
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', function () {
    if (process.platform !== MacOS) app.quit();
  });

  createTray();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const checkAppUpdate = async () => {
  const request = net.request({
    method: 'GET',
    url: 'https://api.github.com/repos/Hazyzh/cursor-highlight/releases/latest',
    toJSON: true,
  });

  request.on('response', (response) => {
    response.on('data', (chunk) => {
      const resData = JSON.parse(chunk);
      const latestVersion = resData.tag_name;
      const appVersion = app.getVersion();
      const isLatest = latestVersion === `v${appVersion}`;
      if (!isLatest) {
        const message = `
          Cursor Highlight: a new version ${latestVersion} is available!
        `;
        dialog.showMessageBox({ message });
        shell.openExternal('https://github.com/Hazyzh/cursor-highlight/releases/latest');
      }
    });

    response.on('error', () => {
      dialog.showMessageBox({ message: 'Sorry, an unexpected error happened, check failed.' });
    });
  });

  request.end();
};

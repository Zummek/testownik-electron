// import Axios from 'axios';
import {
  app, BrowserWindow, ipcMain, protocol
} from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import os from 'os';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

const store = new Store();

const isDevelopment = process.env.NODE_ENV !== 'production';

autoUpdater.autoDownload = false;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1080,
    height: 512,
    minWidth: 720,
    minHeight: 400,
    frame: false,
    title: 'Testownik',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: (process.env
      //   .ELECTRON_NODE_INTEGRATION as unknown) as boolean
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });

  autoUpdater.checkForUpdatesAndNotify();
}

autoUpdater.on('error', data => {
  win!.webContents.send('auto-updater-error', data);
});

autoUpdater.on('update-not-available', data => {
  win!.webContents.send('auto-updater-update-not-available', data);
});

autoUpdater.on('update-available', data => {
  win!.webContents.send('auto-updater-update-available', data);
});

autoUpdater.on('download-progress', data => {
  win!.webContents.send('auto-updater-download-progress', data);
});

ipcMain.on('auto-updater-checkout-for-update', () => {
  autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.on('auto-updater-download-and-install', () => {
  autoUpdater.downloadUpdate().then(() => {
    autoUpdater.quitAndInstall();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (!store.has('recentFolders')) {
    store.set('recentFolders', []);
  }
  if (!store.has('theme')) {
    store.set('theme', 'dark');
  }
  if (!store.has('controlsTheme')) {
    let platform;
    switch (os.platform()) {
      case 'darwin':
        platform = 'osx';
        break;
      case 'linux':
        platform = 'linux';
        break;
      default:
        platform = 'win';
        break;
    }
    store.set('controlsTheme', platform);
  }
  if (!store.has('reverseControlsLocation')) {
    store.set('reverseControlsLocation', os.platform() !== 'win32');
  }

  if (!store.has('reoccurrencesIfBad')) {
    store.set('reoccurrencesIfBad', 1);
  }
  if (!store.has('reoccurrencesOnStart')) {
    store.set('reoccurrencesOnStart', 2);
  }
  if (!store.has('maxReoccurrences')) {
    store.set('maxReoccurrences', 10);
  }

  if (isDevelopment) {
    installExtension(VUEJS_DEVTOOLS).then(name => {
      console.log(`Added Extension:  ${name}`);
      createWindow();
    })
      .catch(err => {
        console.log('An error occurred: ', err);
        createWindow();
      });
  } else {
    createWindow();
    autoUpdater.checkForUpdates();
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

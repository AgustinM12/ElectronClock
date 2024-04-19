const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 145,
    height: 24,

    maxWidth: 145,
    maxHeight: 24,

    minWidth: 145,
    minHeight: 24,
    frame: false,
    autoHideMenuBar: true,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  //FUNCION PARA CERRAR LA APP
  ipcMain.on('close-app', () => app.quit());

  //FUNCION PARA REDIMENSIONAR LA VENTANA
  ipcMain.on('resize-window', (event, width, height) => {
    if (mainWindow) {
      mainWindow.setSize(width, height);
      mainWindow.setMaximumSize(width, height);
      mainWindow.setMinimumSize(width, height);
    }
  });

  // and load the index.html of the app.
  // ! load prebuild
  // * 
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // ! load with react-vite
  mainWindow.loadURL('http://localhost:8080');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('ready', () => {
  ipcMain.on('initialize-window', (event, width, height) => {
    createWindow(width, height);
  });
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

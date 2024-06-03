const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;
// Función para crear la ruta completa al icono
const getIconPath = (fileName) => {
  return path.join(__dirname, `icons/${fileName}`);
};

function resizeIcon(iconPath, width, height) {
  const image = nativeImage.createFromPath(iconPath);
  return image.resize({ width: width, height: height });
}

app.on('ready', () => {
  tray = new Tray(getIconPath("icon.ico")); // Ruta al icono de la bandeja del sistema
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Abrir', type: 'normal', icon: resizeIcon(getIconPath("open.ico"), 16, 16), click: () => mainWindow.show() },
    { label: 'Options', type: 'normal', icon: resizeIcon(getIconPath("close.ico"), 16, 16), click: () => app.quit() },
    { label: 'Exit', type: 'normal', icon: resizeIcon(getIconPath("settings.ico"), 16, 16), click: () => app.quit() },
  ]);


  tray.setToolTip('ElectronCLock');
  tray.setContextMenu(contextMenu);

  createWindow();
});

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 145,
    height: 32,
    frame: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    resizable: false,
    transparent: true,
    icon: getIconPath('icon.ico'),
    modal: true,
    skipTaskbar: true,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  //FUNCION PARA CERRAR LA APP
  ipcMain.on('close-app', () => app.quit());

  //FUNCION PARA REDIMENSIONAR LA VENTANA
  let resizeTimeout;
  ipcMain.on('resize-window', (event, width, height) => {
    clearTimeout(resizeTimeout);
    // console.log('Received resize-window event with width:', width, 'and height:', height);
    resizeTimeout = setTimeout(() => {
      mainWindow.setSize(width, height);
    }, 100);
    mainWindow.setMaximumSize(width, height);
    mainWindow.setMinimumSize(width, height);
  });

  // and load the index.html of the app.
  // ! load build
  mainWindow.loadFile(path.join(__dirname, './assets/index.html'));

  // ! load with react-vite
  //mainWindow.loadURL('http://localhost:8080');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api", {
    close: () => ipcRenderer.send('close-app'),
    resizeWindow: (width, height) => ipcRenderer.send('resize-window', width, height),
    showOptions: (callback) => ipcRenderer.on('show-options', callback)});
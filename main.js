const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 650,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    },
    autoHideMenuBar: true,
    icon:'assets/roomber-logo.png',
    frame: false
  })

  mainWindow.loadFile('index.html')

  ipcMain.on('minimize', () => {mainWindow.minimize()})
  ipcMain.on('maximize', () => {mainWindow.maximize()})
  ipcMain.on('restore', () => {mainWindow.restore()})
  ipcMain.on('close', () => {mainWindow.close()})
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

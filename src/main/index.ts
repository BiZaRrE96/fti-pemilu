import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getCalonList, logCalonList, getCalonImage, CalonLogger, dummyDatafier } from './calon-utils'
import { auth_code } from './auth'
/*
var offlineMode : boolean = true;
var serverMode : boolean = false;
*/
var calon_list : string[];
var calon_count : number;
var calonLogger : CalonLogger;
var authenticated : boolean = false;

function createAuthWindow() {
  let authWindow = new BrowserWindow({
      width: 400,
      height: 500,
      show : false,
      webPreferences: {
          nodeIntegration: false, // Security best practice
          contextIsolation: true,
          preload: join(__dirname, '../preload/auth.js'),
          sandbox: false
      }
  });

  
  // Simulating authentication success with an event from renderer

  ipcMain.on("auth-challenge", (_event, code : string) => {
    console.log("challenged with " + code)
    var correctCode = "$2b$10$d7bipI9F9VilJbx8sXYB1eePP2oVC1p2zMook/Zo0BjLCfnv94y6q"
    const bcrypt = require('bcrypt')
    
    console.log("Correct : " + auth_code(code))

    try {
      let result = auth_code(code);

      if (result) {
          // Passwords match, authentication successful
          console.log('Passwords match! User authenticated.');
          authenticated = true;
          createMainWindow();
          authWindow.close();
      } else {
          // Passwords don't match, authentication failed
          console.log('Passwords do not match! Authentication failed.');
      }
    } catch {
          throw "Failure on authenticating code!"
    }
      
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    authWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + "/auth.html")
  } else {
    authWindow.loadFile(join(__dirname, '../renderer/auth.html')); // Load authentication UI
  }

  authWindow.on('ready-to-show', () => {
    authWindow.show()
  })
  
}

function createMainWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  
  // IPC stuff
  // Online-offline mode handling could be done here
  ipcMain.handle('ping', () => {console.log('pong'); return 100})
  ipcMain.handle('printCalon', logCalonList)
  ipcMain.handle('calon-list', () => {return calon_list})
  ipcMain.handle('calon-image', (_event, args) => getCalonImage(args))
  ipcMain.handle('log-selection', (_event, args) => {return calonLogger.logSelection(args)})
  ipcMain.handle('save-selection', () => {return calonLogger.saveCalonResults()})
  ipcMain.handle('dummy-data-test', () => {dummyDatafier(calonLogger,calon_count)})
  
  calon_list = getCalonList();
  // Prepare CalonLogger object
  calonLogger = new CalonLogger(calon_list);
  calon_count = calon_list.length;

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createAuthWindow()
  //createMainWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createAuthWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
app.on('before-quit', async (event) => {
    if (authenticated) {
      event.preventDefault();
      await calonLogger.saveCalonResults();
      authenticated = false;
      app.quit();
    }
})
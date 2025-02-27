import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer

const calon_utils = {
  calonList: () => ipcRenderer.invoke('calon-list'),
  calonImage: (path : string) => ipcRenderer.invoke('calon-image', path),
  logSelection: (selection : number[]) => ipcRenderer.invoke('log-selection',selection),
  saveSelection: () => ipcRenderer.invoke('save-selection'),
  dummyDataTest: () => ipcRenderer.invoke('dummy-data-test')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

const isAuthWindow = location.pathname.includes("auth.html");

if (isAuthWindow) {
  console.log("Auth index preload")
  contextBridge.exposeInMainWorld('challenge', { sendAuthChallenge : (_event, code) => ipcRenderer.send("auth-challenge", code)})   
} else {
    console.log("Basic index preload")
    try {
      //contextBridge.exposeInMainWorld('api', api)
      contextBridge.exposeInMainWorld('test', { testPing: () => ipcRenderer.invoke("ping"), testPrint: () => ipcRenderer.invoke("printCalon")})
      contextBridge.exposeInMainWorld('calon_utils', calon_utils)
    } catch (error) {
      console.error(error)
    }
}
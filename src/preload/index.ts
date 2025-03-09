import { contextBridge, ipcRenderer } from 'electron'
import { auth_code } from '../main/auth'
// Custom APIs for renderer

const calon_utils = {
  calonList: () => ipcRenderer.invoke('calon-list'),
  calonImage: (path : string) => ipcRenderer.invoke('calon-image', path),
  logSelection: (selection : number[]) => ipcRenderer.invoke('log-selection',selection),
  saveSelection: () => ipcRenderer.invoke('save-selection'),
  dummyDataTest: () => ipcRenderer.invoke('dummy-data-test'),
  calonDesc: (path : string) => ipcRenderer.invoke('calon-desc',path)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

console.log("Basic index preload")
try {
  //contextBridge.exposeInMainWorld('api', api)
  contextBridge.exposeInMainWorld('test', { testPing: () => ipcRenderer.invoke("ping"), testPrint: () => ipcRenderer.invoke("printCalon")})
  contextBridge.exposeInMainWorld('calon_utils', calon_utils)
  contextBridge.exposeInMainWorld('auth', auth_code)
  contextBridge.exposeInMainWorld('ready',() => {return ipcRenderer.invoke('ready')})
} catch (error) {
  console.error(error)
}
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {}
const calon_utils = {
  calonList: () => ipcRenderer.invoke('calon-list')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    //contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('test', { testPing: () => ipcRenderer.invoke("ping"), testPrint: () => ipcRenderer.invoke("printCalon")})
    contextBridge.exposeInMainWorld('calon_utils', calon_utils)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
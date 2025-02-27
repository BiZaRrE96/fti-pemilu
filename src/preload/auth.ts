import { contextBridge, ipcRenderer } from 'electron'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('challenge', { sendAuthChallenge : (_event, code) => ipcRenderer.send("auth-challenge", code)})   
  }
  catch (e) {
    console.log(e);
  }
}
import { contextBridge, ipcRenderer } from 'electron'

console.log("Auth index preload")
contextBridge.exposeInMainWorld('challenge', { sendAuthChallenge : (_event, code) => ipcRenderer.send("auth-challenge", code)})   
import { contextBridge, ipcRenderer } from 'electron'

console.log("Auth index preload")
contextBridge.exposeInMainWorld('challenge', { sendAuthChallenge : (code : string) => ipcRenderer.send("auth-challenge", code)})   
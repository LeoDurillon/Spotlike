import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  get: (
    search: string
  ): Promise<
    (
      | {
          name: string
          command: string
          type: 'File' | 'Folder' | 'App' | 'Package' | 'Command'
        }
      | {
          name: string
          type: 'Web' | 'Calc'
        }
    )[]
  > => {
    return ipcRenderer.invoke('get', search)
  },
  exec: (command: string): Promise<void> => {
    return ipcRenderer.invoke('exec', command)
  },
  close: (): void => {
    ipcRenderer.invoke('close')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      get: (search: string) => Promise<
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
      >
      exec: (search: string) => Promise<void>
      close: () => void
      // Add any additional "APIs" here
    }
  }
}

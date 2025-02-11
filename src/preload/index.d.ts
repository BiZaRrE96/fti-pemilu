import { ElectronAPI } from '@electron-toolkit/preload'

interface testtype {
    testPing : () => int;
    testPrint : () => void;
}

interface calon_utils {
    calonList : () => Promise;
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    test: testtype
    calon_utils: calon_utils
  }
}

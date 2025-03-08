import { ElectronAPI } from '@electron-toolkit/preload'

interface testtype {
    testPing : () => int;
    testPrint : () => void;
}

interface calon_utils {
    calonList : () => Promise<string[]>;
    calonImage : (string) => Promise<string>;
    dummyDataTest : () => void;
    logSelection: (selection : number[]) => Promise<boolean>,
    saveSelection: () => Promise<boolean>
    calonDesc: (path : string) => Promise<string>;
  }

interface challenge {
  sendAuthChallenge : (code) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    test: testtype
    calon_utils: calon_utils
    challenge : challenge
    auth: (code : string) => boolean
  }
}
import type { electronAPI } from '../src/preload/src/preload';
declare global {
  interface Window {
    electron: electronAPI;
  }
}

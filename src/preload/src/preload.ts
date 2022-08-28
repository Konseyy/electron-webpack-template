/**
 * @module preload
 */

import { sha256sum } from './nodeCrypto';
import { versions } from './versions';

export const exposedAPI = {
  sha256sum,
  versions,
};
window.electron = exposedAPI;

type apiType = typeof exposedAPI;
export interface electronAPI extends apiType {}

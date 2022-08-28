// import { createHash } from 'crypto';
// import { exposedAPI } from '../src/preload';

test('placeholder', () => {
  expect(true).toBe(true);
});

// test('versions', async () => {
//   expect(exposedAPI.versions).toBe(process.versions);
// });

// test('nodeCrypto', async () => {
//   // Test hashing a random string.
//   const testString = Math.random().toString(36).slice(2, 7);
//   const expectedHash = createHash('sha256').update(testString).digest('hex');

//   expect(exposedAPI.sha256sum(testString)).toBe(expectedHash);
// });

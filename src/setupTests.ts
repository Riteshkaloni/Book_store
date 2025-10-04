import '@testing-library/jest-dom';

// Mock localStorage for tests
class LocalStorageMock {
  store: Record<string, string> = {};
  clear() { this.store = {}; }
  getItem(key: string) { return this.store[key] || null; }
  setItem(key: string, value: string) { this.store[key] = String(value); }
  removeItem(key: string) { delete this.store[key]; }
}

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });

// Provide TextEncoder/TextDecoder for environments that don't have them (older Node)
// react-router and some libs expect these globals when running under jsdom
if (typeof (window as any).TextEncoder === 'undefined') {
  // Use synchronous require so globals are available immediately during test setup
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const util = require('util');
  const { TextEncoder, TextDecoder } = util as any;
  (window as any).TextEncoder = TextEncoder;
  (window as any).TextDecoder = TextDecoder;
}

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
if (typeof (global as any).TextEncoder === 'undefined') {
  (async () => {
    const mod = await import('util');
    const { TextEncoder, TextDecoder } = mod as any;
    (global as any).TextEncoder = TextEncoder;
    (global as any).TextDecoder = TextDecoder;
  })();
}

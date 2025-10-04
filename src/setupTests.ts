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
import { TextEncoder, TextDecoder } from 'util';

if (typeof (window as any).TextEncoder === 'undefined') {
  // Assign Node's TextEncoder/TextDecoder to window for jsdom testing environments
  (window as any).TextEncoder = TextEncoder;
  (window as any).TextDecoder = TextDecoder;
}

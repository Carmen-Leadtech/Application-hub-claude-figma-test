/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest';

import { afterEach, vi } from 'vitest';

import { cleanup } from '@testing-library/react';

global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(() => {
    setTimeout(() => {
      callback([
        {
          target: {},
          contentRect: { width: 200, height: 100 },
          borderBoxSize: [{ inlineSize: 200, blockSize: 100 }],
          contentBoxSize: [{ inlineSize: 200, blockSize: 100 }],
          devicePixelContentBoxSize: [{ inlineSize: 200, blockSize: 100 }],
        },
      ]);
    }, 0);
  }),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

afterEach(() => {
  cleanup();
});

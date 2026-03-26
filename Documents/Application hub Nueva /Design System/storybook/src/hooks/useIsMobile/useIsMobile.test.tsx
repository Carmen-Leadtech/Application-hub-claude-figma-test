import { renderHook, waitFor } from '@testing-library/react';

import { useIsMobile } from './useIsMobile';

describe('useIsMobile Hook', () => {
  const originalUserAgent = navigator.userAgent;
  const originalNavigator = global.navigator;

  beforeEach(() => {
    // Ensure navigator exists before each test
    if (!global.navigator) {
      global.navigator = originalNavigator;
    }
  });

  afterEach(() => {
    // Restore the original user agent after each test
    if (navigator) {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        configurable: true,
        value: originalUserAgent,
      });
    }
  });

  test('returns false for a desktop user agent', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(false);
    });
  });

  test('returns true for an iPhone user agent', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true);
    });
  });

  test('returns true for an Android user agent', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value:
        'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true);
    });
  });

  test('returns true for an iPad user agent', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value:
        'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true);
    });
  });

  test('returns true for a tablet user agent', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value:
        'Mozilla/5.0 (Linux; Android 10; SM-T970) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36',
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true);
    });
  });

  test('returns false when navigator is not available (SSR)', async () => {
    const originalNavigator = global.navigator;
    // @ts-expect-error - Simulating environment without navigator
    delete global.navigator;

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(false);
    });

    global.navigator = originalNavigator;
  });

  test('returns true for a BlackBerry user agent', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value:
        'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en) AppleWebKit/534.1+ (KHTML, like Gecko) Version/6.0.0.337 Mobile Safari/534.1+',
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true);
    });
  });

  test('returns true for a Windows Phone user agent', async () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value:
        'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current.isMobile).toBe(true);
    });
  });
});

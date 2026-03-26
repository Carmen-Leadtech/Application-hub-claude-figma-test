import { act, renderHook, waitFor } from '@testing-library/react';

import { useBreakPoint } from './useBreakPoint';

const createStyle = (values: Record<string, string>) =>
  ({
    getPropertyValue: (name: string) => values[name] ?? '',
  }) as CSSStyleDeclaration;

type GetComputedStyleSpy = {
  mockRestore: () => void;
  mockImplementation: (fn: (...args: unknown[]) => CSSStyleDeclaration) => void;
};

describe('useBreakPoint Hook', () => {
  const originalInnerWidth = window.innerWidth;
  let getComputedStyleSpy: GetComputedStyleSpy;

  beforeEach(() => {
    window.innerWidth = 800;
    getComputedStyleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() =>
      createStyle({
        '--bp-sm': '600',
        '--bp-md': '900',
        '--bp-lg': '1200',
      })
    );
  });

  afterEach(() => {
    getComputedStyleSpy.mockRestore();
    window.innerWidth = originalInnerWidth;
  });

  test('calculates flags with CSS breakpoints', () => {
    const { result } = renderHook(() => useBreakPoint());

    expect(result.current.breakpoints).toEqual({ sm: 600, md: 900, lg: 1200 });
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isWide).toBe(false);
  });

  test('sets device based on width', () => {
    window.innerWidth = 500;
    const { result: mobileResult } = renderHook(() => useBreakPoint());
    expect(mobileResult.current.device).toBe('mobile');

    window.innerWidth = 700;
    const { result: tabletResult } = renderHook(() => useBreakPoint());
    expect(tabletResult.current.device).toBe('tablet');

    window.innerWidth = 1200;
    const { result: desktopResult } = renderHook(() => useBreakPoint());
    expect(desktopResult.current.device).toBe('desktop');
  });

  test('updates width on resize', async () => {
    const { result } = renderHook(() => useBreakPoint());

    act(() => {
      window.innerWidth = 1000;
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      expect(result.current.width).toBe(1000);
      expect(result.current.isDesktop).toBe(true);
      expect(result.current.isTablet).toBe(false);
    });
  });

  test('uses fallbacks when variables are not numeric', () => {
    getComputedStyleSpy.mockImplementation(() =>
      createStyle({
        '--bp-sm': '',
        '--bp-md': 'oops',
        '--bp-lg': ' ',
      })
    );

    const { result } = renderHook(() => useBreakPoint());

    expect(result.current.breakpoints).toEqual({ sm: 768, md: 1024, lg: 1440 });
  });
});

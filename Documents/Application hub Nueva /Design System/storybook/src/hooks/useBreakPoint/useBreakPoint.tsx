import { useEffect, useMemo, useState } from 'react';

const FALLBACK_BREAKPOINTS = {
  sm: 768,
  md: 1024,
  lg: 1440,
};

type Breakpoints = typeof FALLBACK_BREAKPOINTS;

const getBreakpointValue = (name: string, fallback: number) => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parsed = Number.parseInt(value, 10);

  return Number.isNaN(parsed) ? fallback : parsed;
};

const getInitialBreakpoints = (): Breakpoints => ({
  sm: getBreakpointValue('--bp-sm', FALLBACK_BREAKPOINTS.sm),
  md: getBreakpointValue('--bp-md', FALLBACK_BREAKPOINTS.md),
  lg: getBreakpointValue('--bp-lg', FALLBACK_BREAKPOINTS.lg),
});

const getDeviceString = (width: number, breakpoints: Breakpoints) => {
  if (width < breakpoints.sm) {
    return 'mobile';
  }

  if (width >= breakpoints.sm && width < breakpoints.md) {
    return 'tablet';
  }

  if (width >= breakpoints.md) {
    return 'desktop';
  }

  return 'wide';
};

export const useBreakPoint = () => {
  const [breakpoints] = useState(getInitialBreakpoints);
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : FALLBACK_BREAKPOINTS.md
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() => {
    const isMobile = width < breakpoints.sm;
    const isTablet = width >= breakpoints.sm && width < breakpoints.md;
    const isDesktop = width >= breakpoints.md;
    const isWide = width >= breakpoints.lg;
    const device = getDeviceString(width, breakpoints);

    return {
      breakpoints,
      device,
      isDesktop,
      isMobile,
      isTablet,
      isWide,
      width,
    };
  }, [breakpoints, width]);
};

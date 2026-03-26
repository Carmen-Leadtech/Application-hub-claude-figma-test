import { CSSProperties, useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';

import styles from './Icon.module.css';
import { IconSharedProps } from './IconSharedProps';

export interface IconProps extends IconSharedProps {
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Custom CSS class name */
  className?: string;
  /** Color of the icon (CSS color value) */
  color?: string;
  /** Size of the icon (CSS size value, e.g., '16px', '1rem', 24) */
  size?: string | number;
}

// Load all SVGs using Vite's import.meta.glob
// This creates an object with functions that import SVGs dynamically
const iconModules = import.meta.glob<string>('./assets/*.svg', {
  query: '?raw',
  import: 'default',
  eager: false,
});

// Cache to store loaded SVGs (raw version)
const svgCache = new Map<string, Promise<string>>();

// Function to load an SVG by name (raw)
const loadSvg = async (iconName: string): Promise<string> => {
  // Find the matching module
  const modulePath = `./assets/${iconName}.svg`;
  const loader = iconModules[modulePath];

  if (!loader) {
    throw new Error(`Icon "${iconName}" not found`);
  }

  // Load the raw SVG (keep original colors)
  const svgContent = await loader();
  return svgContent as string;
};

// Function to get or load an SVG (with cache)
const getSvg = (iconName: string): Promise<string> => {
  if (!svgCache.has(iconName)) {
    const promise = loadSvg(iconName).catch((error) => {
      // Clear cache in case of error
      svgCache.delete(iconName);
      throw error;
    });
    svgCache.set(iconName, promise);
  }
  return svgCache.get(iconName)!;
};

export const clearIconCache = () => svgCache.clear();

export const Icon = ({ 'data-qa': dataQa, name, className = '', color, size = 24 }: IconProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  const ariaLabel = useMemo(() => name.replace(/[_-]/g, ' '), [name]);

  const sizeValue = useMemo(
    () => (size ? (typeof size === 'number' ? `${size}px` : size) : undefined),
    [size]
  );

  // Style for inline SVG (no color) or loading/error
  const iconStyle = useMemo(() => {
    const style: CSSProperties = {};
    if (sizeValue) {
      style.width = sizeValue;
      style.height = sizeValue;
    }
    if (color) {
      style.color = color;
    }
    return style;
  }, [sizeValue, color]);

  const maskDataUri = useMemo(() => {
    if (!color || !svg) return null;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [color, svg]);

  // Style for mask branch: background + mask, no inline SVG (size/position/repeat in .iconMask)
  const maskStyle = useMemo((): CSSProperties => {
    const style: CSSProperties = {};
    if (sizeValue) {
      style.width = sizeValue;
      style.height = sizeValue;
    }
    if (color && maskDataUri) {
      style.background = color;
      style.WebkitMaskImage = `url(${maskDataUri})`;
      style.maskImage = `url(${maskDataUri})`;
    }
    return style;
  }, [sizeValue, color, maskDataUri]);

  useEffect(() => {
    let cancelled = false;

    getSvg(name)
      .then((svgContent) => {
        if (!cancelled) {
          setSvg(svgContent);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setSvg(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  const isReady = !!svg;
  if (error || !isReady) {
    return (
      <span
        className={classNames(styles.root, className)}
        style={iconStyle}
        data-qa={dataQa || undefined}
        role="img"
        aria-label={error ? `Error loading ${name}` : `Loading ${name}`}
        title={error ? `Error loading ${name}` : `Loading ${name}`}
      />
    );
  }

  if (color && maskDataUri) {
    return (
      <span
        className={classNames(styles.root, styles.iconMask, className)}
        style={maskStyle}
        data-qa={dataQa || undefined}
        role="img"
        aria-label={ariaLabel}
      />
    );
  }

  return (
    <span
      className={classNames(styles.root, className)}
      style={iconStyle}
      data-qa={dataQa || undefined}
      role="img"
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: svg! }}
    />
  );
};

// Export list of available icons for development/testing
export const getAvailableIcons = (): string[] => {
  return Object.keys(iconModules)
    .map((path) => path.replace('./assets/', '').replace('.svg', ''))
    .sort();
};

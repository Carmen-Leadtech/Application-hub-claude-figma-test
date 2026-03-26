import { useEffect, useState } from 'react';

import { CvElement } from 'types/CvElement';

import styles from './PrimitiveTokens.module.css';

import '@tokens/design-system-tokens/design-system-tokens.css';
import '@tokens/tokens.css';

export interface PrimitiveTokensProps extends CvElement {
  /** Category of primitive tokens to display */
  category?: 'all' | 'colors' | 'sizes';
}

interface ColorToken {
  name: string;
  token: string;
}

interface SizeToken {
  name: string;
  token: string;
  value: number;
}

// ---------------------------------------------------------------------------
// Color Primitives — raw values from "Color Primitives/Mode 1"
// ---------------------------------------------------------------------------

const colorPrimitiveGroups: Record<string, ColorToken[]> = {
  'Brand - Light': [
    { name: 'Brand Light 10', token: '--brand-light-10' },
    { name: 'Brand Light 20', token: '--brand-light-20' },
    { name: 'Brand Light 30', token: '--brand-light-30' },
    { name: 'Brand Light 40', token: '--brand-light-40' },
  ],
  'Brand - Dark': [
    { name: 'Brand Dark 50', token: '--brand-dark-50' },
    { name: 'Brand Dark 60', token: '--brand-dark-60' },
    { name: 'Brand Dark 70', token: '--brand-dark-70' },
    { name: 'Brand Dark 80', token: '--brand-dark-80' },
  ],
  'Neutrals - White': [{ name: 'White 00', token: '--neutrals-white-00' }],
  'Neutrals - Light': [
    { name: 'Light 10', token: '--neutrals-light-10' },
    { name: 'Light 20', token: '--neutrals-light-20' },
    { name: 'Light 30', token: '--neutrals-light-30' },
  ],
  'Neutrals - Dark': [
    { name: 'Dark 40', token: '--neutrals-dark-40' },
    { name: 'Dark 50', token: '--neutrals-dark-50' },
    { name: 'Dark 60', token: '--neutrals-dark-60' },
    { name: 'Dark 70', token: '--neutrals-dark-70' },
  ],
  'Neutrals - Black': [{ name: 'Black 80', token: '--neutrals-black-80' }],
  Gradients: [
    { name: 'Gradient 1 — Stop 1', token: '--gradients-gradient-1-stop-1' },
    { name: 'Gradient 1 — Stop 2', token: '--gradients-gradient-1-stop-2' },
  ],
  'System - Error': [
    { name: 'Error 10', token: '--system-error-10' },
    { name: 'Error 50', token: '--system-error-50' },
    { name: 'Error 100', token: '--system-error-100' },
  ],
  'System - Success': [
    { name: 'Success 10', token: '--system-success-10' },
    { name: 'Success 50', token: '--system-success-50' },
    { name: 'Success 100', token: '--system-success-100' },
  ],
  'System - Warning': [
    { name: 'Warning 10', token: '--system-warning-10' },
    { name: 'Warning 50', token: '--system-warning-50' },
    { name: 'Warning 100', token: '--system-warning-100' },
  ],
  'System - Info': [
    { name: 'Info 10', token: '--system-info-10' },
    { name: 'Info 50', token: '--system-info-50' },
    { name: 'Info 100', token: '--system-info-100' },
  ],
  'Interactivity States': [
    { name: 'Default', token: '--interactivity-states-default' },
    { name: 'Hover', token: '--interactivity-states-hover' },
    { name: 'Pressed', token: '--interactivity-states-pressed' },
    { name: 'Disabled', token: '--interactivity-states-disabled' },
  ],
};

// ---------------------------------------------------------------------------
// Size Primitives — raw numeric scale from "Size Primitives/Mode 1"
// ---------------------------------------------------------------------------

const sizePrimitives: SizeToken[] = [
  { name: '0', token: '--size-0', value: 0 },
  { name: '4', token: '--size-4', value: 4 },
  { name: '8', token: '--size-8', value: 8 },
  { name: '10', token: '--size-10', value: 10 },
  { name: '12', token: '--size-12', value: 12 },
  { name: '14', token: '--size-14', value: 14 },
  { name: '16', token: '--size-16', value: 16 },
  { name: '20', token: '--size-20', value: 20 },
  { name: '24', token: '--size-24', value: 24 },
  { name: '28', token: '--size-28', value: 28 },
  { name: '32', token: '--size-32', value: 32 },
  { name: '40', token: '--size-40', value: 40 },
  { name: '48', token: '--size-48', value: 48 },
  { name: '56', token: '--size-56', value: 56 },
  { name: '64', token: '--size-64', value: 64 },
  { name: '72', token: '--size-72', value: 72 },
  { name: '80', token: '--size-80', value: 80 },
  { name: '88', token: '--size-88', value: 88 },
  { name: '96', token: '--size-96', value: 96 },
  { name: '104', token: '--size-104', value: 104 },
  { name: '112', token: '--size-112', value: 112 },
  { name: '120', token: '--size-120', value: 120 },
  { name: '128', token: '--size-128', value: 128 },
  { name: '136', token: '--size-136', value: 136 },
  { name: '144', token: '--size-144', value: 144 },
  { name: '152', token: '--size-152', value: 152 },
  { name: '160', token: '--size-160', value: 160 },
  { name: '168', token: '--size-168', value: 168 },
  { name: '176', token: '--size-176', value: 176 },
  { name: '184', token: '--size-184', value: 184 },
  { name: '192', token: '--size-192', value: 192 },
  { name: '200', token: '--size-200', value: 200 },
  { name: '208', token: '--size-208', value: 208 },
  { name: '216', token: '--size-216', value: 216 },
  { name: '224', token: '--size-224', value: 224 },
  { name: '232', token: '--size-232', value: 232 },
  { name: '240', token: '--size-240', value: 240 },
  { name: '248', token: '--size-248', value: 248 },
  { name: '256', token: '--size-256', value: 256 },
];

// ---------------------------------------------------------------------------
// Shared UI helpers
// ---------------------------------------------------------------------------

/** Reads the computed value of a CSS custom property from :root and displays it. */
const ResolvedValue = ({ token }: { token: string }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const resolved = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    setValue(resolved);
  }, [token]);

  if (!value) return null;

  return <code className={styles.resolvedValue}>{value}</code>;
};

const ColorSwatch = ({ name, token }: ColorToken) => (
  <div className={styles.colorSwatch}>
    <div className={styles.colorBox} style={{ backgroundColor: `var(${token})` }} />
    <div className={styles.colorInfo}>
      <div className={styles.colorName}>{name}</div>
      <code className={styles.colorToken}>{token}</code>
      <ResolvedValue token={token} />
    </div>
  </div>
);

const GradientPreview = () => (
  <div className={styles.subsection}>
    <h3 className={styles.subsectionTitle}>Gradient Preview</h3>
    <div className={styles.colorGrid}>
      <div
        className={styles.gradientBox}
        style={{
          background:
            'linear-gradient(90deg, var(--gradients-gradient-1-stop-1), var(--gradients-gradient-1-stop-2))',
        }}
      />
    </div>
  </div>
);

const SizeRow = ({ name, token, value }: SizeToken) => (
  <div className={styles.sizeRow}>
    <span className={styles.sizeName}>{name}px</span>
    <code className={styles.sizeToken}>{token}</code>
    <div className={styles.sizeBar} style={{ width: `${value}px` }} />
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const PrimitiveTokens = ({
  category = 'all',
  className = '',
  'data-qa': dataQa,
}: PrimitiveTokensProps) => {
  const showColors = category === 'all' || category === 'colors';
  const showSizes = category === 'all' || category === 'sizes';

  return (
    <div className={`${styles.root} ${className}`} data-qa={dataQa}>
      <div className={styles.header}>
        <h1 className={styles.title}>Primitive Tokens</h1>
        <p className={styles.description}>
          Primitive tokens are the lowest-level building blocks of the design system. They define
          raw color values and a numeric size scale that <strong>semantic tokens</strong> reference.
        </p>

        <div className={styles.warningBanner}>
          <span className={styles.warningIcon} aria-hidden="true">
            &#9888;
          </span>
          <div className={styles.warningContent}>
            <p className={styles.warningTitle}>Do not use primitive tokens directly in code</p>
            <p className={styles.warningText}>
              These variables (e.g. <code className={styles.warningCode}>--brand-dark-50</code>,{' '}
              <code className={styles.warningCode}>--size-16</code>) exist only as a foundation for
              semantic tokens. Always use their semantic counterparts (e.g.{' '}
              <code className={styles.warningCode}>--color-background-brand</code>,{' '}
              <code className={styles.warningCode}>--spacing-m</code>) in your components and
              stylesheets. This ensures consistency, maintainability, and makes future design
              changes seamless.
            </p>
          </div>
        </div>
      </div>

      {showColors && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Color Primitives</h2>
          <p className={styles.sectionDescription}>
            Raw color values that form the palette. Semantic color tokens like{' '}
            <code className={styles.warningCode}>--color-text-brand</code> or{' '}
            <code className={styles.warningCode}>--color-background-default</code> reference these
            primitives under the hood.
          </p>

          {Object.entries(colorPrimitiveGroups).map(([groupName, colors]) => (
            <div key={groupName} className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>{groupName}</h3>
              <div className={styles.colorGrid}>
                {colors.map((color) => (
                  <ColorSwatch key={color.token} {...color} />
                ))}
              </div>
            </div>
          ))}

          <GradientPreview />
        </section>
      )}

      {showSizes && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Size Primitives</h2>
          <p className={styles.sectionDescription}>
            A fixed numeric scale (in pixels) used internally by spacing, typography, corner-radius,
            and icon-size tokens. For example,{' '}
            <code className={styles.warningCode}>--spacing-m</code> resolves to{' '}
            <code className={styles.warningCode}>var(--size-16)</code>. Use the semantic tokens
            instead.
          </p>

          <div className={styles.sizeGrid}>
            {sizePrimitives.map((size) => (
              <SizeRow key={size.token} {...size} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';

import { CvElement } from 'types/CvElement';

import { Icon } from '../Icon/Icon';

import styles from './DesignTokens.module.css';

import '@tokens/design-system-tokens/design-system-tokens.css';
import '@tokens/tokens.css';

export interface DesignTokensProps extends CvElement {
  /** Category of tokens to display */
  category?: 'all' | 'colors' | 'typography' | 'spacing' | 'sizes' | 'corner-radius' | 'icons';
  /** Token tier to display: 'semantic' for purpose-based tokens, 'primitive' for raw values, 'all' for both */
  tier?: 'all' | 'semantic' | 'primitive';
}

interface ColorToken {
  name: string;
  token: string;
  description?: string;
}

interface TypographyToken {
  name: string;
  token: string;
  type: 'family' | 'weight' | 'size' | 'line-height';
}

interface SizeToken {
  name: string;
  token: string;
}

// ---------------------------------------------------------------------------
// Color tokens — split into primitive (raw values) and semantic (purpose-based)
// ---------------------------------------------------------------------------

const primitiveColorGroups: Record<string, ColorToken[]> = {
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
  Neutrals: [
    { name: 'White 00', token: '--neutrals-white-00' },
    { name: 'Light 10', token: '--neutrals-light-10' },
    { name: 'Light 20', token: '--neutrals-light-20' },
    { name: 'Light 30', token: '--neutrals-light-30' },
    { name: 'Dark 40', token: '--neutrals-dark-40' },
    { name: 'Dark 50', token: '--neutrals-dark-50' },
    { name: 'Dark 60', token: '--neutrals-dark-60' },
    { name: 'Dark 70', token: '--neutrals-dark-70' },
    { name: 'Black 80', token: '--neutrals-black-80' },
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

const semanticColorGroups: Record<string, ColorToken[]> = {
  'Background Colors': [
    { name: 'Background Brand', token: '--color-background-brand' },
    { name: 'Background Default', token: '--color-background-default' },
    { name: 'Background Weaker', token: '--color-background-weaker' },
    { name: 'Background Weakest', token: '--color-background-weakest' },
    { name: 'Background Strong', token: '--color-background-strong' },
    { name: 'Background Stronger', token: '--color-background-stronger' },
    { name: 'Background Strongest', token: '--color-background-strongest' },
  ],
  'Text Colors': [
    { name: 'Text Default', token: '--color-text-default' },
    { name: 'Text Inverted', token: '--color-text-inverted' },
    { name: 'Text Brand', token: '--color-text-brand' },
    { name: 'Text Secondary', token: '--color-text-secondary' },
    { name: 'Text Disabled', token: '--color-text-disabled' },
    { name: 'Text System Error', token: '--color-text-system-error' },
    { name: 'Text System Success', token: '--color-text-system-success' },
    { name: 'Text System Warning', token: '--color-text-system-warning' },
    { name: 'Text System Info', token: '--color-text-system-info' },
    { name: 'Text Interactivity Default', token: '--color-text-interactivity-default' },
    { name: 'Text Interactivity Hover', token: '--color-text-interactivity-hover' },
    { name: 'Text Interactivity Pressed', token: '--color-text-interactivity-pressed' },
    { name: 'Text Interactivity Disabled', token: '--color-text-interactivity-disabled' },
  ],
  'Border Colors': [
    { name: 'Border Brand', token: '--color-border-brand' },
    { name: 'Border Default', token: '--color-border-default' },
    { name: 'Border Strong', token: '--color-border-strong' },
    { name: 'Border Weaker', token: '--color-border-weaker' },
    { name: 'Border Weak', token: '--color-border-weak' },
    { name: 'Border Brand Weak', token: '--color-border-brand-weak' },
    { name: 'Border Inverted', token: '--color-border-inverted' },
    { name: 'Border System Error', token: '--color-border-system-error' },
    { name: 'Border System Success', token: '--color-border-system-success' },
    { name: 'Border System Warning', token: '--color-border-system-warning' },
    { name: 'Border System Info', token: '--color-border-system-info' },
    { name: 'Border Interactivity Default', token: '--color-border-interactivity-default' },
    { name: 'Border Interactivity Hover', token: '--color-border-interactivity-hover' },
    { name: 'Border Interactivity Pressed', token: '--color-border-interactivity-pressed' },
    { name: 'Border Interactivity Disabled', token: '--color-border-interactivity-disabled' },
  ],
  'Icon Colors': [
    { name: 'Icons Brand', token: '--color-icons-brand' },
    { name: 'Icons Default', token: '--color-icons-default' },
    { name: 'Icons Weak', token: '--color-icons-weak' },
    { name: 'Icons Strongest', token: '--color-icons-strongest' },
    { name: 'Icons Inverted', token: '--color-icons-inverted' },
    { name: 'Icons Disabled', token: '--color-icons-disabled' },
    { name: 'Icons Brand Weaker', token: '--color-icons-brand-weaker' },
    { name: 'Icons System Error', token: '--color-icons-system-error' },
    { name: 'Icons System Success', token: '--color-icons-system-success' },
    { name: 'Icons System Warning', token: '--color-icons-system-warning' },
    { name: 'Icons System Info', token: '--color-icons-system-info' },
    { name: 'Icons Interactivity Default', token: '--color-icons-interactivity-default' },
    { name: 'Icons Interactivity Hover', token: '--color-icons-interactivity-hover' },
    { name: 'Icons Interactivity Pressed', token: '--color-icons-interactivity-pressed' },
    { name: 'Icons Interactivity Disabled', token: '--color-icons-interactivity-disabled' },
  ],
  'Fill Common': [
    { name: 'Fill Default', token: '--color-fill-common-default' },
    { name: 'Fill Weaker', token: '--color-fill-common-weaker' },
    { name: 'Fill Weak', token: '--color-fill-common-weak' },
    { name: 'Fill Strong', token: '--color-fill-common-strong' },
    { name: 'Fill Stronger', token: '--color-fill-common-stronger' },
    { name: 'Fill Strongest', token: '--color-fill-common-strongest' },
    { name: 'Fill Brand', token: '--color-fill-common-brand' },
    { name: 'Fill Brand Weak', token: '--color-fill-common-brand-weak' },
  ],
  'Fill Gradients': [
    { name: 'Highlight Stop 1', token: '--color-fill-gradients-highlight-stop-1' },
    { name: 'Highlight Stop 2', token: '--color-fill-gradients-highlight-stop-2' },
  ],
  'Fill Illustrations': [
    { name: 'Brand Weak 4', token: '--color-fill-illustrations-brand-weak-4' },
    { name: 'Brand Weak 3', token: '--color-fill-illustrations-brand-weak-3' },
    { name: 'Brand Weak 2', token: '--color-fill-illustrations-brand-weak-2' },
    { name: 'Brand Weak 1', token: '--color-fill-illustrations-brand-weak-1' },
    { name: 'Brand', token: '--color-fill-illustrations-brand' },
    { name: 'Brand Strong 1', token: '--color-fill-illustrations-brand-strong-1' },
    { name: 'Brand Strong 2', token: '--color-fill-illustrations-brand-strong-2' },
    { name: 'Brand Strong 3', token: '--color-fill-illustrations-brand-strong-3' },
  ],
  'Fill System': [
    { name: 'Error Weak', token: '--color-fill-system-error-weak' },
    { name: 'Error Strong', token: '--color-fill-system-error-strong' },
    { name: 'Success Weak', token: '--color-fill-system-success-weak' },
    { name: 'Success Strong', token: '--color-fill-system-success-strong' },
    { name: 'Warning Weak', token: '--color-fill-system-warning-weak' },
    { name: 'Warning Strong', token: '--color-fill-system-warning-strong' },
    { name: 'Info Weak', token: '--color-fill-system-info-weak' },
    { name: 'Info Strong', token: '--color-fill-system-info-strong' },
  ],
  'Fill Interactivity': [
    { name: 'Default', token: '--color-fill-interactivity-default' },
    { name: 'Hover', token: '--color-fill-interactivity-hover' },
    { name: 'Pressed', token: '--color-fill-interactivity-pressed' },
    { name: 'Disabled', token: '--color-fill-interactivity-disabled' },
  ],
};

// ---------------------------------------------------------------------------
// Typography tokens — all semantic (from TYPOGRAPHY collection)
// ---------------------------------------------------------------------------

const semanticTypographyTokens: Record<string, TypographyToken[]> = {
  'Font Families': [
    { name: 'Heading', token: '--font-family-heading', type: 'family' },
    { name: 'Body', token: '--font-family-body', type: 'family' },
    { name: 'Small Details', token: '--font-family-small-details', type: 'family' },
  ],
  'Font Weights': [
    { name: 'Strong', token: '--font-weight-strong', type: 'weight' },
    { name: 'Default', token: '--font-weight-default', type: 'weight' },
  ],
  'Title Sizes': [
    { name: 'Title XXL', token: '--font-size-titles-xxl', type: 'size' },
    { name: 'Title XL', token: '--font-size-titles-xl', type: 'size' },
    { name: 'Title L', token: '--font-size-titles-l', type: 'size' },
    { name: 'Title M', token: '--font-size-titles-m', type: 'size' },
    { name: 'Title S', token: '--font-size-titles-s', type: 'size' },
    { name: 'Title XS', token: '--font-size-titles-xs', type: 'size' },
  ],
  'Body Sizes': [
    { name: 'Body M', token: '--font-size-body-m-default', type: 'size' },
    { name: 'Body S', token: '--font-size-body-s', type: 'size' },
  ],
  'Small Detail Sizes': [
    { name: 'Small XS', token: '--font-size-small-details-xs-captions', type: 'size' },
    { name: 'Small XXS', token: '--font-size-small-details-xxs', type: 'size' },
  ],
  'Title Line Heights': [
    { name: 'Title XXL', token: '--line-height-titles-xxl', type: 'line-height' },
    { name: 'Title XL', token: '--line-height-titles-xl', type: 'line-height' },
    { name: 'Title L', token: '--line-height-titles-l', type: 'line-height' },
    { name: 'Title M', token: '--line-height-titles-m', type: 'line-height' },
    { name: 'Title S', token: '--line-height-titles-s', type: 'line-height' },
    { name: 'Title XS', token: '--line-height-titles-xs', type: 'line-height' },
  ],
  'Body Line Heights': [
    { name: 'Body M', token: '--line-height-body-m-default', type: 'line-height' },
    { name: 'Body S', token: '--line-height-body-s', type: 'line-height' },
  ],
  'Small Detail Line Heights': [
    { name: 'Small XS', token: '--line-height-small-details-xs-captions', type: 'line-height' },
    { name: 'Small XXS', token: '--line-height-small-details-xxs', type: 'line-height' },
  ],
};

const spacingCommonTokens: SizeToken[] = [
  { name: 'XXS Exception', token: '--spacing-xxs-exception' },
  { name: 'XS', token: '--spacing-xs' },
  { name: 'S Exception', token: '--spacing-s-exception' },
  { name: 'M', token: '--spacing-m' },
  { name: 'L', token: '--spacing-l' },
  { name: 'XL', token: '--spacing-xl' },
  { name: 'XXL', token: '--spacing-xxl' },
  { name: 'XXXL', token: '--spacing-xxxl' },
];

const spacingLargerTokens: SizeToken[] = [
  { name: 'Larger 1', token: '--spacing-larger-1' },
  { name: 'Larger 2', token: '--spacing-larger-2' },
  { name: 'Larger 3', token: '--spacing-larger-3' },
  { name: 'Larger 4', token: '--spacing-larger-4' },
  { name: 'Larger 5', token: '--spacing-larger-5' },
  { name: 'Larger 6', token: '--spacing-larger-6' },
  { name: 'Larger 7', token: '--spacing-larger-7' },
  { name: 'Larger 8', token: '--spacing-larger-8' },
  { name: 'Larger 9', token: '--spacing-larger-9' },
  { name: 'Larger 10', token: '--spacing-larger-10' },
  { name: 'Larger 11', token: '--spacing-larger-11' },
  { name: 'Larger 12', token: '--spacing-larger-12' },
  { name: 'Larger 13', token: '--spacing-larger-13' },
  { name: 'Larger 14', token: '--spacing-larger-14' },
  { name: 'Larger 15', token: '--spacing-larger-15' },
  { name: 'Larger 16', token: '--spacing-larger-16' },
  { name: 'Larger 17', token: '--spacing-larger-17' },
  { name: 'Larger 18', token: '--spacing-larger-18' },
  { name: 'Larger 19', token: '--spacing-larger-19' },
  { name: 'Larger 20', token: '--spacing-larger-20' },
  { name: 'Larger 21', token: '--spacing-larger-21' },
  { name: 'Larger 22', token: '--spacing-larger-22' },
  { name: 'Larger 23', token: '--spacing-larger-23' },
  { name: 'Larger 24', token: '--spacing-larger-24' },
  { name: 'Larger 25', token: '--spacing-larger-25' },
  { name: 'Larger 26', token: '--spacing-larger-26' },
];

const cornerRadiusTokens: SizeToken[] = [
  { name: 'XS', token: '--corner-radius-xs' },
  { name: 'S', token: '--corner-radius-s' },
  { name: 'M', token: '--corner-radius-m' },
  { name: 'L', token: '--corner-radius-l' },
  { name: 'XL', token: '--corner-radius-xl' },
  { name: 'XXL', token: '--corner-radius-xxl' },
];

const iconSizeTokens: SizeToken[] = [
  { name: 'XS', token: '--icon-size-xs' },
  { name: 'S', token: '--icon-size-s' },
  { name: 'M', token: '--icon-size-m' },
  { name: 'L', token: '--icon-size-l' },
  { name: 'XL', token: '--icon-size-xl' },
];

// ---------------------------------------------------------------------------
// Shared UI helpers
// ---------------------------------------------------------------------------

type TokenTier = 'primitive' | 'semantic';

const TIER_META: Record<TokenTier, { label: string; description: string }> = {
  primitive: {
    label: 'Primitive',
    description: 'Raw values that form the foundation of the design system.',
  },
  semantic: {
    label: 'Semantic',
    description: 'Purpose-based tokens that reference primitives. Use these in components.',
  },
};

const TierHeader = ({ tier }: { tier: TokenTier }) => {
  const { label, description } = TIER_META[tier];
  return (
    <div className={styles.tierHeader}>
      <span className={`${styles.tierBadge} ${styles[`tierBadge--${tier}`]}`}>{label}</span>
      <p className={styles.tierDescription}>{description}</p>
    </div>
  );
};

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

const ColorSwatch = ({ name, token }: ColorToken) => {
  return (
    <div className={styles.colorSwatch}>
      <div className={styles.colorBox} style={{ backgroundColor: `var(${token})` }} />
      <div className={styles.colorInfo}>
        <div className={styles.colorName}>{name}</div>
        <code className={styles.colorToken}>{token}</code>
        <ResolvedValue token={token} />
      </div>
    </div>
  );
};

const TypographyExample = ({ name, token, type }: TypographyToken) => {
  const getStyle = (): React.CSSProperties => {
    switch (type) {
      case 'family':
        // Show font family at a consistent, readable size
        return {
          fontFamily: `var(${token})`,
          fontSize: '20px',
          lineHeight: '1.5',
        };
      case 'weight':
        // Show font weight using the CSS variable (now contains numeric values)
        return {
          fontWeight: `var(${token})`,
          fontSize: '20px',
          fontFamily: 'var(--font-family-body)',
          lineHeight: '1.5',
        };
      case 'size':
        // Show actual font size with consistent family and weight
        return {
          fontSize: `var(${token})`,
          fontFamily: 'var(--font-family-body)',
          fontWeight: '400',
          lineHeight: '1.4',
        };
      case 'line-height':
        return {
          lineHeight: `var(${token})`,
          fontSize: '16px',
          fontFamily: 'var(--font-family-body)',
        };
      default:
        return {};
    }
  };

  return (
    <div className={styles.typographyExample}>
      <div className={styles.typographyPreview} style={getStyle()}>
        The quick brown fox jumps over the lazy dog
      </div>
      <div className={styles.typographyInfo}>
        <div className={styles.typographyName}>{name}</div>
        <code className={styles.typographyToken}>{token}</code>
        <ResolvedValue token={token} />
      </div>
    </div>
  );
};

const SpacingExample = ({ name, token }: SizeToken) => {
  return (
    <div className={styles.spacingExample}>
      <div className={styles.spacingVisual}>
        <div className={styles.spacingBoxLeft} />
        <div className={styles.spacingGap} style={{ width: `var(${token})` }}>
          <span className={styles.spacingMeasurement}>gap</span>
        </div>
        <div className={styles.spacingBoxRight} />
      </div>
      <div className={styles.spacingInfo}>
        <div className={styles.spacingName}>{name}</div>
        <code className={styles.spacingToken}>{token}</code>
        <ResolvedValue token={token} />
      </div>
    </div>
  );
};

const CornerRadiusExample = ({ name, token }: SizeToken) => {
  return (
    <div className={styles.cornerRadiusExample}>
      <div className={styles.cornerRadiusBox} style={{ borderRadius: `var(${token})` }} />
      <div className={styles.cornerRadiusInfo}>
        <div className={styles.cornerRadiusName}>{name}</div>
        <code className={styles.cornerRadiusToken}>{token}</code>
        <ResolvedValue token={token} />
      </div>
    </div>
  );
};

const IconSizeExample = ({ name, token }: SizeToken) => {
  return (
    <div className={styles.iconSizeExample}>
      <div
        className={styles.iconSizeBox}
        style={{ width: `var(${token})`, height: `var(${token})` }}
      >
        <Icon name="achievements" size={`var(${token})`} />
      </div>
      <div className={styles.iconSizeInfo}>
        <div className={styles.iconSizeName}>{name}</div>
        <code className={styles.iconSizeToken}>{token}</code>
        <ResolvedValue token={token} />
      </div>
    </div>
  );
};

export const DesignTokens = ({
  category = 'all',
  tier = 'all',
  className = '',
  'data-qa': dataQa,
}: DesignTokensProps) => {
  const showColors = category === 'all' || category === 'colors';
  const showTypography = category === 'all' || category === 'typography';
  const showSpacing = category === 'all' || category === 'spacing';
  const showCornerRadius = category === 'all' || category === 'corner-radius';
  const showIconSizes = category === 'all' || category === 'icons';

  const showSemantic = tier === 'all' || tier === 'semantic';
  const showPrimitive = tier === 'all' || tier === 'primitive';

  return (
    <div className={`${styles.root} ${className}`} data-qa={dataQa}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {tier === 'semantic' ? 'Semantic Tokens' : 'Design Tokens'}
        </h1>
        <p className={styles.description}>
          {tier === 'semantic'
            ? 'Semantic tokens are purpose-based variables that reference primitives. Use these in your components and stylesheets.'
            : 'Design tokens are the visual design atoms of the design system. They are named entities that store visual design attributes.'}
        </p>
      </div>

      {showColors && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Colors</h2>

          {showSemantic && (
            <div className={`${styles.tierGroup} ${styles['tierGroup--semantic']}`}>
              <TierHeader tier="semantic" />
              {Object.entries(semanticColorGroups).map(([groupName, colors]) => (
                <div key={groupName} className={styles.subsection}>
                  <h3 className={styles.subsectionTitle}>{groupName}</h3>
                  <div className={styles.colorGrid}>
                    {colors.map((color) => (
                      <ColorSwatch key={color.token} {...color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showPrimitive && (
            <div className={`${styles.tierGroup} ${styles['tierGroup--primitive']}`}>
              <TierHeader tier="primitive" />
              {Object.entries(primitiveColorGroups).map(([groupName, colors]) => (
                <div key={groupName} className={styles.subsection}>
                  <h3 className={styles.subsectionTitle}>{groupName}</h3>
                  <div className={styles.colorGrid}>
                    {colors.map((color) => (
                      <ColorSwatch key={color.token} {...color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {showTypography && showSemantic && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Typography</h2>

          <div className={`${styles.tierGroup} ${styles['tierGroup--semantic']}`}>
            <TierHeader tier="semantic" />
            {Object.entries(semanticTypographyTokens).map(([groupName, tokens]) => (
              <div key={groupName} className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>{groupName}</h3>
                <div className={styles.typographyGrid}>
                  {tokens.map((token) => (
                    <TypographyExample key={token.token} {...token} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showSpacing && showSemantic && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Spacing</h2>
          <div className={`${styles.tierGroup} ${styles['tierGroup--semantic']}`}>
            <TierHeader tier="semantic" />
            <h3 className={styles.subsectionTitle}>Common</h3>
            <div className={styles.spacingGrid}>
              {spacingCommonTokens.map((token) => (
                <SpacingExample key={token.token} {...token} />
              ))}
            </div>
            <h3 className={styles.subsectionTitle}>Larger</h3>
            <div className={styles.spacingGrid}>
              {spacingLargerTokens.map((token) => (
                <SpacingExample key={token.token} {...token} />
              ))}
            </div>
          </div>
        </section>
      )}

      {showCornerRadius && showSemantic && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Corner Radius</h2>
          <div className={`${styles.tierGroup} ${styles['tierGroup--semantic']}`}>
            <TierHeader tier="semantic" />
            <div className={styles.cornerRadiusGrid}>
              {cornerRadiusTokens.map((token) => (
                <CornerRadiusExample key={token.token} {...token} />
              ))}
            </div>
          </div>
        </section>
      )}

      {showIconSizes && showSemantic && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Icon Sizes</h2>
          <div className={`${styles.tierGroup} ${styles['tierGroup--semantic']}`}>
            <TierHeader tier="semantic" />
            <div className={styles.iconSizeGrid}>
              {iconSizeTokens.map((token) => (
                <IconSizeExample key={token.token} {...token} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

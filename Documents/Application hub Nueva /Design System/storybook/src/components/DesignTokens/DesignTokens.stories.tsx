import type { Meta, StoryObj } from '@storybook/react';

import { PrimitiveTokens } from '../PrimitiveTokens/PrimitiveTokens';

import { DesignTokens } from './DesignTokens';
import README from './README.md?raw';

const meta: Meta<typeof DesignTokens> = {
  title: 'Design System/Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: README,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['all', 'colors', 'typography', 'spacing', 'corner-radius', 'icons'],
      description: 'Select which category of tokens to display',
      table: {
        defaultValue: { summary: 'all' },
      },
    },
    tier: {
      control: 'select',
      options: ['all', 'semantic', 'primitive'],
      description: 'Select which tier of tokens to display',
      table: {
        defaultValue: { summary: 'all' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    'data-qa': {
      control: 'text',
      description: 'Data attribute for QA testing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DesignTokens>;

/**
 * Displays every design token with a clear division:
 * 1. **Semantic tokens** — purpose-based variables for use in code (colors, typography, spacing, corner radius, icon sizes).
 * 2. **Primitive tokens** — raw foundation values (color palette + size scale). Not for direct use.
 */
export const AllTokens: Story = {
  args: {
    tier: 'all',
  },
  render: ({ tier = 'all' }) => {
    const showSemantic = tier === 'all' || tier === 'semantic';
    const showPrimitive = tier === 'all' || tier === 'primitive';

    return (
      <>
        {showSemantic && <DesignTokens category="all" tier="semantic" />}
        {showPrimitive && <PrimitiveTokens category="all" />}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive view of every design token, clearly divided into two sections. ' +
          '**Semantic tokens** (purpose-based, for use in code) are listed first, followed by ' +
          '**Primitive tokens** (raw foundation values, not for direct use in components). ' +
          'Use the **tier** control to filter by tier.',
      },
    },
  },
};

/**
 * Shows only color tokens including:
 * - Brand colors (light and dark)
 * - Neutral colors
 * - System colors (error, success, warning, info)
 * - Background colors
 * - Text colors
 * - Border colors
 * - Interactivity states
 */
export const ColorsOnly: Story = {
  args: {
    category: 'colors',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Color tokens are organized by purpose and include primitives (brand, neutrals, system) and semantic tokens (backgrounds, text, borders, icons). Each color includes its token name and visual representation.',
      },
    },
  },
};

/**
 * Shows only typography tokens including:
 * - Font families
 * - Font weights
 * - Font sizes for titles, body text, and small details
 * - Line heights
 */
export const TypographyOnly: Story = {
  args: {
    category: 'typography',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Typography tokens define the text styles used throughout the application. Each token is demonstrated with sample text to show its appearance.',
      },
    },
  },
};

/**
 * Shows only spacing tokens used for padding, margins, and gaps.
 */
export const SpacingOnly: Story = {
  args: {
    category: 'spacing',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Spacing tokens provide consistent spacing values throughout the application. Visual bars show the actual size of each spacing value.',
      },
    },
  },
};

/**
 * Shows only corner radius tokens used for border rounding.
 */
export const CornerRadiusOnly: Story = {
  args: {
    category: 'corner-radius',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Corner radius tokens define the rounding of corners for UI elements. Each box demonstrates the actual border radius.',
      },
    },
  },
};

/**
 * Shows only icon size tokens.
 */
export const IconSizesOnly: Story = {
  args: {
    category: 'icons',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icon size tokens define standard sizes for icons throughout the application. Each icon is rendered at its actual size.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Primitive Tokens — raw values NOT intended for direct use in code
// ---------------------------------------------------------------------------

/**
 * Displays **all** primitive tokens — both Color Primitives and the Size Scale.
 *
 * Primitive tokens are the raw, low-level values that underpin the entire design system.
 * **These tokens must NOT be used directly in application code.** Always use the
 * corresponding semantic tokens (e.g. `--color-background-brand`, `--spacing-m`).
 * Primitives exist solely as a reference layer so that semantic tokens can alias them.
 * This story is provided for documentation and design-review purposes only.
 */
export const AllPrimitives: Story = {
  render: () => <PrimitiveTokens category="all" />,
  parameters: {
    docs: {
      description: {
        story:
          'Primitive tokens are the **raw, low-level values** that underpin the entire design system. ' +
          'They include the base color palette and a numeric size scale.\n\n' +
          '> **These tokens must NOT be used directly in application code.**\n' +
          '> Always use the corresponding *semantic* tokens (e.g. `--color-background-brand`, `--spacing-m`).\n' +
          '> Primitives exist solely as a reference layer so that semantic tokens can alias them.\n\n' +
          'This story is provided for documentation and design-review purposes only.',
      },
    },
  },
};

/**
 * Shows only **Color Primitives**: brand, neutrals, gradients, system, and interactivity
 * state colors.
 *
 * These are the raw hex values that semantic color tokens (background, text, border, etc.)
 * alias under the hood. Do not use these directly — prefer tokens like
 * `--color-background-brand` or `--color-text-default`.
 */
export const ColorPrimitivesOnly: Story = {
  render: () => <PrimitiveTokens category="colors" />,
  parameters: {
    docs: {
      description: {
        story:
          'Raw color values organized by family (brand, neutrals, system, interactivity). ' +
          'Each swatch shows the CSS custom-property name and its resolved hex value. ' +
          '**Do not reference these tokens directly** — use the semantic color tokens instead.',
      },
    },
  },
};

/**
 * Shows only **Size Primitives**: the full numeric scale from 0 to 256 px.
 *
 * Spacing, typography, corner-radius, and icon-size tokens all reference these
 * values internally. Always reach for the semantic token (e.g. `--spacing-m`)
 * rather than the raw size (e.g. `--size-16`).
 */
export const SizePrimitivesOnly: Story = {
  render: () => <PrimitiveTokens category="sizes" />,
  parameters: {
    docs: {
      description: {
        story:
          'A fixed pixel scale that serves as the foundation for spacing, typography sizing, ' +
          'corner radii, and icon dimensions. Visual bars illustrate relative size. ' +
          '**Do not reference these tokens directly** — use semantic tokens like ' +
          '`--spacing-m` or `--font-size-body-m-default` instead.',
      },
    },
  },
};

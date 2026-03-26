# Design Tokens

This directory contains the design tokens for the CV UI Kit design system.

## What are Design Tokens?

Design tokens are named entities that store visual design attributes. They are the single source of truth for design decisions in the application, ensuring consistency across all components.

## Files

The design tokens are maintained in multiple formats:

- **`design-system-tokens.json`** - Source file exported from Figma (DTCG format with `$value` / `$type`)
- **`design-system-tokens.css`** - Generated CSS custom properties with two `:root` blocks: primitive tokens first, then semantic tokens (auto-generated — do not edit manually)
- **`tokens.css`** - Additional CSS custom properties (e.g., breakpoints) not managed by the conversion tool

## Using Tokens

### Importing Tokens

Import both token files to access all design tokens and additional styles:

```tsx
// Import design system tokens (generated from JSON)
import '@tokens/design-system-tokens.css';

// Import additional tokens (breakpoints, etc.)
import '@tokens/tokens.css';
```

You can also use relative paths:

```tsx
import '../../tokens/design-system-tokens.css';
import '../../tokens/tokens.css';
```

The `@tokens` alias is configured in `tsconfig.json` and automatically resolved by Vite.

> **Note**: The `design-system-tokens.css` file is automatically generated from `design-system-tokens.json`. Do not edit it manually.

### Using Tokens in CSS

After importing the tokens, use them in your CSS/CSS Modules with the `var()` function:

```css
.myComponent {
  color: var(--color-text-default);
  background: var(--color-background-default);
  padding: var(--spacing-m);
  border-radius: var(--corner-radius-s);
  font-family: var(--font-family-body);
  font-size: var(--font-size-body-m-default);
}
```

### Using Tokens in Inline Styles

You can also use tokens in inline styles:

```tsx
<div
  style={{
    padding: 'var(--spacing-l)',
    color: 'var(--color-text-brand)',
  }}
>
  Content
</div>
```

## Token Categories

### Colors

- **Primitives** (`--brand-*`, `--neutrals-*`, `--system-*`, `--gradients-*`, `--interactivity-states-*`): Brand, neutrals, system colors, gradients, interactivity states
- **Semantic** (`--color-*`): Background, text, border, icon, fill colors — reference primitives via `var()`

### Typography

- Font families (`--font-family-*`): heading, body, small-details
- Font weights (`--font-weight-*`): numeric values (400, 500)
- Font sizes (`--font-size-*`): titles, body, small details
- Line heights (`--line-height-*`)

### Spacing

- Common spacing (`--spacing-*`): XXS (4px) to XXXL (48px)
- Larger spacing (`--spacing-larger-*`): 56px to 256px

### Sizes

- Size primitives (`--size-*`): Base values from 0 to 256px

### Corner Radius

- Border radius (`--corner-radius-*`): XS (4px) to XXL (32px)

### Icons

- Icon sizes (`--icon-size-*`): XS (16px) to XL (48px)

## Automated Token Conversion

The design tokens are converted from JSON to CSS using [Style Dictionary v5](https://styledictionary.com/).

### Conversion Process

```bash
npm run convert-tokens
```

This script reads `design-system-tokens.json`, preprocesses the Figma export, and uses Style Dictionary to generate `design-system-tokens.css` with proper `var()` references between tokens.

### Token Structure

#### Primitive Tokens

Primitive tokens define the base values of the design system. They come from the "Color Primitives" and "Size Primitives" sets in the Figma export and are placed in the first `:root` block:

```css
/* Primitive design tokens */
:root {
  --brand-dark-50: #006dcc;
  --neutrals-white-00: #ffffff;
  --size-4: 4px;
  --size-16: 16px;
}
```

#### Semantic Tokens

Semantic tokens reference primitive tokens to provide contextual meaning. They come from the "COLORS", "TYPOGRAPHY", "SPACING", "CORNER RADIUS", and "ICONS" sets and are placed in the second `:root` block:

```css
/* Semantic design tokens */
:root {
  --color-background-brand: var(--brand-dark-50);
  --color-background-default: var(--neutrals-white-00);
  --spacing-xs: var(--size-8);
  --spacing-m: var(--size-16);
}
```

### Conversion Features

- **Style Dictionary v5** with DTCG format support (`$value`, `$type`)
- **Output references**: Semantic tokens use `var()` instead of resolved values
- **Custom transforms**: Numbers to px, font-weight names to numeric values, clean kebab-case naming
- **Key sanitization**: Handles Figma names with spaces and parentheses
- **Two `:root` blocks**: Primitive tokens first, then semantic tokens — classified by source set in the JSON ("Color Primitives", "Size Primitives" vs "COLORS", "TYPOGRAPHY", etc.)
- **Comprehensive tests**: All preprocessing functions covered by unit tests

### Statistics

The current design token set includes:

- **Total tokens**: 224
- **Primitive tokens**: 71 (31.7%)
- **Semantic tokens**: 153 (68.3%)
- **Generated CSS**: 230 lines

### Technology

- **[Style Dictionary v5](https://styledictionary.com/)** — Design token build system with DTCG format support
- **TypeScript** — Full type safety for the preprocessing script
- **Vitest** — Comprehensive unit tests for all preprocessing functions

For detailed documentation on the conversion tool, see [`/scripts/README.md`](../../../scripts/README.md).

## Viewing Tokens

To see all design tokens visually, check the **DesignTokens** component in Storybook:

```bash
npm run storybook
```

Navigate to **Design System > Design Tokens** to explore all available tokens with live examples.

## Modifying Tokens

### Updating from Figma

When tokens are updated in Figma:

1. Export the updated JSON from Figma
2. Replace `design-system-tokens.json` with the new export
3. Run `npm run convert-tokens` to regenerate the CSS
4. Test components that use the updated tokens
5. Commit both JSON and CSS files to version control

### Manual Updates

For manual token updates:

1. Update `design-system-tokens.json` with your changes
2. Run `npm run convert-tokens` to regenerate the CSS
3. Ensure token names follow the existing naming convention
4. Update the `DesignTokens` component if you add new token categories
5. Test components that use the modified tokens
6. Update documentation as needed

### Adding Breakpoints or Other Tokens

For tokens not managed by the conversion tool (like breakpoints):

1. Update `tokens.css` directly
2. Follow the existing naming convention
3. Test the new tokens in components
4. Update documentation

## Benefits of the Token System

1. **Single source of truth**: JSON file is the authoritative source exported from Figma
2. **Type safety**: Token types are preserved and validated during conversion
3. **Maintainability**: Semantic tokens automatically update when primitives change
4. **Developer experience**: CSS custom properties provide autocomplete and validation in IDEs
5. **Performance**: No runtime token resolution needed
6. **Flexibility**: Easy to add new token types or categories
7. **Consistency**: Ensures uniform design language across the application

## Best Practices

1. **Always use tokens instead of hardcoded values** — This ensures consistency and makes theme changes easier
2. **Use semantic tokens over primitives** — Prefer `--color-text-default` over `--neutrals-black-80`
3. **Don't create custom CSS variables** — Use the tokens provided by the design system
4. **Fallback values are optional** — The tokens are always available when properly imported
5. **Document new tokens** — If adding new tokens, update the DesignTokens component and this README
6. **Run conversion after updates** — Always run `npm run convert-tokens` after updating the JSON file

## File Locations

- **JSON source**: `/src/styles/design-system-tokens/design-system-tokens.json`
- **CSS output**: `/src/styles/design-system-tokens/design-system-tokens.css`
- **Additional tokens**: `/src/styles/tokens.css`
- **Conversion script**: `/scripts/convert-tokens.ts`
- **Script tests**: `/scripts/convert-tokens.test.ts`
- **Script documentation**: `/scripts/README.md`

## Path Alias Configuration

The `@tokens` alias is configured in:

- **tsconfig.json**: TypeScript path mapping
- **vite.config.ts**: Uses `vite-tsconfig-paths` plugin to resolve the alias

This configuration allows clean imports throughout the project without worrying about relative path depth.

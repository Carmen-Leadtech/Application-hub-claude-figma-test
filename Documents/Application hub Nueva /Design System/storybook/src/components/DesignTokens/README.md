# DesignTokens Component

## Overview

The `DesignTokens` component is a visual showcase of all design tokens used in the CV UI Kit design system. It's specifically designed for use in Storybook to document and demonstrate the design system's foundation.

## Purpose

This component serves as a living documentation of the design system by:

- Displaying all color tokens with visual swatches
- Showcasing typography tokens with live text examples
- Demonstrating spacing values with visual representations
- Showing corner radius options with rounded boxes
- Presenting icon sizes with actual icon renderings

## Usage

### Basic Usage

```tsx
import { DesignTokens } from '@cv-ui-kit/components';

// Display all tokens
<DesignTokens />;
```

### Category-Specific Display

```tsx
// Display only colors
<DesignTokens category="colors" />

// Display only typography
<DesignTokens category="typography" />

// Display only spacing
<DesignTokens category="spacing" />

// Display only corner radius
<DesignTokens category="corner-radius" />

// Display only icon sizes
<DesignTokens category="icons" />
```

### With Custom Styling

```tsx
<DesignTokens category="colors" className="custom-design-tokens" data-qa="design-tokens-showcase" />
```

## Props

| Prop        | Type                                                                           | Default | Description                   |
| ----------- | ------------------------------------------------------------------------------ | ------- | ----------------------------- |
| `category`  | `'all' \| 'colors' \| 'typography' \| 'spacing' \| 'corner-radius' \| 'icons'` | `'all'` | Category of tokens to display |
| `className` | `string`                                                                       | `''`    | Additional CSS class names    |
| `data-qa`   | `string`                                                                       | -       | Data attribute for QA testing |

## Design Token Categories

### Colors

The component displays the following color categories:

- **Brand Colors**: Light and dark variations of the primary brand color
- **Neutrals**: Grayscale colors from white to black
- **System Colors**: Error, success, warning, and info colors
- **Background Colors**: Semantic background colors
- **Text Colors**: Colors for text in various contexts
- **Border Colors**: Colors for borders and dividers
- **Interactivity States**: Colors for default, hover, pressed, and disabled states

### Typography

Typography tokens include:

- **Font Families**: Heading, body, and small details
- **Font Weights**: Strong and default weights
- **Font Sizes**: Various sizes for titles, body text, and small details
- **Line Heights**: Corresponding line heights for each font size

### Spacing

Common spacing values used throughout the application for:

- Padding
- Margins
- Gaps between elements

### Corner Radius

Border radius values for:

- Small UI elements (buttons, inputs)
- Medium elements (cards, modals)
- Large elements (panels, containers)

### Icon Sizes

Standard icon sizes from XS to XL.

## Implementation Details

### Token Source

Tokens are generated from the Figma design system export using Style Dictionary v5. The generated file `design-system-tokens.css` contains two `:root` blocks — primitive tokens first, then semantic tokens — classified by their source set in the JSON. The component imports two CSS files:

- `@tokens/design-system-tokens/design-system-tokens.css` — auto-generated CSS variables from the Figma export via `npm run convert-tokens`
- `@tokens/tokens.css` — legacy/manual CSS tokens

### CSS Variable Naming Convention

All generated CSS variables follow a namespaced kebab-case convention based on their collection:

| Collection       | Prefix                                                                   | Example                    |
| ---------------- | ------------------------------------------------------------------------ | -------------------------- |
| Color Primitives | `--brand-*`, `--neutrals-*`, `--system-*`                                | `--brand-dark-50`          |
| Size Primitives  | `--size-*`                                                               | `--size-16`                |
| Semantic Colors  | `--color-*`                                                              | `--color-background-brand` |
| Typography       | `--font-family-*`, `--font-size-*`, `--font-weight-*`, `--line-height-*` | `--font-size-titles-xl`    |
| Spacing          | `--spacing-*`                                                            | `--spacing-m`              |
| Corner Radius    | `--corner-radius-*`                                                      | `--corner-radius-s`        |
| Icons            | `--icon-size-*`                                                          | `--icon-size-m`            |

### Using Tokens in Your Components

You can import the tokens in any component using the path alias:

```tsx
import '@tokens/design-system-tokens/design-system-tokens.css';
import '@tokens/tokens.css';
```

The project is configured with a `@tokens` alias in `tsconfig.json` that maps to `src/styles`, making imports cleaner and easier to maintain.

### Visual Representation

Each token category has a custom visual representation:

- **Colors**: Color swatches with token names
- **Typography**: Live text examples showing the actual font appearance
- **Spacing**: Two boxes with the gap between them showing the actual spacing value (as used in margins, gaps, or padding)
- **Corner Radius**: Boxes with rounded corners
- **Icon Sizes**: Icons rendered at actual size

### Responsive Design

The component uses CSS Grid with `auto-fill` to ensure proper display across different screen sizes.

## Storybook Integration

The component includes comprehensive Storybook stories:

- `AllTokens`: Shows all token categories
- `ColorsOnly`: Shows only color tokens
- `TypographyOnly`: Shows only typography tokens
- `SpacingOnly`: Shows only spacing tokens
- `CornerRadiusOnly`: Shows only corner radius tokens
- `IconSizesOnly`: Shows only icon size tokens
- `WithCustomClass`: Example with custom className
- `WithDataQA`: Example with data-qa attribute

## Maintenance

When updating the design tokens:

1. Update the Figma export at `/src/styles/design-system-tokens/design-system-tokens.json`
2. Run `npm run convert-tokens` to regenerate the CSS variables
3. If new token categories are added, update the component to include them
4. Ensure all token names in the component match those in the generated `design-system-tokens.css`
5. Update the corresponding type definitions if needed

## Best Practices

1. Use this component in Storybook documentation pages
2. Reference token names from this component in design reviews
3. Use the category prop to focus on specific token types during design discussions
4. Keep the Figma export and `npm run convert-tokens` as the single source of truth for design tokens
5. Update this component whenever new tokens are added to the system

## Testing

The component includes comprehensive tests covering:

- Rendering of all categories
- Category filtering
- Custom props (className, data-qa)
- Presence of expected token groups

Run tests with:

```bash
npm test DesignTokens.test.tsx
```

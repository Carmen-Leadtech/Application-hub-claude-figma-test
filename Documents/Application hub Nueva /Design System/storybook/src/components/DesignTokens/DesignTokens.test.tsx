import { render, screen } from '@testing-library/react';

import { DesignTokens } from './DesignTokens';

describe('DesignTokens Component', () => {
  test('renders the design tokens title', () => {
    render(<DesignTokens />);

    expect(screen.getByText('Design Tokens')).toBeInTheDocument();
  });

  test('renders all categories by default', () => {
    render(<DesignTokens />);

    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Typography')).toBeInTheDocument();
    expect(screen.getByText('Spacing')).toBeInTheDocument();
    expect(screen.getByText('Corner Radius')).toBeInTheDocument();
    expect(screen.getByText('Icon Sizes')).toBeInTheDocument();
  });

  test('renders only colors when category is colors', () => {
    render(<DesignTokens category="colors" />);

    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.queryByText('Typography')).not.toBeInTheDocument();
    expect(screen.queryByText('Spacing')).not.toBeInTheDocument();
  });

  test('renders only typography when category is typography', () => {
    render(<DesignTokens category="typography" />);

    expect(screen.getByText('Typography')).toBeInTheDocument();
    expect(screen.queryByText('Colors')).not.toBeInTheDocument();
    expect(screen.queryByText('Spacing')).not.toBeInTheDocument();
  });

  test('renders only spacing when category is spacing', () => {
    render(<DesignTokens category="spacing" />);

    expect(screen.getByText('Spacing')).toBeInTheDocument();
    expect(screen.queryByText('Colors')).not.toBeInTheDocument();
    expect(screen.queryByText('Typography')).not.toBeInTheDocument();
  });

  test('renders only corner radius when category is corner-radius', () => {
    render(<DesignTokens category="corner-radius" />);

    expect(screen.getByText('Corner Radius')).toBeInTheDocument();
    expect(screen.queryByText('Colors')).not.toBeInTheDocument();
    expect(screen.queryByText('Typography')).not.toBeInTheDocument();
  });

  test('renders only icon sizes when category is icons', () => {
    render(<DesignTokens category="icons" />);

    expect(screen.getByText('Icon Sizes')).toBeInTheDocument();
    expect(screen.queryByText('Colors')).not.toBeInTheDocument();
    expect(screen.queryByText('Typography')).not.toBeInTheDocument();
  });

  test('applies custom className prop', () => {
    const { container } = render(<DesignTokens className="custom-class" />);

    const root = container.querySelector('[class*="root"]');
    expect(root).toHaveClass('custom-class');
  });

  test('applies data-qa attribute', () => {
    const { container } = render(<DesignTokens data-qa="design-tokens-test" />);

    const element = container.querySelector('[data-qa="design-tokens-test"]');
    expect(element).toBeInTheDocument();
  });

  test('renders color swatches in the colors section', () => {
    render(<DesignTokens category="colors" />);

    expect(screen.getByText('Brand - Light')).toBeInTheDocument();
    expect(screen.getByText('Brand Light 10')).toBeInTheDocument();
    expect(screen.getByText('Neutrals')).toBeInTheDocument();
  });

  test('renders typography examples in the typography section', () => {
    render(<DesignTokens category="typography" />);

    expect(screen.getByText('Font Families')).toBeInTheDocument();
    expect(screen.getByText('Font Weights')).toBeInTheDocument();
    expect(screen.getByText('Title Sizes')).toBeInTheDocument();
  });

  test('renders primitive and semantic tier labels for colors', () => {
    render(<DesignTokens category="colors" />);

    const badges = screen.getAllByText(/^(Primitive|Semantic)$/);
    expect(badges).toHaveLength(2);
    expect(screen.getByText('Primitive')).toBeInTheDocument();
    expect(screen.getByText('Semantic')).toBeInTheDocument();
  });

  test('renders semantic tier label for typography', () => {
    render(<DesignTokens category="typography" />);

    expect(screen.getByText('Semantic')).toBeInTheDocument();
  });

  test('renders semantic tier label for spacing', () => {
    render(<DesignTokens category="spacing" />);

    expect(screen.getByText('Semantic')).toBeInTheDocument();
    expect(screen.queryByText('Primitive')).not.toBeInTheDocument();
  });

  test('places semantic color groups before primitive color groups', () => {
    const { container } = render(<DesignTokens category="colors" />);

    const tierGroups = container.querySelectorAll('[class*="tierGroup"]');
    expect(tierGroups).toHaveLength(2);

    // First tier group should contain semantic colors (e.g. "Background Colors")
    expect(tierGroups[0].textContent).toContain('Background Colors');
    // Second tier group should contain primitive colors (e.g. "Brand - Light")
    expect(tierGroups[1].textContent).toContain('Brand - Light');
  });
});

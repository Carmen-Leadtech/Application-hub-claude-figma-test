import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

const DEFAULT_CHILDREN = 'Badge Label';

describe('Badge Component', () => {
  test('renders the badge with the correct text', () => {
    render(<Badge>{DEFAULT_CHILDREN}</Badge>);
    const badge = screen.getByText(DEFAULT_CHILDREN);
    expect(badge).toBeInTheDocument();
  });

  test('applies default classes', () => {
    render(<Badge>{DEFAULT_CHILDREN}</Badge>);
    const badge = screen.getByText(DEFAULT_CHILDREN);
    expect(badge.className).toMatch(/info/);
    expect(badge.className).toMatch(/default/);
    expect(badge.className).toMatch(/S/);
  });

  test('applies custom props', () => {
    render(
      <Badge variant="warning" shape="rounded" size="M">
        {DEFAULT_CHILDREN}
      </Badge>
    );
    const badge = screen.getByText(DEFAULT_CHILDREN);
    expect(badge.className).toMatch(/warning/);
    expect(badge.className).toMatch(/rounded/);
    expect(badge.className).toMatch(/M/);
  });

  test('renders without children', () => {
    const result = render(<Badge />);
    const badge = result.container.querySelector('[class*="root"]');
    expect(badge).toBeInTheDocument();
  });

  test('applies custom className prop', () => {
    render(<Badge className="custom-class">{DEFAULT_CHILDREN}</Badge>);
    const badge = screen.getByText(DEFAULT_CHILDREN);
    expect(badge).toHaveClass('custom-class');
  });
});

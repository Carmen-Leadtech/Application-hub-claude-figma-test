import { render, screen } from '@testing-library/react';

import { AISpinner } from './AISpinner';

describe('AISpinner Component', () => {
  it('renders without crashing', () => {
    render(<AISpinner />);

    const element = screen.getByRole('status');

    expect(element).toBeInTheDocument();
  });

  it('has aria-busy set to true', () => {
    render(<AISpinner />);

    const element = screen.getByRole('status');

    expect(element).toHaveAttribute('aria-busy', 'true');
  });

  it('applies default aria-label', () => {
    render(<AISpinner />);

    const element = screen.getByRole('status');

    expect(element).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies custom aria-label', () => {
    render(<AISpinner aria-label="AI is thinking" />);

    const element = screen.getByRole('status');

    expect(element).toHaveAttribute('aria-label', 'AI is thinking');
  });

  it('renders center and two rings with dots', () => {
    const { container } = render(<AISpinner />);

    expect(container.querySelector('[class*="loaderCenter"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[class*="loaderRing"]').length).toBe(2);
    expect(container.querySelectorAll('[class*="loaderDot"]').length).toBe(12);
  });

  it('applies data-qa when provided', () => {
    render(<AISpinner data-qa="ai-spinner" />);

    const element = screen.getByRole('status');

    expect(element).toHaveAttribute('data-qa', 'ai-spinner');
  });

  it('applies id when provided', () => {
    render(<AISpinner id="my-spinner" />);

    const element = screen.getByRole('status');

    expect(element).toHaveAttribute('id', 'my-spinner');
  });

  it('applies custom className', () => {
    render(<AISpinner className="custom-class" />);

    const element = screen.getByRole('status');

    expect(element).toHaveClass('custom-class');
  });

  it('applies default size of 180px', () => {
    render(<AISpinner />);

    const element = screen.getByRole('status');

    expect(element).toHaveStyle({ width: '180px', height: '180px' });
  });

  it('applies custom size when size prop is provided', () => {
    render(<AISpinner size={108} />);

    const element = screen.getByRole('status');

    expect(element).toHaveStyle({ width: '108px', height: '108px' });
  });

  it('applies 72px size when size={72}', () => {
    render(<AISpinner size={72} />);

    const element = screen.getByRole('status');

    expect(element).toHaveStyle({ width: '72px', height: '72px' });
  });
});

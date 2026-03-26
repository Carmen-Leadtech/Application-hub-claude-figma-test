import { render, screen } from '@testing-library/react';

import { CircularProgress } from './CircularProgress';

describe('CircularProgress Component', () => {
  it('renders without crashing', () => {
    render(<CircularProgress />);

    const element = screen.getByRole('progressbar');

    expect(element).toBeInTheDocument();
  });

  it('renders as an SVG element', () => {
    render(<CircularProgress />);

    const element = screen.getByRole('progressbar');

    expect(element.tagName.toLowerCase()).toBe('svg');
  });

  it('applies the default size correctly', () => {
    render(<CircularProgress />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('width', '40');
    expect(element).toHaveAttribute('height', '40');
  });

  it('applies a custom size correctly', () => {
    render(<CircularProgress size={60} />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('width', '60');
    expect(element).toHaveAttribute('height', '60');
  });

  it('applies data-qa and id correctly', () => {
    render(<CircularProgress data-qa="progress" id="my-progress" />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('data-qa', 'progress');
    expect(element).toHaveAttribute('id', 'my-progress');
  });

  it('has aria-busy set to true for indeterminate state', () => {
    render(<CircularProgress />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('aria-busy', 'true');
  });

  it('applies default aria-label', () => {
    render(<CircularProgress />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies custom aria-label', () => {
    render(<CircularProgress aria-label="Cargando datos" />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('aria-label', 'Cargando datos');
  });

  it('applies custom color to the circle', () => {
    render(<CircularProgress color="#ff0000" />);

    const element = screen.getByRole('progressbar');
    const circle = element.querySelector('circle');

    expect(circle).toHaveAttribute('stroke', '#ff0000');
  });

  it('applies default color when not specified', () => {
    render(<CircularProgress />);

    const element = screen.getByRole('progressbar');
    const circle = element.querySelector('circle');

    expect(circle).toHaveAttribute('stroke', 'var(--brand-500, #006dcc)');
  });

  it('applies custom strokeWidth', () => {
    render(<CircularProgress strokeWidth={8} />);

    const element = screen.getByRole('progressbar');
    const circle = element.querySelector('circle');

    expect(circle).toHaveAttribute('stroke-width', '8');
  });

  it('applies default strokeWidth when not specified', () => {
    render(<CircularProgress />);

    const element = screen.getByRole('progressbar');
    const circle = element.querySelector('circle');

    expect(circle).toHaveAttribute('stroke-width', '4');
  });

  it('has fixed radius of 20.2 for consistent animation', () => {
    render(<CircularProgress size={40} strokeWidth={4} />);

    const element = screen.getByRole('progressbar');
    const circle = element.querySelector('circle');

    expect(circle).toHaveAttribute('r', '20.2');
  });

  it('has fixed viewBox with enough space for stroke', () => {
    render(<CircularProgress size={60} />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('viewBox', '18 18 52 52');
  });

  it('applies custom className prop', () => {
    render(<CircularProgress className="custom-class" />);

    const element = screen.getByRole('progressbar');
    expect(element).toHaveClass('custom-class');
  });
});

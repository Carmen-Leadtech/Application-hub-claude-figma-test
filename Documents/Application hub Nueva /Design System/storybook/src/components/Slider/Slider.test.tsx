import { render, screen, fireEvent } from '@testing-library/react';

import { Slider } from './Slider';

describe('Slider Component', () => {
  const defaultProps = {
    value: 50,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders slider input correctly', () => {
    render(<Slider {...defaultProps} />);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('type', 'range');
  });

  it('applies default min, max, and step values', () => {
    render(<Slider {...defaultProps} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('step', '1');
  });

  it('applies custom min and max values', () => {
    render(<Slider {...defaultProps} min={10} max={90} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '90');
  });

  it('sets current value correctly', () => {
    render(<Slider {...defaultProps} value={75} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('75');
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Slider value={50} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '60' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('sets data-qa attribute if provided', () => {
    render(<Slider {...defaultProps} data-qa="test-slider" />);

    const slider = screen.getByRole('slider');
    const container = slider.parentElement;
    expect(container).toBeInTheDocument();
    expect(container!).toHaveAttribute('data-qa', 'test-slider');
  });

  it('applies aria-label when provided', () => {
    render(<Slider {...defaultProps} aria-label="Volume control" />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-label', 'Volume control');
  });

  it('applies aria-labelledby when provided', () => {
    render(<Slider {...defaultProps} aria-labelledby="volume-label" />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-labelledby', 'volume-label');
  });

  it('sets proper ARIA attributes', () => {
    render(<Slider value={60} min={20} max={80} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '20');
    expect(slider).toHaveAttribute('aria-valuemax', '80');
    expect(slider).toHaveAttribute('aria-valuenow', '60');
  });

  it('defaults to primary variant', () => {
    render(<Slider {...defaultProps} />);

    const slider = screen.getByRole('slider');
    const container = slider.parentElement;
    expect(container!.className).toContain('sliderPrimary');
  });

  it('applies primary variant class when specified', () => {
    render(<Slider {...defaultProps} variant="primary" />);

    const slider = screen.getByRole('slider');
    const container = slider.parentElement;

    expect(container!.className).toContain('sliderPrimary');
    expect(slider.className).toContain('sliderPrimary');
  });

  it('applies neutral variant class when specified', () => {
    render(<Slider {...defaultProps} variant="neutral" />);

    const slider = screen.getByRole('slider');
    const container = slider.parentElement;

    expect(container!.className).toContain('sliderNeutral');
    expect(slider.className).toContain('sliderNeutral');
  });

  it('updates track gradient when value changes', () => {
    const { rerender } = render(<Slider value={25} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider.style.background).toContain('linear-gradient');

    // Rerender with new value
    rerender(<Slider value={75} onChange={vi.fn()} />);

    expect(slider.style.background).toContain('linear-gradient');
  });

  it('uses correct colors for primary variant', () => {
    render(<Slider value={50} variant="primary" onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    // Should contain brand-500 color for primary variant
    expect(slider.style.background).toContain('006dcc'); // brand-500 color
  });

  it('uses correct colors for neutral variant', () => {
    render(<Slider value={50} variant="neutral" onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    // Should contain neutral colors
    expect(slider.style.background).toContain('hsl(208, 4%, 48%)'); // neutral filled color
  });

  it('calculates percentage correctly for different ranges', () => {
    render(<Slider value={150} min={100} max={200} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    // Value 150 in range 100-200 should be 50%
    expect(slider.style.background).toContain('50%');
  });

  it('handles edge case values correctly', () => {
    render(<Slider value={0} min={0} max={100} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('0');
    expect(slider.style.background).toContain('0%');
  });

  it('handles maximum value correctly', () => {
    render(<Slider value={100} min={0} max={100} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('100');
    expect(slider.style.background).toContain('100%');
  });

  it('passes through additional props', () => {
    render(
      <Slider {...defaultProps} id="custom-slider" className="custom-class" title="Custom title" />
    );

    const slider = screen.getByRole('slider');
    const container = slider.parentElement;
    expect(container!).toHaveAttribute('id', 'custom-slider');
    expect(container!).toHaveClass('custom-class');
    expect(container!).toHaveAttribute('title', 'Custom title');
  });

  it('applies slider container and variant-specific CSS classes', () => {
    render(<Slider {...defaultProps} variant="neutral" />);

    const slider = screen.getByRole('slider');
    const container = slider.parentElement;

    expect(container!.className).toContain('sliderContainer');
    expect(container!.className).toContain('sliderNeutral');
    expect(slider.className).toContain('slider');
    expect(slider.className).toContain('sliderNeutral');
  });
});

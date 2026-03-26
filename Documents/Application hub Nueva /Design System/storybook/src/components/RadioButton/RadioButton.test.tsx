import { render, screen, fireEvent } from '@testing-library/react';

import { RadioButton } from './RadioButton';

describe('RadioButton component', () => {
  const defaultProps = {
    id: 'radio-1',
    name: 'test-radio',
    value: 'option1',
    label: 'Option 1',
    handleRadioChange: vi.fn(),
    size: 'M' as const,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label', () => {
    render(<RadioButton {...defaultProps} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders as unchecked by default in uncontrolled mode', () => {
    render(<RadioButton {...defaultProps} />);

    const radio = screen.getByRole('radio');

    expect(radio).toHaveAttribute('aria-checked', 'false');
  });

  it('renders as checked when isChecked is true', () => {
    render(<RadioButton {...defaultProps} isChecked={true} />);

    const radio = screen.getByRole('radio');

    expect(radio).toHaveAttribute('aria-checked', 'true');
  });

  it('calls handleRadioChange when clicked', () => {
    const handleChange = vi.fn();

    render(<RadioButton {...defaultProps} handleRadioChange={handleChange} />);

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);

    expect(handleChange).toHaveBeenCalledWith('option1');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call handleRadioChange when already checked', () => {
    const handleChange = vi.fn();

    render(<RadioButton {...defaultProps} isChecked={true} handleRadioChange={handleChange} />);

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call handleRadioChange when disabled', () => {
    const handleChange = vi.fn();

    render(<RadioButton {...defaultProps} disabled handleRadioChange={handleChange} />);

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies correct size class for size S', () => {
    render(<RadioButton {...defaultProps} size="S" />);

    const label = screen.getByText('Option 1');

    expect(label.className).toMatch(/labelS/);
  });

  it('applies correct size class for size M', () => {
    render(<RadioButton {...defaultProps} size="M" />);

    const label = screen.getByText('Option 1');

    expect(label.className).toMatch(/labelM/);
  });

  it('applies disabled class when disabled', () => {
    render(<RadioButton {...defaultProps} disabled />);

    const radio = screen.getByRole('radio');

    expect(radio.className).toMatch(/disabled/);
  });

  it('sets data-qa attribute if provided', () => {
    render(<RadioButton {...defaultProps} data-qa="custom-qa" />);

    expect(screen.getByRole('radio')).toHaveAttribute('data-qa', 'custom-qa');
  });

  it('handles keyboard interaction with Enter key', () => {
    const handleChange = vi.fn();

    render(<RadioButton {...defaultProps} handleRadioChange={handleChange} />);

    const radio = screen.getByRole('radio');
    fireEvent.keyDown(radio, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith('option1');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard interaction with Space key', () => {
    const handleChange = vi.fn();

    render(<RadioButton {...defaultProps} handleRadioChange={handleChange} />);

    const radio = screen.getByRole('radio');
    fireEvent.keyDown(radio, { key: ' ' });

    expect(handleChange).toHaveBeenCalledWith('option1');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not handle keyboard interaction when disabled', () => {
    const handleChange = vi.fn();

    render(<RadioButton {...defaultProps} disabled handleRadioChange={handleChange} />);

    const radio = screen.getByRole('radio');
    fireEvent.keyDown(radio, { key: 'Enter' });
    fireEvent.keyDown(radio, { key: ' ' });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('respects controlled isChecked prop', () => {
    const handleChange = vi.fn();

    const { rerender } = render(
      <RadioButton {...defaultProps} isChecked={false} handleRadioChange={handleChange} />
    );

    let radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'false');

    rerender(<RadioButton {...defaultProps} isChecked={true} handleRadioChange={handleChange} />);

    radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'true');
  });

  it('has proper accessibility attributes', () => {
    render(<RadioButton {...defaultProps} />);

    const radio = screen.getByRole('radio');

    expect(radio).toHaveAttribute('aria-labelledby', 'radio-1-label');
    expect(radio).toHaveAttribute('tabIndex', '0');
  });

  it('renders the radio input with correct attributes', () => {
    render(<RadioButton {...defaultProps} />);

    const input = document.querySelector('input[type="radio"]') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'radio-1');
    expect(input).toHaveAttribute('name', 'test-radio');
    expect(input).toHaveAttribute('value', 'option1');
    expect(input).toHaveAttribute('aria-hidden', 'true');
    expect(input).toHaveAttribute('tabIndex', '-1');
  });

  it('applies custom className prop', () => {
    render(<RadioButton {...defaultProps} className="custom-class" />);

    const label = screen.getByRole('radio');
    expect(label).toHaveClass('custom-class');
  });
});

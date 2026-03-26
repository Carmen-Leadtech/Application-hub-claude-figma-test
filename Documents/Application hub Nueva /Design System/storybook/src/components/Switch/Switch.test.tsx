import { render, screen, fireEvent } from '@testing-library/react';

import { Switch } from './Switch';

describe('Switch component', () => {
  it('renders with label', () => {
    render(<Switch label="Enable feature" />);

    expect(screen.getByText('Enable feature')).toBeInTheDocument();
  });

  it('renders as unchecked by default', () => {
    render(<Switch label="Default switch" />);

    const switchInput = screen.getByRole('checkbox') as HTMLInputElement;

    expect(switchInput.checked).toBe(false);
  });

  it('renders as checked when defaultChecked is true', () => {
    render(<Switch label="Checked by default" defaultChecked />);

    const switchInput = screen.getByRole('checkbox') as HTMLInputElement;

    expect(switchInput.checked).toBe(true);
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();

    render(<Switch label="Toggle me" onChange={handleChange} />);

    const switchInput = screen.getByRole('checkbox');
    fireEvent.click(switchInput);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();

    render(<Switch label="Disabled" disabled onChange={handleChange} />);

    const switchInput = screen.getByRole('checkbox');
    fireEvent.click(switchInput);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('respects controlled checked prop', () => {
    const handleChange = vi.fn();

    const { rerender } = render(
      <Switch label="Controlled" checked={false} onChange={handleChange} />
    );
    const switchInput = screen.getByRole('checkbox') as HTMLInputElement;
    expect(switchInput.checked).toBe(false);

    rerender(<Switch label="Controlled" checked={true} onChange={handleChange} />);
    expect(switchInput.checked).toBe(true);
  });

  it('toggles with keyboard (Enter or Space)', () => {
    const handleChange = vi.fn();

    render(<Switch label="Keyboard toggle" onChange={handleChange} />);

    const switchInput = screen.getByRole('checkbox');
    fireEvent.keyDown(switchInput, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className prop', () => {
    render(<Switch label="Test switch" className="custom-class" />);

    const label = screen.getByText('Test switch').closest('label');
    expect(label).toHaveClass('custom-class');
  });

  it('applies color class for known colors', () => {
    render(<Switch label="Secondary switch" color="secondary" />);

    const label = screen.getByText('Secondary switch').closest('label');
    expect(label?.className).toMatch(/secondary/);
  });

  it('supports custom color values', () => {
    render(<Switch label="Custom switch" color="#123456" />);

    const label = screen.getByText('Custom switch').closest('label');
    expect(label).toHaveStyle({ '--cv-switch-track-bg-checked': '#123456' });
  });
});

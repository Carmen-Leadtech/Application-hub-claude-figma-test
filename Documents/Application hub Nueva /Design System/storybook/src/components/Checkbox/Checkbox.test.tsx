import { render, screen, fireEvent } from '@testing-library/react';

import { Checkbox } from './Checkbox';

describe('Checkbox component', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);

    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders as unchecked by default', () => {
    render(<Checkbox label="Test checkbox" />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
  });

  it('renders as checked when defaultChecked is true', () => {
    render(<Checkbox label="Checked by default" defaultChecked />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();

    render(<Checkbox label="Toggle me" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();

    render(<Checkbox label="Disabled" disabled onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('respects controlled checked prop', () => {
    const handleChange = vi.fn();

    const { rerender } = render(
      <Checkbox label="Controlled" checked={false} onChange={handleChange} />
    );
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    rerender(<Checkbox label="Controlled" checked={true} onChange={handleChange} />);
    expect(checkbox.checked).toBe(true);
  });

  it('toggles with keyboard (Enter or Space)', () => {
    const handleChange = vi.fn();

    render(<Checkbox label="Keyboard toggle" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className prop', () => {
    render(<Checkbox label="Test checkbox" className="custom-class" />);

    const label = screen.getByText('Test checkbox').closest('label');
    expect(label).toHaveClass('custom-class');
  });
});

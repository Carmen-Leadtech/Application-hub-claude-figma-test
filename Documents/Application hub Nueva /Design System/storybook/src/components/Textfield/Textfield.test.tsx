import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import { Textfield } from './Textfield';

describe('Textfield', () => {
  it('renders with label and placeholder', () => {
    render(
      <Textfield
        label="Username"
        placeholder="Enter your username"
        data-qa="username"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter your username');
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Textfield label="Email" data-qa="email" value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays assistive text if provided', () => {
    render(
      <Textfield
        label="Password"
        data-qa="password"
        assistiveText="Must be at least 8 characters"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('applies error class when isError is true', () => {
    const { container } = render(
      <Textfield label="Phone" data-qa="phone" isError value="" onChange={() => {}} />
    );

    expect((container.firstChild as HTMLElement).className).toMatch(/error/);
  });

  it('renders suffix and decorator when provided', () => {
    render(
      <Textfield
        label="Amount"
        data-qa="amount"
        value=""
        onChange={() => {}}
        suffix={<span>$</span>}
        decorator={<span>💰</span>}
      />
    );

    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('💰')).toBeInTheDocument();
  });

  it('disables the input if disabled is true', () => {
    render(
      <Textfield label="Disabled Input" data-qa="disabled" disabled value="" onChange={() => {}} />
    );

    const input = screen.getByLabelText('Disabled Input');
    expect(input).toBeDisabled();
  });

  it('applies custom className prop', () => {
    const { container } = render(
      <Textfield
        label="Test"
        data-qa="test"
        value=""
        onChange={() => {}}
        className="custom-class"
      />
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });
});

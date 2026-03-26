import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import { Select } from './Select';

const mockOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

describe('Select component', () => {
  it('renders placeholder when no value is selected', () => {
    render(
      <Select
        placeholder="Choose an option"
        options={mockOptions}
        onChange={vi.fn()}
        name="test-select"
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('opens menu on click and shows options', () => {
    render(
      <Select placeholder="Select" options={mockOptions} onChange={vi.fn()} name="test-select" />
    );

    const input = screen.getByRole('combobox');
    fireEvent.click(input);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('calls onChange with correct value on item click', () => {
    const handleChange = vi.fn();

    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={handleChange}
        name="test-select"
      />
    );

    const input = screen.getByRole('combobox');
    fireEvent.click(input);

    const option = screen.getByText('Option 2');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith({
      target: { value: '2', label: 'Option 2' },
    });
  });

  it('shows assistive text if provided', () => {
    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={vi.fn()}
        name="test-select"
        assistiveText="This is a required field"
      />
    );

    expect(screen.getByText('This is a required field')).toBeInTheDocument();
  });

  it('applies error and disabled classes when props are set', () => {
    const { container } = render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={vi.fn()}
        name="test-select"
        isError="true"
        disabled
      />
    );

    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.className).toMatch(/error/);
    expect(rootDiv.className).toMatch(/disabled/);
  });

  it('supports keyboard navigation: ArrowDown and Enter', () => {
    const handleChange = vi.fn();
    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={handleChange}
        name="test-select"
      />
    );

    const combobox = screen.getByRole('combobox');
    fireEvent.keyDown(combobox, { key: 'Enter' }); // open
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalled();
  });

  it('closes dropdown on Escape key', () => {
    render(
      <Select placeholder="Select" options={mockOptions} onChange={vi.fn()} name="test-select" />
    );

    const combobox = screen.getByRole('combobox');
    fireEvent.click(combobox);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.keyDown(combobox, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('applies custom className prop', () => {
    const { container } = render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={vi.fn()}
        name="test-select"
        className="custom-class"
      />
    );

    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv).toHaveClass('custom-class');
  });
});

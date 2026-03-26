import React, { createRef } from 'react';

import { describe, it, expect, vi } from 'vitest';

import { render, fireEvent } from '@testing-library/react';

import { SelectMenu } from './SelectMenu';

const options = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

describe('SelectMenu', () => {
  it('renders options correctly', () => {
    const optionRef = { current: [] } as React.MutableRefObject<(HTMLLIElement | null)[]>;
    const parentRef = createRef<HTMLDivElement>();
    const { getByText } = render(
      <SelectMenu
        options={options}
        onChange={() => {}}
        onClose={() => {}}
        value=""
        name="test"
        optionRef={optionRef}
        parentRef={parentRef}
      />
    );

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange and onClose on Enter', () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    const optionRef = { current: [] } as React.MutableRefObject<(HTMLLIElement | null)[]>;
    const parentRef = createRef<HTMLDivElement>();

    const { getByText } = render(
      <SelectMenu
        options={options}
        onChange={onChange}
        onClose={onClose}
        value=""
        name="test"
        optionRef={optionRef}
        parentRef={parentRef}
      />
    );

    const option = getByText('Option 2');
    optionRef.current = [null, option as HTMLLIElement, null];

    option.focus();
    fireEvent.keyDown(option, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(options[1]);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose on Escape', () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    const optionRef = { current: [] } as React.MutableRefObject<(HTMLLIElement | null)[]>;
    const parentRef = createRef<HTMLDivElement>();

    const { getByText } = render(
      <SelectMenu
        options={options}
        onChange={onChange}
        onClose={onClose}
        value=""
        name="test"
        optionRef={optionRef}
        parentRef={parentRef}
      />
    );

    const option = getByText('Option 1');
    optionRef.current = [option as HTMLLIElement];

    option.focus();
    fireEvent.keyDown(option, { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
  });

  it('navigates with ArrowDown and ArrowUp', () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    const parentRef = createRef<HTMLDivElement>();
    const optionRef = {
      current: [] as (HTMLLIElement | null)[],
    };

    const { getByText } = render(
      <SelectMenu
        options={options}
        onChange={onChange}
        onClose={onClose}
        value=""
        name="test"
        optionRef={optionRef}
        parentRef={parentRef}
      />
    );

    const firstOption = getByText('Option 1') as HTMLLIElement;
    const secondOption = getByText('Option 2') as HTMLLIElement;
    const thirdOption = getByText('Option 3') as HTMLLIElement;

    optionRef.current = [firstOption, secondOption, thirdOption];

    firstOption.focus();
    fireEvent.keyDown(firstOption, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(secondOption);

    fireEvent.keyDown(secondOption, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(thirdOption);

    fireEvent.keyDown(thirdOption, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(secondOption);
  });

  it('applies custom className prop', () => {
    const optionRef = { current: [] } as React.MutableRefObject<(HTMLLIElement | null)[]>;
    const parentRef = createRef<HTMLDivElement>();
    const { container } = render(
      <SelectMenu
        options={options}
        onChange={() => {}}
        onClose={() => {}}
        value=""
        name="test"
        optionRef={optionRef}
        parentRef={parentRef}
        className="custom-class"
      />
    );

    const menu = container.querySelector('[class*="root"]');
    expect(menu).toHaveClass('custom-class');
  });
});

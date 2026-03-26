import React from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './SelectMenu.module.css';

interface Option {
  label: string;
  value: string;
}

export interface SelectMenuProps extends CvElement {
  /** Unique name used for ARIA IDs */
  name: string;
  /** Ref array for option elements (keyboard navigation) */
  optionRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  /** Array of options to display */
  options: Option[];
  /** Ref to the parent element (for focus management) */
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  /** Currently selected value */
  value?: string;
  /** Callback fired when an option is selected */
  onChange: (option: Option) => void;
  /** Callback fired when the menu should close */
  onClose: () => void;
}

export const SelectMenu = ({
  name,
  optionRef,
  options,
  parentRef,
  value,
  onChange,
  onClose,
  className = '',
}: SelectMenuProps) => {
  const handleKeyOptionsDown = (e: React.KeyboardEvent, option: Option) => {
    if (e.key === 'Enter') {
      onChange(option);
      parentRef.current?.focus();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusNextOption();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusPreviousOption();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const focusNextOption = () => {
    const index = optionRef.current.findIndex((el) => el === document.activeElement);
    const nextIndex = index + 1 < optionRef.current.length ? index + 1 : 0;
    optionRef.current[nextIndex]?.focus();
  };

  const focusPreviousOption = () => {
    const index = optionRef.current.findIndex((el) => el === document.activeElement);
    const prevIndex = index - 1 >= 0 ? index - 1 : optionRef.current.length - 1;
    optionRef.current[prevIndex]?.focus();
  };

  const isSelected = (option: Option) => value === option.value;

  return (
    <ul
      className={classNames(styles.root, className)}
      id={`${name}-listbox`}
      role="listbox"
      aria-labelledby={`${name}-label`}
    >
      {options.map((option, index) => (
        <li
          onKeyDown={(e) => handleKeyOptionsDown(e, option)}
          ref={(el) => (optionRef.current[index] = el)}
          key={option.value}
          id={`${name}-option-${option.value}`}
          role="option"
          aria-selected={isSelected(option)}
          onClick={() => onChange(option)}
          tabIndex={-1}
          className={classNames(styles.item, { [styles.itemSelected]: isSelected(option) })}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

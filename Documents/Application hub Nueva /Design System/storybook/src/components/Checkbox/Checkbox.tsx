import { KeyboardEvent, useState } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Checkbox.module.css';

export interface CheckboxProps extends CvElement {
  /** If true, the checkbox is checked (controlled) */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** If true, the checkbox is disabled */
  disabled?: boolean;
  /** Text label displayed next to the checkbox */
  label?: string;
  /** Name attribute for the input element */
  name?: string;
  /** Size of the checkbox */
  size?: 'small' | 'medium';
  /** Callback fired when the checked state changes */
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  'data-qa': dataQa,
  checked,
  defaultChecked = false,
  disabled = false,
  id,
  label,
  name,
  size = 'medium',
  className = '',
  onChange = () => {},
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;

  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !currentChecked;

    if (!isControlled) setInternalChecked(newChecked);

    onChange(newChecked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  const checkboxClass = classNames(
    styles.root,
    styles[size],
    {
      [styles.checked]: currentChecked,
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <label className={checkboxClass} data-qa={dataQa || undefined}>
      <input
        checked={currentChecked}
        className={styles.input}
        disabled={disabled}
        id={id}
        name={name}
        onChange={handleToggle}
        onKeyDown={handleKeyDown}
        type="checkbox"
      />
      <div className={styles.box} aria-hidden="true">
        {currentChecked && (
          <svg
            className={styles.icon}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

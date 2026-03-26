import { KeyboardEvent, useCallback, useState } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './RadioButton.module.css';

export interface RadioButtonProps extends CvElement {
  /** Unique identifier for the radio button */
  id: string;
  /** Name attribute for grouping radio buttons */
  name: string;
  /** Value associated with this radio option */
  value: string;
  /** If true, the radio button is checked (controlled) */
  isChecked?: boolean;
  /** Callback fired when the radio button is selected */
  handleRadioChange: (value: string) => void;
  /** Label text displayed next to the radio button */
  label: string;
  /** Size of the radio button */
  size: 'S' | 'M';
  /** If true, the radio button is disabled */
  disabled?: boolean;
}

export const RadioButton = ({
  'data-qa': dataQa,
  id,
  name,
  value,
  isChecked,
  handleRadioChange,
  label,
  size = 'M',
  disabled = false,
  className = '',
}: RadioButtonProps) => {
  const [internalIsChecked, setInternalIsChecked] = useState(false);

  const isControlled = isChecked !== undefined;
  const currentIsChecked = isControlled ? isChecked : internalIsChecked;

  const handleChange = useCallback(() => {
    if (!currentIsChecked) {
      if (!isControlled) {
        setInternalIsChecked(true);
      }
      handleRadioChange(value);
    }
  }, [currentIsChecked, isControlled, handleRadioChange, value]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLLabelElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleChange();
      }
    },
    [handleChange]
  );

  return (
    <label
      data-qa={dataQa || undefined}
      onKeyDown={!disabled ? handleKeyDown : undefined}
      role="radio"
      aria-checked={currentIsChecked}
      aria-labelledby={`${id}-label`}
      tabIndex={0}
      className={classNames(
        styles.wrapper,
        {
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      <input
        className={styles.input}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={currentIsChecked}
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
        disabled={disabled}
      />
      <span className={styles.circle} aria-hidden="true">
        {currentIsChecked && <span className={styles.dot} />}
      </span>
      <span
        className={classNames(styles.label, {
          [styles.labelS]: size === 'S',
          [styles.labelM]: size === 'M',
        })}
        id={`${id}-label`}
      >
        {label}
      </span>
    </label>
  );
};

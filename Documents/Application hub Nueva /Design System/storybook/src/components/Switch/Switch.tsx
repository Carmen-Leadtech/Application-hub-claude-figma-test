import { CSSProperties, KeyboardEvent, useState } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Switch.module.css';

export interface SwitchProps extends CvElement {
  /** If true, the switch is checked (controlled) */
  checked?: boolean;
  /** Color of the switch when checked */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string;
  /** Initial checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** If true, the switch is disabled */
  disabled?: boolean;
  /** Text label displayed next to the switch */
  label?: string;
  /** Name attribute for the input element */
  name?: string;
  /** Size of the switch */
  size?: 'small' | 'medium';
  /** Callback fired when the checked state changes */
  onChange?: (checked: boolean) => void;
}

const KNOWN_COLORS = [
  'default',
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
] as const;

const isKnownColor = (value: string) =>
  KNOWN_COLORS.includes(value as (typeof KNOWN_COLORS)[number]);

type CssVars = CSSProperties & Record<`--${string}`, string>;

export const Switch = ({
  'data-qa': dataQa,
  checked,
  color = 'primary',
  className = '',
  defaultChecked = false,
  disabled = false,
  id,
  label,
  name,
  size = 'medium',
  onChange = () => {},
}: SwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;
  const hasKnownColor = isKnownColor(color);
  const customColorStyle: CssVars | undefined = !hasKnownColor
    ? {
        '--cv-switch-track-bg-checked': color,
        '--cv-switch-track-border-checked': color,
      }
    : undefined;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !currentChecked;

    if (!isControlled) setInternalChecked(newChecked);

    onChange(newChecked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  const switchClass = classNames(
    styles.root,
    styles[size],
    {
      [styles.checked]: currentChecked,
      [styles.disabled]: disabled,
    },
    hasKnownColor ? styles[color as (typeof KNOWN_COLORS)[number]] : undefined,
    className
  );

  return (
    <label className={switchClass} data-qa={dataQa || undefined} style={customColorStyle}>
      <input
        checked={currentChecked}
        className={styles.input}
        disabled={disabled}
        id={id}
        name={name}
        type="checkbox"
        onChange={handleToggle}
        onKeyDown={handleKeyDown}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

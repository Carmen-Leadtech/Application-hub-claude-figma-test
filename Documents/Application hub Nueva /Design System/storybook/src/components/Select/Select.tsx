import { useRef, useState } from 'react';

import classNames from 'classnames';
import { useClickOutside } from 'hooks';
import { CvElement } from 'types/CvElement';

import { Icon } from 'components/Icon/Icon';
import { SelectMenu } from 'components/SelectMenu/SelectMenu';

import styles from './Select.module.css';

interface Option {
  label: string;
  value: string;
}

export interface SelectProps extends CvElement {
  /** Helper text displayed below the select */
  assistiveText?: string;
  /** If true, the select is disabled */
  disabled?: boolean;
  /** Error message (enables error state when set) */
  isError?: string;
  /** Unique name for the select element */
  name: string;
  /** Array of options to display */
  options: Option[];
  /** Placeholder text when no option is selected */
  placeholder: string;
  /** Element displayed before the select value */
  prefix?: React.ReactNode;
  /** Element displayed after the select value */
  suffix?: React.ReactNode;
  /** Currently selected value */
  value?: string;
  /** Callback fired when selection changes */
  onChange: (e: { target: { value: string; label: string } }) => void;
}

export const Select = ({
  assistiveText,
  disabled,
  isError,
  name,
  options,
  placeholder,
  prefix,
  suffix,
  value,
  className = '',
  onChange,
}: SelectProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<(HTMLLIElement | null)[]>([]);

  useClickOutside([inputRef], () => setShowMenu(false));

  const getDisplay = () => value || placeholder;

  const handleChange = (option: Option) => {
    onChange({
      target: {
        value: option.value,
        label: option.label,
      },
    });
    setShowMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowMenu(!showMenu);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusOnMenu();
    } else if (e.key === 'Escape') {
      setShowMenu(false);
    }
  };

  const focusOnMenu = () => {
    const index = optionRef.current.findIndex((el) => el === document.activeElement);
    const nextIndex = index + 1 < optionRef.current.length ? index + 1 : 0;
    optionRef.current[nextIndex]?.focus();
  };

  return (
    <div
      ref={inputRef}
      className={classNames(
        styles.root,
        name,
        {
          [styles.error]: isError,
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      <div
        ref={inputRef}
        onClick={() => setShowMenu(!showMenu)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={showMenu}
        aria-controls={`${name}-listbox`}
        aria-activedescendant={showMenu && value ? `${name}-option-${value}` : undefined}
        className={classNames(styles.input, { open: showMenu })}
      >
        <div className={styles.prefix}>{prefix && prefix}</div>
        <div className={classNames(styles.value, { [styles.placeholder]: !value })}>
          {getDisplay()}
        </div>
        <div className={styles.suffix}>
          <div className={classNames(styles.arrow, { [styles.arrowOpen]: showMenu })}>
            <Icon name="arrow_drop_down" />
          </div>
          {suffix && suffix}
        </div>
      </div>
      {assistiveText && <span className={styles.assistiveText}>{assistiveText}</span>}
      {showMenu && (
        <SelectMenu
          name={name}
          optionRef={optionRef}
          options={options}
          parentRef={inputRef}
          value={value}
          onChange={handleChange}
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

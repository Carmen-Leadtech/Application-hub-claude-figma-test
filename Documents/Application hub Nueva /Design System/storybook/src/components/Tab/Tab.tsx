import { ButtonHTMLAttributes, forwardRef } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Tab.module.css';

export interface TabProps extends CvElement, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  /** Label text displayed in the tab */
  label: string;
  /** Internal prop: indicates if this tab is active */
  active?: boolean;
  /** Internal prop: size of the tab */
  size?: 'S' | 'M';
  /** Internal prop: tab index for accessibility */
  tabIndex?: number;
  /** Internal prop: aria-controls for accessibility */
  'aria-controls'?: string;
  /** Internal prop: aria-selected for accessibility */
  'aria-selected'?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ 'data-qa': dataQa, active = false, className = '', id, label, size = 'M', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles.tab,
          {
            [styles.tabActive]: active,
            [styles.tabSizeS]: size === 'S',
            [styles.tabSizeM]: size === 'M',
          },
          className
        )}
        data-qa={dataQa || undefined}
        id={id}
        role="tab"
        {...rest}
      >
        {label}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

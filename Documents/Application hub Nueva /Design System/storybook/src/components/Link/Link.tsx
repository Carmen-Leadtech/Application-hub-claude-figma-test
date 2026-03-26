import React, { AnchorHTMLAttributes } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Icon } from '../Icon/Icon';

import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, CvElement {
  children?: React.ReactNode;
  disabled?: boolean;
  iconEnd?: string;
  iconProps?: Record<string, unknown>;
  iconStart?: string;
  size?: 'medium' | 'small';
  variant?: 'primary';
}

export const Link = ({
  'data-qa': dataQA,
  children,
  disabled = false,
  href,
  iconEnd,
  iconProps,
  iconStart,
  size = 'medium',
  variant = 'primary',
  className = '',
  ...rest
}: LinkProps) => {
  return (
    <a
      className={classNames(
        styles.root,
        styles[variant],
        styles[size],
        {
          [styles.disabled]: disabled,
        },
        className
      )}
      href={disabled ? undefined : href}
      data-qa={dataQA}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...rest}
    >
      {iconStart && (
        <div className={styles.iconContainer}>
          <Icon name={iconStart} className={styles.icon} color="currentColor" {...iconProps} />
        </div>
      )}
      <span className={styles.text}>{children}</span>
      {iconEnd && (
        <div className={styles.iconContainer}>
          <Icon name={iconEnd} className={styles.icon} color="currentColor" {...iconProps} />
        </div>
      )}
    </a>
  );
};

import React from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Icon } from '../Icon/Icon';

import styles from './Toast.module.css';

export interface ToastProps
  extends CvElement,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: 'info' | 'success' | 'error' | 'warning';
  onClose?: () => void;
  floating?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const getIconName = (variant: string): string => {
  switch (variant) {
    case 'info':
      return 'info';
    case 'success':
      return 'check_circle';
    case 'error':
      return 'close';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
};

export const Toast = ({
  'data-qa': dataQA,
  variant = 'info',
  onClose,
  floating = false,
  fullWidth = false,
  children,
  className = '',
  ...rest
}: ToastProps) => {
  const iconName = getIconName(variant);

  return (
    <div
      className={classNames(
        styles.root,
        styles[variant],
        {
          [styles.floating]: floating,
          [styles.fullWidth]: fullWidth,
        },
        className
      )}
      data-qa={dataQA}
      role="alert"
      {...rest}
    >
      <Icon name={iconName} className={styles.icon} color="var(--cv-toast-icon-color)" />
      <div className={styles.content}>{children}</div>
      {onClose && (
        <button
          type="button"
          className={styles.closeIcon}
          onClick={onClose}
          aria-label="Close toast"
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClose();
            }
          }}
        >
          <Icon name="close" size={13} color="var(--cv-toast-close-color)" />
        </button>
      )}
    </div>
  );
};

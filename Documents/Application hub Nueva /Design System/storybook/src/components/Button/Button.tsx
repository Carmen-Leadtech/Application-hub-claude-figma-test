import { ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CvElement {
  /** If true, the button will take the full width of its container */
  isFullWidth?: boolean;
  /** Shape of the button corners */
  shape?: 'rounded' | 'square';
  /** Size of the button */
  size?: 'S' | 'M';
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'gradient' | 'tool';
  /** Additional CSS class name */
  className?: string;
}

export const Button = ({
  'data-qa': dataQa,
  children,
  id,
  isFullWidth = false,
  shape = 'square',
  size = 'M',
  type = 'button',
  variant = 'primary',
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.root,
        styles[shape],
        styles[size],
        styles[variant],
        {
          [styles.fullWidth]: isFullWidth,
        },
        className
      )}
      data-qa={dataQa || undefined}
      id={id}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

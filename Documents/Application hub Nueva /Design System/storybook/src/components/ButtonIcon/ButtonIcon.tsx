import { ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './ButtonIcon.module.css';

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement>, CvElement {
  /** Size of the icon button */
  size?: 'XS' | 'S' | 'M';
  /** Visual style variant of the button */
  variant?: 'primary' | 'neutral';
}

export const ButtonIcon = ({
  'data-qa': dataQa,
  children,
  id,
  size = 'M',
  type = 'button',
  variant = 'primary',
  className = '',
  ...rest
}: ButtonIconProps) => {
  return (
    <button
      className={classNames(styles.root, styles[size], styles[variant], className)}
      data-qa={dataQa || undefined}
      id={id}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

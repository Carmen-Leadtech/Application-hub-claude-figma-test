import { ReactNode } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Badge.module.css';

export interface BadgeProps extends CvElement {
  /** Content of the badge (text, icons, or both) */
  children?: ReactNode;
  /** Color variant of the badge */
  variant?: 'info' | 'warning' | 'success' | 'neutral';
  /** Size of the badge */
  size?: 'S' | 'M';
  /** Shape variant of the badge */
  shape?: 'default' | 'rounded' | 'outlined';
}

export const Badge = ({
  'data-qa': dataQa,
  children,
  id,
  variant = 'info',
  shape = 'default',
  size = 'S',
  className = '',
}: BadgeProps) => {
  return (
    <span
      data-qa={dataQa || undefined}
      id={id}
      className={classNames(styles.root, styles[variant], styles[shape], styles[size], className)}
    >
      {children}
    </span>
  );
};

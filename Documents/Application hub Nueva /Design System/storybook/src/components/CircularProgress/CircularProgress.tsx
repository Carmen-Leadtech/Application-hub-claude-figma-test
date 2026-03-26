import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './CircularProgress.module.css';

export interface CircularProgressProps extends CvElement {
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Color of the spinner stroke */
  color?: string;
  /** Size of the spinner in pixels */
  size?: number;
  /** Width of the spinner stroke */
  strokeWidth?: number;
}

export const CircularProgress = ({
  'aria-label': ariaLabel = 'Loading',
  'data-qa': dataQa,
  className = '',
  color = 'var(--brand-500, #006dcc)',
  id,
  size = 40,
  strokeWidth = 4,
}: CircularProgressProps) => {
  return (
    <svg
      aria-busy="true"
      aria-label={ariaLabel}
      className={classNames(styles.spinner, className)}
      data-qa={dataQa || undefined}
      height={size}
      id={id}
      role="progressbar"
      viewBox="18 18 52 52"
      width={size}
    >
      <circle
        className={styles.path}
        cx="44"
        cy="44"
        fill="none"
        r="20.2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

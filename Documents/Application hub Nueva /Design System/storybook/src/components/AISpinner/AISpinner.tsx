import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './AISpinner.module.css';

const DOT_COUNT = 6;

/** Base size in px; inner layout is fixed at this and scaled by the size prop */
const BASE_SIZE = 180;

export interface AISpinnerProps extends CvElement {
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Size of the spinner in pixels (e.g. 72, 108, 180). Default 180. */
  size?: number;
  /** Additional CSS class name */
  className?: string;
}

export const AISpinner = ({
  'aria-label': ariaLabel = 'Loading',
  'data-qa': dataQa,
  className = '',
  id,
  size = BASE_SIZE,
}: AISpinnerProps) => {
  const scale = size / BASE_SIZE;

  return (
    <div
      aria-busy="true"
      aria-label={ariaLabel}
      className={classNames(styles.sizeWrapper, className)}
      data-qa={dataQa || undefined}
      id={id}
      role="status"
      style={{ width: size, height: size }}
    >
      <div
        className={styles.loaderContainer}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div className={styles.loaderCenter} />
        <div className={`${styles.loaderRing} ${styles.loaderRingInner}`}>
          {Array.from({ length: DOT_COUNT }, (_, i) => (
            <div key={i} className={styles.loaderDot} />
          ))}
        </div>
        <div className={`${styles.loaderRing} ${styles.loaderRingOuter}`}>
          {Array.from({ length: DOT_COUNT }, (_, i) => (
            <div key={i} className={styles.loaderDot} />
          ))}
        </div>
      </div>
    </div>
  );
};

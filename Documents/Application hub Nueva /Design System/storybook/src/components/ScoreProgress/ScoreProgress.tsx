import classNames from 'classnames';
import { CvElement } from 'types/CvElement';
import {
  getProgressPercentage,
  getProgressVariant,
  getProgressWidth,
} from 'utils/Progress/getProgressWidth';

import styles from './ScoreProgress.module.css';

export interface ScoreProgressProps extends CvElement {
  /** Number of completed sections */
  progress?: number;
  /** Total number of sections */
  total?: number;
  /** Show or hide the progress label */
  showLabel?: boolean;
  /** Class name for the root element */
  className?: string;
}

export const ScoreProgress = ({
  'data-qa': dataQa,
  id,
  progress = 0,
  total = 3,
  showLabel = true,
  className = '',
}: ScoreProgressProps) => {
  const percentage = getProgressPercentage(progress, total);
  const variant = getProgressVariant(percentage);
  const width = getProgressWidth({ progress, total, minWidth: '8px' });

  return (
    <div
      aria-label={`Progress: ${progress} of ${total}`}
      aria-valuemax={total}
      aria-valuemin={0}
      aria-valuenow={progress}
      className={classNames(styles.root, styles[variant], className)}
      data-qa={dataQa || undefined}
      id={id}
      role="progressbar"
    >
      <div className={styles.track}>
        <div className={styles.bar} style={{ width }} />
      </div>
      {showLabel && (
        <span className={styles.label}>
          {progress}/{total}
        </span>
      )}
    </div>
  );
};

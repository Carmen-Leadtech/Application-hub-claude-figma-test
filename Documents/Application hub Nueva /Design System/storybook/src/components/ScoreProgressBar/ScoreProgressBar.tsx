import classNames from 'classnames';
import { CvElement } from 'types/CvElement';
import {
  getProgressPercentage,
  getProgressVariant,
  getProgressWidth,
} from 'utils/Progress/getProgressWidth';

import styles from './ScoreProgressBar.module.css';

export interface ScoreProgressBarProps extends CvElement {
  /** Number of completed sections */
  progress?: number;
  /** Total number of sections */
  total?: number;
}

export const ScoreProgressBar = ({
  'data-qa': dataQa,
  id,
  progress = 0,
  total = 3,
  className = '',
}: ScoreProgressBarProps) => {
  const percentage = getProgressPercentage(progress, total);
  const variant = getProgressVariant(percentage);
  const width = getProgressWidth({ progress, total, minWidth: '10%' });

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
      <div className={styles.bar} style={{ width }} />
      <span className={styles.label}>
        {progress}/{total}
      </span>
    </div>
  );
};

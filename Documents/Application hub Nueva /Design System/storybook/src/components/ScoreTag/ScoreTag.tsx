import classNames from 'classnames';
import { CvElement } from 'types/CvElement';
import { getProgressPercentage, getProgressVariant } from 'utils/Progress/getProgressWidth';

import styles from './ScoreTag.module.css';

export interface ScoreTagProps extends CvElement {
  /** Number of completed sections */
  progress?: number;
  /** Total number of sections */
  total?: number;
  /** Show background color */
  hasBackground?: boolean;
  /** Class name for the root element */
  className?: string;
}

export const ScoreTag = ({
  'data-qa': dataQa,
  id,
  progress = 0,
  total = 3,
  hasBackground = true,
  className = '',
}: ScoreTagProps) => {
  const percentage = getProgressPercentage(progress, total);
  const variant = getProgressVariant(percentage);

  return (
    <span
      className={classNames(
        styles.root,
        styles[variant],
        {
          [styles.background]: hasBackground,
        },
        className
      )}
      data-qa={dataQa || undefined}
      id={id}
    >
      {progress}/{total}
    </span>
  );
};

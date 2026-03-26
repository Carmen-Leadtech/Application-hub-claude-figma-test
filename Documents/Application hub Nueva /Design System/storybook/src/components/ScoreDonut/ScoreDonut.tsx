import classNames from 'classnames';
import { CvElement } from 'types/CvElement';
import { ProgressVariant } from 'utils/Progress/getProgressWidth';

import styles from './ScoreDonut.module.css';

export interface ScoreDonutProps extends CvElement {
  /** Score value from 0 to 10 */
  score: number;
  /** Show/hide the label tag */
  showLabel?: boolean;
  /** Size of the chart in pixels */
  size?: number;
  /** Custom label text. Default: "Your score is {score} out of 10" */
  labelText?: string;
}

const getScoreVariant = (score: number): ProgressVariant => {
  if (score <= 4) return 'danger';
  if (score <= 8) return 'warning';
  return 'success';
};

export const ScoreDonut = ({
  'data-qa': dataQa,
  id,
  labelText,
  showLabel = true,
  size = 168,
  score,
  className = '',
}: ScoreDonutProps) => {
  const clampedScore = Math.max(0, Math.min(10, Math.round(score)));

  const strokeWidth = 23.56;
  const baseSize = 168;
  const radius = (baseSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = clampedScore / 10;
  const strokeDashoffset = circumference * (1 - progressPercentage);

  const variant = getScoreVariant(clampedScore);
  const isTwoDigits = clampedScore >= 10;

  const baseFontSize = 70.737;
  const fontSize = (size / baseSize) * baseFontSize;

  const defaultLabelText = `Your score is ${clampedScore} out of 10`;

  return (
    <div
      className={classNames(styles.root, styles[variant], className)}
      data-qa={dataQa || undefined}
      id={id}
    >
      <div className={styles.chart} style={{ width: size, height: size }}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${baseSize} ${baseSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.background}
            cx="84"
            cy="84"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className={styles.progress}
            cx="84"
            cy="84"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span
          className={classNames(styles.value, { [styles.valueTwoDigits]: isTwoDigits })}
          style={{ fontSize }}
        >
          {clampedScore}
        </span>
      </div>

      {showLabel && (
        <span data-qa={dataQa ? `${dataQa}-label` : 'score-donut-label'} className={styles.label}>
          {labelText ?? defaultLabelText}
        </span>
      )}
    </div>
  );
};

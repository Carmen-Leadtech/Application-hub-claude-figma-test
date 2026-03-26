import { CSSProperties, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { CircularProgress } from 'components/CircularProgress/CircularProgress';

import styles from './LoadingSteps.module.css';

export interface LoadingStepsProps extends HTMLAttributes<HTMLDivElement>, CvElement {
  /** Steps shown under the spinner */
  steps: string[];
  /** Accessible label for the spinner */
  spinnerLabel?: string;
  /** Spinner size in pixels */
  spinnerSize?: number;
  /** Spinner stroke width in pixels */
  spinnerStrokeWidth?: number;
  /** Delay between steps in milliseconds */
  stepDelayMs?: number;
  /** Additional CSS class name */
  className?: string;
}

export const LoadingSteps = ({
  'data-qa': dataQa,
  id,
  className = '',
  spinnerLabel = 'Loading',
  spinnerSize = 40,
  spinnerStrokeWidth = 5,
  stepDelayMs = 900,
  steps,
  ...rest
}: LoadingStepsProps) => {
  const spinnerStyle = {
    '--cv-loading-steps-spinner-size': `${spinnerSize}px`,
  } as CSSProperties;

  const stepDelayStyle = (index: number) =>
    ({
      '--cv-loading-steps-delay': `${index * stepDelayMs}ms`,
    }) as CSSProperties;

  return (
    <div
      className={classNames(styles.root, className)}
      data-qa={dataQa || undefined}
      id={id}
      {...rest}
    >
      <div className={styles.content}>
        <div
          className={styles.spinner}
          style={spinnerStyle}
          data-qa={dataQa ? `${dataQa}-spinner` : undefined}
        >
          <span className={styles.spinnerForeground}>
            <CircularProgress
              aria-label={spinnerLabel}
              color="var(--color-fill-illustrations-brand)"
              size={spinnerSize}
              strokeWidth={spinnerStrokeWidth}
            />
          </span>
        </div>

        <ul className={styles.steps} data-qa={dataQa ? `${dataQa}-steps` : undefined}>
          {steps.map((step, index) => (
            <li
              className={styles.step}
              key={`${index}-${step}`}
              style={stepDelayStyle(index)}
              data-qa={dataQa ? `${dataQa}-step-${index}` : undefined}
            >
              <span className={styles.stepIcon} aria-hidden="true">
                <span className={styles.stepCircle} />
                <span className={styles.stepCheck}>
                  <svg
                    className={styles.stepCheckSvg}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4.5 12.5L9.5 17.5L19.5 7"
                      fill="none"
                      stroke="var(--color-fill-common-default)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="100"
                    />
                  </svg>
                </span>
              </span>
              <span className={styles.stepText}>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

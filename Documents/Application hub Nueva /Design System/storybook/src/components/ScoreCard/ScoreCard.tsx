import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Icon } from 'components/Icon/Icon';
import { ScoreProgress } from 'components/ScoreProgress/ScoreProgress';
import { ScoreTag } from 'components/ScoreTag/ScoreTag';

import styles from './ScoreCard.module.css';

export interface ScoreCardProps extends CvElement {
  /** Main title text displayed in the center */
  headline: string;
  /** Number of completed sections */
  progress?: number;
  /** Total number of sections */
  total?: number;
  /** Icon name to display in the top-left corner */
  iconName?: string;
  /** Additional CSS class name */
  className?: string;
  /** Click handler. When provided, the card renders as a button */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ScoreCard = ({
  'data-qa': dataQa,
  headline,
  progress = 0,
  total = 3,
  iconName = 'pie_chart',
  className = '',
  id,
  onClick,
}: ScoreCardProps) => {
  const content = (
    <>
      <div className={styles.header}>
        <div className={styles.iconContainer} data-qa={dataQa ? `${dataQa}-icon` : undefined}>
          <Icon name={iconName} />
        </div>
        <div className={styles.tagContainer} data-qa={dataQa ? `${dataQa}-tag` : undefined}>
          <ScoreTag progress={progress} total={total} hasBackground={false} />
        </div>
      </div>

      <h3 className={styles.headline} data-qa={dataQa ? `${dataQa}-headline` : undefined}>
        {headline}
      </h3>

      <div className={styles.progressContainer} data-qa={dataQa ? `${dataQa}-progress` : undefined}>
        <ScoreProgress progress={progress} total={total} showLabel={false} />
      </div>
    </>
  );

  const commonProps = {
    className: classNames(styles.root, className),
    'data-qa': dataQa || undefined,
    id,
  };

  if (onClick) {
    return (
      <button type="button" {...commonProps} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div {...commonProps}>{content}</div>;
};

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import emptyIllustration from './assets/empty-content-illustration.svg';
import styles from './OriginalContentCard.module.css';

export interface OriginalContentCardProps extends CvElement {
  /** Array of text paragraphs to display. Empty array shows empty state */
  items: string[];
  /** Additional CSS class name */
  className?: string;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
}

export const OriginalContentCard = ({
  'data-qa': dataQa,
  id,
  items,
  className,
  emptyTitle,
  emptyDescription,
}: OriginalContentCardProps) => {
  const isEmpty = !items || items.length === 0;

  if (isEmpty) {
    return (
      <div
        className={classNames(styles.emptyRoot, className)}
        data-qa={dataQa ? `${dataQa}-empty` : undefined}
        id={id}
      >
        <div className={styles.emptyContentWrapper}>
          <div
            className={styles.emptyIllustration}
            data-qa={dataQa ? `${dataQa}-illustration` : undefined}
          >
            <img src={emptyIllustration} alt="Empty illustration" />
          </div>
          <div className={styles.emptyTextWrapper} data-qa={dataQa ? `${dataQa}-text` : undefined}>
            {emptyTitle && <p className={styles.emptyTitle}>{emptyTitle}</p>}
            {emptyDescription && <p className={styles.emptyDescription}>{emptyDescription}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.contentRoot, className)}
      data-qa={dataQa ? `${dataQa}-content` : undefined}
      id={id}
    >
      <div className={styles.contentWrapper} data-qa={dataQa ? `${dataQa}-wrapper` : undefined}>
        {items.map((item, index) => (
          <p
            key={index}
            className={styles.paragraph}
            data-qa={dataQa ? `${dataQa}-paragraph-${index}` : undefined}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

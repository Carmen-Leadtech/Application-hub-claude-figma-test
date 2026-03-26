import { CSSProperties, ReactNode } from 'react';

import classNames from 'classnames';
import { useBreakPoint } from 'hooks/useBreakPoint/useBreakPoint';
import { CvElement } from 'types/CvElement';

import { Icon } from 'components/Icon/Icon';

import styles from './InfoCard.module.css';

export interface InfoCardProps extends CvElement {
  /** Title text displayed in the header */
  title?: string;
  /** Content text displayed in the main area */
  content: string;
  /** Image or graphic to display on the left side */
  image?: ReactNode;
  /** Icon name for the header (default: 'warning') */
  iconName?: string;
  /** Color of the icon */
  iconColor?: CSSProperties['color'];
  /** Additional CSS class name */
  className?: string;
}

export const InfoCard = ({
  'data-qa': dataQa,
  title = 'Why it matters',
  content,
  image,
  iconName = 'warning',
  iconColor,
  className = '',
  id,
}: InfoCardProps) => {
  const { isMobile } = useBreakPoint();
  return (
    <div className={classNames(styles.root, className)} data-qa={dataQa || undefined} id={id}>
      <div className={styles.header} data-qa={dataQa ? `${dataQa}-header` : undefined}>
        <div className={styles.titleContainer}>
          <div className={styles.iconContainer} data-qa={dataQa ? `${dataQa}-icon` : undefined}>
            <Icon name={iconName} size={20} color={iconColor} />
          </div>
          <h3 className={styles.title} data-qa={dataQa ? `${dataQa}-title` : undefined}>
            {title}
          </h3>
        </div>
      </div>

      <div className={styles.content} data-qa={dataQa ? `${dataQa}-content` : undefined}>
        <div className={styles.contentWrapper}>
          {image && !isMobile && (
            <div className={styles.imageContainer} data-qa={dataQa ? `${dataQa}-image` : undefined}>
              {image}
            </div>
          )}
          <p className={styles.text} data-qa={dataQa ? `${dataQa}-text` : undefined}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

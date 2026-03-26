import classNames from 'classnames';
import { useBreakPoint } from 'hooks/useBreakPoint/useBreakPoint';
import { CvElement } from 'types/CvElement';

import { Icon } from 'components/Icon/Icon';

import styles from './Banner.module.css';

export interface BannerProps extends CvElement {
  /** Icon name to display (e.g., 'magic', 'ai_stars', 'badge_coach') */
  iconName?: string;
  /** Title text displayed prominently */
  title?: string;
  /** Description text below the title */
  description?: string;
  /** Optional illustration image URL (displayed only on desktop) */
  image?: string;
  /** Color of the icon */
  iconColor?: string;
  /** Size of the icon */
  iconSize?: number;
}

export const Banner = ({
  'data-qa': dataQa,
  id,
  iconName,
  iconColor,
  iconSize = 24,
  title,
  description,
  image,
  className,
}: BannerProps) => {
  const { isMobile } = useBreakPoint();
  return (
    <div className={classNames(styles.root, className)} data-qa={dataQa} id={id}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            {iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
          </div>
          <p className={styles.title}>{title}</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      {image && !isMobile && (
        <div className={styles.imageContainer}>
          <img src={image} alt="Banner image" className={styles.image} />
        </div>
      )}
    </div>
  );
};

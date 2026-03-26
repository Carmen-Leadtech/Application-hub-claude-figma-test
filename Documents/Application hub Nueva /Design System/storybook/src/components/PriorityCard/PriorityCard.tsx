import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Badge } from 'components/Badge/Badge';
import { Icon } from 'components/Icon/Icon';

import styles from './PriorityCard.module.css';

export interface PriorityCardProps extends CvElement {
  /** Category tag text displayed above the description */
  category: string;
  /** Description text explaining the suggestion */
  description: string;
  /** If true, the Fix button is in active/selected state */
  isActive?: boolean;
  /** Label for the action button */
  buttonLabel?: string;
  /** Callback fired when the Fix button is clicked */
  onClickFix?: () => void;
  /** If true, renders mobile-optimized view */
  isMobile?: boolean;
  /** Icon name for the badge (default: "format_align_left") */
  badgeIconName?: string;
  /** Additional CSS class name */
  className?: string;
}

const DEFAULT_BADGE_ICON_NAME = 'format_align_left';

export const PriorityCard = ({
  'data-qa': dataQa,
  badgeIconName = DEFAULT_BADGE_ICON_NAME,
  buttonLabel,
  category,
  className = '',
  description,
  id,
  isActive = false,
  isMobile,
  onClickFix,
}: PriorityCardProps) => {
  if (isMobile) {
    return (
      <div
        className={classNames(styles.root, styles.mobile, className)}
        data-qa={dataQa || undefined}
        id={id}
      >
        <div className={styles.mobileBadgeContainer}>
          <Badge variant="neutral" size="S" data-qa={dataQa ? `${dataQa}-tag` : undefined}>
            <Icon name={badgeIconName} size={12} />
            {category}
          </Badge>
        </div>

        <div className={styles.mobileContentRow}>
          <div className={styles.mobileIconSmall}>
            <Icon name="top_priority" size={32} />
          </div>
          <p
            className={styles.mobileDescription}
            data-qa={dataQa ? `${dataQa}-description` : undefined}
          >
            {description}
          </p>
          <button
            className={classNames(styles.mobileButton, { [styles.buttonActive]: isActive })}
            data-qa={dataQa ? `${dataQa}-button` : undefined}
            onClick={onClickFix}
            type="button"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.root, className)} data-qa={dataQa || undefined} id={id}>
      <div className={styles.iconContainer} data-qa={dataQa ? `${dataQa}-icon` : undefined}>
        <Icon name="top_priority" size={48} />
      </div>

      <div className={styles.content}>
        <div className={styles.textContainer}>
          <div>
            <Badge variant="neutral" size="S" data-qa={dataQa ? `${dataQa}-tag` : undefined}>
              <Icon name={badgeIconName} size={16} />
              {category}
            </Badge>
          </div>
          <p className={styles.description} data-qa={dataQa ? `${dataQa}-description` : undefined}>
            {description}
          </p>
        </div>

        <button
          className={classNames(styles.button, { [styles.buttonActive]: isActive })}
          data-qa={dataQa ? `${dataQa}-button` : undefined}
          onClick={onClickFix}
          type="button"
        >
          <Icon name="checklist" />
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

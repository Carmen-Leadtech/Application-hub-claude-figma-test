import { ReactNode } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Badge } from 'components/Badge/Badge';
import { Icon } from 'components/Icon/Icon';

import styles from './SuggestionCard.module.css';

export interface SuggestionCardProps extends CvElement {
  /** Badge text displayed at the top */
  badgeText?: string;
  /** Array of text items to display as a bulleted list */
  items: string[];
  /** Additional CSS class name */
  className?: string;
  /** Whether to show bullets in the list */
  showBullets?: boolean;
  /** Optional suffix content (icon, title, labels, or any ReactNode) */
  suffix?: ReactNode;
  /** Whether to show the badge */
  showBadge?: boolean;
}

export const SuggestionCard = ({
  'data-qa': dataQa,
  badgeText,
  items,
  className = '',
  id,
  showBullets = false,
  showBadge = false,
  suffix,
}: SuggestionCardProps) => {
  return (
    <div className={classNames(styles.root, className)} data-qa={dataQa || undefined} id={id}>
      <div className={styles.content}>
        <div className={styles.badgeAndListContainer}>
          {showBadge && (
            <div className={styles.badgeContainer}>
              <Badge variant="neutral" size="S" data-qa={dataQa ? `${dataQa}-badge` : undefined}>
                <Icon name="magic" size={16} />
                {badgeText}
              </Badge>
            </div>
          )}
          <ul className={styles.list} data-qa={dataQa ? `${dataQa}-list` : undefined}>
            {items.map((item, index) => (
              <li
                key={index}
                className={classNames(styles.listItem, {
                  [styles.bullets]: showBullets,
                })}
              >
                <span className={styles.listItemText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {suffix != null && <div className={styles.suffixContainer}>{suffix}</div>}
      </div>
    </div>
  );
};

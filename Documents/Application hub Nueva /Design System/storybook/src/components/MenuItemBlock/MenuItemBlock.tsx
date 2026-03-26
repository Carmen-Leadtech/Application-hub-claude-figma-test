import { ReactNode } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Icon } from 'components/Icon/Icon';

import styles from './MenuItemBlock.module.css';

export interface MenuItemBlockProps extends CvElement {
  /** Section name to display */
  sectionName?: string;
  /** Icon name for the section */
  iconName?: string;
  /** Whether the menu item is active/selected */
  isActive?: boolean;
  /** Callback fired when the item is clicked */
  onClick?: (id?: string) => void;
  /** Custom icon element (overrides iconName) */
  icon?: ReactNode;
  /** Custom content to render in the right side of the menu item */
  endContent?: ReactNode;
}

export const MenuItemBlock = ({
  'data-qa': dataQa,
  id,
  sectionName = 'Section name',
  iconName,
  isActive = false,
  onClick,
  icon,
  endContent,
  className = '',
}: MenuItemBlockProps) => {
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) onClick(id);
    }
  };

  const iconElement =
    icon ||
    (iconName ? (
      <Icon name={iconName} size={20} color={isActive ? 'var(--brand-500, #006dcc)' : undefined} />
    ) : null);

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.active]: isActive,
        },
        className
      )}
      data-qa={dataQa ? `${dataQa}-menu-item-block` : undefined}
      id={id}
      role="button"
      tabIndex={0}
      aria-current={isActive ? 'page' : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.sectionTitle}>
            {iconElement && (
              <div
                className={classNames(styles.icon, {
                  [styles.iconActive]: isActive,
                })}
                data-qa={dataQa ? `${dataQa}-menu-item-block-icon` : undefined}
              >
                {iconElement}
              </div>
            )}
            <p
              className={classNames(styles.sectionName, {
                [styles.sectionNameActive]: isActive,
              })}
              data-qa={dataQa ? `${dataQa}-menu-item-block-name` : undefined}
            >
              {sectionName}
            </p>
          </div>
          {endContent && (
            <div
              className={styles.scoring}
              data-qa={dataQa ? `${dataQa}-menu-item-block-end-content` : undefined}
            >
              {endContent}
            </div>
          )}
        </div>
      </div>
      {isActive && <div className={styles.leftBar} />}
    </div>
  );
};

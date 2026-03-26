import { ReactNode } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './MenuItem.module.css';

export interface MenuItemProps extends CvElement {
  /** Content of the menu item */
  children?: ReactNode;
  /** If true, the menu item is in active state */
  isActive?: boolean;
  /** Callback fired when the item is clicked or activated via keyboard */
  onClick?: (id?: string) => void;
}

export const MenuItem = ({
  'data-qa': dataQa,
  children,
  id,
  isActive,
  className = '',
  onClick,
}: MenuItemProps) => {
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) onClick(id);
    }
  };

  return (
    <li
      className={classNames(styles.root, { [styles.active]: isActive }, className)}
      data-qa={dataQa ? `${dataQa}-menu-item` : undefined}
      id={id}
      role="button"
      tabIndex={0}
      aria-current={isActive ? 'page' : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </li>
  );
};

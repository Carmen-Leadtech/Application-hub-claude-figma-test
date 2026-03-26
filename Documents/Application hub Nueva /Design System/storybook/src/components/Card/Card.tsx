import { ReactNode } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Card.module.css';

export interface CardProps extends CvElement {
  /** Action icons displayed on the right side */
  iconActions?: ReactNode;
  /** Icon displayed next to the label */
  iconLabel?: ReactNode;
  /** Text label for the card */
  label?: string;
  /** Callback fired when the card is clicked */
  onClick?: (id?: string) => void;
}

export const Card = ({
  'data-qa': dataQa,
  iconActions,
  iconLabel,
  id,
  label,
  className = '',
  onClick = () => {},
}: CardProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <button
      className={classNames(styles.root, className)}
      data-qa={dataQa ? `${dataQa}-card-button` : undefined}
      id={id}
      onClick={handleClick}
    >
      <div className={styles.labelContainer}>
        <div
          className={styles.iconLabel}
          data-qa={dataQa ? `${dataQa}-card-icon-label` : undefined}
        >
          {iconLabel}
        </div>
        <span className={styles.label} data-qa={dataQa ? `${dataQa}-card-label` : undefined}>
          {label}
        </span>
      </div>
      <div
        className={styles.iconsActions}
        data-qa={dataQa ? `${dataQa}-card-icons-actions` : undefined}
      >
        {iconActions}
      </div>
    </button>
  );
};

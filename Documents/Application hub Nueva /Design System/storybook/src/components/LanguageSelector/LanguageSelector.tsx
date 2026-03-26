import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Icon } from 'components/Icon/Icon';

import styles from './LanguageSelector.module.css';

export interface LanguageSelectorProps extends CvElement {
  /** If true, the selector is in active state */
  isActive?: boolean;
  /** Language label to display */
  label?: string;
  /** Callback fired when the selector is clicked */
  onClick?: () => void;
}

export const LanguageSelector = ({
  'data-qa': dataQa,
  id,
  isActive = false,
  label,
  className = '',
  onClick = () => {},
}: LanguageSelectorProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={classNames(styles.root, { [styles.active]: isActive }, className)}
      data-qa={dataQa ? `${dataQa}-language-selector-button` : undefined}
      id={id}
      onClick={handleClick}
    >
      <div className={styles.iconContainer}>
        <Icon name="lang" />
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

import { ReactNode } from 'react';

import classNames from 'classnames';
import { Icon } from 'components';
import { CvElement } from 'types/CvElement';

import styles from './ContentHeader.module.css';

export interface ContentHeaderProps extends CvElement {
  title?: string;
  showBarProgress?: boolean;
  progress?: number;
  total?: number;
  iconName?: string;
  suffix?: ReactNode;
}

export const ContentHeader = ({
  'data-qa': dataQa,
  id,
  title,
  iconName,
  className,
  suffix,
}: ContentHeaderProps) => {
  return (
    <div className={classNames(styles.container, className)} data-qa={dataQa} id={id}>
      <div className={styles.content}>
        <div className={styles.iconAndTitle}>
          {iconName && (
            <div className={styles.iconContainer}>
              <Icon name={iconName} size={32} />
            </div>
          )}
          <p className={styles.title}>{title}</p>
        </div>
        {suffix && <div className={styles.rightArea}>{suffix}</div>}
      </div>
    </div>
  );
};

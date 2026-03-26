import { Children, cloneElement, isValidElement } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { PriorityCard, PriorityCardProps } from 'components/PriorityCard/PriorityCard';

import styles from './PriorityCardList.module.css';

export interface PriorityCardListProps extends CvElement {
  /** PriorityCard elements to render */
  children: React.ReactNode;
  /** If true, renders mobile-optimized view */
  isMobile?: boolean;
}

export const PriorityCardList = ({
  children,
  'data-qa': dataQa,
  id,
  isMobile,
  className = '',
}: PriorityCardListProps) => {
  const childrenArray = Children.toArray(children);
  const validChildren = childrenArray.filter(
    (child): child is React.ReactElement<PriorityCardProps> =>
      isValidElement<PriorityCardProps>(child) && child.type === PriorityCard
  );

  return (
    <div
      className={classNames(styles.root, { [styles.mobile]: isMobile }, className)}
      data-qa={dataQa || undefined}
      id={id}
    >
      {validChildren.map((child, i) => {
        const isLast = i === validChildren.length - 1;

        return cloneElement(child, {
          key: i,
          isMobile,
          className: classNames(child.props.className, {
            [styles.card]: true,
            [styles.cardLast]: isLast,
          }),
        } as Partial<PriorityCardProps>);
      })}
    </div>
  );
};

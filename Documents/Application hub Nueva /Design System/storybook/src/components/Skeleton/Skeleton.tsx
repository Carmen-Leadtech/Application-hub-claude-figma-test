import { ReactNode, CSSProperties } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Skeleton.module.css';

export interface SkeletonProps extends CvElement {
  /** The animation effect. If false, the animation is disabled. */
  animation?: 'pulse' | 'wave' | false;
  /** Optional children to infer width and height from. */
  children?: ReactNode;
  /** Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element. */
  height?: number | string;
  /** Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own. */
  width?: number | string;
  /** The type of content that will be rendered. */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export const Skeleton = ({
  'data-qa': dataQa,
  animation = 'pulse',
  children,
  height,
  id,
  width,
  variant = 'text',
  className = '',
  style,
}: SkeletonProps) => {
  const hasChildren = Boolean(children);
  const hasWidth = width !== undefined;
  const hasHeight = height !== undefined;

  const computedStyle: CSSProperties = {
    ...style,
    ...(hasWidth && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(hasHeight && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  return (
    <span
      data-qa={dataQa || undefined}
      id={id}
      className={classNames(
        styles.root,
        styles[variant],
        {
          [styles.pulse]: animation === 'pulse',
          [styles.wave]: animation === 'wave',
          [styles.withChildren]: hasChildren,
          [styles.fitContent]: hasChildren && !hasWidth,
          [styles.heightAuto]: hasChildren && !hasHeight,
        },
        className
      )}
      style={computedStyle}
    >
      {hasChildren && <span className={styles.childrenWrapper}>{children}</span>}
    </span>
  );
};

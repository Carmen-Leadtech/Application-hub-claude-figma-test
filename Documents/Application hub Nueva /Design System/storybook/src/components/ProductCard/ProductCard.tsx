import { ReactNode, MouseEvent, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Badge } from 'components/Badge/Badge';
import { Button, ButtonProps } from 'components/Button/Button';

import styles from './ProductCard.module.css';

export interface ProductCardProps extends CvElement {
  /** If true, the card spans the full width of its container */
  isFullWidth?: boolean;
  /** Icon element displayed on XS/S sizes */
  icon?: ReactNode;
  /** If true, the card is in selected state */
  selected?: boolean;
  /** Size variant of the card */
  size: 'XS' | 'S' | 'M';
  /** Subtitle or description text */
  subtitle?: string | ReactNode;
  /** Main title text */
  title?: string;
  /** Callback fired when the card is clicked */
  onClick?: (event?: MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>) => void;
  /** Image element displayed on M size */
  image?: ReactNode;
  /** Tag configuration for M size cards when selected */
  tag?: {
    text: string;
    dataQa?: string;
  };
  /**
   * Button configuration for M size cards (when rootElement is 'div').
   * @deprecated Use the `suffix` prop to render a Button, Link, or any custom content instead.
   */
  button?: {
    text: string;
    variant?: ButtonProps['variant'];
    tmEvent?: {
      category: string;
      action: string;
    };
  };
  /**
   * Optional slot for M size cards: content rendered below the text (e.g. Button, Link).
   * When provided, it is used instead of the legacy `button` prop. Use for full flexibility.
   */
  suffix?: ReactNode;
  /** Root element type for M size cards. Defaults to 'div' */
  rootElement?: 'div' | 'button' | 'a';
  /** href attribute when rootElement is 'a' */
  href?: string;
  /** Additional anchor element attributes when rootElement is 'a' */
  anchorProps?: Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'onClick' | 'className' | 'id' | 'data-qa'
  >;
  /** Additional button element attributes when rootElement is 'button' */
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'className' | 'id' | 'data-qa'
  >;
  alignment?: 'left' | 'center';
}

type ProductCardMediumProps = Omit<ProductCardProps, 'icon' | 'size'>;

export const ProductCard = ({
  'data-qa': dataQa,
  isFullWidth,
  icon,
  image,
  id,
  selected = false,
  size = 'S',
  subtitle,
  title,
  tag,
  button,
  className = '',
  onClick = () => {},
  rootElement = 'div',
  href,
  anchorProps,
  buttonProps,
  alignment = 'left',
  suffix,
}: ProductCardProps) => {
  if (size === 'M') {
    return (
      <ProductCardMedium
        data-qa={dataQa ? `${dataQa}-option-item-button` : undefined}
        {...{
          image,
          id,
          selected,
          subtitle,
          title,
          tag,
          button,
          onClick,
          className,
          rootElement,
          href,
          anchorProps,
          buttonProps,
          alignment,
          isFullWidth,
          suffix,
        }}
      />
    );
  }

  return (
    <button
      className={classNames(
        styles.root,
        styles[size],
        styles[alignment],
        {
          [styles.fullWidth]: isFullWidth,
          [styles.selected]: selected,
        },
        className
      )}
      data-qa={dataQa ? `${dataQa}-option-item-button` : undefined}
      id={id}
      onClick={onClick}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.textContainer}>
        <span className={styles.title} data-qa={dataQa ? `${dataQa}-title` : undefined}>
          {title}
        </span>
        <span className={styles.subtitle} data-qa={dataQa ? `${dataQa}-subtitle` : undefined}>
          {subtitle}
        </span>
      </div>
    </button>
  );
};

const ProductCardMedium = ({
  'data-qa': dataQa,
  image,
  id,
  selected = false,
  subtitle,
  title,
  tag,
  button,
  className = '',
  onClick,
  rootElement = 'div',
  href,
  anchorProps,
  buttonProps,
  alignment = 'left',
  isFullWidth = false,
  suffix,
}: ProductCardMediumProps) => {
  const commonProps = {
    className: classNames(
      styles.root,
      styles.M,
      styles[alignment],
      {
        [styles.selected]: selected,
        [styles.fullWidth]: isFullWidth,
      },
      className
    ),
    'data-qa': dataQa ? `${dataQa}-option-item-button` : undefined,
    id,
    onClick,
  };

  const renderActionContent = () => {
    if (suffix != null) {
      return <div className={styles.suffixContainer}>{suffix}</div>;
    }
    if (button && rootElement === 'div') {
      return (
        <div className={styles.suffixContainer}>
          <Button
            data-qa={dataQa || undefined}
            data-tm-type="event"
            data-tm-event-category={button.tmEvent?.category}
            data-tm-event-action={button.tmEvent?.action}
            variant={button.variant}
            shape="rounded"
            isFullWidth
            onClick={onClick}
          >
            {button.text || 'Select'}
          </Button>
        </div>
      );
    }
    return null;
  };

  const content = (
    <>
      {selected && tag && (
        <div className={styles.badgeContainer}>
          <Badge data-qa={tag.dataQa} shape="rounded">
            {tag.text}
          </Badge>
        </div>
      )}
      <div className={styles.flexContainer}>
        {image && <div className={styles.image}>{image}</div>}
        <div className={styles.textContainer}>
          <span data-qa={dataQa ? `${dataQa}-title` : undefined} className={styles.title}>
            {title}
          </span>
          <span data-qa={dataQa ? `${dataQa}-text` : undefined} className={styles.subtitle}>
            {subtitle}
          </span>
        </div>
        {renderActionContent()}
      </div>
    </>
  );

  if (rootElement === 'a') {
    const anchorAttributes =
      typeof href !== 'undefined' ? { href, ...anchorProps } : { ...anchorProps };
    return (
      <a {...commonProps} {...anchorAttributes}>
        {content}
      </a>
    );
  }

  if (rootElement === 'button') {
    return (
      <button {...commonProps} {...buttonProps}>
        {content}
      </button>
    );
  }

  return <div {...commonProps}>{content}</div>;
};

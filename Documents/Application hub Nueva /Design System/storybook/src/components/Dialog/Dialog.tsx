import { ReactNode, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useBreakPoint } from 'hooks/useBreakPoint/useBreakPoint';
import { CvElement } from 'types/CvElement';

import { ButtonIcon } from 'components/ButtonIcon/ButtonIcon';
import { Icon } from 'components/Icon/Icon';

import styles from './Dialog.module.css';

export interface DialogProps extends CvElement {
  /** ID of the element that describes the dialog */
  'aria-describedby'?: string;
  /** ID of the element that labels the dialog */
  'aria-labelledby'?: string;
  /** Props passed to the close button */
  buttonIconCloseProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Content of the dialog */
  children?: ReactNode;
  /** Optional header label displayed at the top of the dialog */
  headerLabel?: string;
  /** If true prevents user from closing the dialog by clicking outside of the dialog */
  isClickOutsideDisabled?: boolean;
  /** If true, enables grow animation */
  isEnableGrow?: boolean;
  /** If true, the dialog takes up the full screen */
  isFullScreen?: boolean;
  /** If true, the dialog stretches to maxWidth */
  isFullWidth?: boolean;
  /** If true, the dialog is open */
  isOpen?: boolean;
  /** Maximum width of the dialog */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** Props passed to the paper element */
  paperProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Scroll behavior of the dialog */
  scroll?: 'body' | 'paper';
  /** If true, shows the close button */
  showCloseButton?: boolean;
  /** Callback fired when the dialog requests to be closed */
  onClose?: (
    event: KeyboardEvent | React.MouseEvent,
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick'
  ) => void;
  /** Callback fired when the dialog has entered */
  onEntered?: () => void;
}

const maxWidthMap = {
  xs: styles.maxWidthXs,
  sm: styles.maxWidthSm,
  md: styles.maxWidthMd,
  lg: styles.maxWidthLg,
  xl: styles.maxWidthXl,
};

export const Dialog = ({
  'aria-describedby': ariaDescribedby,
  'aria-labelledby': ariaLabelledby,
  'data-qa': dataQa,
  buttonIconCloseProps,
  children,
  className = '',
  headerLabel,
  id,
  isClickOutsideDisabled = false,
  isEnableGrow = false,
  isFullScreen = false,
  isFullWidth = false,
  isOpen = false,
  maxWidth = 'sm',
  paperProps,
  scroll = 'paper',
  showCloseButton = false,
  onClose,
  onEntered,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const bodyOverflowRef = useRef<string | null>(null);

  const [shouldRender, setShouldRender] = useState(isOpen);

  const { isDesktop, isMobile } = useBreakPoint();

  const isScrollBody = scroll === 'body';

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isFullScreen) {
      if (bodyOverflowRef.current === null) {
        bodyOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = bodyOverflowRef.current ?? '';
        bodyOverflowRef.current = null;
      };
    }
    return undefined;
  }, [isOpen, isFullScreen]);

  useEffect(() => {
    if (isEnableGrow) {
      if (isOpen) {
        setShouldRender(true);
      } else {
        setShouldRender(false);
      }
    } else {
      setShouldRender(isOpen);
    }
  }, [isOpen, isEnableGrow]);

  useEffect(() => {
    if (isOpen && onEntered) {
      if (isEnableGrow) {
        // Wait for the animation to complete (300ms as defined in CSS)
        const timeoutId = setTimeout(() => {
          onEntered();
        }, 300);
        return () => clearTimeout(timeoutId);
      } else {
        onEntered();
      }
    }
  }, [isOpen, onEntered, isEnableGrow]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape' && onClose) {
        onClose(event, 'escapeKeyDown');
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === backdropRef.current && onClose && !isClickOutsideDisabled) {
      onClose(event, 'backdropClick');
    }
  };

  const handleCloseButtonClick = (event: React.MouseEvent) => {
    if (onClose) {
      onClose(event, 'closeButtonClick');
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={classNames(className, styles.backdrop, {
        [styles.backdropMobileFullScreen]: isMobile && isFullScreen,
        [styles.backdropDesktop]: isDesktop && !isScrollBody,
        [styles.backdropScrollBody]: isScrollBody,
      })}
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        className={classNames(styles.dialog, {
          [maxWidthMap[maxWidth as keyof typeof maxWidthMap]]: maxWidth !== false && isDesktop,
          [styles.dialogDesktop]: isDesktop,
          [styles.dialogScrollBody]: isScrollBody,
          [styles.fullScreen]: isFullScreen,
          [styles.fullWidth]: isFullWidth,
          [styles.fullWidthDesktop]: isFullWidth && isDesktop,
          [styles.grow]: isEnableGrow,
          [styles.scrollPaper]: !isScrollBody,
          [styles.withHeader]: Boolean(headerLabel),
        })}
        data-qa={dataQa || undefined}
        id={id}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        {...paperProps}
      >
        {showCloseButton && (
          <ButtonIcon
            aria-label="Close dialog"
            className={styles.closeButton}
            data-qa={`${dataQa}-close-button`}
            variant="neutral"
            onClick={handleCloseButtonClick}
            {...buttonIconCloseProps}
          >
            <Icon name="close" size={12} />
          </ButtonIcon>
        )}
        {headerLabel && <div className={styles.header}>{headerLabel}</div>}
        {headerLabel ? <div className={styles.content}>{children}</div> : children}
      </div>
    </div>
  );
};

import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { createPortal } from 'react-dom';

import styles from './Popover.module.css';

const SPACING = 8;
const VIEWPORT_PADDING = 16;
const FALLBACK_WIDTH = 200;
const FALLBACK_HEIGHT = 100;
const ANIMATION_DELAY = 16;
const FALLBACK_TIMEOUT = 50;

type PlacementType = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

interface Position {
  top: number;
  left: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface SpaceInfo {
  above: number;
  below: number;
  left: number;
  right: number;
}

export interface PopoverProps extends CvElement {
  /** Element that the popover is anchored to */
  anchorEl: HTMLElement | null;
  /** Content of the popover */
  children?: ReactNode;
  /** Container element for the portal */
  container?: Element | null;
  /** If true, the popover is open */
  open?: boolean;
  /** Placement of the popover relative to the anchor */
  placement?: PlacementType;
  /** Callback fired when the popover requests to be closed */
  onClose: () => void;
}

const getScrollOffset = () => ({
  x: window.pageXOffset || document.documentElement.scrollLeft,
  y: window.pageYOffset || document.documentElement.scrollTop,
});

const getAvailableSpace = (anchorRect: DOMRect): SpaceInfo => ({
  above: anchorRect.top,
  below: window.innerHeight - anchorRect.bottom,
  left: anchorRect.left,
  right: window.innerWidth - anchorRect.right,
});

const getDimensions = (rect: DOMRect): Dimensions => ({
  width: rect.width || FALLBACK_WIDTH,
  height: rect.height || FALLBACK_HEIGHT,
});

const getOptimalPlacement = (
  requestedPlacement: PlacementType,
  space: SpaceInfo,
  popoverDimensions: Dimensions
): PlacementType => {
  let actualPlacement = requestedPlacement;
  const { width: popoverWidth, height: popoverHeight } = popoverDimensions;
  const requiredSpace = SPACING + VIEWPORT_PADDING;

  if (requestedPlacement.startsWith('bottom-')) {
    const fitsBelow = space.below >= popoverHeight + requiredSpace;
    const fitsAbove = space.above >= popoverHeight + requiredSpace;
    if (!fitsBelow && fitsAbove) {
      actualPlacement = requestedPlacement.replace('bottom-', 'top-') as PlacementType;
    }
  } else if (requestedPlacement.startsWith('top-')) {
    const fitsAbove = space.above >= popoverHeight + requiredSpace;
    const fitsBelow = space.below >= popoverHeight + requiredSpace;
    if (!fitsAbove && fitsBelow) {
      actualPlacement = requestedPlacement.replace('top-', 'bottom-') as PlacementType;
    }
  }

  if (actualPlacement.endsWith('-left')) {
    const fitsLeft = space.right >= popoverWidth + requiredSpace;
    const fitsRight = space.left >= popoverWidth + requiredSpace;
    if (!fitsLeft && fitsRight) {
      actualPlacement = actualPlacement.replace('-left', '-right') as PlacementType;
    }
  } else if (actualPlacement.endsWith('-right')) {
    const fitsRight = space.left >= popoverWidth + requiredSpace;
    const fitsLeft = space.right >= popoverWidth + requiredSpace;
    if (!fitsRight && fitsLeft) {
      actualPlacement = actualPlacement.replace('-right', '-left') as PlacementType;
    }
  }

  return actualPlacement;
};

const calculatePositionForPlacement = (
  placement: PlacementType,
  anchorRect: DOMRect,
  popoverDimensions: Dimensions,
  scrollOffset: { x: number; y: number }
): Position => {
  const { width: popoverWidth, height: popoverHeight } = popoverDimensions;

  switch (placement) {
    case 'top-left':
      return {
        top: anchorRect.top + scrollOffset.y - popoverHeight - SPACING,
        left: anchorRect.left + scrollOffset.x,
      };
    case 'top-right':
      return {
        top: anchorRect.top + scrollOffset.y - popoverHeight - SPACING,
        left: anchorRect.right + scrollOffset.x - popoverWidth,
      };
    case 'bottom-left':
      return {
        top: anchorRect.bottom + scrollOffset.y + SPACING,
        left: anchorRect.left + scrollOffset.x,
      };
    case 'bottom-right':
      return {
        top: anchorRect.bottom + scrollOffset.y + SPACING,
        left: anchorRect.right + scrollOffset.x - popoverWidth,
      };
  }
};

const constrainToViewport = (
  position: Position,
  popoverDimensions: Dimensions,
  scrollOffset: { x: number; y: number }
): Position => {
  const { width: popoverWidth, height: popoverHeight } = popoverDimensions;

  const minLeft = scrollOffset.x + VIEWPORT_PADDING;
  const maxLeft = scrollOffset.x + window.innerWidth - popoverWidth - VIEWPORT_PADDING;
  const minTop = scrollOffset.y + VIEWPORT_PADDING;
  const maxTop = scrollOffset.y + window.innerHeight - popoverHeight - VIEWPORT_PADDING;

  return {
    left: Math.max(minLeft, Math.min(maxLeft, position.left)),
    top: Math.max(minTop, Math.min(maxTop, position.top)),
  };
};

export const Popover = ({
  anchorEl,
  children,
  container,
  'data-qa': dataQa,
  id,
  open = false,
  placement = 'bottom-left',
  className = '',
  onClose,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  const calculatePosition = useCallback(() => {
    if (!popoverRef.current || !anchorEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollOffset = getScrollOffset();

    const popoverDimensions = getDimensions(popoverRect);
    const availableSpace = getAvailableSpace(anchorRect);
    const optimalPlacement = getOptimalPlacement(placement, availableSpace, popoverDimensions);

    let calculatedPosition = calculatePositionForPlacement(
      optimalPlacement,
      anchorRect,
      popoverDimensions,
      scrollOffset
    );

    calculatedPosition = {
      top: isNaN(calculatedPosition.top)
        ? anchorRect.bottom + scrollOffset.y + SPACING
        : calculatedPosition.top,
      left: isNaN(calculatedPosition.left)
        ? anchorRect.left + scrollOffset.x
        : calculatedPosition.left,
    };

    calculatedPosition = constrainToViewport(calculatedPosition, popoverDimensions, scrollOffset);

    setPosition(calculatedPosition);
    setTimeout(() => setIsPositioned(true), ANIMATION_DELAY);
  }, [anchorEl, placement]);

  useLayoutEffect(() => {
    if (!open || !anchorEl || !popoverRef.current) {
      if (!open) setIsPositioned(false);
      return;
    }

    setIsPositioned(false);

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        calculatePosition();
        resizeObserver.disconnect();
      }
    });

    resizeObserver.observe(popoverRef.current);

    const fallbackTimeout = setTimeout(() => {
      calculatePosition();
      resizeObserver.disconnect();
    }, FALLBACK_TIMEOUT);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(fallbackTimeout);
    };
  }, [open, anchorEl, placement, calculatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [open, calculatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickOutside =
        popoverRef.current &&
        anchorEl &&
        !popoverRef.current.contains(target) &&
        !anchorEl.contains(target);

      if (isClickOutside) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open, onClose, anchorEl]);

  if (!open || !anchorEl) {
    return null;
  }

  const portalContainer = container ?? document.body;

  return createPortal(
    <div role="presentation" tabIndex={-1}>
      <div
        className={classNames(styles.root, { [styles.visible]: isPositioned }, className)}
        ref={popoverRef}
        id={id}
        data-qa={dataQa || undefined}
        tabIndex={0}
        style={{ top: position.top, left: position.left }}
      >
        {children}
      </div>
    </div>,
    portalContainer
  );
};

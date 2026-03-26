import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Tab, TabProps } from 'components/Tab/Tab';

import styles from './Tabs.module.css';

export interface TabsProps extends CvElement {
  /** Tab elements to render */
  children: React.ReactElement<TabProps>[];
  /** Size of the tabs */
  size?: 'S' | 'M';
  /** Index of the currently selected tab (controlled) */
  value?: number;
  /** Callback fired when the selected tab changes */
  onChange?: (event: React.SyntheticEvent, value: number) => void;
}

export const Tabs = ({
  children,
  'data-qa': dataQa,
  size = 'M',
  value,
  className = '',
  onChange,
}: TabsProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [internalValue, setInternalValue] = useState(0);
  const active = value ?? internalValue;

  const changeTab = (event: React.SyntheticEvent, index: number) => {
    if (onChange) {
      onChange(event, index);
    } else {
      setInternalValue(index);
    }
  };

  const updateIndicator = useCallback(() => {
    const currentTab = tabsRef.current[active];
    const container = containerRef.current;

    // Verify all refs are available
    if (!currentTab || !indicatorRef.current || !container) {
      return;
    }

    // Verify the tab is actually rendered (has dimensions)
    const tabRect = currentTab.getBoundingClientRect();
    if (tabRect.width === 0 || tabRect.height === 0) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const left = tabRect.left - containerRect.left;
    const width = tabRect.width;

    if (indicatorRef.current) {
      indicatorRef.current.style.transform = `translateX(${left}px)`;
      indicatorRef.current.style.width = `${width}px`;
    }
  }, [active]);

  // Use ResizeObserver to detect when tabs have real dimensions
  useEffect(() => {
    const currentTab = tabsRef.current[active];
    if (!currentTab || !indicatorRef.current) {
      return;
    }

    // Create ResizeObserver to watch the active tab
    resizeObserverRef.current = new ResizeObserver(() => {
      updateIndicator();
    });

    resizeObserverRef.current.observe(currentTab);

    // Also observe the container for layout changes
    if (containerRef.current) {
      resizeObserverRef.current.observe(containerRef.current);
    }

    // Initial update with retry logic for cases where tabs are inside animated containers
    const attemptUpdate = () => {
      const tabRect = currentTab.getBoundingClientRect();
      if (tabRect.width === 0 || tabRect.height === 0) {
        // Retry after a short delay if dimensions are not available yet
        // This helps when tabs are inside animated dialogs or other containers
        setTimeout(() => {
          updateIndicator();
        }, 50);
      } else {
        updateIndicator();
      }
    };

    // Try immediately
    attemptUpdate();

    // Also try after a delay to catch cases where parent animations complete
    const delayedUpdate = setTimeout(() => {
      updateIndicator();
    }, 350); // Slightly longer than typical dialog animation (300ms)

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      clearTimeout(delayedUpdate);
    };
  }, [active, updateIndicator, children]);

  // Also update on window resize
  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const count = Children.count(children);
    let newIndex = active;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (active + 1) % count;
        break;
      case 'ArrowLeft':
        newIndex = (active - 1 + count) % count;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = count - 1;
        break;
      default:
        return;
    }

    tabsRef.current[newIndex]?.focus();
    changeTab(e, newIndex);
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      aria-label="Tabs"
      className={classNames(
        styles.root,
        {
          [styles.sizeS]: size === 'S',
          [styles.sizeM]: size === 'M',
        },
        className
      )}
      role="tablist"
      onKeyDown={handleKeyDown}
      data-qa={dataQa || undefined}
    >
      {Children.map(children, (child, i) => {
        if (!isValidElement<TabProps>(child) || child.type !== Tab) {
          return null;
        }

        const tabId = `tab-${i}`;
        const panelId = `tabpanel-${i}`;
        const isActive = active === i;

        return cloneElement(child, {
          id: tabId,
          key: i,
          ref: (el: HTMLButtonElement | null) => {
            tabsRef.current[i] = el;
          },
          active: isActive,
          size,
          tabIndex: isActive ? 0 : -1,
          'aria-controls': panelId,
          'aria-selected': isActive,
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            changeTab(e, i);
            child.props.onClick?.(e);
          },
        } as Partial<TabProps>);
      })}
      <div ref={indicatorRef} className={styles.indicator} />
    </div>
  );
};

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { act, render, waitFor } from '@testing-library/react';

import { Icon, clearIconCache } from './Icon';

describe('Icon Component', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    clearIconCache();
    // Mock import.meta.glob for tests
    vi.mock('./Icon', async () => {
      const actual = await vi.importActual('./Icon');
      return {
        ...actual,
        default: actual.Icon,
      };
    });
    consoleErrorSpy.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should render SVG content', async () => {
      const { container } = render(<Icon name="add" />);

      await waitFor(
        () => {
          const wrapper = container.querySelector('[class*="root"]');
          expect(wrapper).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it('should apply data-qa attribute', async () => {
      const { container } = render(<Icon name="home" data-qa="test-icon" />);

      await waitFor(() => {
        const wrapper = container.querySelector('[class*="root"]');
        expect(wrapper).toHaveAttribute('data-qa', 'test-icon');
      });
    });

    it('should render empty placeholder while loading', async () => {
      global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));

      let container: HTMLElement;
      await act(async () => {
        const result = render(<Icon name="loading" />);
        container = result.container;
        // Allow the useEffect to run and stabilize
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      await waitFor(() => {
        const wrapper = container!.querySelector('[class*="root"]');
        expect(wrapper).toBeInTheDocument();
      });
    });
  });

  describe('Icon Names', () => {
    it('should handle snake_case names', async () => {
      const { container } = render(<Icon name="arrow_back" />);

      await waitFor(
        () => {
          const wrapper = container.querySelector('[class*="root"]');
          expect(wrapper).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle missing icons gracefully', async () => {
      const { container } = render(<Icon name="non_existent_icon_12345" />);

      await waitFor(
        () => {
          const wrapper = container.querySelector('[class*="root"]');
          expect(wrapper).toBeInTheDocument();
          expect(wrapper).toHaveAttribute('title', 'Error loading non_existent_icon_12345');
        },
        { timeout: 3000 }
      );
    });
  });

  describe('Caching Behavior', () => {
    it('should cache and reuse the same icon', async () => {
      const { container, rerender } = render(
        <>
          <Icon name="add" />
          <Icon name="add" />
        </>
      );

      await waitFor(
        () => {
          expect(container.querySelectorAll('[class*="root"]').length).toBeGreaterThan(0);
        },
        { timeout: 3000 }
      );

      await act(async () => {
        rerender(
          <>
            <Icon name="add" />
            <Icon name="add" />
            <Icon name="add" />
          </>
        );
      });

      await waitFor(() => {
        expect(container.querySelectorAll('[class*="root"]').length).toBe(3);
      });
    });

    it('should load different icons independently', async () => {
      const { container } = render(
        <>
          <Icon name="add" />
          <Icon name="delete" />
          <Icon name="error" />
        </>
      );

      await waitFor(
        () => {
          const wrappers = container.querySelectorAll('[class*="root"]');
          expect(wrappers.length).toBe(3);
        },
        { timeout: 3000 }
      );
    });
  });

  describe('ClassName prop', () => {
    it('applies custom className prop', async () => {
      const { container } = render(<Icon name="add" className="custom-class" />);

      await waitFor(
        () => {
          const wrapper = container.querySelector('[class*="root"]');
          expect(wrapper).toBeInTheDocument();
          expect(wrapper).toHaveClass('custom-class');
        },
        { timeout: 3000 }
      );
    });
  });
});

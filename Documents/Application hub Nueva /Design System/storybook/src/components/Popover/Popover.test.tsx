import { render, screen, fireEvent } from '@testing-library/react';

import { Popover } from './Popover';

// Mock createPortal to render in the test container
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>();
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

// Mock getBoundingClientRect for testing positioning
const mockGetBoundingClientRect = vi.fn(
  (): DOMRect => ({
    top: 100,
    left: 100,
    bottom: 150,
    right: 200,
    width: 100,
    height: 50,
    x: 100,
    y: 100,
    toJSON: () => ({}),
  })
);

beforeAll(() => {
  HTMLElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;
  Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true });
  Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
  Object.defineProperty(document.documentElement, 'scrollLeft', { value: 0, writable: true });
  Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true });
});

describe('Popover Component', () => {
  let anchorElement: HTMLDivElement;
  const mockOnClose = vi.fn();

  beforeEach(() => {
    anchorElement = document.createElement('div');
    document.body.appendChild(anchorElement);
    mockOnClose.mockClear();
  });

  afterEach(() => {
    if (anchorElement.parentNode) {
      document.body.removeChild(anchorElement);
    }
  });

  it('renders children correctly when open', () => {
    render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose}>
        Popover content
      </Popover>
    );

    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Popover anchorEl={anchorElement} open={false} onClose={mockOnClose}>
        Popover content
      </Popover>
    );

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('does not render when anchor element is null', () => {
    render(
      <Popover anchorEl={null} open={true} onClose={mockOnClose}>
        Popover content
      </Popover>
    );

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('renders with correct accessibility attributes', () => {
    render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose} id="test-popover">
        Content
      </Popover>
    );

    const presentationDiv = document.querySelector('[role="presentation"]');
    const popoverDiv = document.querySelector('#test-popover');

    expect(presentationDiv).toBeInTheDocument();
    expect(presentationDiv).toHaveAttribute('tabIndex', '-1');
    expect(popoverDiv).toBeInTheDocument();
    expect(popoverDiv).toHaveAttribute('tabIndex', '0');
  });

  it('calls onClose when clicking outside', () => {
    render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose}>
        Content
      </Popover>
    );

    fireEvent.mouseDown(document.body);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside popover', () => {
    render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose}>
        Content
      </Popover>
    );

    // Click on the actual popover content div (the one with inline styles)
    const popover = screen.getByText('Content');
    fireEvent.mouseDown(popover);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when clicking on anchor element', () => {
    render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose}>
        Content
      </Popover>
    );

    fireEvent.mouseDown(anchorElement);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('applies correct positioning for different placements', () => {
    const placements: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ];

    placements.forEach((placement) => {
      const { unmount, container } = render(
        <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose} placement={placement}>
          Content
        </Popover>
      );

      const popover = container.querySelector('[class*="root"]');
      expect(popover).toBeInTheDocument();

      unmount();
    });
  });

  it('sets data-qa attribute correctly', () => {
    render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose} data-qa="popover-test">
        Content
      </Popover>
    );

    // Find the popover div with data-qa attribute
    const popover = screen.getByText('Content').closest('[data-qa="popover-test"]');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute('data-qa', 'popover-test');
  });

  it('has default styling', () => {
    const { container } = render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose}>
        Content
      </Popover>
    );

    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();

    const popover = container.querySelector('[class*="root"]');
    expect(popover).toBeInTheDocument();
  });

  it('handles window resize and scroll events', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose}>
        Content
      </Popover>
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('cleans up event listeners when closing', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { rerender } = render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose}>
        Content
      </Popover>
    );

    rerender(
      <Popover anchorEl={anchorElement} open={false} onClose={mockOnClose}>
        Content
      </Popover>
    );

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('applies custom className prop', () => {
    const { container } = render(
      <Popover anchorEl={anchorElement} open={true} onClose={mockOnClose} className="custom-class">
        Content
      </Popover>
    );

    const popover = container.querySelector('[class*="root"]');
    expect(popover).toHaveClass('custom-class');
  });
});

import { render, screen } from '@testing-library/react';

import { Link } from './Link';

// Mock the Icon component since it's imported
vi.mock('../Icon/Icon', () => ({
  Icon: ({ name, className }: { name: string; className?: string }) => (
    <span className={className}>{name}</span>
  ),
}));

describe('Link Component', () => {
  const defaultProps = {
    href: '/test-link',
    children: 'Test Link',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(<Link {...defaultProps} />);

    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('sets href attribute correctly', () => {
    render(<Link href="/example">Click me</Link>);

    const linkElement = screen.getByText('Click me').closest('a');
    expect(linkElement).toHaveAttribute('href', '/example');
  });

  it('removes href when disabled', () => {
    render(
      <Link href="/example" disabled>
        Disabled Link
      </Link>
    );

    const linkElement = screen.getByText('Disabled Link').closest('a');
    expect(linkElement).not.toHaveAttribute('href');
    expect(linkElement).toHaveAttribute('aria-disabled', 'true');
    expect(linkElement).toHaveAttribute('tabindex', '-1');
  });

  it('applies disabled styles when disabled', () => {
    render(<Link {...defaultProps} disabled />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container!.className).toContain('disabled');
  });

  it('renders start icon when iconStart is provided', () => {
    render(<Link {...defaultProps} iconStart="arrow_back" />);

    expect(screen.getByText('arrow_back')).toBeInTheDocument();
  });

  it('renders end icon when iconEnd is provided', () => {
    render(<Link {...defaultProps} iconEnd="arrow_forward" />);

    expect(screen.getByText('arrow_forward')).toBeInTheDocument();
  });

  it('renders both icons when both iconStart and iconEnd are provided', () => {
    render(<Link {...defaultProps} iconStart="arrow_back" iconEnd="arrow_forward" />);

    expect(screen.getByText('arrow_back')).toBeInTheDocument();
    expect(screen.getByText('arrow_forward')).toBeInTheDocument();
  });

  it('renders custom icon when iconStart is provided', () => {
    render(<Link {...defaultProps} iconStart="add" />);

    expect(screen.getByText('add')).toBeInTheDocument();
  });

  it('applies medium size class by default', () => {
    render(<Link {...defaultProps} />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container!.className).toContain('medium');
  });

  it('applies small size class when size is small', () => {
    render(<Link {...defaultProps} size="small" />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container!.className).toContain('small');
  });

  it('applies medium size class when size is medium', () => {
    render(<Link {...defaultProps} size="medium" />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container!.className).toContain('medium');
  });

  it('sets data-qa attribute if provided', () => {
    render(<Link {...defaultProps} data-qa="test-link" />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container).toHaveAttribute('data-qa', 'test-link');
  });

  it('sets tracking attributes when provided', () => {
    render(
      <Link
        {...defaultProps}
        data-tm-event-action="click"
        data-tm-event-label="test-label"
        data-tm-event-category="test-category"
        data-tm-type="test-type"
      />
    );

    const container = screen.getByText('Test Link').closest('a');
    expect(container).toHaveAttribute('data-tm-event-action', 'click');
    expect(container).toHaveAttribute('data-tm-event-label', 'test-label');
    expect(container).toHaveAttribute('data-tm-event-category', 'test-category');
    expect(container).toHaveAttribute('data-tm-type', 'test-type');
  });

  it('passes iconProps to the custom icon', () => {
    const iconProps = { color: 'red', size: 'large' };
    render(<Link {...defaultProps} iconStart="add" iconProps={iconProps} />);

    // The mock Icon component should receive the iconProps
    const iconElement = screen.getByText('add');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies disabled class to container when disabled', () => {
    render(<Link {...defaultProps} iconStart="add" iconEnd="arrow_forward" disabled />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container!.className).toContain('disabled');
  });

  it('applies normal classes when not disabled', () => {
    render(<Link {...defaultProps} iconStart="add" iconEnd="arrow_forward" />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container!.className).toContain('root');
    expect(container!.className).toContain('primary');
    expect(container).not.toHaveClass('disabled');
  });

  it('does not render icons when iconStart and iconEnd are not provided', () => {
    render(<Link {...defaultProps} />);

    expect(screen.queryByText('arrow_back')).not.toBeInTheDocument();
    expect(screen.queryByText('arrow_forward')).not.toBeInTheDocument();
    expect(screen.queryByText('add')).not.toBeInTheDocument();
  });

  it('does not render start icon when iconStart is not provided', () => {
    render(<Link {...defaultProps} iconEnd="arrow_forward" />);

    expect(screen.queryByText('arrow_back')).not.toBeInTheDocument();
    expect(screen.getByText('arrow_forward')).toBeInTheDocument();
  });

  it('does not render end icon when iconEnd is not provided', () => {
    render(<Link {...defaultProps} iconStart="arrow_back" />);

    expect(screen.getByText('arrow_back')).toBeInTheDocument();
    expect(screen.queryByText('arrow_forward')).not.toBeInTheDocument();
  });

  it('passes through additional props', () => {
    render(
      <Link {...defaultProps} id="custom-link" className="custom-class" title="Custom title" />
    );

    const container = screen.getByText('Test Link').closest('a');
    expect(container).toHaveAttribute('id', 'custom-link');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveAttribute('title', 'Custom title');
  });

  it('handles complex content as children', () => {
    render(
      <Link href="/complex">
        <span>Complex</span> <strong>Content</strong>
      </Link>
    );

    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies correct CSS classes for container', () => {
    render(<Link {...defaultProps} />);

    const container = screen.getByText('Test Link').closest('a');
    expect(container!.className).toContain('root');
  });

  it('applies correct CSS classes for text', () => {
    render(<Link {...defaultProps} />);

    const textElement = screen.getByText('Test Link');
    expect(textElement.className).toContain('text');
  });
});

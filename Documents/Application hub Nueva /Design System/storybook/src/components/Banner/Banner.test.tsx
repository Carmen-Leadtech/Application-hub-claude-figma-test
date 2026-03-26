import { render, screen } from '@testing-library/react';

import { Banner } from './Banner';

describe('Banner Component', () => {
  const defaultProps = {
    'data-qa': 'test-banner',
    id: 'test-id',
  };

  it('renders custom title correctly', () => {
    render(<Banner {...defaultProps} title="Custom Title" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders custom description correctly', () => {
    render(<Banner {...defaultProps} description="Custom description text" />);

    expect(screen.getByText('Custom description text')).toBeInTheDocument();
  });

  it('adds the correct data-qa attribute', () => {
    const { container } = render(<Banner {...defaultProps} />);

    expect(container.querySelector('[data-qa="test-banner"]')).toBeInTheDocument();
  });

  it('adds the correct id attribute', () => {
    const { container } = render(<Banner {...defaultProps} />);

    expect(container.querySelector('#test-id')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Banner {...defaultProps} className="custom-class" />);

    const element = container.querySelector('[data-qa="test-banner"]');

    expect(element).toHaveClass('custom-class');
  });

  it('renders icon with default icon name', () => {
    render(<Banner {...defaultProps} iconName="magic" />);

    const icons = screen.getAllByRole('img');

    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders icon with custom icon name', () => {
    render(<Banner {...defaultProps} iconName="ai_stars" />);

    const icons = screen.getAllByRole('img');

    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders illustration when provided', () => {
    const { container } = render(
      <Banner {...defaultProps} image="https://example.com/image.png" />
    );

    const img = container.querySelector('img[src="https://example.com/image.png"]');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Banner image');
  });

  it('does not render illustration when not provided', () => {
    const { container } = render(<Banner {...defaultProps} />);

    const img = container.querySelector('img[src]');

    expect(img).not.toBeInTheDocument();
  });

  it('renders complete structure with all elements', () => {
    const { container } = render(
      <Banner
        {...defaultProps}
        title="Complete Test"
        description="Complete description"
        iconName="badge_coach"
        image="https://example.com/test.png"
      />
    );

    expect(screen.getByText('Complete Test')).toBeInTheDocument();
    expect(screen.getByText('Complete description')).toBeInTheDocument();

    const icons = screen.getAllByRole('img');

    expect(icons.length).toBeGreaterThan(0);

    const img = container.querySelector('img[src="https://example.com/test.png"]');

    expect(img).toBeInTheDocument();
  });

  it('renders without data-qa when not provided', () => {
    const { container } = render(<Banner id="no-qa-test" title="No QA" />);

    expect(container.querySelector('#no-qa-test')).toBeInTheDocument();
    expect(container.querySelector('[data-qa]')).not.toBeInTheDocument();
  });

  it('renders without id when not provided', () => {
    render(<Banner data-qa="qa-only" title="QA Only" />);

    expect(screen.getByText('QA Only')).toBeInTheDocument();
  });

  it('renders with all custom props', () => {
    render(
      <Banner
        {...defaultProps}
        iconName="target"
        title="Goal Tracking"
        description="Track your progress"
        image="https://example.com/goal.png"
        className="custom-banner"
      />
    );

    expect(screen.getByText('Goal Tracking')).toBeInTheDocument();
    expect(screen.getByText('Track your progress')).toBeInTheDocument();
  });

  it('preserves whitespace in description with pre-wrap', () => {
    const multilineDescription = 'Line 1\nLine 2\nLine 3';

    render(<Banner {...defaultProps} description={multilineDescription} />);

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'p' &&
          content.includes('Line 1') &&
          content.includes('Line 2') &&
          content.includes('Line 3')
        );
      })
    ).toBeInTheDocument();
  });
});

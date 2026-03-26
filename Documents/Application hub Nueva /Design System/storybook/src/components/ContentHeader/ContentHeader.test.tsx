import { render, screen } from '@testing-library/react';

import { ContentHeader } from './ContentHeader';

describe('ContentHeader Component', () => {
  const defaultProps = {
    'data-qa': 'test-header',
    id: 'test-id',
  };

  it('renders with default values', () => {
    const { container } = render(<ContentHeader {...defaultProps} />);

    expect(container.querySelector('[data-qa="test-header"]')).toBeInTheDocument();
    expect(container.querySelector('#test-id')).toBeInTheDocument();
  });

  it('renders custom title correctly', () => {
    render(<ContentHeader {...defaultProps} title="Custom Title" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('adds the correct data-qa attribute', () => {
    const { container } = render(<ContentHeader {...defaultProps} />);

    expect(container.querySelector('[data-qa="test-header"]')).toBeInTheDocument();
  });

  it('adds the correct id attribute', () => {
    const { container } = render(<ContentHeader {...defaultProps} />);

    expect(container.querySelector('#test-id')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ContentHeader {...defaultProps} className="custom-class" />);

    const element = container.querySelector('[data-qa="test-header"]');

    expect(element).toHaveClass('custom-class');
  });

  it('does not render icon when iconName is not provided', () => {
    render(<ContentHeader {...defaultProps} title="No Icon" />);

    const icons = screen.queryAllByRole('img');

    expect(icons.length).toBe(0);
  });

  it('renders icon with custom icon name', async () => {
    render(<ContentHeader {...defaultProps} iconName="contact" />);

    const icons = await screen.findAllByRole('img');

    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders complete structure with all elements', async () => {
    render(
      <ContentHeader
        {...defaultProps}
        title="Complete Test"
        iconName="assessment"
        suffix={<span>3/6</span>}
      />
    );

    expect(screen.getByText('Complete Test')).toBeInTheDocument();

    const icons = await screen.findAllByRole('img');

    expect(icons.length).toBeGreaterThan(0);

    const suffix = screen.getAllByText('3/6');

    expect(suffix.length).toBeGreaterThan(0);
  });

  it('renders without data-qa when not provided', () => {
    const { container } = render(<ContentHeader id="no-qa-test" title="No QA" />);

    expect(container.querySelector('#no-qa-test')).toBeInTheDocument();
    expect(container.querySelector('[data-qa]')).not.toBeInTheDocument();
  });

  it('renders without id when not provided', () => {
    render(<ContentHeader data-qa="qa-only" title="QA Only" />);

    expect(screen.getByText('QA Only')).toBeInTheDocument();
  });
});

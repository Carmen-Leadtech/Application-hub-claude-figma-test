import { render, screen } from '@testing-library/react';

import { SuggestionCard } from './SuggestionCard';

describe('SuggestionCard Component', () => {
  const defaultProps = {
    badgeText: 'Suggestion 1 (recommended)',
    items: [
      'Copyable text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Maecenas tellus ante, fermentum id leo quis, pellentesque dapibus lectus.',
    ],
  };

  it('renders all list items correctly', () => {
    render(<SuggestionCard {...defaultProps} />);

    expect(screen.getByText(/Copyable text/)).toBeInTheDocument();
    expect(screen.getByText(/Maecenas tellus/)).toBeInTheDocument();
  });

  it('sets data-qa attributes when provided', () => {
    const { container } = render(
      <SuggestionCard {...defaultProps} data-qa="suggestion-content" showBadge />
    );

    const badge = container.querySelector('[data-qa="suggestion-content-badge"]');
    expect(badge).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveAttribute('data-qa', 'suggestion-content-list');
  });

  it('does not set data-qa attributes when not provided', () => {
    const { container } = render(<SuggestionCard {...defaultProps} />);

    const elementsWithDataQa = container.querySelectorAll('[data-qa]');
    expect(elementsWithDataQa.length).toBe(0);
  });

  it('sets id attribute when provided', () => {
    const { container } = render(<SuggestionCard {...defaultProps} id="test-id" />);

    expect(container.firstChild).toHaveAttribute('id', 'test-id');
  });

  it('applies custom className prop', () => {
    const { container } = render(<SuggestionCard {...defaultProps} className="custom-class" />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });

  it('renders suffix when provided', () => {
    render(<SuggestionCard {...defaultProps} suffix={<span>Suffix content</span>} />);

    expect(screen.getByText('Suffix content')).toBeInTheDocument();
  });

  it('renders list with correct number of items', () => {
    render(<SuggestionCard {...defaultProps} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(defaultProps.items.length);
  });

  it('renders badge when showBadge is true', () => {
    render(<SuggestionCard {...defaultProps} showBadge />);

    expect(screen.getByText('Suggestion 1 (recommended)')).toBeInTheDocument();
  });

  it('does not render badge when showBadge is false', () => {
    render(<SuggestionCard {...defaultProps} showBadge={false} />);

    expect(screen.queryByText('Suggestion 1 (recommended)')).not.toBeInTheDocument();
  });
});

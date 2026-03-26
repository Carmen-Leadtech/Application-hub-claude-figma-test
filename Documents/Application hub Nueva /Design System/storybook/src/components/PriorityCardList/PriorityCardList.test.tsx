import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import { PriorityCard } from 'components/PriorityCard/PriorityCard';

import { PriorityCardList } from './PriorityCardList';

describe('PriorityCardList Component', () => {
  const cards = [
    <PriorityCard
      key="1"
      category="HEADLINE"
      description="Enhance headline with clear role, keywords, and value proposition."
      onClickFix={vi.fn()}
    />,
    <PriorityCard
      key="2"
      category="ABOUT"
      description="Add a detailed About section with achievements and relevant keywords."
      onClickFix={vi.fn()}
    />,
    <PriorityCard
      key="3"
      category="EDUCATION"
      description="Improve education details with relevance and achievements."
      onClickFix={vi.fn()}
    />,
  ];

  it('renders all priority cards', () => {
    render(<PriorityCardList>{cards}</PriorityCardList>);

    expect(screen.getByText('HEADLINE')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('EDUCATION')).toBeInTheDocument();
  });

  it('applies border to container', () => {
    const { container } = render(<PriorityCardList>{cards}</PriorityCardList>);

    const listContainer = container.firstChild;
    expect(listContainer).toHaveClass(/root/);
  });

  it('applies card class to all children', () => {
    const { container } = render(<PriorityCardList>{cards}</PriorityCardList>);

    const cardElements = container.querySelectorAll('[class*="card"]');
    expect(cardElements.length).toBeGreaterThan(0);
  });

  it('applies cardLast class to last child', () => {
    const { container } = render(<PriorityCardList>{cards}</PriorityCardList>);

    const cardElements = container.querySelectorAll('[class*="card"]');
    const lastCard = cardElements[cardElements.length - 1];
    expect(lastCard.className).toMatch(/cardLast/);
  });

  it('does not apply cardLast class to non-last children', () => {
    const { container } = render(<PriorityCardList>{cards}</PriorityCardList>);

    const cardElements = container.querySelectorAll('[class*="card"]');
    const firstCard = cardElements[0];
    expect(firstCard.className).not.toMatch(/cardLast/);
  });

  it('sets data-qa attribute when provided', () => {
    const { container } = render(
      <PriorityCardList data-qa="priority-list">{cards}</PriorityCardList>
    );

    expect(container.firstChild).toHaveAttribute('data-qa', 'priority-list');
  });

  it('does not set data-qa attribute when not provided', () => {
    const { container } = render(<PriorityCardList>{cards}</PriorityCardList>);

    expect(container.firstChild).not.toHaveAttribute('data-qa');
  });

  it('sets id attribute when provided', () => {
    const { container } = render(<PriorityCardList id="test-list">{cards}</PriorityCardList>);

    expect(container.firstChild).toHaveAttribute('id', 'test-list');
  });

  it('filters out invalid children', () => {
    render(
      <PriorityCardList>
        {cards}
        <div>Invalid child</div>
      </PriorityCardList>
    );

    expect(screen.getByText('HEADLINE')).toBeInTheDocument();
    expect(screen.queryByText('Invalid child')).not.toBeInTheDocument();
  });

  it('handles single child', () => {
    const { container } = render(
      <PriorityCardList>
        <PriorityCard category="SINGLE" description="Single card test" onClickFix={vi.fn()} />
      </PriorityCardList>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('SINGLE')).toBeInTheDocument();
  });

  it('preserves child props', () => {
    render(
      <PriorityCardList>
        {[
          <PriorityCard
            key="1"
            category="TEST"
            description="Test description"
            isActive
            onClickFix={vi.fn()}
            data-qa="test-card"
          />,
        ]}
      </PriorityCardList>
    );

    const card = screen.getByText('TEST');
    expect(card).toBeInTheDocument();
    expect(screen.getByRole('button').className).toMatch(/buttonActive/);
  });

  it('applies custom className prop', () => {
    const { container } = render(
      <PriorityCardList className="custom-class">{cards}</PriorityCardList>
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });
});

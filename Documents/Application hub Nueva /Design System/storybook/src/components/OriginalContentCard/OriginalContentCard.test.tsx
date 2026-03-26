import { render, screen } from '@testing-library/react';

import { OriginalContentCard } from './OriginalContentCard';

describe('OriginalContentCard Component', () => {
  const defaultProps = {
    'data-qa': 'test-card',
    id: 'test-id',
    emptyTitle: 'Your section is empty',
    emptyDescription: 'Use the suggested content to edit and complete your profile',
  };

  describe('Content State', () => {
    it('renders paragraphs when items are provided', () => {
      const items = ['First paragraph text', 'Second paragraph text', 'Third paragraph text'];

      render(<OriginalContentCard {...defaultProps} items={items} />);

      expect(screen.getByText('First paragraph text')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph text')).toBeInTheDocument();
      expect(screen.getByText('Third paragraph text')).toBeInTheDocument();
    });

    it('adds correct data-qa attributes for content state', () => {
      const items = ['Paragraph 1', 'Paragraph 2'];
      const { container } = render(<OriginalContentCard {...defaultProps} items={items} />);

      expect(container.querySelector('[data-qa="test-card-content"]')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="test-card-wrapper"]')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="test-card-paragraph-0"]')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="test-card-paragraph-1"]')).toBeInTheDocument();
    });

    it('applies custom className to content root', () => {
      const items = ['Test paragraph'];
      const { container } = render(
        <OriginalContentCard {...defaultProps} items={items} className="custom-class" />
      );

      const element = container.querySelector('[data-qa="test-card-content"]');

      expect(element).toHaveClass('custom-class');
    });

    it('adds correct id attribute', () => {
      const items = ['Test paragraph'];
      const { container } = render(<OriginalContentCard {...defaultProps} items={items} />);

      expect(container.querySelector('#test-id')).toBeInTheDocument();
    });

    it('renders single paragraph correctly', () => {
      const items = ['Single paragraph'];

      render(<OriginalContentCard {...defaultProps} items={items} />);

      expect(screen.getByText('Single paragraph')).toBeInTheDocument();
    });

    it('renders multiple paragraphs in correct order', () => {
      const items = ['First', 'Second', 'Third', 'Fourth'];
      const { container } = render(<OriginalContentCard {...defaultProps} items={items} />);

      const paragraphs = container.querySelectorAll('p');

      expect(paragraphs).toHaveLength(4);
      expect(paragraphs[0]).toHaveTextContent('First');
      expect(paragraphs[1]).toHaveTextContent('Second');
      expect(paragraphs[2]).toHaveTextContent('Third');
      expect(paragraphs[3]).toHaveTextContent('Fourth');
    });

    it('renders content wrapper with paragraphs', () => {
      const items = ['First paragraph', 'Second paragraph'];
      const { container } = render(<OriginalContentCard {...defaultProps} items={items} />);

      const wrapper = container.querySelector('[data-qa="test-card-wrapper"]');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.querySelectorAll('p')).toHaveLength(2);
    });
  });

  describe('Empty State', () => {
    it('renders empty state when items array is empty', () => {
      render(<OriginalContentCard {...defaultProps} items={[]} />);

      expect(screen.getByText('Your section is empty')).toBeInTheDocument();
      expect(
        screen.getByText('Use the suggested content to edit and complete your profile')
      ).toBeInTheDocument();
    });

    it('renders empty state when no items provided', () => {
      const { container } = render(<OriginalContentCard {...defaultProps} items={[]} />);

      expect(screen.getByText('Your section is empty')).toBeInTheDocument();
      expect(container.querySelector('img[alt="Empty illustration"]')).toBeInTheDocument();
    });

    it('renders custom empty title and description', () => {
      render(
        <OriginalContentCard
          {...defaultProps}
          items={[]}
          emptyTitle="No content yet"
          emptyDescription="Add some content to get started"
        />
      );

      expect(screen.getByText('No content yet')).toBeInTheDocument();
      expect(screen.getByText('Add some content to get started')).toBeInTheDocument();
    });

    it('adds correct data-qa attributes for empty state', () => {
      const { container } = render(<OriginalContentCard {...defaultProps} items={[]} />);

      expect(container.querySelector('[data-qa="test-card-empty"]')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="test-card-illustration"]')).toBeInTheDocument();
      expect(container.querySelector('[data-qa="test-card-text"]')).toBeInTheDocument();
    });

    it('applies custom className to empty root', () => {
      const { container } = render(
        <OriginalContentCard {...defaultProps} items={[]} className="custom-empty-class" />
      );

      const element = container.querySelector('[data-qa="test-card-empty"]');

      expect(element).toHaveClass('custom-empty-class');
    });

    it('renders illustration image in empty state', () => {
      const { container } = render(<OriginalContentCard {...defaultProps} items={[]} />);

      const img = container.querySelector('img[alt="Empty illustration"]');

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt', 'Empty illustration');
    });
  });

  describe('Data-qa attributes', () => {
    it('renders without data-qa when not provided - content state', () => {
      const { container } = render(<OriginalContentCard items={['Text']} id="no-qa-test" />);

      expect(container.querySelector('#no-qa-test')).toBeInTheDocument();
      expect(container.querySelector('[data-qa]')).not.toBeInTheDocument();
    });

    it('renders without data-qa when not provided - empty state', () => {
      const { container } = render(<OriginalContentCard items={[]} id="no-qa-empty" />);

      expect(container.querySelector('#no-qa-empty')).toBeInTheDocument();
      expect(container.querySelector('[data-qa]')).not.toBeInTheDocument();
    });
  });

  describe('Whitespace handling', () => {
    it('preserves whitespace in paragraphs', () => {
      const items = ['Text with\nmultiple\nlines'];

      render(<OriginalContentCard {...defaultProps} items={items} />);

      expect(
        screen.getByText((content, element) => {
          return (
            element?.tagName.toLowerCase() === 'p' &&
            content.includes('Text with') &&
            content.includes('multiple') &&
            content.includes('lines')
          );
        })
      ).toBeInTheDocument();
    });
  });
});

import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductCard, ProductCardProps } from './ProductCard';

const defaultProps: ProductCardProps = {
  'data-qa': 'test',
  size: 'S',
};

const defaultMProps: ProductCardProps = {
  'data-qa': 'test',
  size: 'M',
  button: { text: 'default text' },
  tag: { text: 'default tag' },
};

describe('ProductCard', () => {
  it('renders with title and subtitle', () => {
    render(<ProductCard {...defaultProps} title="Product Title" subtitle="Product Subtitle" />);

    expect(screen.getByText('Product Title')).toBeInTheDocument();
    expect(screen.getByText('Product Subtitle')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<ProductCard {...defaultProps} icon={<span>🔥</span>} />);

    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('applies full width class when isFullWidth is true', () => {
    render(<ProductCard {...defaultProps} isFullWidth />);

    const button = screen.getByRole('button');

    expect(button.className).toMatch(/fullWidth/);
  });

  it('applies selected class when selected is true', () => {
    render(<ProductCard {...defaultProps} selected />);

    const button = screen.getByRole('button');

    expect(button.className).toMatch(/selected/);
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ProductCard {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('sets correct data-qa attribute', () => {
    render(<ProductCard {...defaultProps} />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('data-qa', 'test-option-item-button');
  });

  it('applies custom className prop', () => {
    render(<ProductCard {...defaultProps} className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes id to the root element', () => {
    render(<ProductCard {...defaultProps} id="card-id" />);
    expect(screen.getByRole('button')).toHaveAttribute('id', 'card-id');
  });

  it('renders subtitle as ReactNode', () => {
    render(
      <ProductCard
        {...defaultProps}
        subtitle={<span data-testid="custom-subtitle">Custom node</span>}
      />
    );
    expect(screen.getByTestId('custom-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('custom-subtitle')).toHaveTextContent('Custom node');
  });
});

describe('ProductCard sizes', () => {
  it('renders with default size class', () => {
    render(<ProductCard {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/S/);
  });

  it('renders with XS size class if size is XS', () => {
    render(<ProductCard {...defaultProps} size="XS" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/XS/);
  });

  it('renders with M size class if size is M', () => {
    const result = render(<ProductCard {...defaultMProps} />);
    const card = result.container.querySelector('[class*="root"]');
    expect(card?.className).toMatch(/M/);
  });
});

describe('ProductCard M-size-only elements', () => {
  it('renders a button on M size when declared', () => {
    render(<ProductCard {...defaultMProps} />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/root/);
  });

  it('renders a highlighted tag on M size when selected prop set to true', () => {
    render(<ProductCard {...defaultMProps} selected />);
    const button = screen.getByText(/default tag/i);
    expect(button.textContent).toBe(defaultMProps.tag?.text);
  });

  it('applies custom className prop', () => {
    const { container } = render(<ProductCard {...defaultMProps} className="custom-class" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });

  it('renders image when image prop is provided', () => {
    render(
      <ProductCard
        {...defaultMProps}
        image={<img src="test.jpg" alt="Product" />}
        button={undefined}
      />
    );
    const img = screen.getByRole('img', { name: 'Product' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('renders as anchor when rootElement is "a" with href and anchorProps', () => {
    render(
      <ProductCard
        {...defaultMProps}
        rootElement="a"
        href="/review"
        anchorProps={{ 'aria-label': 'Go to review', target: '_blank' }}
        button={undefined}
      />
    );
    const link = screen.getByRole('link', { name: 'Go to review' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/review');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders as native button when rootElement is "button" with buttonProps', () => {
    render(
      <ProductCard
        {...defaultMProps}
        rootElement="button"
        buttonProps={{ 'aria-label': 'Select option', type: 'submit' }}
        button={undefined}
      />
    );
    const btn = screen.getByRole('button', { name: 'Select option' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('renders inner Button only when rootElement is "div" and button config is provided', () => {
    const { rerender } = render(
      <ProductCard {...defaultMProps} rootElement="div" button={{ text: 'Select' }} />
    );
    expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();

    rerender(
      <ProductCard {...defaultMProps} rootElement="a" href="#" button={{ text: 'Select' }} />
    );
    expect(screen.queryByRole('button', { name: 'Select' })).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('passes tag.dataQa to Badge when tag is provided', () => {
    render(
      <ProductCard
        {...defaultMProps}
        selected
        tag={{ text: 'Featured', dataQa: 'featured-badge' }}
      />
    );
    const badge = document.querySelector('[data-qa="featured-badge"]');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Featured');
  });

  it('passes button variant and tmEvent to inner Button when rootElement is div', () => {
    render(
      <ProductCard
        {...defaultMProps}
        rootElement="div"
        button={{
          text: 'Apply',
          variant: 'primary',
          tmEvent: { category: 'card', action: 'click' },
        }}
      />
    );
    const btn = screen.getByRole('button', { name: 'Apply' });
    expect(btn).toHaveAttribute('data-tm-event-category', 'card');
    expect(btn).toHaveAttribute('data-tm-event-action', 'click');
  });

  it('passes id to M size root element', () => {
    const { container } = render(<ProductCard {...defaultMProps} id="m-card-id" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('id', 'm-card-id');
  });

  it('sets data-qa on title and subtitle spans when data-qa prop is provided', () => {
    render(
      <ProductCard
        {...defaultMProps}
        data-qa="product-card"
        title="Card Title"
        subtitle="Card description"
        button={undefined}
      />
    );
    const titleEl = screen.getByText('Card Title');
    const subtitleEl = screen.getByText('Card description');
    expect(titleEl).toHaveAttribute('data-qa', 'product-card-option-item-button-title');
    expect(subtitleEl).toHaveAttribute('data-qa', 'product-card-option-item-button-text');
  });

  it('calls onClick when M size anchor is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ProductCard
        {...defaultMProps}
        rootElement="a"
        href="#"
        onClick={handleClick}
        button={undefined}
      />
    );
    await user.click(screen.getByRole('link'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('calls onClick when M size native button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ProductCard
        {...defaultMProps}
        rootElement="button"
        onClick={handleClick}
        button={undefined}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies selected class to M size root when selected is true', () => {
    const { container } = render(<ProductCard {...defaultMProps} selected />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/selected/);
  });

  it('renders "Select" as button text when button.text is not provided', () => {
    render(<ProductCard {...defaultMProps} rootElement="div" button={{ text: '' }} />);
    expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();
  });

  it('renders suffix content on M size when suffix prop is provided', () => {
    render(
      <ProductCard
        {...defaultMProps}
        button={undefined}
        suffix={<span data-testid="custom-suffix">Custom action</span>}
      />
    );
    expect(screen.getByTestId('custom-suffix')).toBeInTheDocument();
    expect(screen.getByTestId('custom-suffix')).toHaveTextContent('Custom action');
  });

  it('renders suffix instead of legacy button when both suffix and button are provided', () => {
    render(
      <ProductCard
        {...defaultMProps}
        rootElement="div"
        button={{ text: 'Legacy' }}
        suffix={<span data-testid="suffix-content">Suffix content</span>}
      />
    );
    expect(screen.getByTestId('suffix-content')).toBeInTheDocument();
    expect(screen.getByText('Suffix content')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Legacy' })).not.toBeInTheDocument();
  });
});

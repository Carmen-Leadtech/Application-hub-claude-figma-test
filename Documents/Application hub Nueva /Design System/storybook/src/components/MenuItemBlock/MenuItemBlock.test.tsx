import { fireEvent, render, screen } from '@testing-library/react';

import { MenuItemBlock } from './MenuItemBlock';

describe('MenuItemBlock Component', () => {
  test('renders with default props', () => {
    const { getByText } = render(<MenuItemBlock />);

    expect(getByText('Section name')).toBeInTheDocument();
  });

  test('renders with custom section name', () => {
    const { getByText } = render(<MenuItemBlock sectionName="Work Experience" />);

    expect(getByText('Work Experience')).toBeInTheDocument();
  });

  test('renders with icon when iconName is provided', () => {
    const { container } = render(<MenuItemBlock iconName="experience" data-qa="test" />);

    const icon = container.querySelector('[data-qa="test-menu-item-block-icon"]');
    expect(icon).toBeInTheDocument();
  });

  test('renders with custom icon element', () => {
    render(<MenuItemBlock icon={<span>Custom</span>} />);

    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  test('applies default styles when not active', () => {
    const { container } = render(<MenuItemBlock isActive={false} />);

    const root = container.firstChild as HTMLElement;
    expect(root?.className).not.toMatch(/active/);
  });

  test('applies active state styles', () => {
    const { container } = render(<MenuItemBlock isActive={true} />);

    const root = container.firstChild as HTMLElement;
    expect(root?.className).toMatch(/active/);
  });

  test('shows left bar when active', () => {
    const { container } = render(<MenuItemBlock isActive={true} />);

    const leftBar = container.querySelector('[class*="leftBar"]');
    expect(leftBar).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(<MenuItemBlock onClick={handleClick} id="test-id" />);

    const root = container.firstChild as HTMLElement;
    fireEvent.click(root);

    expect(handleClick).toHaveBeenCalledWith('test-id');
  });

  test('calls onClick when Enter key is pressed', () => {
    const handleClick = vi.fn();
    const { container } = render(<MenuItemBlock onClick={handleClick} id="test-id" />);

    const root = container.firstChild as HTMLElement;
    fireEvent.keyDown(root, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledWith('test-id');
  });

  test('calls onClick when Space key is pressed', () => {
    const handleClick = vi.fn();
    const { container } = render(<MenuItemBlock onClick={handleClick} id="test-id" />);

    const root = container.firstChild as HTMLElement;
    fireEvent.keyDown(root, { key: ' ' });

    expect(handleClick).toHaveBeenCalledWith('test-id');
  });

  test('applies data-qa attribute', () => {
    const { container } = render(<MenuItemBlock data-qa="test-menu" />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('data-qa', 'test-menu-menu-item-block');
  });

  test('applies id attribute', () => {
    const { container } = render(<MenuItemBlock id="test-id" />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('id', 'test-id');
  });

  test('applies aria-current when active', () => {
    const { container } = render(<MenuItemBlock isActive={true} />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('aria-current', 'page');
  });

  test('does not apply aria-current when not active', () => {
    const { container } = render(<MenuItemBlock isActive={false} />);

    const root = container.firstChild as HTMLElement;
    expect(root).not.toHaveAttribute('aria-current');
  });

  test('icon has active color when active', () => {
    const { container } = render(<MenuItemBlock iconName="experience" isActive={true} />);

    const icon = container.querySelector('[class*="iconActive"]');
    expect(icon).toBeInTheDocument();
  });

  test('section name has active color when active', () => {
    const { container } = render(<MenuItemBlock isActive={true} />);

    const sectionName = container.querySelector('[class*="sectionNameActive"]');
    expect(sectionName).toBeInTheDocument();
  });

  test('renders custom end content when provided', () => {
    render(<MenuItemBlock endContent={<span>Custom Content</span>} />);

    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  test('renders end content when provided', () => {
    render(<MenuItemBlock endContent={<span>Custom</span>} />);

    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  test('renders multiple elements in end content', () => {
    render(
      <MenuItemBlock
        endContent={
          <>
            <span>Element 1</span>
            <span>Element 2</span>
          </>
        }
      />
    );

    expect(screen.getByText('Element 1')).toBeInTheDocument();
    expect(screen.getByText('Element 2')).toBeInTheDocument();
  });

  test('applies custom className prop', () => {
    const { container } = render(<MenuItemBlock className="custom-class" />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });
});

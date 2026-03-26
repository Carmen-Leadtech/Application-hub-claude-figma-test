import { useRef } from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useClickOutside } from './useClickOutside';

describe('Tag Component', () => {
  test('executes the callback when clicking outside the element', () => {
    const callback = vi.fn();

    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside([ref], callback);

      return <div ref={ref}>Inside</div>;
    };

    const { getByText, container } = render(
      <>
        <TestComponent />
        <div>Outside</div>
      </>
    );

    fireEvent.mouseDown(getByText('Inside'));
    expect(callback).not.toHaveBeenCalled();

    fireEvent.mouseDown(container);
    expect(callback).toHaveBeenCalled();
  });
});

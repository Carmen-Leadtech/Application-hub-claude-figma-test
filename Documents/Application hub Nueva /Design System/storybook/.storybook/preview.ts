import type { Preview } from '@storybook/react';

import './fonts.css';
import '../src/styles/design-system-tokens/design-system-tokens.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;

import { Meta, StoryFn } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';
import { Link } from 'components/Link/Link';

import { ProductCard, type ProductCardProps } from './ProductCard';

export default {
  title: 'Cards/ProductCard',
  component: ProductCard,
  parameters: {
    docs: {
      description: {
        component: `
A **ProductCard component** for displaying selectable product options with visual content.

---

### ✨ Features

- 📐 **Sizes:** XS, S, and M variants for different UI contexts.
- 🎯 **Selection state:** Visual highlight when selected.
- 🏷️ **Tags:** Optional tag for highlighting (M size only).
- 🔘 **Action button:** Optional CTA button (M size only).
- 🖼️ **Flexible content:** Icons for S/XS sizes, images for M size.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ProductCard } from './ProductCard';
import { Icon } from 'components/Icon/Icon';

<ProductCard
  size="S"
  icon={<Icon name="studies" />}
  title="Option Title"
  subtitle="Description text"
/>

<ProductCard
  size="M"
  image={<img src="product.jpg" />}
  title="Premium Option"
  subtitle="Full description"
  tag={{ text: "Popular" }}
  button={{ text: "Select" }}
  selected={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    alignment: {
      control: { type: 'radio' },
      options: ['left', 'center'],
      description: 'Alignment of the card',
      table: {
        type: { summary: '"left" | "center"' },
        defaultValue: { summary: '"left"' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['XS', 'S', 'M'],
      description: 'Size variant of the card',
      table: {
        type: { summary: '"XS" | "S" | "M"' },
        defaultValue: { summary: '"S"' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Main title text',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Subtitle or description text',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    selected: {
      control: { type: 'boolean' },
      description: 'Whether the card is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isFullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the card span full width (XS/S only)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tag: {
      description: 'Tag content displayed on selected M cards',
      table: {
        type: { summary: '{ text: string; dataQa?: string }' },
      },
    },
    button: {
      description: 'Button config for M size cards',
      table: {
        type: { summary: '{ text: string; variant?: string; tmEvent?: object }' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the card',
      table: {
        type: { summary: '(event?: MouseEvent) => void' },
      },
    },
  },
} as Meta<ProductCardProps>;

const Template: StoryFn<ProductCardProps> = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <Icon name="studies" color="#0057a3" />,
  subtitle: 'Lorem ipsum dolor sit amet consectetur. Urna sapien eu ipsum congue. At.',
  title: 'Lorem ipsum dolor sit amet',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default card (size S) with icon and text.',
    },
  },
};

export const SizeXS = Template.bind({});
SizeXS.args = {
  icon: <Icon name="studies" color="#0057a3" />,
  subtitle: 'Lorem ipsum dolor',
  title: 'Lorem ipsum dolor sit amet',
  size: 'XS',
};
SizeXS.parameters = {
  docs: {
    description: {
      story: 'Extra small card for compact layouts.',
    },
  },
};

export const SizeM = Template.bind({});
SizeM.args = {
  image: <img src="https://placehold.co/279x144" alt="Product" />,
  subtitle: 'Lorem ipsum dolor sit amet consectetur. Urna sapien eu ipsum congue. At.',
  title: 'Lorem ipsum dolor sit amet',
  size: 'M',
};
SizeM.parameters = {
  docs: {
    description: {
      story: 'Medium card with image for featured items.',
    },
  },
};

export const AlignmentCenter = Template.bind({});
AlignmentCenter.args = {
  icon: <Icon name="studies" color="#0057a3" />,
  subtitle: 'This card is currently selected.',
  title: 'Selected Option',
  selected: false,
  alignment: 'center',
};
AlignmentCenter.parameters = {
  docs: {
    description: {
      story: 'Card with center-aligned content.',
    },
  },
};

export const Selected = Template.bind({});
Selected.args = {
  icon: <Icon name="studies" color="#0057a3" />,
  subtitle: 'This card is currently selected.',
  title: 'Selected Option',
  selected: true,
};
Selected.parameters = {
  docs: {
    description: {
      story: 'Card in selected state.',
    },
  },
};

export const MediumHighlighted = Template.bind({});
MediumHighlighted.args = {
  image: <img src="https://placehold.co/279x144" alt="Product" />,
  subtitle: 'Lorem ipsum dolor sit amet consectetur. Urna sapien eu ipsum congue. At.',
  title: 'Lorem ipsum dolor sit amet',
  size: 'M',
  tag: {
    text: 'Recommended',
  },
  button: {
    text: 'Select',
  },
  selected: true,
};
MediumHighlighted.parameters = {
  docs: {
    description: {
      story: 'Medium card with tag, button, and selected state.',
    },
  },
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  image: <img src="https://placehold.co/279x144" alt="Product" />,
  subtitle: 'Use the suffix prop to render any content (Button, Link, etc.).',
  title: 'Card with custom suffix',
  size: 'M',
  rootElement: 'div',
  suffix: (
    <Link href="" onClick={(e) => e.preventDefault()}>
      Custom action
    </Link>
  ),
};
WithSuffix.parameters = {
  docs: {
    description: {
      story:
        'Medium card with suffix slot for custom action content instead of the deprecated button prop.',
    },
  },
};

const AllSizesTemplate: StoryFn<ProductCardProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
    <ProductCard
      size="XS"
      icon={<Icon name="studies" color="#0057a3" />}
      title="Extra Small Card"
      subtitle="Compact variant"
    />
    <ProductCard
      size="S"
      icon={<Icon name="studies" color="#0057a3" />}
      title="Small Card"
      subtitle="Standard variant for most use cases"
    />
    <ProductCard
      size="M"
      image={<img src="https://placehold.co/279x144" alt="Product" />}
      title="Medium Card"
      subtitle="Featured variant with image support"
    />
  </div>
);

export const AllSizes = AllSizesTemplate.bind({});
AllSizes.parameters = {
  docs: {
    description: {
      story: 'Comparison of all card sizes.',
    },
  },
};

import { Meta, StoryFn } from '@storybook/react';

import { LanguageSelector, type LanguageSelectorProps } from './LanguageSelector';

export default {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **LanguageSelector component** for displaying and selecting locale/language with visual indicators.

---

### ✨ Features

- 🌐 **Language icon:** Built-in globe icon indicator.
- 🏷️ **Label:** Displays language code (e.g., "EN", "ES").
- 🎯 **Active state:** Visual highlight when selected.
- 🖱️ **Interactive:** Click handler for language switching.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { LanguageSelector } from './LanguageSelector';

<LanguageSelector
  label="EN"
  isActive={currentLang === 'en'}
  onClick={() => setLang('en')}
/>

<LanguageSelector
  label="ES"
  isActive={currentLang === 'es'}
  onClick={() => setLang('es')}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Language code or label to display',
      table: {
        type: { summary: 'string' },
      },
    },
    isActive: {
      control: { type: 'boolean' },
      description: 'Whether this language is currently selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the selector is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} as Meta<typeof LanguageSelector>;

const Template: StoryFn<LanguageSelectorProps> = (args) => <LanguageSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'EN',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default language selector in inactive state.',
    },
  },
};

export const Active = Template.bind({});
Active.args = {
  label: 'ES',
  isActive: true,
};
Active.parameters = {
  docs: {
    description: {
      story: 'Language selector in active/selected state.',
    },
  },
};

const LanguageListTemplate: StoryFn<LanguageSelectorProps> = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <LanguageSelector label="EN" isActive={true} onClick={() => console.log('EN')} />
    <LanguageSelector label="ES" onClick={() => console.log('ES')} />
    <LanguageSelector label="FR" onClick={() => console.log('FR')} />
    <LanguageSelector label="DE" onClick={() => console.log('DE')} />
  </div>
);

export const LanguageList = LanguageListTemplate.bind({});
LanguageList.parameters = {
  docs: {
    description: {
      story: 'Group of language selectors with one active.',
    },
  },
};

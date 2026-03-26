import { Meta, StoryFn } from '@storybook/react';

import { FileUploader, type FileUploaderProps } from './FileUploader';
import README from './README.md?raw';

export default {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    docs: {
      description: {
        component: README,
      },
    },
  },
  argTypes: {
    formats: {
      description: 'List of allowed file formats.',
      control: { type: 'object' },
      table: {
        type: { summary: 'FileFormat[]' },
        defaultValue: { summary: "['pdf', 'doc', 'docx']" },
      },
    },
    hideInfoText: {
      description: 'Hides the info section about formats and allowed size.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isFullHeight: {
      description: 'The component height adapts to the full height of its container.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    labels: {
      description: 'Visible text labels for the component.',
      control: { type: 'object' },
      table: { type: { summary: 'FileUploaderLabels' } },
    },
    maxFiles: {
      description: 'Maximum number of allowed files.',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    size: {
      description: 'Maximum allowed size in MB.',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    onAttachedHandler: {
      description: 'Callback fired when a file is successfully accepted.',
      action: 'file-attached',
      table: {
        type: {
          summary: '(file: { name: string; content: string } | null) => void',
        },
      },
    },
    onErrorHandler: {
      description: 'Callback fired when a validation error occurs.',
      action: 'upload-error',
      table: {
        type: {
          summary: '(error: { file: File; type: string }) => void',
        },
      },
    },
  },
} as Meta<typeof FileUploader>;

const Template: StoryFn<FileUploaderProps> = (args) => <FileUploader {...args} />;

const defaultLabels = {
  acceptableFormat: 'Accepted formats',
  change: 'Change',
  clickToBrowse: 'Click to browse',
  done: 'Done!',
  dragFileHere: 'Drag your file here',
  fileSize: 'Maximum size',
  invalidFile: 'Invalid file',
  invalidFileDescription: 'The file does not meet the requirements',
  labelSize: 'max',
};

export const Default = Template.bind({});
Default.args = {
  labels: defaultLabels,
  'data-qa': 'file-uploader',
};

export const FullHeight = Template.bind({});
FullHeight.args = {
  labels: defaultLabels,
  isFullHeight: true,
  'data-qa': 'file-uploader',
};

FullHeight.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story: 'Example where the uploader takes 100% of the available height.',
    },
  },
};

FullHeight.decorators = [
  (Story) => (
    <div
      style={{
        boxSizing: 'border-box',
        height: '100vh',
        padding: '1rem',
      }}
    >
      <Story />
    </div>
  ),
];

export const MultipleFormats = Template.bind({});
MultipleFormats.args = {
  labels: defaultLabels,
  formats: ['pdf', 'docx'],
  'data-qa': 'file-uploader',
};
MultipleFormats.parameters = {
  docs: {
    description: {
      story: 'Example allowing multiple file formats.',
    },
  },
};

export const HiddenInfoText = Template.bind({});
HiddenInfoText.args = {
  labels: defaultLabels,
  hideInfoText: true,
  'data-qa': 'file-uploader',
};
HiddenInfoText.parameters = {
  docs: {
    description: {
      story: 'Example hiding the uploader footer information.',
    },
  },
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
  labels: {
    acceptableFormat: 'Allowed formats',
    change: 'Replace file',
    clickToBrowse: 'Browse',
    done: 'Completed!',
    dragFileHere: 'Drop your file here',
    fileSize: 'Maximum size',
    invalidFile: 'Invalid file',
    invalidFileDescription: 'The file does not meet the requirements',
    labelSize: 'max',
  },
  formats: ['pdf', 'doc', 'docx'],
  size: 5,
  'data-qa': 'file-uploader',
};
CustomLabels.parameters = {
  docs: {
    description: {
      story: 'Example using fully customized text.',
    },
  },
};

export const CustomErrorHandling = Template.bind({});
CustomErrorHandling.args = {
  labels: defaultLabels,
  size: 0.1,
  onErrorHandler: (error) => console.log('Captured error:', error),
  'data-qa': 'file-uploader',
};
CustomErrorHandling.parameters = {
  docs: {
    description: {
      story: 'Example forcing size errors to test the onErrorHandler callback.',
    },
  },
};

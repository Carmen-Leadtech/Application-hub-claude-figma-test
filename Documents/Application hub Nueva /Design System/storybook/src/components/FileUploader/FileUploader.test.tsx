import { vi, describe, test, expect, beforeEach } from 'vitest';

import * as ReactDropzone from 'react-dropzone';

import { render, screen } from '@testing-library/react';

import { FileUploader, FileUploaderProps } from './FileUploader';

vi.mock('react-dropzone');

const mockedUseDropzone = vi.mocked(ReactDropzone.useDropzone, true);

const defaultLabels: FileUploaderProps['labels'] = {
  acceptableFormat: 'Accepted formats',
  change: 'Change',
  clickToBrowse: 'Click to browse',
  done: 'Done',
  dragFileHere: 'Drag a file here',
  fileSize: 'Maximum size',
  invalidFile: 'Invalid file',
  invalidFileDescription: 'The file is not valid.',
  labelSize: 'max',
};

const defaultProps: FileUploaderProps = {
  id: 'test-uploader',
  labels: defaultLabels,
  onAttachedHandler: vi.fn(),
};

// Final mock without relying on obsolete types
const mockUseDropzone = (overrides: Partial<ReactDropzone.DropzoneState> = {}) => {
  mockedUseDropzone.mockImplementation(
    (): ReactDropzone.DropzoneState => ({
      getRootProps: <T extends Parameters<ReactDropzone.DropzoneState['getRootProps']>[0]>(
        props?: T
      ) => props || ({} as T),
      getInputProps: <T extends Parameters<ReactDropzone.DropzoneState['getInputProps']>[0]>(
        props?: T
      ) => props || ({} as T),
      isFocused: false,
      isDragActive: false,
      isDragAccept: false,
      isDragReject: false,
      isFileDialogActive: false,
      acceptedFiles: [],
      fileRejections: [],
      open: () => {},
      rootRef: { current: null },
      inputRef: { current: null },
      ...overrides,
    })
  );
};

describe('FileUploader (Vitest)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with basic labels', () => {
    mockUseDropzone();

    render(<FileUploader {...defaultProps} />);
    expect(screen.getByText(defaultLabels.dragFileHere)).toBeInTheDocument();
    expect(screen.getByText(defaultLabels.clickToBrowse)).toBeInTheDocument();
  });

  test('shows format and size info', () => {
    mockUseDropzone();

    render(<FileUploader {...defaultProps} size={2} formats={['pdf', 'doc']} />);

    expect(screen.getByText(/Accepted formats/)).toBeInTheDocument();
    expect(screen.getByText(/PDF/)).toBeInTheDocument();
    expect(screen.getByText(/DOC/)).toBeInTheDocument();
    expect(screen.getByText(/2MB/)).toBeInTheDocument();
  });

  test('applies custom className prop', () => {
    mockUseDropzone();

    const { container } = render(<FileUploader {...defaultProps} className="custom-class" />);

    const root = container.querySelector('[class*="root"]');
    expect(root).toHaveClass('custom-class');
  });
});

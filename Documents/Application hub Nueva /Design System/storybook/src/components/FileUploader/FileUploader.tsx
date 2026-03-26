import { useState, Fragment } from 'react';

import classNames from 'classnames';
import { useDropzone, FileRejection, FileError } from 'react-dropzone';
import { CvElement } from 'types/CvElement';
import { mapFormatsToFileUploader } from 'utils/FileUploader/mapFormatsToFileUploader';
import { mbToBytes } from 'utils/FileUploader/mbToBytes';
import { toBase64 } from 'utils/FileUploader/toBase64';

import { Icon } from 'components/Icon/Icon';

import styles from './FileUploader.module.css';

export enum FileUploaderErrorType {
  ERR_FILE_CORRUPTED = 'ERR_FILE_CORRUPTED',
  FILE_SIZE_LIMIT = 'ERR_FILE_SIZE_LIMIT',
  UNSUPPORTED_FORMAT = 'ERR_UNSUPPORTED_FORMAT',
}

export type FileFormat = 'pdf' | 'doc' | 'docx';

export type FileUploaderLabels = {
  acceptableFormat: string;
  change: string;
  clickToBrowse: string;
  done: string;
  dragFileHere: string;
  fileSize: string;
  invalidFile: string;
  invalidFileDescription: string;
  labelSize: string;
};

export interface FileUploaderProps extends CvElement {
  /** Accepted file formats */
  formats?: FileFormat[];
  /** If true, hides the info text at the bottom */
  hideInfoText?: boolean;
  /** If true, the uploader takes full height */
  isFullHeight?: boolean;
  /** Localized labels for the component */
  labels: FileUploaderLabels;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Maximum file size in MB */
  size?: number;
  /** Callback fired when a file is attached */
  onAttachedHandler: (file: { name: string; content: string } | null) => void;
  /** Callback fired when an error occurs */
  onErrorHandler?: (error: { file: File; type: string }) => void;
}

enum State {
  Default = 'default',
  Error = 'error',
  Success = 'success',
}

export const FileUploader = ({
  formats = ['pdf', 'doc', 'docx'],
  hideInfoText = false,
  id,
  isFullHeight = false,
  labels,
  maxFiles = 1,
  size = 1,
  'data-qa': dataQa,
  className = '',
  onAttachedHandler,
  onErrorHandler,
}: FileUploaderProps) => {
  const [animationEnds, setAnimationEnds] = useState(false);
  const [filename, setFilename] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [state, setState] = useState<State>(State.Default);

  const onDropRejected = (fileRejections: FileRejection[]) => {
    if (!fileRejections.length) return;

    const { file, errors } = fileRejections[0];
    setFilename(file.name);

    const mappedErrors = errors.map((e: FileError) => {
      switch (e.code) {
        case 'file-too-large':
          return FileUploaderErrorType.FILE_SIZE_LIMIT;

        case 'file-too-small':
          return FileUploaderErrorType.FILE_SIZE_LIMIT;

        case 'file-invalid-type':
          return FileUploaderErrorType.UNSUPPORTED_FORMAT;

        default:
          return FileUploaderErrorType.ERR_FILE_CORRUPTED;
      }
    });

    const errorType = mappedErrors[0];

    onErrorHandler?.({
      file,
      type: errorType,
    });

    setState(State.Error);
    onAttachedHandler(null);
  };

  const onDropAccepted = async (files: File[]) => {
    const filename = files[0].name;
    setFilename(filename);
    setState(State.Success);
    const fileContent = await toBase64(files[0]);
    onAttachedHandler({ name: filename, content: fileContent });
  };

  const hardReset = () => {
    setShowProgress(false);
    setAnimationEnds(false);
    setFilename(null);
    setState(State.Default);
  };

  const onDrop = () => {
    if (filename) hardReset();
    setShowProgress(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: mapFormatsToFileUploader(formats),
    maxFiles,
    maxSize: mbToBytes(size),
    onDrop,
    onDropAccepted,
    onDropRejected,
  });

  const stateClass =
    state === State.Success
      ? styles.progressSuccess
      : state === State.Error
        ? styles.progressError
        : styles.progressDefault;

  return (
    <div
      className={classNames(styles.root, { [styles.fullHeight]: isFullHeight }, className)}
      id={id}
      data-qa={dataQa || undefined}
    >
      <div
        className={classNames(styles.dropzone, isDragActive && styles.dropzoneDragActive)}
        {...getRootProps()}
        data-qa={dataQa ? `${dataQa}-dropzone` : undefined}
      >
        <input {...getInputProps()} />
        <div className={styles.content}>
          <div className={styles.fileContent}>
            <div
              className={classNames(
                styles.iconText,
                (showProgress || animationEnds) && styles.iconTextHorizontal
              )}
            >
              <div>
                {filename ? (
                  <Icon name="file_uploader_loaded" />
                ) : (
                  <Icon name="file_uploader_add" />
                )}
              </div>
              <div className={styles.textWrapper}>
                <span
                  className={classNames(
                    styles.title,
                    (showProgress || animationEnds) && styles.titleHorizontal
                  )}
                >
                  {filename || <span>{labels.dragFileHere}</span>}
                </span>

                <span
                  className={classNames(
                    styles.action,
                    (showProgress || animationEnds) && styles.actionHorizontal
                  )}
                >
                  {filename ? (
                    <strong onClick={hardReset}>{labels.change}</strong>
                  ) : (
                    <span data-qa={dataQa ? `${dataQa}-button-click-to-browse` : undefined}>
                      {labels.clickToBrowse}
                    </span>
                  )}
                </span>
              </div>
            </div>
            {showProgress && (
              <div
                className={classNames(styles.progress, stateClass)}
                onAnimationEnd={() => setAnimationEnds(true)}
              >
                <div className={styles.progressInner}></div>
              </div>
            )}
            <div
              className={classNames(
                styles.status,
                state === State.Success && styles.statusSuccess,
                state === State.Error && styles.statusError
              )}
            >
              {animationEnds && (
                <>
                  <div
                    className={classNames(
                      styles.statusIcon,
                      state === State.Success && styles.statusIconSuccess,
                      state === State.Error && styles.statusIconError
                    )}
                  >
                    {state === State.Success && <Icon name="check_circle" />}
                    {state === State.Error && <Icon name="error" />}
                  </div>
                  {state === State.Success && (
                    <p
                      className={classNames(styles.statusText, styles.statusTextSuccess)}
                      data-qa={dataQa ? `${dataQa}-status-message-success` : undefined}
                    >
                      {labels.done}
                    </p>
                  )}
                  {state === State.Error && (
                    <p
                      className={classNames(styles.statusText, styles.statusTextError)}
                      data-qa={dataQa ? `${dataQa}-status-message-error` : undefined}
                    >
                      <strong>{labels.invalidFile}</strong>
                      <br />
                      {labels.invalidFileDescription}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          {!hideInfoText && (
            <div className={styles.info}>
              <p
                className={styles.infoFormat}
                data-qa={dataQa ? `${dataQa}-info-format` : undefined}
              >
                <strong>{labels.acceptableFormat}</strong>:
                <span>
                  {formats.map((f, i, arr) => (
                    <Fragment key={i}>
                      {' '}
                      {f.toUpperCase()}
                      {i < arr.length - 1 ? ',' : ''}
                    </Fragment>
                  ))}
                </span>
              </p>
              <p className={styles.infoSize} data-qa={dataQa ? `${dataQa}-info-size` : undefined}>
                <strong>{labels.fileSize}</strong> {size}MB {labels.labelSize}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

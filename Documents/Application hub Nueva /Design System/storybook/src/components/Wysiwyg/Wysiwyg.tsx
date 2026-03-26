import React from 'react';

import { truncateText } from 'utils/TruncateText/TruncateText';

import styles from './Wysiwyg.module.css';
import { WysiwygInput } from './WysiwygInput/WysiwygInput';

export interface WysiwygProps {
  /** Color theme variant */
  variant: 'light' | 'dark';
  /** Helper text displayed below the editor */
  helperText: string;
  /** Initial HTML content */
  defaultValue: string;
  /** Component displayed beside the editor */
  asideComponent: React.ReactNode;
  /** Callback fired when the content changes */
  onChange: React.FormEventHandler<HTMLDivElement>;
  /** Custom styles for the container */
  styles: React.CSSProperties;
  /** ID for the input element */
  inputId: string;
  /** Props passed to the input element */
  inputProps: React.HTMLAttributes<HTMLDivElement>;
  /** Initial format option selected */
  initialFormatOption: string;
  /** If true, renders mobile-optimized view */
  isMobile: boolean;
  /** If true, disables copy functionality */
  disableCopy: boolean;
  /** If true, shows completeness indicator */
  showCompleteness: boolean;
  /** Data attribute for testing */
  'data-qa': string;
  /** Tracking event label */
  'data-tm-event-label': string;
  /** Tracking event category */
  'data-tm-event-category': string;
  /** Tracking event type */
  'data-tm-type': string;
  /** Additional CSS class name */
  className?: string;
}

export const Wysiwyg = ({
  'data-qa': dataQa,
  'data-tm-event-category': eventCategory,
  'data-tm-event-label': eventLabel,
  'data-tm-type': eventType,
  asideComponent,
  defaultValue,
  disableCopy = false,
  helperText,
  initialFormatOption,
  inputId,
  inputProps,
  isMobile,
  onChange = () => {},
  showCompleteness,
  styles: customStyles,
  variant,
  className = '',
}: WysiwygProps) => {
  const handleChange = (html: unknown) => {
    // @ts-expect-error types 0 args but received 2.
    onChange(null, html);
  };

  return (
    <div onChange={onChange} style={customStyles} className={className}>
      <div className={styles.container}>
        <WysiwygInput
          asideComponent={asideComponent}
          dataQa={dataQa}
          disableCopy={disableCopy}
          eventCategory={eventCategory}
          eventLabel={eventLabel}
          eventType={eventType}
          initialFormatOption={initialFormatOption}
          inputId={inputId}
          inputProps={inputProps}
          isMobile={isMobile}
          onChange={handleChange}
          showCompleteness={showCompleteness}
          value={defaultValue}
          variant={variant}
        />
      </div>
      <div className={styles.help}>{truncateText({ text: helperText, textOverflow: '...' })}</div>
    </div>
  );
};

import { InputHTMLAttributes, TextareaHTMLAttributes, useId } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Textfield.module.css';

type InputOrTextareaChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

interface TextfieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>,
    CvElement {
  /** Helper text or custom content displayed below the input (string or React node) */
  assistiveText?: React.ReactNode;
  /** Alignment of the assistive text only. Default: "left". */
  assistiveTextAlign?: 'left' | 'center' | 'right';
  /** Decorator element displayed before the input */
  decorator?: React.ReactNode;
  /** If true, the input is in error state */
  isError?: boolean;
  /** Label text for the input */
  label: string;
  /** If true, renders a textarea that wraps text to the next line instead of scrolling horizontally. */
  multiline?: boolean;
  /** Called when the value changes (works for both input and textarea). */
  onChange?: (e: InputOrTextareaChangeEvent) => void;
  /** Number of visible rows when multiline. Default: 3. */
  rows?: number;
  /** Element displayed after the input */
  suffix?: React.ReactNode;
}

export const Textfield = ({
  'data-qa': dataQa,
  assistiveText,
  assistiveTextAlign = 'left',
  decorator,
  disabled,
  id,
  isError = false,
  label,
  multiline = false,
  placeholder = '',
  rows = 3,
  suffix,
  type = 'text',
  value = '',
  className = '',
  onChange = () => {},
  ...rest
}: TextfieldProps) => {
  const fieldId = `${id || dataQa}-textfield`;
  const assistiveTextIdFromHook = useId();
  const hasAssistiveText = assistiveText != null && assistiveText !== '';
  const assistiveTextId = hasAssistiveText ? assistiveTextIdFromHook : undefined;
  const { 'aria-describedby': ariaDescribedBy, ...restWithoutAria } = rest;
  const describedBy = [ariaDescribedBy, assistiveTextId].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.error]: isError,
          [styles.disabled]: disabled,
          [styles.multiline]: multiline,
        },
        className
      )}
    >
      <div className={styles.container}>
        {decorator && <div className={styles.decorator}>{decorator}</div>}
        <div className={styles.box}>
          {multiline ? (
            <textarea
              aria-describedby={describedBy}
              aria-label={label}
              className={classNames(styles.textarea, {
                [styles.textareaPlaceholder]: placeholder && !value,
              })}
              data-qa={dataQa ? `${dataQa}-textfield` : undefined}
              disabled={disabled}
              id={fieldId}
              onChange={onChange}
              placeholder={placeholder || ' '}
              rows={rows}
              value={value}
              {...(restWithoutAria as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <>
              <input
                aria-describedby={describedBy}
                className={classNames(styles.input, { [styles.inputPlaceholder]: placeholder })}
                data-qa={dataQa ? `${dataQa}-textfield` : undefined}
                disabled={disabled}
                id={fieldId}
                onChange={onChange}
                placeholder={placeholder || ' '}
                type={type}
                value={value}
                {...restWithoutAria}
              />
              <label className={styles.label} htmlFor={fieldId} id={`label-${fieldId}`}>
                {label}
              </label>
            </>
          )}
        </div>
        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>
      {hasAssistiveText && (
        <div
          className={classNames(styles.assistiveText, {
            [styles.assistiveTextCenter]: assistiveTextAlign === 'center',
            [styles.assistiveTextRight]: assistiveTextAlign === 'right',
          })}
          id={assistiveTextId}
        >
          {typeof assistiveText === 'string' ? <p>{assistiveText}</p> : assistiveText}
        </div>
      )}
    </div>
  );
};

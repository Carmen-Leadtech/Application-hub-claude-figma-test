import React, { useRef, useState, useCallback, useEffect } from 'react';

import classNames from 'classnames';
import { PasteTextCleaner } from 'utils/PasteTextCleaner/PasteTextCleaner';

import { Icon } from 'components/Icon/Icon';

import { FormatKey, buttonsConfig } from './ButtonsConfig';
import styles from './WysiwygInput.module.css';

interface WysiwygInputProps {
  value?: string;
  asideComponent?: React.ReactNode;
  onChange?: (value: string) => void;
  variant?: string;
  dataQa?: string;
  eventLabel?: string;
  eventCategory?: string;
  eventType?: string;
  inputId?: string;
  inputProps?: React.HTMLAttributes<HTMLDivElement>;
  initialFormatOption?: string;
  isMobile?: boolean;
  showCompleteness?: boolean;
  disableCopy?: boolean;
  className?: string;
}

/**
 * NOTE: Bold icon imported as *.old.* version as Figma is still a WIP.
 * TODO: Refactor icons & styles when Figma is ready:
 * @link https://www.figma.com/design/YzFW0iDk6jN1k0IAAnZ4ca/Editor---Design-System?node-id=3292-10083&m=dev
 */
export const WysiwygInput = ({
  value = '',
  asideComponent,
  onChange = () => {},
  variant,
  dataQa,
  eventLabel,
  eventCategory,
  eventType,
  inputId,
  inputProps,
  showCompleteness,
  disableCopy = false,
  className = '',
}: WysiwygInputProps) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [formatState, setFormatState] = useState<Record<FormatKey, boolean>>({
    bold: false,
    italic: false,
    underline: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    justifyFull: false,
    justifyLeft: false,
  });

  const [currentValue, setCurrentValue] = useState<string>(value);

  const checkParent = useCallback(() => {
    let element = window.getSelection()?.anchorNode;
    let found = false;
    let i = 0;
    while (element && i < 1000 && !found) {
      i += 1;
      if (element === inputRef.current) {
        found = true;
      }
      element = element.parentNode;
    }
    return found;
  }, []);

  const selectionChangeHandler = useCallback(() => {
    if (checkParent()) {
      setFormatState({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        justifyFull: document.queryCommandState('justifyFull'),
        justifyLeft: document.queryCommandState('justifyLeft'),
      });
    }
  }, []);

  const saveValue = useCallback(() => {
    if (!inputRef.current) return;
    let newValue = inputRef.current.innerHTML;
    if (newValue && newValue.length < 5) {
      newValue = newValue.replace('<br>', '');
    }
    onChange(newValue);
    setCurrentValue(newValue);
    selectionChangeHandler();
  }, [onChange]);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const newValue = (e.currentTarget as HTMLDivElement).innerHTML;
      setCurrentValue(newValue);
      onChange(newValue);
      selectionChangeHandler();
    },
    [onChange, selectionChangeHandler]
  );

  const pasteHandler = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, PasteTextCleaner(text));
      if (inputRef.current) {
        const newValue = inputRef.current.innerHTML;
        setCurrentValue(newValue);
        onChange(newValue);
      }
    },
    [onChange]
  );

  const changeFormat = useCallback(
    (format: string) => {
      if (!navigator.userAgent.match(/Edge\/([0-9._]+)/)) {
        inputRef.current?.focus();
      }

      if (checkParent()) {
        document.execCommand(format);
        saveValue();
      }
      if (navigator.userAgent.match(/Edge\/([0-9._]+)/)) {
        inputRef.current?.focus();
      }
    },
    [checkParent, saveValue]
  );

  const showCompletenessCheckmark = () => {
    const cleanValue = currentValue.replace(/(<([^>]+)>)/gi, '');
    return cleanValue && showCompleteness;
  };

  const renderAsideComponent = () => {
    if (!asideComponent) return null;
    return <>{asideComponent}</>;
  };

  useEffect(() => setCurrentValue(value), [value]);

  return (
    <div className={classNames(styles.container, { [styles.dark]: variant === 'dark' }, className)}>
      <div className={styles.bar}>
        <div className={styles.buttonContainer}>
          {buttonsConfig.map((button) => {
            return (
              <button
                key={button.name}
                className={classNames(styles.button, {
                  [styles.buttonSelected]: !!formatState[button.name],
                })}
                onClick={() => changeFormat(button.name)}
                data-qa={`Editor-button-${button.name}`}
                data-tm-event-action="Wysiwyg"
                data-tm-event-label={button.tmEvent}
                data-tm-event-category={eventCategory}
                data-tm-type={eventType}
                tabIndex={button.tabIndex}
              >
                {button.icon}
              </button>
            );
          })}
        </div>
        {renderAsideComponent()}
      </div>
      <div
        className={styles.input}
        ref={inputRef}
        id={inputId}
        tabIndex={0}
        contentEditable="true"
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        data-qa={dataQa}
        data-tm-event-action="Wysiwyg"
        data-tm-event-label={eventLabel}
        data-tm-event-category={eventCategory}
        data-tm-type={eventType}
        onPaste={pasteHandler}
        onCopy={disableCopy ? (e) => e.preventDefault() : undefined}
        onCut={disableCopy ? (e) => e.preventDefault() : undefined}
        onContextMenu={disableCopy ? (e) => e.preventDefault() : undefined}
        onSelect={selectionChangeHandler}
        {...inputProps}
      />
      <div
        className={classNames(styles.suffixContainer, {
          [styles.suffixVisible]: showCompletenessCheckmark(),
        })}
      >
        <Icon name="check_circle" data-qa="tick" color="#006dcc" />
      </div>
    </div>
  );
};

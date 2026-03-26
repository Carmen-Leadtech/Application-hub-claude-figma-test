import { ChangeEvent, FocusEvent, useState } from 'react';

import { DraggableAttributes, DndMonitorListener } from '@dnd-kit/core';
import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Icon } from 'components/Icon/Icon';

import styles from './Chip.module.css';

interface DraggableProps {
  attributes?: DraggableAttributes;
  listeners?: DndMonitorListener;
}

export interface ChipProps extends CvElement {
  /** Text content of the chip */
  children?: string;
  /** Props for drag and drop functionality */
  draggableProps?: DraggableProps;
  /** If true, the chip is being dragged */
  isDragging?: boolean;
  /** If true, the chip label is editable */
  isEditable?: boolean;
  /** If true, the chip is in selected state */
  isSelected?: boolean;
  /** Callback fired when the label loses focus */
  onBlurLabel?: (newValue: string, id?: string) => void;
  /** Callback fired when the label content changes */
  onChangeLabel?: (newValue: string, id?: string) => void;
  /** Callback fired when the close button is clicked */
  onClickClose?: (id?: string) => void;
  /** Callback fired when the chip is clicked (when not editable) */
  onClickSelectedChip?: (id?: string) => void;
}

export const Chip = ({
  'data-qa': dataQa,
  children,
  draggableProps,
  id,
  isDragging = false,
  isEditable = false,
  isSelected = false,
  className = '',
  onBlurLabel,
  onChangeLabel,
  onClickClose,
  onClickSelectedChip,
}: ChipProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeIsEditing = () => {
    setIsEditing(true);
  };

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    setIsEditing(false);

    if (onBlurLabel) {
      onBlurLabel(event.target.innerText, id);
    }
  };

  const handleChangeLabel = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChangeLabel) {
      onChangeLabel(event.currentTarget.innerText, id);
    }
  };

  const handleSelectedChip = () => {
    if (onClickSelectedChip) {
      onClickSelectedChip(id);
    }
  };

  const handleClose = () => {
    if (onClickClose) {
      onClickClose(id);
    }
  };

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.dragging]: isDragging,
          [styles.editable]: isEditable,
          [styles.editing]: isEditable && isEditing,
          [styles.selected]: !isEditable && isSelected,
        },
        className
      )}
      id={id}
      onClick={!isEditable ? handleSelectedChip : undefined}
      tabIndex={1}
    >
      {draggableProps && (
        <div
          className={classNames(styles.dragIcon, {
            [styles.dragIconDragging]: isDragging,
          })}
          tabIndex={2}
          {...draggableProps}
        >
          <Icon name="drag_indicator" size={24} />
        </div>
      )}
      <span
        className={styles.label}
        contentEditable={isEditable}
        data-qa={dataQa ? `${dataQa}-chip-input` : undefined}
        onBlur={isEditable ? handleBlur : undefined}
        onClick={isEditable ? handleChangeIsEditing : undefined}
        onFocus={isEditable ? handleChangeIsEditing : undefined}
        onInput={isEditable ? handleChangeLabel : undefined}
        role={isEditable ? 'textbox' : undefined}
        suppressContentEditableWarning={isEditable}
        tabIndex={3}
      >
        {children}
      </span>
      {onClickClose && (
        <button
          className={styles.closeIcon}
          data-qa={dataQa ? `${dataQa}-chip-delete` : undefined}
          onClick={handleClose}
          tabIndex={4}
        >
          <Icon name="close" size={11} color="var(--color-icons-brand)" />
        </button>
      )}
    </div>
  );
};

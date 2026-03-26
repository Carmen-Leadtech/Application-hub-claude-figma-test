import { Icon } from 'components/Icon/Icon';

export type FormatKey =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'justifyFull'
  | 'justifyLeft';

interface ButtonConfigProps {
  icon: React.ReactNode;
  name: FormatKey;
  tmEvent: string;
  tabIndex?: number;
}

export const buttonsConfig: ButtonConfigProps[] = [
  {
    icon: <Icon name="format_bold" />,
    name: 'bold',
    tmEvent: 'Bold',
    tabIndex: -1,
  },
  {
    icon: <Icon name="format_italic" />,
    name: 'italic',
    tmEvent: 'Italic',
    tabIndex: -1,
  },
  {
    icon: <Icon name="format_underlined" />,
    name: 'underline',
    tmEvent: 'Underline',
    tabIndex: -1,
  },
  {
    icon: <Icon name="format_list_bulleted" />,
    name: 'insertUnorderedList',
    tmEvent: 'Unordered list',
    tabIndex: -1,
  },
  {
    icon: <Icon name="format_list_numbered" />,
    name: 'insertOrderedList',
    tmEvent: 'Ordered list',
    tabIndex: -1,
  },
  {
    icon: <Icon name="format_align_left" />,
    name: 'justifyLeft',
    tmEvent: 'Justify left',
  },
  {
    icon: <Icon name="format_align_justify" />,
    name: 'justifyFull',
    tmEvent: 'Justify full',
  },
] as const;

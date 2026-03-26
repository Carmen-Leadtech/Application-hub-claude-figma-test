type TruncateTextProps = {
  text: string;
  maxLength?: number;
  textOverflow?: string;
};

export function truncateText({ text, maxLength = 350, textOverflow = '...' }: TruncateTextProps) {
  const firstSpacePosition = text.slice(maxLength).indexOf(' ');
  if (text.length > maxLength && firstSpacePosition !== -1) {
    return `${text.slice(0, maxLength + firstSpacePosition)}${textOverflow}`;
  }
  return text;
}

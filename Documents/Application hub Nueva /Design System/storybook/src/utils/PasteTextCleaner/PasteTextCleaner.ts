import { VALID_CHARS_REGEX } from './config';

function PasteTextCleaner(text: string) {
  // Replace quotes copied from word files to the quotes you can find in any text editor.
  const textModified = '' + text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

  let cleanedText = '';
  for (const character of textModified) {
    const regex = new RegExp(VALID_CHARS_REGEX, 'gu');
    if (regex.test(character)) {
      cleanedText += character;
    }
  }

  return cleanedText;
}

export { PasteTextCleaner };

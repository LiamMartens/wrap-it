import { MandatoryBreakCharacters, BreakAfterCharacters, BreakBeforeCharacters } from './characters';

/**
 * Fits text into a certain width (taking into account break characters and line feeds)
 * 
 * @param text Complete text
 * @param start The text index offset
 * @param maxWidth The width to fit to
 * @param letterSpacing Additional width between letters
 * @param measure Function which determines how to measure a character
 */
export function fit(
  text: string,
  start: number,
  maxWidth: number,
  measure: (text: string, charIndex: number, localIndex: number) => number,
) {
  let width = 0;
  let index = 0;
  let lastMbCharIndex = -1;
  let lastBaCharIndex = -1;
  let lastBbCharIndex = -1;
  const len = text.length - start;
  while (index < len) {
    const charIndex = start + index;
    const charWidth = measure(text, charIndex, index);
    const char = text[charIndex];
    // save last break after and before chars
    if (BreakAfterCharacters.includes(char)) { lastBaCharIndex = index; }
    if (BreakBeforeCharacters.includes(char)) { lastBbCharIndex = index; }
    // always end on newlines
    if (MandatoryBreakCharacters.includes(char)) { lastMbCharIndex = index; break; }
    // update size
    const nextWidth = width + charWidth;
    if (nextWidth < maxWidth) width = nextWidth;
    else break;
    index++;
  }
  if (lastMbCharIndex > -1) return { start, length: lastMbCharIndex };
  if (lastBaCharIndex > 0 && lastBaCharIndex > lastBbCharIndex) return { start, length: lastBaCharIndex, };
  if (lastBbCharIndex > 0 && lastBbCharIndex > lastBaCharIndex) return { start, length: lastBbCharIndex - 1 };
  return {
    start,
    length: index,
  };
}

export function wrap(
  text: string,
  maxWidth: number,
  measure: (text: string, charIndex: number, localIndex: number) => number,
) {
  let indexOffset = 0;
  const lines: string[] = [];
  const ranges: ReturnType<typeof fit>[] = [];
  while (indexOffset < text.length) {
    const { start, length } = fit(text, indexOffset, maxWidth, measure);
    let str = text.substr(start, length);
    lines.push(str.trim());
    ranges.push({ start, length });
    indexOffset += str.length;
  }
  return {
    lines,
    ranges,
  };
}
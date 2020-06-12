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
  let needsBreak = false;
  let lastMbCharIndex = -1;
  let lastBaCharIndex = -1;
  let lastBbCharIndex = -1;
  let widthOnLastBaChar = 0;
  let widthOnLastBbChar = 0;
  const len = text.length - start;
  while (index < len) {
    const charIndex = start + index;
    const charWidth = measure(text, charIndex, index);
    const char = text[charIndex];
    // save last break after and before chars
    if (BreakAfterCharacters.includes(char)) { widthOnLastBaChar = width + charWidth; lastBaCharIndex = index; }
    if (BreakBeforeCharacters.includes(char)) { widthOnLastBbChar = width; lastBbCharIndex = index; }
    // always end on newlines
    if (MandatoryBreakCharacters.includes(char)) { lastMbCharIndex = index; break; }
    // update size
    const nextWidth = width + charWidth;
    if (maxWidth <= 0 || nextWidth < maxWidth) { width = nextWidth; }
    else { needsBreak = true; break; }
    index++;
  }
  if (needsBreak) {
    if (lastMbCharIndex > -1) return { start, width, length: lastMbCharIndex };
    if (lastBaCharIndex > 0 && lastBaCharIndex > lastBbCharIndex) return { start, width: widthOnLastBaChar, length: lastBaCharIndex + 1, };
    if (lastBbCharIndex > 0 && lastBbCharIndex > lastBaCharIndex) return { start, width: widthOnLastBbChar, length: lastBbCharIndex };
  }
  return {
    start,
    width,
    length: index,
  };
}

export function wrap(
  text: string,
  maxWidth: number,
  measure: (text: string, charIndex: number, localIndex: number) => number,
) {
  const leadingSpaceRx = /^([\s\uFEFF\xA0]+)/;
  const trailingSpaceRx = /([\s\uFEFF\xA0]+)$/;

  let indexOffset = 0;
  const lines: string[] = [];
  const ranges: { start: number; length: number; }[] = [];
  const sizes: { total: number; leading: number; trailing: number; }[] = [];
  while (indexOffset < text.length) {
    const { start, length, width } = fit(text, indexOffset, maxWidth, measure);
    let str = text.substr(start, length);
    let leadingSpaceWidth = 0;
    let trailingSpaceWidth = 0;
    const leadingSpaces = Array.from(str.match(leadingSpaceRx)?.[0] || '');
    leadingSpaces.forEach((space, index) => { leadingSpaceWidth += measure(text, start + index, index); });
    const trailingSpaces = Array.from(str.replace(leadingSpaceRx, '').match(trailingSpaceRx)?.[0] || '');
    trailingSpaces.forEach((space, index) => { trailingSpaceWidth += measure(text, start + str.length - trailingSpaces.length + index, index); });
    lines.push(str);
    ranges.push({ start, length });
    sizes.push({
      total: width,
      leading: leadingSpaceWidth,
      trailing: trailingSpaceWidth,
    });
    indexOffset += str.length;
  }
  return {
    lines,
    ranges,
    sizes,
  };
}
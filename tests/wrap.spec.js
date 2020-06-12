test('Should wrap the words Lorem Ipsum', () => {
  const { wrap } = require('../lib');
  const charSizes = [9, 7, 5, 7, 12, 4, 3, 8, 6, 8, 12]; // character widths for variable font
  const letterSpacing = 0;
  const { lines, ranges } = wrap('Lorem Ipsum', 24, letterSpacing, (text, charIndex) => charSizes[charIndex]);
  expect(lines[0]).toBe('Lor');
  expect(lines[1]).toBe('em');
  expect(lines[2]).toBe('Ips');
  expect(lines[3]).toBe('um');
});

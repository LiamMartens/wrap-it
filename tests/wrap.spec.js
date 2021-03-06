test('Should wrap the words Lorem Ipsum', () => {
  const { wrap } = require('../lib');
  const charSizes = [9, 7, 5, 7, 12, 4, 3, 8, 6, 8, 12]; // character widths for variable font
  const { lines, ranges, sizes } = wrap('Lorem Ipsum', 24, (text, charIndex, localIndex) => charSizes[charIndex]);

  expect(lines[0]).toBe('Lor');
  expect(lines[1]).toBe('em ');
  expect(lines[2]).toBe('Ips');
  expect(lines[3]).toBe('um');
});

test('Should be able to keep lines as is for no width limit', () => {
  const { wrap } = require('../lib');
  const charSizes = [9, 7, 5, 7, 12, 4, 3, 8, 6, 8, 12]; // character widths for variable font
  const { lines, ranges, sizes } = wrap('Lorem\nIpsum', -1, (text, charIndex, localIndex) => charSizes[charIndex]);
  expect(lines[0]).toBe('Lorem\n');
  expect(lines[1]).toBe('Ipsum');
});

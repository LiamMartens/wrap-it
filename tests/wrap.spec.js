test('Should wrap the words Lorem Ipsum', () => {
  const { wrap } = require('../lib');
  const charSizes = [9, 7, 5, 7, 12, 4, 3, 8, 6, 8, 12]; // character widths for variable font
  const { lines, ranges, sizes } = wrap('Lorem Ipsum', 24, (text, charIndex, localIndex) => charSizes[charIndex]);

  expect(lines[0]).toBe('Lor');
  expect(lines[1]).toBe('em');
  expect(lines[2]).toBe('Ips');
  expect(lines[3]).toBe('um');

  expect(sizes[0]).toBe(21);
  expect(sizes[1]).toBe(19);
  expect(sizes[2]).toBe(17);
  expect(sizes[3]).toBe(20);
});

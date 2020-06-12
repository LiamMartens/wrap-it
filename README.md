# Word-Wrap-It
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/word-wrap-it.svg?style=flat)](https://www.npmjs.com/package/word-wrap-it)  

You can use this library to wrap texts.

## Usage
```ts
import { wrap } from 'word-wrap-it';
//                 L  o  r  e  m      I  p  s  u  m
const charSizes = [9, 7, 5, 7, 12, 4, 3, 8, 6, 8, 12]; // character widths for variable font
const { lines, ranges, sizes } = wrap('Lorem Ipsum', 24, (text, charIndex, localIndex) => charSizes[charIndex]);
console.log(lines);
console.log(ranges);
console.log(sizes);
```
The result will be
```
[ 'Lor', 'em', 'Ips', 'um' ] // the resulting lines
[
  { start: 0, length: 3 },
  { start: 3, length: 3 },
  { start: 5, length: 4 },
  { start: 9, length: 2 }
] // the actual character ranges
[ 21, 19, 17, 20 ] // the trimmed line widths
```
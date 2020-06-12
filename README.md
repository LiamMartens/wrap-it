# Word-Wrap-It
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/word-wrap-it.svg?style=flat)](https://www.npmjs.com/package/word-wrap-it)  

You can use this library to wrap texts.

## Usage
```ts
import { wrap } from 'word-wrap-it';
//                 L  o  r  e  m      I  p  s  u  m
const charSizes = [9, 7, 5, 7, 12, 4, 3, 8, 6, 8, 12]; // character widths for variable font
const letterSpacing = 0;
const { lines, ranges } = wrap('Lorem Ipsum', 24, letterSpacing, (text, charIndex) => charSizes[charIndex]);
console.log(lines);
console.log(ranges);
```
The result will be
```
[ 'Lor', 'em', 'Ips', 'um' ]
[
  { start: 0, length: 3 },
  { start: 3, length: 2 },
  { start: 5, length: 4 },
  { start: 9, length: 2 }
]
```
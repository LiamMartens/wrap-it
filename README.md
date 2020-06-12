# Wrap-It
You can use this library to wrap texts.

## Usage
```ts
import { wrap } from 'wrap-it';
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
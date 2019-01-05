# hutchison
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Hutchison point system](http://www.erhutchison.com/) calculator for various poker games, written in JavaScript.

### Usage
Install the library with `npm install hutchison`

```javascript
import {texasHoldem} from 'hutchison';

console.log(texasHoldem({hand: ['Ah', 'Ad']})); // <- 42
console.log(texasHoldem({hand: ['7h', '2d']})); // <- 9
```

[downloads-image]: https://img.shields.io/npm/dm/hutchison.svg

[npm-url]: https://npmjs.org/package/hutchison
[npm-image]: https://img.shields.io/npm/v/hutchison.svg

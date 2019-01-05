# hutchison
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Hutchison point system](http://www.erhutchison.com/) calculator for various poker games, written in JavaScript.

### Usage
Install the library with `npm install hutchison`

```javascript
import {texasHoldem, omahaHoldem} from 'hutchison';

console.log(texasHoldem({hand: ['Ah', 'Ad']})); // <- 42
console.log(texasHoldem({hand: ['7h', '2d']})); // <- 9

console.log(omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh']})); // <- 54
console.log(omahaHoldem({hand: ['As', '3s', 'Kd', '4d']})); // <- 30
```

[downloads-image]: https://img.shields.io/npm/dm/hutchison.svg

[npm-url]: https://npmjs.org/package/hutchison
[npm-image]: https://img.shields.io/npm/v/hutchison.svg

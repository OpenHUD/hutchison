# hutchison
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Hutchison point system](http://www.erhutchison.com/) calculator for various poker games, written in JavaScript.

### Usage
Install the library with `npm install hutchison`

```javascript
import {texasHoldem, omahaHoldem} from 'hutchison';

console.log(texasHoldem({hand: ['Ah', 'Ad']})); // <- {"points":42, percentile: 1}
console.log(texasHoldem({hand: ['7h', '2d']})); // <- {"points":9, percentile: 0.04524886877828054}

console.log(omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh']})); // <- {"points":54, percentile: 1}
console.log(omahaHoldem({hand: ['As', '3s', 'Kd', '4d']})); // <- {"points":30, percentile: 0.9607276756856589}
```

[downloads-image]: https://img.shields.io/npm/dm/hutchison.svg

[npm-url]: https://npmjs.org/package/hutchison
[npm-image]: https://img.shields.io/npm/v/hutchison.svg

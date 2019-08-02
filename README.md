# hutchison
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Hutchison point system](http://www.erhutchison.com/) calculator for various poker games, written in JavaScript.

### Usage
Install the library with `npm install hutchison`

```javascript
import {texasHoldem, omahaHoldem, omahaHoldem6} from 'hutchison';

console.log(texasHoldem({hand: ['Ah', 'Ad']})); // <- {"points":42, percentile: 1}
console.log(texasHoldem({hand: ['7h', '2d']})); // <- {"points":9, percentile: 0.04524886877828054}

console.log(omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh']})); // <- {"points":27, percentile: 1}
console.log(omahaHoldem({hand: ['As', 'Ah', '7c', '2d']})); // <- {"points":10, percentile: 0.658694246929541}

console.log(omahaHoldem6({hand: ['As', 'Ks', 'Ah', 'Kh']})); // <- {"ev":?, percentile: ?}
console.log(omahaHoldem6({hand: ['As', 'Ah', '7c', '2d']})); // <- {"ev":?, percentile: ?}
```

[downloads-image]: https://img.shields.io/npm/dm/hutchison.svg

[npm-url]: https://npmjs.org/package/hutchison
[npm-image]: https://img.shields.io/npm/v/hutchison.svg

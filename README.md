# hutchison
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Hutchison poker hand rankings](http://www.erhutchison.com/), written in JavaScript.

### Usage
Install the library with `npm install hutchison`

```javascript
import {texasHoldem, omahaHoldem} from 'hutchison';

console.log(texasHoldem({hand: ['Ah', 'Ad']})); // <- {"points":42, percentile: 1}
console.log(texasHoldem({hand: ['7h', '2d']})); // <- {"points":9, percentile: 0.04524886877828054}

console.log(omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 6})); // <- {"ev":?, percentile: ?}
console.log(omahaHoldem({hand: ['As', 'Ah', '7c', '2d'], players: 2})); // <- {"ev":?, percentile: ?}
```

[downloads-image]: https://img.shields.io/npm/dm/hutchison.svg

[npm-url]: https://npmjs.org/package/hutchison
[npm-image]: https://img.shields.io/npm/v/hutchison.svg

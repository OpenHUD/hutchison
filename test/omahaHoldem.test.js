import texasHoldem from '../src/omahaHoldem.js';
import {expect} from 'chai';

describe('omahaHoldem', () => {
    it ('correctly calculates AAKK double suited', () => {
        // Example in Huchinson's original article
        expect(texasHoldem({hand: ['As', 'Ks', 'Ah', 'Kh']})).to.equal(54);
    });

    it ('correctly calculates 9988 double suited', () => {
        // Example in Huchinson's original article
        expect(texasHoldem({hand: ['9s', '8s', '9d', '8d']})).to.equal(32);
    });

    it ('correctly calculates QQ99 rainbow', () => {
        // Example in Huchinson's original article
        expect(texasHoldem({hand: ['Qs', 'Qd', '9h', '9c']})).to.equal(28);
    });

    it ('correctly calculates AKQT suited', () => {
        // Example in Huchinson's original article calculates this as 31, but forgets to subtract 4 for the straighty ace
        expect(texasHoldem({hand: ['As', 'Kd', 'Qh', 'Ts']})).to.equal(27);
    });

    it ('correctly calculates AK43 double suited', () => {
        // Example in Huchinson's original article
        expect(texasHoldem({hand: ['As', '3s', 'Kd', '4d']})).to.equal(30);
    });
});
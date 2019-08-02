import omahaHoldem6 from '../src/omahaHoldem6.js';
import {expect} from 'chai';

describe('omahaHoldem6', () => {
    it ('correctly calculates (AK)(AK)', () => {
        const {ev, percentile} = omahaHoldem6({hand: ['As', 'Ks', 'Ah', 'Kh']});
        expect(ev).to.be.closeTo(0.35, 0.01);
        expect(percentile).to.equal(1);
    });
});
import texasHoldem from '../src/texasHoldem.js';
import {expect} from 'chai';

describe('texasHoldem', () => {
    it ('correctly calculates AA', () => {
        expect(texasHoldem({hand: ['Ad', 'Ac']})).to.equal(42);
    });

    it ('correctly calculates QJo', () => {
        expect(texasHoldem({hand: ['Qd', 'Jc']})).to.equal(28);
    });

    it ('correctly calculates 64s', () => {
        expect(texasHoldem({hand: ['6d', '4d']})).to.equal(16);
    });

    it ('correctly calculates 72o', () => {
        expect(texasHoldem({hand: ['7d', '2c']})).to.equal(9);
    });
});
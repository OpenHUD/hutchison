import texasHoldem from '../src/texasHoldem.js';
import {expect} from 'chai';

describe('texasHoldem', () => {
    it ('correctly calculates AA', () => {
        const {points, percentile} = texasHoldem({hand: ['Ad', 'Ac']});
        expect(points).to.equal(42);
        expect(percentile).to.equal(1);
    });

    it ('correctly calculates QJo', () => {
        const {points, percentile} = texasHoldem({hand: ['Qd', 'Jc']});
        expect(points).to.equal(28);
        expect(percentile).to.equal(0.9079939668174962);
    });

    it ('correctly calculates 64s', () => {
        const {points, percentile} = texasHoldem({hand: ['6d', '4d']});
        expect(points).to.equal(16);
        expect(percentile).to.equal(0.3770739064856712);
    });

    it ('correctly calculates 72o', () => {
        const {points, percentile} = texasHoldem({hand: ['7d', '2c']});
        expect(points).to.equal(9);
        expect(percentile).to.equal(0.04524886877828054);
    });
});
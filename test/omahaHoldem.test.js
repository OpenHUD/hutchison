import omahaHoldem from '../src/omahaHoldem.js';
import {expect} from 'chai';

describe('omahaHoldem', () => {
    describe('2-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 2});
            expect(ev).to.be.closeTo(0.7, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('3-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 3});
            expect(ev).to.be.closeTo(0.54, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('4-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 4});
            expect(ev).to.be.closeTo(0.45, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('5-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 5});
            expect(ev).to.be.closeTo(0.39, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('6-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 6});
            expect(ev).to.be.closeTo(0.35, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('7-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 7});
            expect(ev).to.be.closeTo(0.32, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('8-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 8});
            expect(ev).to.be.closeTo(0.29, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('9-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 9});
            expect(ev).to.be.closeTo(0.28, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('10-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 10});
            expect(ev).to.be.closeTo(0.26, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });

    describe('11-handed', () => {
        it ('correctly calculates (AK)(AK)', () => {
            const {ev, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh'], players: 11});
            expect(ev).to.be.closeTo(0.25, 0.01);
            expect(percentile).to.be.closeTo(1, 0.001);
        });
    });
});
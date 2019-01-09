import omahaHoldem from '../src/omahaHoldem.js';
import {expect} from 'chai';

// Tests based on examples from:
// [1] http://erh.homestead.com/omaha.html
// [2] https://www.scribd.com/document/49697747/Edward-Hutchison-Hutchinson-Omaha-Point-System
// [3] https://metacpan.org/source/TMTM/Games-Poker-Omaha-Hutchison-1.04/t/01.t
describe('omahaHoldem', () => {
    it ('correctly calculates AAKK double suited', () => {
        // From [1]
        const {points, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh']});
        expect(points).to.equal(27);
        expect(percentile).to.equal(1);
    });

    it ('correctly calculates 9988 double suited', () => {
        // From [1]
        const {points, percentile} = omahaHoldem({hand: ['9s', '8s', '9d', '8d']});
        expect(points).to.equal(16);
        expect(percentile).to.equal(0.9676646043032597);
    });

    it ('correctly calculates QQ88 rainbow', () => {
        // From [2]
        const {points, percentile} = omahaHoldem({hand: ['Qs', 'Qd', '8h', '8c']});
        expect(points).to.equal(13);
        expect(percentile).to.equal(0.8681614184135192);
    });

    it ('correctly calculates AA72 rainbow', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['As', 'Ah', '7c', '2d']});
        expect(points).to.equal(10);
        expect(percentile).to.equal(0.658694246929541);
    });

    it ('correctly calculates KK63 double suited', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['Ks', 'Kd', '3s', '6d']});
        expect(points).to.equal(15);
        expect(percentile).to.equal(0.9521728691476591);
    });

    it ('correctly calculates AKQT suited', () => {
        // From [2]
        const {points, percentile} = omahaHoldem({hand: ['As', 'Kd', 'Qh', 'Ts']});
        expect(points).to.equal(15);
        expect(percentile).to.equal(0.9521728691476591);
    });

    it ('correctly calculates AAKQ double suited', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['Ah', 'Kh', 'Ad', 'Qd']});
        expect(points).to.equal(24);
        expect(percentile).to.equal(0.999933511866285);
    });

    it ('correctly calculates 5432 rainbow', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['2h', '3c', '4s', '5d']});
        expect(points).to.equal(2);
        expect(percentile).to.equal(0.028327638747806815);
    });

    it ('correctly calculates KQ32 rainbow', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['2h', '3c', 'Ks', 'Qd']});
        expect(points).to.equal(6);
        expect(percentile).to.equal(0.21510019392372334);
    });

    it ('correctly calculates A432 rainbow', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['Ah', '2c', '3s', '4d']});
        expect(points).to.equal(3);
        expect(percentile).to.equal(0.054642164558130944);
    });


    it ('correctly calculates AKQ2 rainbow', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['Ad', 'Kc', 'Qh', '2s']});
        expect(points).to.equal(8);
        expect(percentile).to.equal(0.43934989380367534);
    });

    it ('correctly calculates KJT6 rainbow', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['Kh', 'Jc', 'Th', '6s']});
        expect(points).to.equal(9);
        expect(percentile).to.equal(0.5563025210084034);
    });

    it ('correctly calculates AA64 worse suit', () => {
        // From [3]
        const {points, percentile} = omahaHoldem({hand: ['Ad', '6c', 'As', '4c']});
        expect(points).to.equal(12);
        expect(percentile).to.equal(0.8121710222550559);
    });
});
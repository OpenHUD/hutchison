import omahaHoldem from '../src/omahaHoldem.js';
import {expect} from 'chai';

describe('omahaHoldem', () => {
    it ('correctly calculates AAKK double suited', () => {
        // Example in Huchinson's original article
        const {points, percentile} = omahaHoldem({hand: ['As', 'Ks', 'Ah', 'Kh']});
        expect(points).to.equal(54);
        expect(percentile).to.equal(1);
    });

    it ('correctly calculates 9988 double suited', () => {
        // Example in Huchinson's original article
        const {points, percentile} = omahaHoldem({hand: ['9s', '8s', '9d', '8d']});
        expect(points).to.equal(32);
        expect(percentile).to.equal(0.9747123464770524);
    });

    it ('correctly calculates QQ99 rainbow', () => {
        // Example in Huchinson's original article
        const {points, percentile} = omahaHoldem({hand: ['Qs', 'Qd', '9h', '9c']});
        expect(points).to.equal(28);
        expect(percentile).to.equal(0.9340068335026318);
    });

    it ('correctly calculates AKQT suited', () => {
        // Example in Huchinson's original article calculates this as 31, but forgets to subtract 4 for the straighty ace
        const {points, percentile} = omahaHoldem({hand: ['As', 'Kd', 'Qh', 'Ts']});
        expect(points).to.equal(27);
        expect(percentile).to.equal(0.9139348046911072);
    });

    it ('correctly calculates AK43 double suited', () => {
        // Example in Huchinson's original article
        const {points, percentile} = omahaHoldem({hand: ['As', '3s', 'Kd', '4d']});
        expect(points).to.equal(30);
        expect(percentile).to.equal(0.9607276756856589);
    });
});
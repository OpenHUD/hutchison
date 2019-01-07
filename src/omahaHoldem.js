import {distance} from '@openhud/helpers';

// Generated with following code:
/*
const {omahaHoldem} = require("hutchison")
const Combinatorics = require('js-combinatorics');

const deck = Combinatorics.cartesianProduct(['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'], ['s', 'c', 'd', 'h']).map(x => x.join(''));

const handCmb = Combinatorics.bigCombination(deck, 4);
const histogram = new Map();
let numHands = 0;
let hand;
while (hand = handCmb.next()) {
    ++numHands;
    const {points} = omahaHoldem({hand});
    histogram.set(points, (histogram.get(points) || 0) + 1);
}

const sortedHistogram = new Map([...histogram.entries()].sort((a,b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))

const cdf = new Map();
let countSoFar = 0;
sortedHistogram.forEach((count, points) => {
   countSoFar += count;
   cdf.set(points, countSoFar / numHands);
});

JSON.stringify([...cdf.entries()])
*/
const cdf = new Map([[
    -2,0.000029550281651121987],
    [0,0.0010527287838212208],
    [1,0.0011413796287745867],
    [2,0.0017028349801459046],
    [3,0.002500692584726198],
    [4,0.0034167513159109797],
    [5,0.004569212300304737],
    [6,0.006504755748453227],
    [7,0.008455074337427279],
    [8,0.012326161233724259],
    [9,0.017246283128636068],
    [10,0.026746698679471787],
    [11,0.03837473450918829],
    [12,0.057848370117277684],
    [13,0.08267060670422015],
    [14,0.11942376950780312],
    [15,0.16270015698587126],
    [16,0.22437898236217563],
    [17,0.28859174439006374],
    [18,0.37466432726936927],
    [19,0.4563265306122449],
    [20,0.5491144149967679],
    [21,0.6232117462369563],
    [22,0.7051103518330409],
    [23,0.7620611321451658],
    [24,0.8187902853449072],
    [25,0.855617323852618],
    [26,0.8909225228552959],
    [27,0.9139348046911072],
    [28,0.9340068335026318],
    [29,0.9469867947178872],
    [30,0.9607276756856589],
    [31,0.9670883738110629],
    [32,0.9747123464770524],
    [33,0.9787902853449072],
    [34,0.985394773293933],
    [35,0.9877440206851972],
    [36,0.9926641425801089],
    [37,0.993572813740881],
    [38,0.9958998984209069],
    [39,0.9963431526456736],
    [40,0.9977394034536892],
    [41,0.9979388678548342],
    [42,0.9988697017268446],
    [43,0.9990026779942747],
    [44,0.9996010711977098],
    [45,0.9996232339089482],
    [46,0.9998448610213316],
    [47,0.9998891864438083],
    [48,0.999933511866285],
    [50,0.9999778372887617],
    [54,1]
]);

const rankIndices = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['J', 11],
    ['T', 10],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2]
]);

const suitedRankPoints = new Map([
    ['A', 8],
    ['K', 6],
    ['Q', 5],
    ['J', 4],
    ['T', 3],
    ['9', 3],
    ['8', 2],
    ['7', 1],
    ['6', 1],
    ['5', 1],
    ['4', 1],
    ['3', 1],
    ['2', 1]
]);

const pairedRankPoints = new Map([
    ['A', 18],
    ['K', 16],
    ['Q', 14],
    ['J', 13],
    ['T', 12],
    ['9', 10],
    ['8', 8],
    ['7', 7],
    ['6', 7],
    ['5', 7],
    ['4', 7],
    ['3', 7],
    ['2', 7]
]);

// Based on http://erh.homestead.com/omaha.html
const omahaHoldem = ({hand}) => {
    if (!hand || hand.length !== 4) {
        throw new Error('Invalid omaha holdem hand');
    }

    let points = 0;

    // Step 1
    const ranksBySuit = new Map([
        ['s', []],
        ['c', []],
        ['h', []],
        ['d', []]
    ]);

    hand.forEach(([rank, suit]) => {
        const ranks = ranksBySuit.get(suit);
        ranks.push(rank);
    });

    ranksBySuit.forEach(ranks => {
        if (ranks.length >= 2) {
            points += Math.max(...ranks.map(rank => suitedRankPoints.get(rank)));
            if (ranks.length >= 3) {
                points -= 2 ;
            }
        }
    });

    // Step 2
    const suitsByRank = new Map([
        ['A', []],
        ['K', []],
        ['Q', []],
        ['J', []],
        ['T', []],
        ['9', []],
        ['8', []],
        ['7', []],
        ['6', []],
        ['5', []],
        ['4', []],
        ['3', []],
        ['2', []]
    ]);

    hand.forEach(([rank, suit]) => {
        const suits = suitsByRank.get(rank);
        suits.push(suit);
    });

    suitsByRank.forEach((suits, rank) => {
        if (suits.length === 2) {
            points += pairedRankPoints.get(rank);
        }
    });

    // Step 3
    const uniqueRanks = new Set();
    hand.forEach(([rank]) => {
        uniqueRanks.add(rank);
    });
    const sortedRankIndices = [...uniqueRanks].map(rank => rankIndices.get(rank));
    sortedRankIndices.sort((a, b) => b - a);

    let straightPairs = 0;
    let gaps = 0;
    let straightAce = false;
    for (let i = 0; i < sortedRankIndices.length - 1; ++i) {
        const rankIndex1 = sortedRankIndices[i];
        const rankIndex2 = sortedRankIndices[i+1];

        const gap = rankIndex1 - rankIndex2 - 1;
        if (gap <= 3) {
            ++straightPairs;
            gaps += gap;
            if (rankIndex1 === 14) {
                straightAce = true;
            }
        }
    }
    switch(straightPairs) {
    case 3:
        points += 25;
        break;
    case 2:
        points += 18;
        break;
    case 1:
        points += 8;
        break;
    default:
        break;
    }
    points -= 2 * gaps;
    if (straightAce) {
        points -= 4;
    }

    if (uniqueRanks.has('A')) {
        const wheelCards =
            uniqueRanks.has('2') ? 1 : 0 +
            uniqueRanks.has('3') ? 1 : 0 +
            uniqueRanks.has('4') ? 1 : 0 +
            uniqueRanks.has('5') ? 1 : 0;
        points += Math.min(12, 2 * wheelCards);
    }
    
    const percentile = cdf.get(points);

    return {points, percentile};
  };

export default omahaHoldem;
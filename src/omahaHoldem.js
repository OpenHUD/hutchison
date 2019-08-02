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
const cdf = new Map([
    [0,0.0013334564595068796],
    [0.5,0.0013925570228091237],
    [1,0.006342229199372057],
    [1.5,0.007258287930556838],
    [2,0.028327638747806815],
    [2.5,0.030617785575768768],
    [3,0.054642164558130944],
    [3.5,0.06244343891402715],
    [4,0.08580293655923908],
    [4.5,0.09486009788530797],
    [5,0.13323113860928987],
    [5.5,0.14686859359128265],
    [6,0.21510019392372334],
    [6.5,0.2415920214239542],
    [7,0.31611783174808383],
    [7.5,0.3629550281651122],
    [8,0.43934989380367534],
    [8.5,0.4872804506417952],
    [9,0.5563025210084034],
    [9.5,0.5919253855388309],
    [10,0.658694246929541],
    [10.5,0.6836642349247392],
    [11,0.7396915689352664],
    [11.5,0.7625043863699326],
    [12,0.8121710222550559],
    [12.5,0.8363431526456736],
    [13,0.8681614184135192],
    [13.5,0.8879748822605965],
    [14,0.9216104903499861],
    [14.5,0.9301209714655093],
    [15,0.9521728691476591],
    [15.5,0.9575805706898144],
    [16,0.9676646043032597],
    [16.5,0.9719198448610213],
    [17,0.9778372887616585],
    [17.5,0.9794330039708191],
    [18,0.9875445562840521],
    [18.5,0.9882094376212023],
    [19,0.9916668205743836],
    [19.5,0.9919770985317203],
    [20,0.9971188475390156],
    [20.5,0.9972518238064456],
    [21,0.998116169544741],
    [22,0.9986924000369378],
    [23,0.9990691661279897],
    [24,0.999933511866285],
    [25,0.9999778372887617],
    [27,1]
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
    ['A', 4],
    ['K', 3],
    ['Q', 2.5],
    ['J', 2],
    ['T', 1.5],
    ['9', 1.5],
    ['8', 1],
    ['7', 1],
    ['6', 1],
    ['5', 1],
    ['4', 1],
    ['3', 1],
    ['2', 1]
]);

const pairedRankPoints = new Map([
    ['A', 9],
    ['K', 8],
    ['Q', 7],
    ['J', 6],
    ['T', 6],
    ['9', 5],
    ['8', 4],
    ['7', 4],
    ['6', 4],
    ['5', 4],
    ['4', 4],
    ['3', 4],
    ['2', 4]
]);

const gaploss = new Map([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [10, 0],
    [11, 0],
    [12, 0],
    [13, 0]
]);
const calcGap = rankIndices => rankIndices[0] - rankIndices[rankIndices.length - 1] + 1 - rankIndices.length;

const ace = rankIndices => rankIndices.filter(rankIndex => rankIndex === 14);
const court = rankIndices => rankIndices.filter(rankIndex => rankIndex > 9 && rankIndex < 14);
const twoSix = rankIndices => rankIndices.filter(rankIndex => rankIndex > 1 && rankIndex < 7);
const twoFive = rankIndices => rankIndices.filter(rankIndex => rankIndex > 1 && rankIndex < 6);
const sixUp = rankIndices => rankIndices.filter(rankIndex => rankIndex > 5);
const sixKing = rankIndices => rankIndices.filter(rankIndex => rankIndex > 5 && rankIndex < 14);

const scoreFourHighCards = (rankIndices) => {
    const highs = sixUp(rankIndices);
    if (highs.length === 4) {
        const gap = calcGap(highs);
        if (gap > 3) {
            return 0;
        } else {
            return 12 - gaploss.get(gap);
        }
    } else {
        return 0;
    }
};

const scoreAceLow = (rankIndices) => (ace(rankIndices).length > 0 && twoFive(rankIndices).length > 0) ? 1 : 0;

const scoreTwoLowCards = (rankIndices) => {
    const lows = twoSix(rankIndices);
    if (lows.length >= 2) {
        const gap = calcGap(lows);
        if (gap > 3) {
            return 0;
        } else {
            return 2 - gaploss.get(gap);
        }
    } else {
        return 0;
    }
};

const scoreThreeHighCards = (rankIndices) => {
    const highs = sixUp(rankIndices);
    if (highs.length >= 3) {
        if (highs.length === 3) {
            const gap = calcGap(highs);
            return 7 - gaploss.get(gap);
        } else {
            const hi = [highs[0], highs[1], highs[2]];
            const lo = [highs[1], highs[2], highs[3]];
            return Math.max(calcStraightPoints(hi), calcStraightPoints(lo));
        }
    } else {
        return 0;
    }
};

const scoreTwoHighCards = (rankIndices) => {
    const highs = sixKing(rankIndices);
    if (highs.length === 2) {
        const gap = calcGap(highs);
        if (gap > 3) {
            return 0;
        } else {
            return 4 - gaploss.get(gap);
        }
    } else {
        return 0;
    }
};

const scoreAceCourt = (rankIndices) => {
    const aces = ace(rankIndices);
    const courts = court(rankIndices);
    if (aces.length > 0 && courts.length > 0) {
        const gap = calcGap(aces.concat(courts));
        if (gap > 3) {
            return 0;
        } else {
            return 2 - gaploss.get(gap);
        }
    } else {
        return 0;
    }
};

const calcStraightPoints = (rankIndices) => {
    let points = 0;

    points += scoreFourHighCards(rankIndices);
    if (points === 0) {
        points += scoreAceLow(rankIndices);
        points += scoreTwoLowCards(rankIndices);

        const high3 = scoreThreeHighCards(rankIndices);
        points += high3;
        if (high3 === 0) {
            const high2 = scoreTwoHighCards(rankIndices);
            points += high2;
            if (high2 === 0) {
                points += scoreAceCourt(rankIndices);
            }
        }
    }

    return points;
};


// Based on https://www.scribd.com/document/49697747/Edward-Hutchison-Hutchinson-Omaha-Point-System
// Straight scoring is ported from https://metacpan.org/source/TMTM/Games-Poker-Omaha-Hutchison-1.04/lib/Games/Poker/Omaha/Hutchison.pm#PGames::Poker::Omaha::Hutchison::StraightScorer
//
// For a different version, see http://erh.homestead.com/omaha.html
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
            if (ranks.length === 4) {
                points -= 2;
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

    points += calcStraightPoints(sortedRankIndices);

    // Return
    const percentile = cdf.get(points);
    return {points, percentile};
  };

export default omahaHoldem;
import {distance} from '@openhud/helpers';

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
    points -= Math.min(6, 2 * gaps);
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
    
    return points;
  };

export default omahaHoldem;
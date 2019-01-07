import {distance} from '@openhud/helpers';

// Generated with following code
/*
const {texasHoldem} = require("hutchison")
const Combinatorics = require('js-combinatorics');

const deck = Combinatorics.cartesianProduct(['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'], ['s', 'c', 'd', 'h']).map(x => x.join(''));

const handCmb = Combinatorics.bigCombination(deck, 2);
const histogram = new Map();
let numHands = 0;
let hand;
while (hand = handCmb.next()) {
    ++numHands;
    const {points} = texasHoldem({hand});
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
  [8,0.03619909502262444],
  [9,0.04524886877828054],
  [10,0.09049773755656108],
  [11,0.1085972850678733],
  [12,0.16591251885369532],
  [13,0.1870286576168929],
  [14,0.2609351432880845],
  [15,0.29411764705882354],
  [16,0.3770739064856712],
  [17,0.4193061840120664],
  [18,0.48717948717948717],
  [19,0.5324283559577677],
  [20,0.5852187028657617],
  [21,0.669683257918552],
  [22,0.7073906485671192],
  [23,0.7647058823529411],
  [24,0.7873303167420814],
  [25,0.8205128205128205],
  [26,0.8582202111613876],
  [27,0.8823529411764706],
  [28,0.9079939668174962],
  [29,0.9200603318250377],
  [30,0.9381598793363499],
  [31,0.9502262443438914],
  [32,0.9607843137254902],
  [33,0.9728506787330317],
  [34,0.9803921568627451],
  [35,0.9834087481146304],
  [36,0.9879336349924586],
  [37,0.9909502262443439],
  [38,0.995475113122172],
  [42,1]
]);

const rankPoints = new Map([
    ['A', 16],
    ['K', 14],
    ['Q', 13],
    ['J', 12],
    ['T', 11],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2]
]);

// Based on http://erh2.homestead.com/hem.html
const texasHoldem = ({hand}) => {
    if (!hand || hand.length !== 2) {
        throw new Error('Invalid texas holdem hand');
    }

    const ranks = [hand[0][0], hand[1][0]];
    const suits = [hand[0][1], hand[1][1]];
  
    let points = 0;
    
    // Step 1
    ranks.forEach(rank => {
      points += rankPoints.get(rank);
    });
    
    // Step 3
    if (suits[0] === suits[1]) {
      points += 4;
    }
    
    // Steps 2, 4-6
    switch(distance({rank1: ranks[0], rank2: ranks[1]})) {
      case 0:
        points += 10;
        break;
      case 1:
        points += 3;
        break;
      case 2:
        points += 2;
        break;
      case 3:
        points += 1;
        break;
      default:
        break;
    }
    
    const percentile = cdf.get(points);

    return {points, percentile};
  };

export default texasHoldem;
import {distance} from '@openhud/helpers';

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
    
    return points;
  };

export default texasHoldem;
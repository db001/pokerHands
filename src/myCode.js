var Result = { "win": 1, "loss": 2, "tie": 3 };

var PokerHand = function(hand) {
    this.hand = hand;
    this.cardSplit = {
        'cardNums': getHandDenominations(hand.split(' ')),
        'cardSuits': getHandSuits(hand.split(' '))
    };
    this.breakdown = {};
};

PokerHand.prototype.compareWith = function(hand) {
	return Result.tie;
};

const validNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const validSuits = ['H', 'C', 'S', 'D'];

// const sampleHand = new PokerHand('AS KS TS QS JS'); // Royal flush
// const sampleHand = new PokerHand('3S 5S 7S 6S 4S'); // Straight flush
// const sampleHand = new PokerHand('AS AD AC AH JS'); // 4 of a kind
// const sampleHand = new PokerHand('2S 2D 2C QS QH'); // Full house
// const sampleHand = new PokerHand('2S 4S 6S QS JS'); // Flush
// const sampleHand = new PokerHand('4S 5C 7H 8S 6D'); // Straight
// const sampleHand = new PokerHand('4H 4C 4S 2H JS'); // 3 of a kind
// const sampleHand = new PokerHand('7D 7C 3S TD TH'); // Two Pairs
// const sampleHand = new PokerHand('AS AH 5D 2S 3C'); // Pair
const sampleHand = new PokerHand('AS 8D TS 3C 5H'); // High card

getHandBreakdown(sampleHand);

function getHandDenominations(cards) {
    return cards.map(ele => ele[0]).sort();
}

function getHandSuits(cards) {
    return cards.map(ele => ele[1]).sort();
}

function getHandBreakdown(hand) {
    let handObj = hand.breakdown;

    // Get object to show numbers of each denomination
    hand.cardSplit.cardNums.map(ele => {
        if(validNumbers.includes(ele)) {
            typeof handObj[ele] == 'undefined' ? handObj[ele] = 1 : handObj[ele]++;
        }
    });

    // Check if hand has same suits
    const suit = hand.cardSplit.cardSuits.shift();
    let count = 0;

    hand.cardSplit.cardSuits.map(ele => {
        ele === suit ? count++ : null;
    });

    count === 4 ? handObj['suits'] = 'match' : handObj['suits'] = 'unmatched';

    // Check if numbers are consecutive
    let indexes = [];
    hand.cardSplit.cardNums.map(ele => {
        indexes.push(validNumbers.indexOf(ele));
    });
    const sortedIndexes = indexes.sort((a, b) => a - b);

    handObj['numbers'] = 'consecutive';

    for(let i = 1; i < sortedIndexes.length; i++) {
        if(sortedIndexes[i - 1] != sortedIndexes[i] - 1) {
            handObj['numbers'] = 'jumbled';
        }
    }

    return handObj;
}

function getResult(hand) {

    const denoms = hand.cardSplit.cardNums;
    const suits = hand.cardSplit.cardSuits;

    // Royal flush         A => 10 same suit
    if(denoms.includes('A')
        && hand.breakdown.numbers === 'consecutive'
        && hand.breakdown.suits === 'match') {
            return 'Royal Flush';
    }

    // Straight flush      5 consecutive numbers same suit
    if(hand.breakdown.numbers === 'consecutive'
        && hand.breakdown.suits === 'match') {
            return 'Straight Flush';
    }
    
    // Four of a kind      Four cards the same
    let duplicates = [];

    for (const prop in hand.breakdown) {
        if(hand.breakdown[prop] === 4) {
            return '4 of a kind';
        } else {
            duplicates.push(hand.breakdown[prop]);   
        }        
    }

    // Full house          3 cards same denomination + a pair
    if(duplicates[0] === 3 && duplicates[1] === 2) {
        return 'Full House';
    }

    // Flush               5 cards same suit  
    if(hand.breakdown.suits === 'match') {
        return 'Flush';
    }
    
    // Straight            Any 5 cards in sequence
    if(hand.breakdown.numbers === 'consecutive') {
        return 'Straight';
    }

    // Three of a kind     3 cards same denomination
    for (const prop in hand.breakdown) {
        if(hand.breakdown[prop] === 3) {
            return '3 of a kind';
        }      
    }

    // Two pairs           2 sets of 2 cards same denomination
    // One Pair            2 cards same denomination
    let pairs = [];
    denoms.map((ele, i) => {
        if(denoms[i] === denoms[i + 1]) {
            pairs.push(denoms[i])
        }
    });
    
    if(pairs.length === 2) {
        return "Two pairs";
    } else if(pairs.length === 1) {
        return 'One pair';
    }

    // High card           Highest card if no other combination
    return 'High card'


}

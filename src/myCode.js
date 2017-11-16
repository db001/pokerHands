var Result = { "win": 1, "loss": 2, "tie": 3 };

var PokerHand = function(hand) {
    this.hand = hand;
    this.cards = hand.split(' ');
    this.breakdown = {
        'cardNums': getHandDenominations(hand.split(' ')),
        'cardSuits': getHandSuits(hand.split(' '))
    }
};

PokerHand.prototype.compareWith = function(hand) {
	return Result.tie;
};

const validNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const validSuits = ['H', 'C', 'S', 'D'];

const sampleHand = new PokerHand('AS KH QS 4H 3C');

console.log(sampleHand.breakdown);

function getHandDenominations(cards) {
    return cards.map(ele => ele[0]);
}

function getHandSuits(cards) {
    return cards.map(ele => ele[1])
}

/*
Royal flush         A => 10 same suit
Straight flush      5 consecutive numbers same suit
Four of a kind      Four cards the same
Full house          3 cards same denomination + a pair
Flush               5 cards same suit    
Straight            Any 5 cards in sequence
Three of a kind     3 cards same denomination
Two pairs           2 sets of 2 cards same denomination
One Pair            2 cards same denomination
High card           Highest card if no other combination
*/
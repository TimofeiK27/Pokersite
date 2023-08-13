const hand = {
    card1: null,
    card2: null,
    player: "player1",
    //fun() {}
}

const community = {
    cards: [],
    street: 0,
}

const card = {
    value: 0,
    suite: 0,
    toString() {
        this.value >= 10 ? twoNumber = this.value :  twoNumber = '0' + this.value;
        switch(this.suite){
            case 1:
                return '' + twoNumber + 'S';
            case 2:
                return twoNumber + 'H';
            case 3:
                return twoNumber + 'D';        
            case 4:
                return twoNumber + 'C';
        }
    }
}

var communityCards = Object.create(community);
var playerHand;

suites = ['S','H','D','C'];
deck = [];

shuffle();



document.addEventListener('DOMContentLoaded', function() {    
    genPlayerCards();

    document.getElementById('call-btn').addEventListener('click', ()=>{
        potGood();
        potGood();
        potGood();
        potGood();
    })
})

function shuffle() {
    for(x=1; x<=4;x++){
        // < 15
        for(i=2; i<5;i++){
            var deckCard = Object.create(card);
            deckCard.value = 0;
            deckCard.value = i;
            deckCard.suite = x;
            deck.push(deckCard);
        }      
    }
}

function selectCard() {
    selectedCard = deck[Math.floor((deck.length-1) * Math.random())];
    index = deck.indexOf(selectedCard);
    deck.splice(index,1);
    return selectedCard;
}

function genPlayerCards(){
    playerHand = Object.create(hand);
    playerHand.card1 = selectCard();
    playerHand.card2 = selectCard();

    document.getElementById('player-card1').src = "/static/media/" + playerHand.card1 + ".jpg";
    document.getElementById('player-card2').src = "/static/media/" + playerHand.card2 + ".jpg";

}

function potGood() {
    switch (communityCards.street){
        case 0:
            flop();
            communityCards.street++;
            break;
        case 1:
            turn();
            communityCards.street++;
            break;
        case 2:
            river();
            communityCards.street++;
            break;
        case 3:
            showdown();
    }
}

function flop() {
    communityCards.cards.push(selectCard());
    communityCards.cards.push(selectCard());
    communityCards.cards.push(selectCard());

    document.getElementById('flop-card1').src = "/static/media/" + communityCards.cards[0] + ".jpg";
    document.getElementById('flop-card2').src = "/static/media/" + communityCards.cards[1] + ".jpg";
    document.getElementById('flop-card3').src = "/static/media/" + communityCards.cards[2] + ".jpg";
}
function turn() {
    communityCards.cards.push(selectCard());

    document.getElementById('flop-card4').src = "/static/media/" + communityCards.cards[3] + ".jpg";
}
function river() {
    communityCards.cards.push(selectCard());

    document.getElementById('flop-card5').src = "/static/media/" + communityCards.cards[4] + ".jpg";
}

function showdown() {

    cards = [playerHand.card1,playerHand.card2];
    cards = cards.concat(communityCards.cards)
    

    cards.sort((a,b) => a.value - b.value);

    // Testing Pairs

    var pcard = cards[0];
    runs = [];
    crun = [pcard.value];

    // runs is an array formated as [ {2}, {6}, {5, 5}, {3, 3, 3} ]
    for(i=1; i<cards.length; i++){
        if(pcard.value == cards[i].value){   
            crun.push(cards[i].value);          
      
        } else {
            
            runs.push(crun);        
            crun = [];
            crun.push(cards[i].value);
        }

        if(i == cards.length -1 ){
            runs.push(crun);
        }     
        pcard = cards[i];

    }


    runs.sort((a,b) => a.length - b.length);    
    if (runs.length == 0){
        console.log("High Card");
        return;
    }

    largestGrouping = runs[runs.length - 1];

    console.log(runs);

    console.log(cards);
    if(largestGrouping.length == 4){
        cards[6].value == largestGrouping[0] ? console.log(`QUAD ${largestGrouping[0]} with ${cards[2]}`) : console.log(`QUAD ${largestGrouping[0]} with ${cards[6]}`);
        
    }

    if(largestGrouping.length == 3){
        if(runs.length != 5){
            console.log(`${largestGrouping[0]}'s full of ${runs[runs.length - 2][0]}'s`);
        } else {
            console.log(`Trip ${largestGrouping[0]} with ${cards[3]} and ${cards[2]} kickers`);
        }
    }

    if(largestGrouping.length == 2){
        if(runs.length == 4){
            runs[0][0] < runs[1][0] ? console.log(`${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s and ${runs[1][0]} kicker`): 
                                                  console.log(`${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s and ${runs[0][0]} kicker`); 
            
        } else if (runs.length == 5) {
            console.log(`${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s and ${runs[runs.length - 3][0]} kicker`);
        } else {
            console.log("Pair")
        }
        
    }
    console.log(largestGrouping);
/*
    
        console.log(((runs[runs.length-1]).length + 1) + ' ' + (runs[runs.length-1])[0])
    } else {
        console.log("High Card " + cards[cards.length-1]);
    }
*/
}
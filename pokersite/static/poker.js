const hand = {
    card1: null,
    card2: null,
    player: "player1",
    
    hashVal:0,
    handValueDescription:'',
    toString() {
        return this.handValueDescription;
    }
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
        for(i=2; i<9;i++){
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
    
    if (runs.length == 7){
        hash(1, [cards[6].value,cards[5].value,cards[4].value,cards[3].value,cards[2].value]);
        console.log(playerHand.hashVal,`${cards[6].value} High`);
    }

    largestGrouping = runs[runs.length - 1].slice();

    if(largestGrouping.length == 4){
        temp = largestGrouping;
        cards[6].value == largestGrouping[0] ? console.log(`QUAD ${largestGrouping[0]} with ${cards[2]}`) : console.log(`QUAD ${largestGrouping[0]} with ${cards[6]}`);
        cards[6].value == largestGrouping[0] ?  largestGrouping.push(cards[2].value): largestGrouping.push(cards[6].value);
        hash(8, largestGrouping,`QUAD ${largestGrouping[0]}`)
        largestGrouping = temp;
    }

    if(largestGrouping.length == 3){
        temp=largestGrouping;
        if(runs.length != 5){
            console.log(`${largestGrouping[0]}'s full of ${runs[runs.length - 2][0]}'s`);
            largestGrouping.push(runs[runs.length - 2][0]);
            largestGrouping.push(runs[runs.length - 2][0]);
            hash(7, largestGrouping,`${largestGrouping[0]}'s full of ${runs[runs.length - 2][0]}'s`);
        } else {
            console.log(`Trip ${largestGrouping[0]} with ${cards[3]} and ${cards[2]} kickers`);
            largestGrouping.push(cards[3].value);
            largestGrouping.push(cards[2].value);
            hash(4, largestGrouping, `Trip ${largestGrouping[0]}`);
        }
        largestGrouping = temp;
    }

    if(largestGrouping.length == 2){
        temp = largestGrouping;
        
        if(runs.length == 4){
            runs[0][0] < runs[1][0] ? console.log(`${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s and ${runs[1][0]} kicker`): 
                                                  console.log(`${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s and ${runs[0][0]} kicker`); 

            largestGrouping.push(runs[runs.length - 2][0]);
            largestGrouping.push(runs[runs.length - 2][0]);
            runs[0][0] < runs[1][0] ? largestGrouping.push(runs[1][0]) : largestGrouping.push(runs[0][0]);
            hash(3, largestGrouping, `${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s`);
        } else if (runs.length == 5) {
            console.log(`${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s and ${runs[runs.length - 3][0]} kicker`);
            largestGrouping.push(runs[runs.length - 2][0]);
            largestGrouping.push(runs[runs.length - 2][0]);
            largestGrouping.push(runs[runs.length - 3][0]);
            hash(3, largestGrouping, `${largestGrouping[0]}'s Up with ${runs[runs.length - 2][0]}'s and ${runs[runs.length - 3][0]} kicker`);
        } else {
            console.log("Pair")
            hash(2, [cards[6].value,cards[5].value,cards[4].value,cards[3].value,cards[2].value], "Pair");
        }
        largestGrouping = temp;
        
    }

    // Testing Straights

    runlength = 1;
    prevCard = cards[0];
    straightHigh = 0;
    
    suiteCount = [0,0,0,0];
    for(i=1; i<=cards.length; i++){
       //Flush Test
        switch(prevCard.suite){
            case 1:
                suiteCount[0] ++;
                break;
            case 2:
                suiteCount[1] ++;
                break;
            case 3:
                suiteCount[2] ++;
                break;
            case 4:
                suiteCount[3] ++;
                break;
        }
        
        if(i == cards.length){
            break;
        }
        
        //Straight test
        if(prevCard.value + 1 == cards[i].value){
            runlength ++;
        } else if(prevCard.value != cards[i].value){
            runlength = 1;
        }

        if(runlength >= 5){
            straightHigh = cards[i].value
        }
        prevCard = cards[i];
    }
    if(straightHigh != 0){
        console.log(`${straightHigh} High Straight`);
        hash(5, [straightHigh,0,0,0,0], `${straightHigh} High Straight`);
    }

    // Testing Flushes

    flushSuite = 0;
    for(i=0; i<=3; i++){
        if(suiteCount[i] >= 5){
            flushSuite = i + 1;
        }
    }

    flushCards = [];
    for(i=0; i<cards.length; i++){
        if(cards[i].suite == flushSuite){
            flushCards.push(cards[i]);
        }
    }

    if(flushSuite != 0){
        console.log(`${flushCards[flushCards.length - 1].value} High Flush`);
        hash(6, [flushCards[flushCards.length-1].value,flushCards[flushCards.length-2].value,flushCards[flushCards.length-3].value,
            flushCards[flushCards.length-4].value,flushCards[flushCards.length-5].value], `${flushCards[flushCards.length - 1].value} High Flush`);
        //flushCards contains hand data
    }

    //Straight Flush Test

    prevCard = flushCards[0];
    runlength = 1;
    straightFlushHigh = 0;
    for(i=1; i<flushCards.length; i++){;
        if(prevCard.value + 1 == flushCards[i].value){
            runlength ++;
        } else {
            runlength = 1;
        }

        if(runlength >= 5){
            straightFlushHigh = flushCards[i].value
        }
        prevCard = cards[i];
    }

    if(straightFlushHigh != 0){
        console.log(`${straightFlushHigh} High Straight Flush!!`)
        hash(9, [straightFlushHigh,0,0,0,0],`${straightFlushHigh} High Straight Flush!!`);
    }


    console.log(playerHand.hashVal);
    console.log(playerHand.handValueDescription);
    document.getElementById('hand-description').innerHTML = playerHand.handValueDescription;
}

function hash(ranking,cardArr,description){
    hashed = 0;
    for(i=0;i<5;i++){
        hashed += cardArr[i] * Math.pow(16, i);
    }
    
    hashed += ranking * Math.pow(16, 5);
    if (hashed > playerHand.hashVal){
        playerHand.hashVal = hashed;
        playerHand.handValueDescription = description;
    }      
    return hashed;
}
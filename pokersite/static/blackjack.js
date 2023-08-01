suites = ['S','H','D','C'];
deck = [];
decks = 1;

hands = []

const hand = {
    count: 0,
    soft: false,
    live: true,

    hit() {
        console.log(this);
        console.log(this.count);
        document.getElementById('double-btn').hidden = 'true';
    
        newCard = document.createElement('div');
        newCard.className = 'card-slot';
    
        newCardVal = selectCard();
        console.log(this.count);
        newCard.innerHTML = `<image class="cardimg" src="/static/media/${newCardVal}.jpg">`;
    
        parseInt(newCardVal.substring(0,2)) > 10 ?  newCardVal = 10 :  newCardVal = parseInt(newCardVal.substring(0,2));
        this.count += newCardVal;
    
        if(newCardVal = 1)
            this.soft = true;
    
        if(this.count > 10)
            this.soft = false;
        if(this.count > 21){
            document.getElementById('functions').innerHTML = "BUST!";
            document.getElementById('functions').innerHTML += '<button id="reset-btn">RESET</button>';
    
            fund(bet * -1);
    
            document.getElementById('reset-btn').addEventListener('click', reset);
        }    
    
        this.soft ? document.getElementById('player-count').innerHTML = `Soft ${this.count + 10}` : document.getElementById('player-count').innerHTML = `Hard ${this.count}`;   
        playerCards.append(newCard);
    
    },

    stand() {
        if(this.soft){
            this.count+=10;
        }
    
        document.getElementById('dealer-card2').remove();
        dealerCards = document.getElementById('dealer-cards');
        dealerUpCard = parse10s(dealerUpCard);
        dealerCount = dealerUpCard;
        
        
        downCard = selectCard();
        newCard = document.createElement('div');
        newCard.className = 'card-slot';
        newCard.innerHTML = `<image class="cardimg" src="/static/media/${downCard}.jpg">`;
        newCard.id = 'dealer-card2';
        dealerCards.append(newCard);
        downCard = parse10s(downCard)
        dealerCount += downCard;
    
        dealerUpCard == 1 || downCard == 1? dealerSoft = true : dealerSoft = false;
        while(testWin()) {
            newCard = document.createElement('div');
            newCard.className = 'card-slot';
            dealerHit = selectCard();
            newCard.innerHTML = `<image class="cardimg" src="/static/media/${dealerHit}.jpg">`;;
            dealerCards.append(newCard);
            dealerHit = parse10s(dealerHit);
            dealerCount += dealerHit;
            if(dealerHit == 1 && dealerCount <= 10) 
                dealerSoft = true
            
            if(dealerCount > 10)
                dealerSoft = false;
        };
    
    },

    double(){
        doubleD = true;
        console.log(doubleD);
    
        hands[0].hit();
        if (this.count <= 21)
            stand();
    },
    
    split() {
        console.log(22)
    }
}



funds = 100;
bet = 0;
doubleD = false;

function shuffle() {
    suites.forEach((suite) => {
        for(a = 0; a < decks; a++){
            for(i=1; i<10;i++){
                deck.push('0' + i + suite);
            }
            for(i=10; i<14;i++){
                deck.push(i + suite);
            }
        }
    })
}



shuffle();
dealerUpCard = selectCard();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('functions').innerHTML = "Choose Bet";
    document.getElementById('deal').addEventListener('click',()=>{
        bet = parseInt(document.getElementById('bet-amount').value);
        if (bet >= 0 && bet <= funds){
            
            document.getElementById('functions').innerHTML = `<button id="stand-btn"> STAND </button> <button id="hit-btn"> HIT </button> <button id="double-btn"> DOUBLE </button>`;
            setPlayerCards();
            console.log(hands[0]);
            document.getElementById('hit-btn').addEventListener('click', () => hands[0].hit());
            document.getElementById('stand-btn').addEventListener('click', () => hands[0].stand());

            doublebtn = document.getElementById('double-btn');

            bet * 2 <= funds ? doublebtn.addEventListener('click', () => hands[0].double()) :  doublebtn.style.background = 'darkgray';

            document.getElementById('fund-counter').innerHTML = `${funds - bet} funds`;
            document.getElementById('deal').hidden = true;
        }
    });

})

function selectCard() {
    card = deck[Math.floor((deck.length-1) * Math.random())];
    index = deck.indexOf(card)
    deck.splice(index,1);
    console.log(card);
    return card;
}

function setPlayerCards() {
    document.getElementById('dealer-count').innerHTML = `Dealer`;

    playerCards = document.getElementById('player-cards');
    dealerCards = document.getElementById('dealer-cards');
    playerCards.innerHTML = '';
    card1 = document.createElement('div');
    card2 = document.createElement('div');
    card1.className = 'card-slot';
    card2.className = 'card-slot';
    card1.id = 'player-card1';
    card2.id = 'player-card2';

    dealerCards.innerHTML = '';
    dcard1 = document.createElement('div');
    dcard2 = document.createElement('div');
    dcard1.className = 'card-slot';
    dcard2.className = 'card-slot';
    dcard1.id = 'dealer-card1';
    dcard2.id = 'dealer-card2';

    dealerCards.append(dcard1);
    dealerCards.append(dcard2);

    document.getElementById('dealer-card1').innerHTML = `<image class="cardimg" src="/static/media/${dealerUpCard}.jpg">`; 
    document.getElementById('dealer-card2').innerHTML = `<image class="cardimg" src="/static/media/down.jpg">`;

    playerCards.append(card1);
    playerCards.append(card2);

    playerCard1 = document.getElementById('player-card1');
    playerCard2 = document.getElementById('player-card2');

    
    card1 = selectCard();
    card2 = selectCard();
    
    //card1 = "04H";
    //card2 = "04S";
    //
    card1val = parse10s(card1);
    card2val = parse10s(card2);

    const hand1 = Object.create(hand);
    card1val == 1 || card2val == 1 ? hand1.soft = true : hand1.soft = false;

 

    hand1.count = card1val + card2val;  


    playerCard1.innerHTML = `<image class="cardimg" src="/static/media/${card1}.jpg">`;
    playerCard2.innerHTML = `<image class="cardimg" src="/static/media/${card2}.jpg">`;

    hand1.soft ? document.getElementById('player-count').innerHTML = `Soft ${hand1.count + 10}` : document.getElementById('player-count').innerHTML = `Hard ${hand1.count}`;

    if(card1val == card2val){
        btn = document.createElement('button');
        btn.innerHTML = "- SPLIT -";
        btn.id = "split-btn";
        document.getElementById('functions').append(btn);

       // document.getElementById("split-btn").addEventListener('click', ()=> cards[0].split());
        console.log("SPLIT");
    }
    console.log("waawaw");
    hands.push(hand1);
}



var dealerSoft;
var dealerCount;


function parse10s(card) {
    parseInt(card.substring(0,2)) > 10 ?  card = 10 :  card = parseInt(card.substring(0,2));
    return card;
}

function testWin(){
    if(dealerCount > 21){
        fund(bet);
        document.getElementById('functions').innerHTML = "DEALER BUST!";
        document.getElementById('dealer-count').innerHTML = `Dealer ${dealerCount}`;
        document.getElementById('functions').innerHTML += '<button id="reset-btn">RESET</button>';
        document.getElementById('reset-btn').addEventListener('click', reset);
        return false;
    }
    if((!dealerSoft && dealerCount >= 17) || (dealerSoft && dealerCount+10 >17)) {
        if(dealerSoft)
            dealerCount+=10;
       if(hands[0].count > dealerCount){
            document.getElementById('functions').innerHTML = "Player Wins! ";
            fund(bet);
       } else if (hands[0].count < dealerCount){
            document.getElementById('functions').innerHTML = "Dealer Wins! ";
            fund(bet*-1);
       } else {
            document.getElementById('functions').innerHTML = "Standoff ";
       } 
       document.getElementById('dealer-count').innerHTML = `Dealer ${dealerCount}`;
       document.getElementById('functions').innerHTML += '<button id="reset-btn">RESET</button>';
       document.getElementById('reset-btn').addEventListener('click', reset);
       return false;
    }
    return true;
}

function reset() {
    temp = [];
    hands = temp;
    console.log(hands);
    console.log('amount of hands');
    bet = parseInt(document.getElementById('bet-amount').value);
    if (bet >= 0 && bet <= funds){
        
        document.getElementById('reshuffle').innerHTML = "";
        dealerUpCard = selectCard();
        dealerCount = 0;
        dealerSoft = false;

        if (deck.length < 12){
            deck = [];
            shuffle();
            document.getElementById('reshuffle').innerHTML = "Reshuffled Deck!"
        }
        

        document.getElementById('dealer-card1').innerHTML = `<image class="cardimg" src="/static/media/${dealerUpCard}.jpg">`;  
        document.getElementById('dealer-card2').innerHTML = `<image class="cardimg" src="/static/media/down.jpg">`; 

        document.getElementById('functions').innerHTML = `<button id="stand-btn"> STAND </button> <button id="hit-btn"> HIT </button> <button id="double-btn"> DOUBLE </button>`;

        document.getElementById('hit-btn').addEventListener('click', ()=> hand.hit());
        document.getElementById('stand-btn').addEventListener('click', ()=> hand.stand())
        doublebtn = document.getElementById('double-btn');
        bet * 2 <= funds ? doublebtn.addEventListener('click', ()=> hand.double()) :  doublebtn.style.background = 'darkgray';

        setPlayerCards();
    }
}

function fund(amount) {
    doubleD ?  funds += amount * 2 : funds += amount;
    doubleD = false;
   
    document.getElementById('fund-counter').innerHTML = `${funds} funds`;

}


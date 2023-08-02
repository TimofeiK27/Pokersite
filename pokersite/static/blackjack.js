suites = ['S','H','D','C'];
deck = [];
decks = 1;

hands = [];


const hand = {
    count: 0,
    soft: false,
    live: true,
    handcount: 1,
    doubleD:false,
    won:true,
    splitCards:[],
    hit() {
        console.log(this);
        document.getElementById('double-btn').hidden = 'true';
    
        newCard = document.createElement('div');
        newCard.className = 'card-slot';
    
        newCardVal = selectCard();
        newCard.innerHTML = `<image class="cardimg" src="/static/media/${newCardVal}.jpg">`;
    
        newCardVal = parse10s(newCardVal);
        
            this.count += newCardVal;
        
            if(newCardVal == 1)
                this.soft = true;
        
            if(this.count > 10)
                this.soft = false;
            if(this.count > 21 && this.handcount!=0){
                this.won=false;
                document.getElementById('functions').innerHTML = "BUST!";
                document.getElementById('functions').innerHTML += '<button id="reset-btn">RESET</button>';
                
                fund();
        
                document.getElementById('reset-btn').addEventListener('click', reset);
            }    
     
        
        this.soft ? document.getElementById(`counter${this.handcount}`).innerHTML = `Soft ${this.count + 10}` : document.getElementById(`counter${this.handcount}`).innerHTML = `Hard ${this.count}`;   
        console.log(this.handcount);
        this.handcount == 0 ? document.getElementById('dealer-cards').append(newCard) : document.getElementById(`player-cards${this.handcount}`).append(newCard);
        
    
    },

    stand() {
        if(this.soft){
            this.count+=10;
        }

        if(this.handcount + 1 == hands.length){
            document.getElementById('dealer-card2').remove();
            dealerCards = document.getElementById('dealer-cards');


            hands[0].hit();
            console.log(33);
        };

           

        while(testWin()) {
            hands[0].hit();
        };
    
    },

    double(){
        this.doubleD = true;
    
        this.hit();
        if (this.count <= 21)
            this.stand();
    },
    
    split(){
        const hand2 = Object.create(hand);

        newHand = document.createElement('div');
        newHand.id = `player-cards${hands.length}`;
        document.getElementById('player-hands').append(newHand);

        newCard1 = document.createElement('div');
        newCard1.className = 'card-slot';
        newCard1.innerHTML = `<image class="cardimg" src="/static/media/${this.splitCards[1]}.jpg">`;
        newHand.append(newCard1);
    

        console.log(hand2);
        this.count = parse10s(this.splitCards[1]);

        document.getElementById('player-card2').remove();
        hand2.count = parse10s(this.splitCards[1]);
        hands.push[hand2];
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


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('functions').innerHTML = "Choose Bet";
    document.getElementById('deal').addEventListener('click',()=>{
        bet = parseInt(document.getElementById('bet-amount').value);
        if (bet >= 0 && bet <= funds){
            
            document.getElementById('functions').innerHTML = `<button id="stand-btn"> STAND </button> <button id="hit-btn"> HIT </button> <button id="double-btn"> DOUBLE </button>`;
            setPlayerCards();
            console.log(hands[0]);
            document.getElementById('hit-btn').addEventListener('click', () => hands[1].hit());
            document.getElementById('stand-btn').addEventListener('click', () => hands[1].stand());

            doublebtn = document.getElementById('double-btn');

            bet * 2 <= funds ? doublebtn.addEventListener('click', () => hands[1].double()) :  doublebtn.style.background = 'darkgray';

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
    document.getElementById('counter0').innerHTML = `Dealer`;
    dealerUpCard = selectCard();

    playerCards = document.getElementById('player-cards1');
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
    
    card1 = "04H";
    card2 = "04S";
    //
    card1val = parse10s(card1);
    card2val = parse10s(card2);

    dealerCardVal = parse10s(dealerUpCard);


    const hand1 = Object.create(hand);
    const hand0 = Object.create(hand);

    card1val == 1 || card2val == 1 ? hand1.soft = true : hand1.soft = false;
    dealerCardVal == 1 ? hand0.soft = true : hand0.soft = false;    
 


    hand1.count = card1val + card2val;  
    hand0.count = dealerCardVal;
    hand0.handcount = 0;

    playerCard1.innerHTML = `<image class="cardimg" src="/static/media/${card1}.jpg">`;
    playerCard2.innerHTML = `<image class="cardimg" src="/static/media/${card2}.jpg">`;

    document.getElementById('dealer-card1').innerHTML = `<image class="cardimg" src="/static/media/${dealerUpCard}.jpg">`;
    document.getElementById('dealer-card2').innerHTML = `<image class="cardimg" src="/static/media/down.jpg">`; 
    hand1.soft ? document.getElementById('counter1').innerHTML = `Soft ${hand1.count + 10}` : document.getElementById('counter1').innerHTML = `Hard ${hand1.count}`;

    hands.push(hand0);
    hands.push(hand1);
    if(card1val == card2val){
        btn = document.createElement('button');
        btn.innerHTML = "- SPLIT -";
        btn.id = "split-btn";
        document.getElementById('functions').append(btn);
        temp = [];
        temp.push(card1);
        temp.push(card2);
        hand1.splitCards = temp;
        console.log(hands[1]);
       document.getElementById("split-btn").addEventListener('click', ()=> hands[1].split());
        
    }

}



var dealerSoft;
var dealerCount;


function parse10s(card) {
    parseInt(card.substring(0,2)) > 10 ?  card = 10 :  card = parseInt(card.substring(0,2));
    return card;
}

function testWin(){
    console.log(hands[0].count);
    if(hands[0].count > 21){
        fund();
        document.getElementById('functions').innerHTML = "DEALER BUST!";
        document.getElementById('functions').innerHTML += '<button id="reset-btn">RESET</button>';
        document.getElementById('reset-btn').addEventListener('click', reset);
        return false;
    }
    if((!hands[0].soft && hands[0].count >= 17) || (hands[0].soft && hands[0].count+10 >17)) {
        if(hands[0].soft)
        hands[0].count+=10;
       if(hands[1].count > hands[0].count){
            document.getElementById('functions').innerHTML = "Player Wins! ";
            
            fund();
       } else if (hands[1].count < hands[0].count){
            document.getElementById('functions').innerHTML = "Dealer Wins! ";
            hands[1].won = false;
            fund();
       } else {
            document.getElementById('functions').innerHTML = "Standoff ";
       } ;
       document.getElementById('functions').innerHTML += '<button id="reset-btn">RESET</button>';
       document.getElementById('reset-btn').addEventListener('click', reset);
       return false;
    }
    return true;
}

function reset() {

    temp = [];
    hands = temp;
    bet = parseInt(document.getElementById('bet-amount').value);
    if (bet >= 0 && bet <= funds){
        
        document.getElementById('reshuffle').innerHTML = "";

        if (deck.length < 12){
            deck = [];
            shuffle();
            document.getElementById('reshuffle').innerHTML = "Reshuffled Deck!"
        } 

        setPlayerCards();

        

        document.getElementById('functions').innerHTML = `<button id="stand-btn"> STAND </button> <button id="hit-btn"> HIT </button> <button id="double-btn"> DOUBLE </button>`;
        document.getElementById('hit-btn').addEventListener('click', ()=> hands[1].hit());
        document.getElementById('stand-btn').addEventListener('click', ()=> hands[1].stand());
        doublebtn = document.getElementById('double-btn');
        bet * 2 <= funds ? doublebtn.addEventListener('click', ()=> hands[1].double()) :  doublebtn.style.background = 'darkgray';

        
    }
}

function fund() {
    
    for(i=1; i<hands.length; i++){
        console.log(hands[i]);
        if(hands[i].won){
            hands[i].doubleD ? funds += bet*2 : funds += bet;
        } else {
            hands[i].doubleD ? funds -= bet*2 : funds -= bet;
        }
    }
    document.getElementById('fund-counter').innerHTML = `${funds} funds`;

}


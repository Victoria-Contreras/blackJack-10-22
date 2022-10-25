const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const deck = [];
let dealerHandArr = [];
let playerHandArr = [];

window.addEventListener("DOMContentLoaded", () => {
  makeDeck();
  shuffle(deck);

});
console.log(deck)
//Create Deck 
function makeDeck() {
  const suits = ["hearts", "spades", "clubs", "diamonds"];
  const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  const makeCard = (rank, suit) => {
    const card = {
      rank: rank,
      suit: suit,
      pointValue: rank > 10 ? 10 : rank,
    };
    deck.push(card);
  
  };

  for (let suit of suits) {
    for (const rank of ranks) {
      makeCard(rank, suit);
    }
  }
}

//Shuffle Deck
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//Assign Card Images
function getCardImage(cardObject) {
  const rank = cardObject.rank;
  const suit = cardObject.suit;
  const createImage = document.createElement('img');
  createImage.src = `/blackjack-exercise-main/images/${rank}_of_${suit}.png`;
  createImage.alt = `${rank} of ${suit}`;
  return createImage;

}

//Deal Button
const deal = document.getElementById("deal-button");
function dealCards(event) {  
  //function dealToPlayer(player) {
    const currentCard = deck.pop()
    const cardImg = getCardImage(currentCard);
    //if (player === "player") {
      playerHand.append(cardImg)
      playerHandArr.push(currentCard);
    //} else if (player === "dealer") {
      dealerHand.append(cardImg)
      dealerHandArr.push(currentCard);
    //}
  }
  // dealToPlayer("player");
  // dealToPlayer("dealer");
  // dealToPlayer("player");
  // dealToPlayer("dealer");
//}
deal.addEventListener("click", event => dealCards(event));

//Hit Button (step 5)
const hit = document.getElementById("hit-button")
function hitCards(event) {
  function dealToPlayer(player) {
    const currentCard = deck.pop()
    const cardImg = getCardImage(currentCard);

    if (player === "player") {
      playerHand.append(cardImg)
      playerHandArr.push(currentCard);
    } else if (player === "dealer") {
      dealerHand.append(cardImg)
      dealerHandArr.push(currentCard);
    }
  }
  dealToPlayer("player");
  //dealToPlayer("dealer");
}
hit.addEventListener("click", event => hitCards(event));

//Calculate points //
const playerTest = [{ rank: 3, suit: 'hearts', pointValue: 3 }, { rank: 3, suit: 'hearts', pointValue: 3 }, { rank: 3, suit: 'hearts', pointValue: 3 }];
const dealerTest = [{ rank: 4, suit: 'hearts', pointValue: 4 }, { rank: 3, suit: 'hearts', pointValue: 3 }, { rank: 3, suit: 'hearts', pointValue: 3 }];
function calculatePoints(player) {
  let playerPoints = [];

  for (i = 0; i < player.length; i++) {   //This line needs to be updated to the length of the respective player arr but im having issues with the order its loading in.
    if (player[i].pointValue === 'ace') {
      player[i].pointValue = 1;
    } else if (player[i].pointValue === 'jack' || player[i].pointValue === 'queen' || player[i].pointValue === 'king') {
      player[i].pointValue = 10;
    }
    playerPoints.push(player[i].pointValue)
  }
  
  const initialValuePlayer = 0;
  const playersTotalPoints = playerPoints.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValuePlayer
  );

  return playersTotalPoints;
}
//console.log(calculatePoints(dealerTest));

// the logic works but it doesnt work with my respective player hand arrays because the array is loading 0 before the game is played.
 
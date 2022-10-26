const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const deck = [];
let dealerHandArr = [];
let playerHandArr = [];
let playerScore = 0;
let dealerScore = 0;




window.addEventListener("DOMContentLoaded", () => {
  makeDeck();
  shuffle(deck);
  dealButton.addEventListener("click", dealCards);
  hitButton.addEventListener("click", hit);
  standButton.addEventListener("click", stand);
});

//Create Deck 
function makeDeck() {
  const suits = ["hearts", "spades", "clubs", "diamonds"];
  const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  const pointsValues = {
    jack: 10, queen: 10, king: 10, ace: 1,
  };
  const makeCard = (rank, suit) => {
    
    const card = {
      rank: rank,
      suit: suit,
      pointValue: pointsValues[rank] ? pointsValues[rank]: rank ,
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
function getCardImage(cardObject, side) {
  const rank = cardObject.rank;
  const suit = cardObject.suit;
  if (side === 'front') {
    const createImage = document.createElement('img');
    createImage.src = `/blackjack-exercise-main/images/${rank}_of_${suit}.png`;
    createImage.alt = `${rank} of ${suit}`;
    return createImage;
  } else if (side === 'back') {
    const createImage = document.createElement('img');
    createImage.id = "flip"
    createImage.src = "/blackjack-exercise-main/images/cardBack.png";
    createImage.alt = "back of card";
    return createImage;
  }
}

//Calculate points //
function calculatePoints(hand) {
  let score = 0
  for (i = 0; i < hand.length; i++) {
    score += hand[i].pointValue;
  }
  return score;
}

//Display Points 
function displayScore(player) {
  if (player === "dealer") {
    const dealerMessage = document.getElementById('dealer-points');
    dealerMessage.innerText = dealerScore;
  } else if (player === "player") {
    const playerMessage = document.getElementById('player-points');
    playerMessage.innerText = playerScore;
  }
}
//DisplayMessage 
function displayMessage(message) {
  const messageBox = document.getElementById("messages");
  return messageBox.innerText = message;
}

//Deal Button
const dealButton = document.getElementById("deal-button");
function dealCards() {  
  this.disabled = true;
    for (let i = 0; i < 2; i++) {
      let currentCard = deck.pop();
      let cardImg = getCardImage(currentCard, "front");
      playerHand.append(cardImg);
      playerHandArr.push(currentCard);
    }
    for (let i = 0; i < 1; i++) {
      let currentCard = deck.pop();
      let cardImg = getCardImage(currentCard, "back");
      dealerHand.append(cardImg);
      dealerHandArr.push(currentCard);
    }
    for (let i = 0; i < 1; i++) {
      let currentCard = deck.pop();
      let cardImg = getCardImage(currentCard, "front");
      dealerHand.append(cardImg);
      dealerHandArr.push(currentCard);
    }
  playerScore += calculatePoints(playerHandArr);
  dealerScore += calculatePoints(dealerHandArr);
  displayScore("player");
  
  if (playerScore === 21) {
    hitButton.disabled = true;
    standButton.disabled = true;
    const flip = document.getElementById('flip');
    flip.src = `/blackjack-exercise-main/images/${dealerHandArr[0].rank}_of_${dealerHandArr[0].suit}.png`;
    displayScore("dealer");
    if (dealerScore === 21) {
      displayMessage("It's a tie")
    } else {
      displayMessage("You Win!")
    }
  }
}

//Hit Button (step 5)
const hitButton = document.getElementById("hit-button")
function hit() {
  const currentCard = deck.pop();
  const cardImg = getCardImage(currentCard, "front");
  playerHand.append(cardImg);
  playerHandArr.push(currentCard);
  playerScore += currentCard.pointValue; 
  displayScore("player")
  
  if (playerScore === 21) {
    this.disabled = true;
    standButton.disabled = true;
    const flip = document.getElementById('flip');
    flip.src = `/blackjack-exercise-main/images/${dealerHandArr[0].rank}_of_${dealerHandArr[0].suit}.png`;
    displayScore("dealer");
    if (dealerScore === 21) {
      displayMessage("It's a tie.")
    } else {
      displayMessage("You Win!")
    }
  } else if (playerScore > 21) {
    this.disabled = true;
    standButton.disabled = true;
    displayMessage('Bust. You lose.')
  }
}

//Add cards to dealers hand until score is at least 17
function finishDealerHand() {
  console.log(dealerHandArr)
  while (dealerScore <= 16) {
    const currentCard = deck.pop();
    const cardImg = getCardImage(currentCard, "front");
    dealerHand.append(cardImg);
    dealerHandArr.push(currentCard);
    dealerScore += currentCard.pointValue;
    displayScore("dealer");
  }
}

// Stand Button 
const standButton = document.getElementById('stand-button');
function stand() {
  hitButton.disabled = true;
  this.disabled = true;

  displayScore("player");
  displayScore("dealer");

  const flip = document.getElementById('flip');
  flip.src = `/blackjack-exercise-main/images/${dealerHandArr[0].rank}_of_${dealerHandArr[0].suit}.png`;

  finishDealerHand();

  // display Winner
  if (dealerScore > 21) {
    displayMessage('You Win!')
  } else if (dealerScore < playerScore) {
    displayMessage("You Win!")
  } else if (dealerScore > playerScore) {
    displayMessage("You lose.")
  } else if (dealerScore === playerScore) {
    displayMessage("It's a tie.")
  }
  
}


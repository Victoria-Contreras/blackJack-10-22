//Create a Deck (step 6) This is my attempt on my own. The issue was I didnt and conditionals to change the rank of 11 to 13 to their actual names jack queen king ace.
let deckArr = [];
 function buildDeck() {
   const suitesArr = ["diamonds", "clubs", "hearts", "spades"]
   for (let i = 0; i <= 12; i++){
     for (let n = 0; n < suitesArr.length; n++){
       deckArr.push({rank: i + 1, suit: suitesArr[n]})
     }
   }
 }
 buildDeck()
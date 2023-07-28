const cardContainer = document.getElementById("cards");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.getElementById("score").textContent = score + "/9";
fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    genenrateCards();
    console.log(cards);
  });

function shuffleCards() {
  let currentIndex = cards.length;
  let randomIndex;
  let tempValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = tempValue;

    // Swap elements at currentIndex and randomIndex
  }
}
function genenrateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
    <div class="front">
        <img class="front-image" src=${card.image}>    
    </div>
    <div class="back"></div>
    `;
    cardElement.addEventListener("click", flipCard);
    cardElement.addEventListener("touch", flipCard);

    cardContainer.appendChild(cardElement);
  }
}
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  if (isMatch) disableCards();
  else unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.removeEventListener("touch", flipCard);
  secondCard.removeEventListener("touch", flipCard);
  score++;
  document.getElementById("score").textContent = score;

  unlockBorad();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    unlockBorad();
  }, 1000);
}

function unlockBorad() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
function restart() {
cardContainer.innerHTML = "";
shuffleCards();
genenrateCards();
score = 0;
document.getElementById("score").textContent = score;
lockBoard=false;




}

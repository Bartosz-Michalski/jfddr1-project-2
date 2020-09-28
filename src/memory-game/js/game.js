const cardsColor = [
  "card-agility",
  "card-agility",
  "card-speech",
  "card-speech",
  "card-rocket",
  "card-rocket",
  "card-money",
  "card-money",
  "card-inelligence",
  "card-inelligence",
  "card-guns",
  "card-guns",
  "card-fortune-finder",
  "card-fortune-finder",
  "card-zombie",
  "card-zombie",
  "card-special",
  "card-special",
];

let cards = document.querySelectorAll(".game-container__card");
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function () {
  activeCard = this;

  if (activeCard == activeCards[0]) return;

  activeCard.classList.remove("hidden");

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    cards.forEach((card) => card.removeEventListener("click", clickCard));

    activeCards[1] = activeCard;

    setTimeout(function () {
      if (activeCards[0].className === activeCards[1].className) {
        console.log("wygrana");

        activeCards.forEach((card) => card.classList.add("off"));
        gameResult++;
        cards = cards.filter((card) => !card.classList.contains("off"));

        if (gameResult == gamePairs) {
          console.log("BRAWO! WYGRAŁEŚ!");

          const endTime = new Date().getTime();
          const gameTime = (endTime - startTime) / 1000;
          alert(`Brawo! Udało Ci się wygrać w : ${gameTime} sekund!`);
          location.reload();
        }
      } else {
        console.log("przegrana");

        activeCards.forEach((card) => card.classList.add("hidden"));
      }
      activeCard = "";
      activeCards.length = 0;
      cards.forEach((card) => card.addEventListener("click", clickCard));
    }, 1000);
  }
};

const init = function () {
  cards.forEach(function (card) {
    const position = Math.floor(Math.random() * cardsColor.length);
    card.classList.add(cardsColor[position]);
    cardsColor.splice(position, 1);
  });

  setTimeout(function () {
    cards.forEach(function (card) {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  }, 5000);
};

init();

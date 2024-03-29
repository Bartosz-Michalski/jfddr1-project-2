firebase.initializeApp(firebaseConfig);

const cardsColor = [
  "red",
  "red",
  "green",
  "green",
  "blue",
  "blue",
  "brown",
  "brown",
  "yellow",
  "yellow",
  "gray",
  "gray",
  "cadetblue",
  "cadetblue",
  "violet",
  "violet",
  "lightgreen",
  "lightgreen",
];

let cards = document.querySelectorAll("div");
// W efekcie querySelectorAll otrzymamy NodeListę z naszymi divami, musimy ją więc przerobić na tablicę
cards = [...cards]; // 18 div-ów

// Chcemy, aby po starcie gry, a w naszym przypadku jest to wejście na stronę, był liczony czas. Odwołujemy się do wbudowanego obiektu Date i metodę .getTime(), która liczy czas w milisekundach od 01.01.1970 roku
const startTime = new Date().getTime();

// Za każdym razem, kiedy klikniemy na jakiś element (kartę) to powinniśmy mieć informację, który jest kliknięty. Domyślnie jest zmienna ta będzie pusta, ponieważ dopiero w funkcji będziemy określać, która z kart jest kliknięta.
let activeCard = "";
// Tworzymy zmienną, która będzie przechowywać dwa porównywane elementy (parę kart), taka mini gra, jeśli oba elementy w parze są takie same to wygrywamy, a jeśli nie to przegrywamy. Tworzymy więc tablicę, która na początku będzie pusta.
const activeCards = [];

// Musimy mieć też informacje o tym, ile mamy łącznie par, co będzie nam potrzebne do tego, aby stwierdzić kiedy gra jest skończona. Jeżeli mamy 9 par, to musimy osiągnąć 9 minizwycięstw, aby ukończyć całą grę.
const gamePairs = cards.length / 2;
// Tworzymy zmienną, która będzie przechowywać ilość minizwycięstw, czyli par, które udało nam się dopasować
let gameResult = 0;

//Deklarujemy funkcję, która będzie nam później potrzebna do nasłuchiwania kliknięcia w daną kartę
const clickCard = function () {
  // Oznaczamy to co zostało kliknięte
  activeCard = this;
  // Bug1 - Musimy wykluczyć możliwość kliknięcia w tę samą kartą, co podowuje dopasowanie pary. Poniższy zapis sprawia, że klikanie w ten sam element nie będzie miało żadnych konsekwencji.
  if (activeCard == activeCards[0]) return;

  // Usuwamy klasę powodującą zasłonięcie, czyli hidden
  activeCard.classList.remove("hidden");
  // Sprawdzamy, czy to jest pierwsze kliknięcie, czyli, czy nasza tablica jest dalej pusta
  if (activeCards.length === 0) {
    // Jeśli jest to pierwsze kliknięcie, czyli nasza tablica jest pusta, to zapisujemy w indeksie 0 pierwszy element, który został kliknięty
    activeCards[0] = activeCard;
    return;
  } else {
    // Jeśli jest to drugie kliknięcie, to musimy zablokować możliwość kliknięcia gdziekolwiek poprzez removeEventListenera na click-a
    cards.forEach((card) => card.removeEventListener("click", clickCard));
    // Po kliknięciu w drugą kartę, dodajemy ją do naszych aktywnych kart
    activeCards[1] = activeCard;
    // Kiedy mamy aktywne (odkryte) dwie karty, to opóźniamy ich zasłonięcie, bądź wykluczenie z dalszej gry o jakąś ilość sekund (wyrożonych w milisekundach)
    setTimeout(function () {
      if (activeCards[0].className === activeCards[1].className) {
        // Jeśli wygrana, tzn. obie odkryte są tego samo koloru, to dodaj klasę wykluczającą te karty z dalszej gry, czyli off
        console.log("wygrana");
        activeCards.forEach((card) => card.classList.add("off"));
        // Jeśli wygrana, to musimy zwiększyć rezultat gry
        gameResult++;
        // Bug 2 - Wyszystkie karty, które zostały już sparowane, czyli mają klasę off, musimy wyrzucić z tablicy cards (metoda filter podowuje, że jeśli to co napiszemy w funkcji będzie true, to ten element zostanie dopisany do tablicy)
        cards = cards.filter((card) => !card.classList.contains("off"));
        //Sprawdzamy,czy w tym miejscu nasza gra się zakończyła
        if (gameResult == gamePairs) {
          console.log("BRAWO! WYGRAŁEŚ!");
          // Pobieramy czas kiedy została ukończona gra
          const endTime = new Date().getTime();
          // Obliczamy długość trwania rozgrywki
          const gameTime = (endTime - startTime) / 1000;
          // Wyświetlamy gratulacje i długość trwania rozgrywki
          alert(`Brawo! Udało Ci się wygrać w : ${gameTime} sekund!`);
          // Przeładowujemy grę
          location.reload();
        }
      } else {
        // Jeśli przegrana, tzn. obie odkryte są innego koloru, to dodaj klasę powodującą zasłonięcie, czyli hidden
        console.log("przegrana");
        activeCards.forEach((card) => card.classList.add("hidden"));
      }

      // Niezależnie od tego, czy wygraliśmy, czy przegraliśmy w minigrę (czyli, czy znaleźliśmy parę, bądź nie) to...
      // ...musimy zresetować zeminną przechowującą ostatnie kliknięcie oraz tablicę przechowującą dwa elementy (czyli, żeby jej długość była równa 0)
      activeCard = "";
      activeCards.length = 0;
      // ...musimy włączyć z powrotem nasłuchiwanie na nasze elementy (karty)
      cards.forEach((card) => card.addEventListener("click", clickCard));
    }, 700);
  }
};

// Tworzymy funkcję, która będzie odpowiedzialna za inicjalizację gry
const init = function () {
  // Bierzemy każdą kartę z osobna, i wykonujemy poniższą funkcję w celu wylosowania koloru(zostanie wykonana tyle razy ile jest kart, czyli w naszym przypadku 18)
  cards.forEach((card) => {
    // Losujemy tyle elementów ile mamy aktualnie w tablicy z kolorami kart przemnażając Math.random (zwraca od 0 do 0.99(9)) i długość tablicy z kolorami kart, następnie ucinamy końcówkę za pomocą Math.floor
    const position = Math.floor(Math.random() * cardsColor.length); // Zwróci liczbę od 0 do 17 włącznie
    // Dodajemy klasę do każdej z kart odwołując się do tablicy, która przechowuje wszystkie kolory kart, a jako indeks podajemy wylosowaną wartość z funkcji position
    card.classList.add(cardsColor[position]);
    // Musimy usunąć wysolowany element (czyli kolor) z naszej tablicy, tak, aby nie mógł być przypisany do kolejnej karty
    cardsColor.splice(position, 1);
  });

  // Chcemy, aby wszystkie nasze elementy (karty z nadanymi kolorami) były widoczne przez jakiś czas od rozpoczęcia gry, a następnie, żeby zostały zakryte
  setTimeout(function () {
    // Bierzemy każdą z naszych kart, następnie tworzymy funkcję, abyśmy mogli się odwołać do konkrentego elementu to musimy przekazać jego nazwę (którą sami wymyślamy), jako argument funkcji
    cards.forEach(function (card) {
      card.classList.add("hidden");
      // Po krótkim czasie na zapozanie się z rozmieszczeniem kart, ustawiamy nasłuchiwanie na kliknięcie w jakąś kartę, po czym zostanie wywołana jakaś funkcja
      card.addEventListener("click", clickCard);
    });
  }, 2000);
};

init();

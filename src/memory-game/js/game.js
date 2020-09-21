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

//Deklarujemy funkcję, która będzie nam później potrzebna do nasłuchiwania kliknięcia w daną kartę
const clickCard = function () {};

// Tworzymy funkcję, która będzie odpowiedzialna za inicjalizację gry
const init = function () {
  // Bierzemy każdą kartę z osobna, i wykonujemy poniższą funkcję w celu wylosowania koloru(zostanie wykonana tyle razy ile jest kart, czyli w naszym przypadku 18)
  cards.forEach(function (card) {
    // Losujemy tyle elementów ile mamy aktualnie w tablicy z kolorami kart przemnażając Math.random (zwraca od 0 do 0.99(9)) i długość tablicy z kolorami kart, następnie ucinamy końcówkę za pomocą Math.floor
    const position = Math.floor(Math.random() * cardsColor.length); // Zwróci liczbę od 0 do 17 włącznie
    // Dodajemy klasę do każdej z kart odwołując się do tablicy, która przechowuje wszystkie kolory kart, a jako indeks podajemy wylosowaną wartość z funkcji position
    card.classList.add(cardsColor[position]);
    // Musimy usunąć wysolowany element (czyli kolor) z naszej tablicy, tak, aby nie mógł być przypisany do kolejnej karty
    cardsColor.splice(position, 1);
  });

  // Chcemy, aby wszystkie nasze elementy (karty z nadanymi kolorami) były widoczne przez jakiś czas od rozpoczęcia gry, a następnie, żeby zostały zakryte
  setTimeout(function () {
    //   Bierzemy każdą z naszych kart, następnietworzymy funkcję, abyśmy mogli się odwołać do konkrentego elementu to musimy przekazać jego nazwę, która sami wymyślamy, jako argument funkcji
    cards.forEach(function (card) {
      card.classList.add("hidden");
      // Po krótkim czasie na zapozanie się z rozmieszczeniem kart, ustawiamy nasłuchiwanie na kliknięcie w jakąś kartę, poczym zostanie wywołana jakaś funkcja
      card.addEventListener("click", clickCard);
    });
  }, 2000);
};

init();

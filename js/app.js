const cardsMessegeData = JSON.parse(DATA); //JSON глобальный обьект
const cardMessegeList = document.getElementById("cardMessegeList");
const reloadBtn = document.getElementById("reloadBtn");
//console.log(DATA);
//console.log(cardData);
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

reloadBtn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.reload();
});

// "id": 1,
// "phone": "+63 (924) 979-2252",
// "name": "Guss Marvelley",
// "text": "Proin leo odio, porttitor id, consequat in,
//consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.
//Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices,
//libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.
//Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
// "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
// "date": "1609595510000",
// "seen": false

renderMessegeCards(createCardsHTML(cardsMessegeData), cardMessegeList);

function createCardsHTML(cardsArray) {
  let cardsHTML = "";
  cardsArray.forEach((card) => {
    cardsHTML += createCard(card); //в каждую итерацию в cardsHTML каждый раз добавлять строку возвращенную функцией
    console.log(cardsArray);
    cardsArray.sort((a, b) => {
      return a.seen - b.seen || a.date - b.date;
    });
  });
  return cardsHTML;
}

//renderMessegeCards получает то, что вставлять(cardHTML) и получает элем куда вставлять (cardListElem)
function renderMessegeCards(cardHTML, cardListElem) {
  cardListElem.insertAdjacentHTML("beforeend", cardHTML); //insertAdjacentHTML метод у любого узла, принимает два парам, куда вставлять и строку с html
}

const dateObj = new Date(cardsMessegeData.date);

function createCard(messegeData) {
  return `<div class = "card-wrapper row text-center pt-4 pb-4 align-items-start">
    <div
    class="user col-3 d-flex align-items-end"
    >
    <img
    width = "1"
    height = "1"
    loading = "lazy"
      class="card-data-img"
      src="${messegeData.avatar}"
      alt="${messegeData.name}"
    />
    <div class="user-info  ms-3">
      <div class="user-name">${messegeData.name}</div>
      <a href="tel:" class="user-phone">${messegeData.phone}</a>
    </div>
    </div>
    <div class="messege col-6">
    <p class="text mb-0 text-start">
      ${messegeData.text}
    </p>
    </div>
    <div class="time-date col-3 d-flex align-items-center justify-content-center">
    <div class="tame">${timeFormatter.format(messegeData.date)}</div>
    <div class="date ms-4">${dateFormatter.format(messegeData.date)}</div>
    </div>
    </div>`;
}

//renderMessegeCards(str, cardMessegeList)

//a = [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
//a.sort((x, y) => Number(x) - Number(y));
//console.log(a);

let cardsMessegeData = JSON.parse(DATA); //JSON глобальный обьект
const cardMessegeList = document.getElementById("cardMessegeList");
const reloadBtn = document.getElementById("reloadBtn");
const allCount = document.getElementById('allCount')
const unreadCount = document.getElementById('unreadCount')

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
  cardsMessegeData = JSON.parse(DATA)
  renderMessegeCards(createCardsHTML(cardsMessegeData), cardMessegeList);
});
cardMessegeList.addEventListener('click', event => {
  const messageText = event.target.closest('.text')
  if (messageText) {
    const messageId = messageText.closest('.card-wrapper').dataset.id
    const messageIdx = cardsMessegeData.findIndex(message => message.id == messageId)
    const message = cardsMessegeData[messageIdx]
    if (message.seen) {
      cardsMessegeData.splice(messageIdx, 1)
    } else{
      message.seen = true
    }
    renderMessegeCards(createCardsHTML(cardsMessegeData), cardMessegeList);
  }
})

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
  allCount.textContent = cardsArray.length
  unreadCount.textContent = cardsArray.filter(message => !message.seen).length
  let cardsHTML = "";
  cardsArray.sort((a, b) => {
    return a.seen - b.seen || b.date - a.date;
  });
  cardsArray.forEach((card) => {
    cardsHTML += createCard(card); //в каждую итерацию в cardsHTML каждый раз добавлять строку возвращенную функцией
  });
  return cardsHTML;
}

//renderMessegeCards получает то, что вставлять(cardHTML) и получает элем куда вставлять (cardListElem)
function renderMessegeCards(cardHTML, cardListElem) {
  cardListElem.innerHTML = cardHTML; //insertAdjacentHTML метод у любого узла, принимает два парам, куда вставлять и строку с html
}


function createCard(messegeData) {
  return `<div class = "card-wrapper row text-center pt-4 pb-4 align-items-start ${!messegeData.seen ? 'unseen' : ''}" data-id="${messegeData.id}">
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



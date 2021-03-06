let cardsMessegeData = JSON.parse(DATA); //JSON глобальный обьект
const cardMessegeList = document.getElementById("cardMessegeList");
const reloadBtn = document.getElementById("reloadBtn");
const allCount = document.getElementById("allCount");
const unreadCount = document.getElementById("unreadCount");
const searchForm = document.getElementById("searchForm");
const modalBackdrop = document.getElementById("modalBackdrop");

const modalWindow = document.getElementById("modalWindow");

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

//console.log(DATA);
//console.log(cardData);

//используется обычная функция для'this' (ссылается на контекст (searchForm))
searchForm.addEventListener("submit", function (e) {
  e.preventDefault(); //предотвратить дефолтное поведение
  const query = this.search.value
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => !!word);
  const searchFields = ["name", "phone", 'text'];
  const filteredMessage = searchMessages(query, searchFields, cardsMessegeData);
  console.log(searchMessages(query, searchFields, cardsMessegeData));
  //console.log(query);
  //console.log("submit");
  //console.log(this.search.value);
  renderMessegeCards(createCardsHTML(filteredMessage), cardMessegeList);
});

function searchMessages(query, fields, messages) {
  //параметры: (запрос, ключи(поля), массив сообщений)

  const filteredMessege = messages.filter((message) => {
    return query.every((word) => {
      //результат фильтра будет равен методу every(каждый) пробежавшемуся по словам в запросе(query)
      return fields.some((field) => {
        //основная проверка
        //console.log('itaration');
        return message[field]?.trim()?.toLowerCase()?.includes(word);
      });
    });
  });
  return filteredMessege;
}

reloadBtn.addEventListener("click", (event) => {
  cardsMessegeData = JSON.parse(DATA);
  renderMessegeCards(createCardsHTML(cardsMessegeData), cardMessegeList);
});
cardMessegeList.addEventListener("click", (event) => {
  const messageText = event.target.closest(".text");
  if (messageText) {
    const messageId = messageText.closest(".card-wrapper").dataset.id;
    const messageIdx = cardsMessegeData.findIndex(
      (message) => message.id == messageId
    );
    const message = cardsMessegeData[messageIdx];
    if (message.seen) {
      cardsMessegeData.splice(messageIdx, 1);
    } else {
      message.seen = true;
     
    }
    renderMessegeCards(createCardsHTML(cardsMessegeData), cardMessegeList);
  }
});

document.addEventListener("click", (event) => {
  const userMessage = event.target.closest(".user");
  const closeModalBtn = document.getElementById("closeModalBtn");
  //console.log(userMessage);
  if (userMessage) {
    const userMassageId = userMessage.dataset.id
    const userMessageData = cardsMessegeData.find(message => message.id === +userMassageId)
    createModalDataHTML(userMessageData)
    openModal()
    //console.log(modalWindow);
  } else if (event.target === modalBackdrop || (event.target === closeModalBtn)) {
    closeModal();
  } 
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

function openModal() {
  document.body.classList.add("show-modal");
 
}
function closeModal() {
  document.body.classList.remove("show-modal");
}

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
  allCount.textContent = cardsArray.length;
  unreadCount.textContent = cardsArray.filter(
    (message) => !message.seen
  ).length;
  let cardsHTML = "";
  cardsArray.sort((a, b) => {
    return a.seen - b.seen || b.date - a.date;
  });
  cardsArray.forEach((card) => {
    cardsHTML += createCard(card); //в каждую итерацию в cardsHTML каждый раз добавлять строку возвращенную функцией
 //console.log(card); 
  });
  return cardsHTML;
}



//renderMessegeCards получает то, что вставлять(cardHTML) и получает элем куда вставлять (cardListElem)
function renderMessegeCards(cardHTML, cardListElem) {
  cardListElem.innerHTML = cardHTML; // принимает два парам, куда вставлять и строку с html
 
   
}

function createCard(messegeData) {
 
  return `<div class = "card-wrapper row text-center pt-4 pb-4 align-items-start ${
    !messegeData.seen ? "unseen" : ""
  }" data-id="${messegeData.id}">
    <div
    class="user col-3 d-flex align-items-end" data-id="${messegeData.id}"
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
      <p class="user-name">${messegeData.name}</p>
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

function createModalDataHTML(modalData) {
  modalWindow.innerHTML = createModalData(modalData)
}


function createModalData(modalData) {
  //console.log(modalData);
  return `  
  <div class="card-header" >
    ${timeFormatter.format(modalData.date)}
    
    ${dateFormatter.format(modalData.date)}
  </div>
  <div class="card-body">
    <h5 class="card-title">${modalData.name} ${modalData.phone}</h5>
    <div class="text-wrap"><p class="card-text">${modalData.text}</p></div>
    <a href="#" class="btn btn-primary mt-3">Answer</a>
  
</div>`;

}


//renderMessegeCards(str, cardMessegeList)

//a = [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
//a.sort((x, y) => Number(x) - Number(y));
//console.log(a);


// let [firstName, surname] = "Ilya Kantor".split(' ');
// console.log(firstName, surname);

let user = {
  name: "John",
  age: 30
};

// цикл по ключам и значениям
for (let [key, value] of Object.entries(user)) {
  console.log((`${key}:${value}`)); // name:John, затем age:30
}


let a = [5]
console.log(a[0]);
console.log(a[1]);


let [name = "Guest", surname = "Anonymous"] = ["Julius"];

console.log(name)    
console.log(surname) 
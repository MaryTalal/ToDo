const list = document.getElementById("list");
const input = document.getElementById("input");
const dateElement = document.getElementById("date");
const clear = document.querySelector(".clear");


//CLasses names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//STORE
let LIST, id;

//get item from local storage

let data = localStorage.getItem("TODO");

//check if data is not empty

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last
    loadList(LIST); //load the list to the user interface
} else { //if data isn't empty
    LIST = [];
    id = 0;
}

//load items to the user's interface

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear localStorage and reload page
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

//show today Date
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
};

const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                 `;


    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(even) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDO(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; //delete or complete
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDO(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));

});

//random Header Image
function randomHeaderImage() {
    let randomNumber = Math.floor(Math.random() * 5);
    let imagesArr = ['./img/cT2inWwHuik.jpg', './img/FCl4Z_bk5S.jpg', './img/iLmCWCQ22lc.jpg', './img/KlWzyYE6UyQ.jpg', './img/lpfh8dErjPU.jpg', './img/NspFZbV3ZoQ.jpg'];
    let elem = document.getElementById("header"),
        value = elem.value;
    if (!isNaN(parseFloat(value))) {
        elem.style.backgroundImage = imagesArr[randomNumber];
    } else {
        elem.style.backgroundImage = `url(${imagesArr[randomNumber]})`;
    }
}

randomHeaderImage();
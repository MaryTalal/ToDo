const list = document.getElementById("list");
const input = document.getElementById("input");
const dateElement = document.getElementById("date");
const clear = document.querySelector(".clear");

//STORE
let LIST = [];
let id = 0;
LIST = [{}, {}, ];

//CLasses names
const CHECK = "fa-check-circle";
const UNCHECK = " fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//show today Date
let options = { weekday: 'long', month: 'short', day: 'numeric' };
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//if (trash) { return; }

function addToDo(toDo, id, done, trash) {

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text = < li class = "item" >
        <
        i class = "fa ${DONE} complete"
    job = "complete"
    id = "${id}" > < /i> <
        p class = "text ${LINE}" > $ { toDo } < /p> <
        i class = "de fa fa-trash-o"
    job = "delete"
    id = "${id}" > < /i> <
        /li>


    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, falsr, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            input.value = " ";
            id++;
        }
    }
});

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parantNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDO(element) {
    element.parantNode.parantNode.removeChild(element.parantNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event) {
    let element = event.target; //<i class="de fa fa-trash-o" job="delete" id="${id}"></i> 
    const elementJOB = event.target.attributes.job.value; //delete or complete
    if (elementJOB == "complete") {
        completeToDo(element);
    } else if (elementJOB == "delete") {
        removeToDO(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});


//restore to-do-list from localStorage

let data = localStorage.getItem("TODO"); //restore our list array
if (data) {
    LIST = JSON.parse(data);
    loadToDO(LIST); //load the list to the page
    id = LIST.length;
} else {
    LIST = [];
    id = 0;
}

function loadToDO(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


//clear localStorage and reload page
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});
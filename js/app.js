// Register serviceWorker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

// Select the Elements
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")
const todoBtn = document.getElementById("todoBtn")
const overlay = document.getElementById('overlay')
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const confirmClear = document.querySelector('.confirm')
// Classes names
const CHECK = "check-circle"
const UNCHECK = "uncheck-circle"
const LINE_THROUGH = "lineThrough"

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO")

// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
// dialog model 
confirmClear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}



// Show todays date
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <img src="../img/icons/${DONE}.png" class="${DONE}" job="complete" id="${id}"></img>
                    <p class="text ${LINE}">${toDo}</p>
                    <img src="../img/icons/minus.png" class="minus-circle" job="delete" id="${id}"></img>
                  </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}





// add an item to the list user the enter key
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if the input isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});


//add toDo button click

todoBtn.addEventListener('click', function (e) {
    const toDo = input.value;

    if (toDo) {
        addToDo(toDo, id, false, false);

        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });

        // add item to localstorage ( this code must be added where the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = "";

})








// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
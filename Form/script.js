/* autor Wojciech Wojtasek */

// pages
var page1 = document.querySelector("#page1");
var page2 = document.querySelector("#page2");
var page3 = document.querySelector("#page3");

// required boxes
var required = [
    document.querySelector("#input_fname"),
    document.querySelector("#input_lname"),
    document.querySelector("#input_email"),
    document.querySelector("#input_regu"),
    document.querySelector("#input_data"),
    document.querySelector("#input_lice")
];

var requiredPages = [1, 1, 1, 3, 3, 3];

// other
var form = document.querySelector('#form');
var buttonNext = document.querySelector("#buttonNext");
var buttonSubmit = document.querySelector("#buttonSubmit");
var title = document.querySelector("#title");
var pageIndex = 1;

activePage(1);

/* - - - - - - - - POST and REQUEST - - - - - - - - */
const allInputs = {
    firstName: document.querySelector('#input_fname'),
    lastName:  document.querySelector('#input_lname'),
    email:     document.querySelector('#input_email'),
    birtdate:  document.querySelector('#input_date'),
    select:    document.querySelector('#select_sex'),
    number:    document.querySelector('#input_num'),
    color:     document.querySelector('#input_color')
}

form.addEventListener("submit", function(event){
    event.preventDefault(); // block default form submit
    sendRequest();
}, true);

function sendRequest(){
    const request = new XMLHttpRequest();

    request.onload = () => {
        console.log(this.responseText);
    };

    const requestData = `firstname=${allInputs.firstName.value}&lastname=${allInputs.lastName.value}`;
    console.log(requestData);

    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(requestData);
}
/* - - - - - - - - Pages operation - - - - - - - - */

buttonNext.addEventListener("click", function() {
    pageIndex += 1;
    activePage(pageIndex);
}, false);

buttonSubmit.addEventListener("click", function() {
    if(inputsCorrect()){
        //page3.classList.add("pageDisabled");
        //buttonSubmit.classList.add("pageDisabled")
        //alert("Sukces");
    }
}, false);

function inputsCorrect(){
    for(i = 0; i < required.length; i++){
        if(!required[i].validity.valid){
            pageIndex = requiredPages[i];
            activePage(pageIndex);
            required[i].focus();
            return false;
        }
    }
    return true;
}

function activePage(pageNumber){
    page1.classList.add("pageDisabled");
    page2.classList.add("pageDisabled");
    page3.classList.add("pageDisabled");

    if(pageNumber == 1){
        page1.classList.remove("pageDisabled")
        buttonNext.classList.remove("pageDisabled");
    } else if (pageNumber == 2){
        page2.classList.remove("pageDisabled")
        buttonNext.classList.remove("pageDisabled");
    } else if (pageNumber == 3){
        page3.classList.remove("pageDisabled")
        buttonNext.classList.add("pageDisabled");
    }
}

/* autor Wojciech Wojtasek */

var selectedDayNumber = 1;

var subtitle = document.querySelector("h2");
var p_person = document.querySelector("p");
var sectionContent = document.querySelector(".section_content");
var buttons = document.querySelectorAll(".buttonDay");
var activeButton = buttons[0];


/* Initialize */
initializeButtons();
readXML("plik.xml");
activeButton.classList.toggle("buttonActive");
subtitle.innerHTML = activeButton.innerHTML;


/* Buttons */
function initializeButtons(){
    for(i = 0; i < buttons.length; i++){
        buttons[i].onclick = buttonClick;
    }
}

function buttonClick(){
    var c = this.value;
    selectedDayNumber = c;

    readXML("plik.xml");

    activeButton.classList.toggle("buttonActive");
    activeButton = this;
    activeButton.classList.toggle("buttonActive");
    subtitle.innerHTML = activeButton.innerHTML;
}

/* Read XML */
function readXML(filename){
    fetch(filename)
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data,"text/xml");
        var activities = xmlDoc.getElementsByTagName("activities")[0];
        var person = xmlDoc.getElementsByTagName("person")[0];

        clearPage();
        updateContent(activities);
        updatePerson(person);
    })
}

function updatePerson(person){
    var firstName = person.getAttribute("firstName");
    var lastName = person.getAttribute("lastName");
    var tyt = person.getAttribute("tyt");
    var position = person.getAttribute("position");
    p_person.innerHTML = `${tyt} ${firstName} ${lastName}, ${position}`;
}

function clearPage(){
    sectionContent.innerHTML = "";
}

function updateContent(activities){
    var labs = activities.getElementsByTagName("lab");
    var exercises = activities.getElementsByTagName("exercise");
    var lectures = activities.getElementsByTagName("lecture");
    var consultations = activities.getElementsByTagName("consultation");

    checkDayAndCreateElement(labs, "lab");
    checkDayAndCreateElement(exercises, "exercise");
    checkDayAndCreateElement(lectures, "lecture");
    checkDayAndCreateElement(consultations, "consultation");
}

function checkDayAndCreateElement(array, elementType){
    for(i = 0; i < array.length; i++){
        var dayNumber = array[i].getElementsByTagName("day")[0].getAttribute("wd");

        if(dayNumber == selectedDayNumber && elementType != "consultation"){
            createElementOnPage(array[i], elementType);
        }
        else if (dayNumber == selectedDayNumber && elementType == "consultation"){
            createConsulElemOnPage(array[i], elementType);
        }
    }
}

function createConsulElemOnPage(domElement, elementType){
    var name = "Konsultacje";
    var room = domElement.getElementsByTagName("room")[0].innerHTML;
    var begin = domElement.getElementsByTagName("begin")[0].innerHTML;
    var end = domElement.getElementsByTagName("end")[0].innerHTML;

    var elementTypeCSS = "element_" + elementType;
    var HTML = "<li class=\"element\"\> <ol\> <li class=\"" + elementTypeCSS + "\">" + name + "</li\><li>" + room + "</li\><li class=\"" + elementTypeCSS + "\">" + begin + " - " + end + "</li\></ol\></li>";

    sectionContent.innerHTML += HTML;
}

function createElementOnPage(domElement, elementType){
    var name = domElement.getElementsByTagName("name")[0].innerHTML;
    var shortname = domElement.getElementsByTagName("shortname")[0].innerHTML;
    var room = domElement.getElementsByTagName("room")[0].innerHTML;
    var group = domElement.getElementsByTagName("group")[0].innerHTML;
    var begin = domElement.getElementsByTagName("begin")[0].innerHTML;
    var end = domElement.getElementsByTagName("end")[0].innerHTML;

    var elementTypeCSS = "element_" + elementType;
    var HTML = "<li class=\"element\"\> <ol\> <li class=\"" + elementTypeCSS + "\">" + name + "</li\><li>" + shortname + "</li\><li>" + room + "</li\><li>" + group + "</li\><li class=\"" + elementTypeCSS + "\">" + begin + " - " + end + "</li\></ol\></li>";

    sectionContent.innerHTML += HTML;
}
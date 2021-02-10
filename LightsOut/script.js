/* autor Wojciech Wojtasek */

var title = document.querySelector("h1");
var table = [];
var tableButtons = [];

var rows = 7;
var columns = 5;
var randomBlocks = 20;

// Creating table
createTable(rows, columns);
createTableButtons(rows, columns);
setButtonClicks();

// Initialize first arrangement
setRandomClicked(randomBlocks, rows, columns);
setColors();

// Orientation handling
setOrientationHandling();

function setOrientationHandling(){
    if(window.innerHeight < window.innerWidth){
        var container = document.querySelector(".containerGame");
        container.classList.toggle("rotation");
    }
    window.addEventListener("orientationchange", function() {
        var container = document.querySelector(".containerGame");
        container.classList.toggle("rotation");
        console.log("Resized!!!");
    }, false);
}

function createTable(rows = 7, columns = 5){
    table = new Array(rows + 2);

    for(i = 0; i < rows + 2; i++){
        table[i] = new Array(columns + 2);
        table[i] = table[i].fill(9);

        for(j = 1; j < columns + 1; j++){
            table[i][j] = 0;
        }
    }
}

function createTableButtons(rows = 7, columns = 5){
    var containerGame = document.querySelector(".containerGame");

    for(i = 0; i < rows; i++){
        var ul = document.createElement("ul");
        var newInnerHTML = "";

        for(j = 0; j < columns; j++){
            var element = "<li><button id=\"row" + i + "\" value=\"" + i + "," + j + "\"></button></li>";

            newInnerHTML += element;
        }

        ul.innerHTML = newInnerHTML;
        containerGame.appendChild(ul);
    }

    tableButtons = [
        document.querySelectorAll("#row0"),
        document.querySelectorAll("#row1"),
        document.querySelectorAll("#row2"),
        document.querySelectorAll("#row3"),
        document.querySelectorAll("#row4"),
        document.querySelectorAll("#row5"),
        document.querySelectorAll("#row6"),
    ];
}

function setButtonClicks(){
    for(i = 0; i < tableButtons.length; i++){
        for(j = 0; j < tableButtons[i].length; j++){
            tableButtons[i][j].onclick = buttonClick;
        }
    }
}

/* 
 * amount: a number of random blocks
 * rows: a number of rows in the table
 * columns: a number of columns in the table
*/
function setRandomClicked(amount, rows, columns){
    var toEnd = amount;
    
    while(toEnd > 0){
        var ranX = Math.floor(Math.random() * columns) + 1
        var ranY = Math.floor(Math.random() * rows) + 1
        if(table[ranY][ranX] == 0){
            table[ranY][ranX] = 1;
            toEnd -= 1;
        }
    }
}

function buttonClick(){
    var value = this.value.toString().split(",");
    var y = parseInt(value[0]) + 1;
    var x = parseInt(value[1]) + 1;

    table[y][x] = toggle(table[y][x]);
    table[y - 1][x] = toggle(table[y - 1][x]);
    table[y + 1][x] = toggle(table[y + 1][x]);
    table[y][x - 1] = toggle(table[y][x - 1]);
    table[y][x + 1] = toggle(table[y][x + 1]);

    setColors();
}

function toggle(number){
    if (number == 0) return 1;
    else return 0;
}

function setColors(){
    for(i = 1; i < table.length - 1; i++){
        for(j = 1; j < table[i].length - 1; j++){
            if(table[i][j] == 1){
                tableButtons[i - 1][j - 1].classList.add("clicked");
            }
            else{
                tableButtons[i - 1][j - 1].classList.remove("clicked");
            }
        }
    }
}

function write(text){
    title.innerHTML = text;
}

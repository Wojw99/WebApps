// autor Wojciech Wojtasek
var outputResult = document.querySelector("#outputResult");
var outputCalculation = document.querySelector("#outputCalculation");
var buttons = document.querySelectorAll("button");

var leftNumber = "";
var operand = "";
var rightNumber = "";
var result = "";

var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var functions = ["x^2", "sqrt", "x!", "log", "sin", "cos", "tan", "ctg", "arcsin", "arccos", "arctan", "arcctg"];
var separation = ".";
var operands = ["/", "*", "-", "+"];
var equalSign = "=";
var clearSign = "C";
var plusMinusSign = "+/-"; 

var calculationEnd = false;

initialize();

function initialize(){
    var element = document.getElementById("advancedButtons");
    element.classList.toggle("buttonsInvisible");

    for(i = 0; i < buttons.length; i++){
        buttons[i].onclick = buttonClick;
    }

    document.addEventListener('keydown', changeView);
}

function changeView(e) {
    if(e.keyCode == 16){
        var element = document.getElementById("advancedButtons");
        element.classList.toggle("buttonsInvisible");
    }
}

function buttonClick(){
    var c = this.value;

    if(calculationEnd) {
        clearWithoutResult();
        calculationEnd = false;
    }

    // numbers
    if(numbers.includes(c)){
        if(operand == ""){
            leftNumber += c;
        }
        else if(operand != ""){
            rightNumber += c;
        }
    }
    // +/-
    if(c == plusMinusSign){
        if(rightNumber == "" && leftNumber != ""){
            leftNumber = 0 - leftNumber;
        }
        else if((rightNumber != "")){
            rightNumber = 0 - rightNumber;
        }
    }
    // separation
    else if(c == separation){
        if(operand == "" && !leftNumber.includes(separation)){
            leftNumber += c;
        }
        else if(operand != "" && !rightNumber.includes(separation)){
            rightNumber += c;
        } 
    }
    // functions
    else if(functions.includes(c)){
        if(leftNumber != "" && operand == "" && rightNumber == ""){
            result = functioning(leftNumber, c);
            printResult();
        }
    }
    // operands
    else if(operands.includes(c)){
        if(leftNumber != "" && rightNumber == ""){
            operand = c;
        }
    }
    // equals
    else if(c == equalSign){
        if(leftNumber != "" && rightNumber != ""){
            result = calculate(leftNumber, operand, rightNumber);
            printResult();
        }
        else{
            result = calculate(leftNumber);
            printResult();
        }
    }
    // clear
    else if(c == "C"){
        clear();
        result = "";
        printResult();
    }

    printOperation();
}

function functioning(x, fun){
    calculationEnd = true;

    if(fun == "x^2") return Math.pow(x,2);
    else if(fun == "sqrt") return Math.sqrt(x);
    else if(fun == "x!") return "";
    else if(fun == "log") return Math.log(x);

    else if(fun == "sin") return Math.sin(x);
    else if(fun == "cos") return Math.cos(x);
    else if(fun == "tan") return Math.tan(x)
    else if(fun == "ctg") return 1.0 / Math.tan(x);

    else if(fun == "arcsin") return Math.asin(x)
    else if(fun == "arccos") return Math.acos(x);
    else if(fun == "arctan") return Math.atan(x)
    else if(fun == "arcctg") return 1.0 / Math.atan(x);

    else return "";
}

function clear(){
    leftNumber = "";
    rightNumber = "";
    operand = "";
    result = "";
}

function clearWithoutResult(){
    leftNumber = result;
    rightNumber = "";
    operand = "";
    result = "";
}

function calculate(x, operand = "+", y = "0"){
    calculationEnd = true;

    if(operand == "+") return parseFloat(x) + parseFloat(y);
    else if(operand == "-") return parseFloat(x) - parseFloat(y);
    else if(operand == "*") return parseFloat(x) * parseFloat(y);
    else if(operand == "/") return parseFloat(x) / parseFloat(y);
    else return "";
}

function printResult(){
    if(result == "") result = "...";
    outputResult.innerHTML = result;
}

function printOperation(){
    outputCalculation.innerHTML = leftNumber + " " + operand + " " + rightNumber;

    if(leftNumber == "" && rightNumber == ""){
        outputCalculation.innerHTML = "...";
    }
}
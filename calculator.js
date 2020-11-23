const inputButton = document.querySelector("input-button");
const displayTextBox = document.getElementById("display-text");
const gridContainer = document.querySelector(".container")
let firstNumArray = [];
let secondNumArray = [];
let globalOperator = "";
let displayNumber = 0;
let operatorPressed = false;
displayTextBox.innerHTML = displayNumber;  
let operationCounter = 0;
let equalsPressed = false;

function add(num1, num2) {
    return num1 += num2;
}

function subtract(num1, num2) {
    return num1 -= num2;
}

function multiply(num1, num2) {
    return num1 *= num2;
}

function divide(num1, num2) {
    return num1 /= num2;
}

function operate(num1, num2, operator) {
    if (operator == "+") {
        return add(num1, num2);
    }
    else if (operator == "-") {
        return subtract(num1, num2);
    }
    if (operator == "X") {
        return multiply(num1, num2);
    }
    if (operator == "/") {
        return divide(num1, num2);
    }
}

function clearDisplay() {
    firstNumArray.length = 0;
    secondNumArray.length = 0;
    displayNumber = 0;
    displayTextBox.innerHTML = 0;
    globalOperator = "";
    operatorPressed = false;
    operationCounter = 0;
    console.log("Cleared workspace.")
}

function addToFirstArray(number) {
    firstNumArray.push(number);
    displayTextBox.innerHTML = firstNumArray.join("");
}

function addToSecondArray(number) {
    secondNumArray.push(number);
    displayTextBox.innerHTML = secondNumArray.join("");
}

/*should be ran when user presses Equals based on certain cicrumstances*/
function userPressedEquals() {
    firstNumArray[0] = displayNumber;
    firstNumArray.length = 1;
    secondNumArray.length = 0;
    operatorPressed = false;
    operationCounter = 0;
    equalsPressed = true;
}

/*should be ran when user presses operator based on certain cicrumstances*/
function userPressedOperator() {
    firstNumArray[0] = displayNumber;
    secondNumArray.length = 0;
    firstNumArray.length = 1;
    globalOperator = e.target.value;    
}

gridContainer.addEventListener("click", function(e) {
    if (e.target.matches("#clear-button")) {
        clearDisplay();
    }

    if (e.target.matches(".operator") && operatorPressed == false) {
        if (firstNumArray.length == 0) {
            displayTextBox.innerHTML = Math.round((displayNumber + Number.EPSILON) * 100) / 100;
        }
        else {
            globalOperator = e.target.value;
            operatorPressed = true;
            operationCounter++
        }
    }

    else if (e.target.matches(".operator") && operationCounter == 1) {
        if (secondNumArray.length == 0) {
            globalOperator = e.target.value;
        }
        else {
            /*don't let user divide by 0*/
            if (secondNumArray.join("") == 0 && globalOperator == "/") {
                displayTextBox.innerHTML = "You know better.";
                userPressedOperator();
            }
            else {
                displayNumber = operate(parseFloat(firstNumArray.join("")), parseFloat(secondNumArray.join("")), globalOperator);
                displayTextBox.innerHTML = Math.round((displayNumber + Number.EPSILON) * 100) / 100;
                userPressedOperator();
            }
        }
        
    }
    
    if (e.target.matches(".number") && operatorPressed == true) {
        /*only allow one period per input*/
        if (e.target.value == "." && secondNumArray.includes(".")) {
        }
        else {
            addToSecondArray(e.target.value);
        }
        
    }

    else if(e.target.matches(".number") && operatorPressed == false) {
        if (equalsPressed) {
            firstNumArray.length = 0;
            equalsPressed = false;
        }
        if (e.target.value == "." && firstNumArray.includes(".")) {
        }
        else {
            addToFirstArray(e.target.value);
        }
    }

    if (e.target.matches("#equals-button")) {
        if (firstNumArray.length == 0) {
            innerHTML = Math.round((displayNumber + Number.EPSILON) * 100) / 100;
        }
        else if (firstNumArray.length > 0 && secondNumArray.length == 0) {
            displayNumber = firstNumArray.join("");
            firstNumArray[0] = displayNumber;
            firstNumArray.length = 1;
            innerHTML = Math.round((displayNumber + Number.EPSILON) * 100) / 100;
        }
        else if (firstNumArray.length > 0 && secondNumArray.length > 0) {
            /*don't let user try do divide by 0*/
            if (secondNumArray.join("") == 0 && globalOperator == "/") {
                displayTextBox.innerHTML = "You know better."
                userPressedEquals()
            }
            else {
                displayNumber = operate(parseFloat(firstNumArray.join("")), parseFloat(secondNumArray.join("")), globalOperator);
                displayTextBox.innerHTML = Math.round((displayNumber + Number.EPSILON) * 100) / 100;
                userPressedEquals()
            }
        }
    }   
});
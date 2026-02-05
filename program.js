function round(value) {
    return +value.toFixed(2);
}

function add(a, b){
    return a + b;
}


function subtract(a, b){
    return a - b;
}


function multiply(a, b){
    return a * b;
}


function divide(a, b){
    if (b === 0){
        return "ERROR"
    }
    return round(a / b);
}


function operate(operator, numOne, numTwo){
    switch(operator){
        case "add": return add(numOne, numTwo);
        case "subtract": return subtract(numOne, numTwo);
        case "multiply": return multiply(numOne, numTwo);
        case "divide": return divide(numOne, numTwo);
    }
}


// Variables
let numOne = 0;
let numTwo = 0;
let operator = "";
let canClear = false;
let secondTyped = false;

// Reference to inputBox and history
const inputBox = document.getElementById("inputBox");
const history = document.getElementById("history");

// Focus on input box
inputBox.focus();

// Event handlers
const bottom = document.querySelector(".bottom");
bottom.addEventListener('click', (e) => {
    // Handle number input
    if (e.target.className.includes("number")) {
        if (canClear) {
            inputBox.value = "";
            canClear = false;
            secondTyped = true;
        }

        if (inputBox.value === "0"){
            if (e.target.textContent !== "0"){
                inputBox.value = e.target.textContent;
            }
        }
        else{
            inputBox.value += e.target.textContent;
        }
        
    }

    // Handle decimal input
    outer:if (e.target.id === "decimal") {
        if (inputBox.value.includes(".")) {
            break outer;
        }
        inputBox.value += ".";
    }

    // Handle operators
    outer:if (e.target.className.includes("operator")) {
        if (secondTyped){
            secondTyped = false;
            e.target.id = "equal";
            break outer;
        }

        if (operator !== "") {
            operator = e.target.id;
        }
        else {
            numOne = parseFloat(inputBox.value);
            operator = e.target.id;
        }

        history.textContent = numOne;
        switch(operator){
            case "add": {
                history.textContent += ` + `;
                break;
            }

            case "subtract": {
                history.textContent += ` - `;
                break;
            }

            case "multiply": {
                history.textContent += ` x `;
                break;
            }

            case "divide": {
                history.textContent += ` \u00F7 `;
                break;
            }
        }

        // Update control variable
        canClear = true;
    }

    // Handle equal operator
    outer:if (e.target.id === "equal") {
        if (operator === "") {
            history.textContent = `${inputBox.value} =`;
            break outer;
        }
        numTwo = parseFloat(inputBox.value);
        let result = operate(operator, numOne, numTwo);

        if (result === "ERROR") {
            // Update displays
            history.textContent = "ERROR: division by 0";
            inputBox.value = "Invalid";

            // Reset operator and control flag
            operator = "";
            secondTyped = false;

            break outer;
        }

        // Update displays
        history.textContent += `${numTwo} =`;
        inputBox.value = result;

        // Reset operator and control flag
        operator = "";
        secondTyped = false;
        
    }
    
    // Handle backspace
    outer:if (e.target.id === "backspace") {
        if (inputBox.value === "0" ){
            break outer;
        }

        // Backspace logic
        inputBox.value = inputBox.value.slice(0, -1);

        if (inputBox.value === "") {
            inputBox.value = 0;
        }
    }

    // Handle clear
    if (e.target.id === "clear") {
        numOne = 0;
        numTwo = 0;
        operator = "";
        history.textContent = "";
        inputBox.value = 0;
    }

    // Refocus on inputBox
    inputBox.focus();
})

//----------------------------------------------------------------------
// Keyboard support
inputBox.addEventListener('keydown', (e) => {
    // Check for numbers pressed
    if (Number.isInteger(+(e.key))) {
        if (canClear) {
            inputBox.value = "";
            canClear = false;
            secondTyped = true;
        }

        if (inputBox.value === "0"){
            if (e.key !== "0"){
                inputBox.value = e.key;
            }
        }
        else{
            inputBox.value += e.key;
        }
    }

    // Handle decimal input
    outer:if (e.key === ".") {
        if (inputBox.value.includes(".")) {
            break outer;
        }
        inputBox.value += ".";
    }

    // Handle backspace
    outer:if (e.key === "Backspace") {
        if (inputBox.value === "0" ){
            break outer;
        }

        // Backspace logic
        inputBox.value = inputBox.value.slice(0, -1);

        if (inputBox.value === "") {
            inputBox.value = 0;
        }
    }

    // Handle operators
    outer:if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        if (secondTyped){
            secondTyped = false;
            e.key = "Enter";
            break outer;
        }

        if (operator !== ""){
            
        }
        else {
            numOne = parseFloat(inputBox.value);
        }

        switch(e.key){
            case "+":{
                operator = "add";
                break;
            }

            case "-":{
                operator = "subtract";
                break;
            } 

            case "*":{
                operator = "multiply";
                break;
            }

            case "/": {
                operator = "divide";
                break;
            }
        }
        
        history.textContent = numOne;
        switch(operator){
            case "add": {
                history.textContent += ` + `;
                break;
            }

            case "subtract": {
                history.textContent += ` - `;
                break;
            }

            case "multiply": {
                history.textContent += ` x `;
                break;
            }

            case "divide": {
                history.textContent += ` \u00F7 `;
                break;
            }
        }

        // Update control variable
        canClear = true;
    }

    // Handle equal operator
    outer:if (e.key === "Enter" || e.key === "=") {
        if (operator === "") {
            history.textContent = `${inputBox.value} =`;
            break outer;
        }
        numTwo = parseFloat(inputBox.value);
        let result = operate(operator, numOne, numTwo);

        if (result === "ERROR") {
            // Update displays
            history.textContent = "ERROR: division by 0";
            inputBox.value = "Invalid";

            // Reset operator and control flag
            operator = "";
            secondTyped = false;

            break outer;
        }

        // Update displays
        history.textContent += `${numTwo} =`;
        inputBox.value = result;

        // Reset operator and control flag
        operator = "";
        secondTyped = false;
        
    }

     // Handle clear
    if (e.key === "Escape") {
        numOne = 0;
        numTwo = 0;
        operator = "";
        history.textContent = "";
        inputBox.value = 0;
    }

    // Refocus on inputBox
    inputBox.focus();
})

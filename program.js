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
    return a / b;
}


function operate(operator, numOne, numTwo){
    switch(operator){
        case "+": return add(numOne, numTwo);
        case "-": return subtract(numOne, numTwo);
        case "*": return multiply(numOne, numTwo);
        case "/": return divide(numOne, numTwo);
    }
}

// Variables
let numOne = 0;
let numTwo = 0;
let operator = '';

const bottom = document.querySelector(".bottom");
bottom.addEventListener('click', (e) => {
    // Handle number input
    if (e.target.className.includes("number")) {
        const inputBox = document.getElementById("inputBox");

        if (inputBox.value === "0"){
            if (e.target.textContent !== "0"){
                inputBox.value = e.target.textContent;
            }
        }
        else{
            inputBox.value += e.target.textContent;
        }
        
    }

    // Handle operators
    switch(e.target.id){
        case "add": {
            break;
        }

        case "subtract": {
            break;
        }

        case "multiply": {
            break;
        }

        case "divide": {
            break;
        }
    }
    
})
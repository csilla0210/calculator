const screen = document.querySelector(".screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".all-clear");

let lastValue = "";
let currentValue = "";
let currentOperator = "";


numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if(currentValue === "") {
            currentValue = number.textContent;
        } else {
            currentValue = currentValue.concat(number.textContent);
        }
        setScreenText(currentValue);
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (lastValue !== "" && currentValue !== "") {
            currentValue = operate(lastValue, currentValue, currentOperator);
            setScreenText(currentValue);
        }  
        currentOperator = operator.textContent;
        if (currentValue !== "") {
            lastValue = currentValue;
        }
        currentValue = "";
    } 
    )
})


allClear.addEventListener("click", () => {
    resetCalculator();
})

function setScreenText(text) {
    screen.textContent = text;
}

function resetCalculator() {
    lastValue = "";
    currentOperator = "";
    currentValue = "";
    setScreenText(lastValue);
}

function operate(lastValue, currentValue, operator) {
    lastValue = Number(lastValue);
    currentValue = Number(currentValue);
    switch(operator) {
        case "+": return add(lastValue, currentValue);
        case "-": return subtract(lastValue, currentValue);
        case "*": return multiply(lastValue, currentValue);
        case "/": return divide(lastValue, currentValue);
        case "=": return currentValue;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return NaN;
    }
    return a / b;
}

function percent(number) {
    return number / 100;
}




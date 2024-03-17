const screen = document.querySelector(".screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".all-clear");
const decimal = document.querySelector(".decimal");

let lastValue = "";
let currentValue = "";
let currentOperator = "";

document.addEventListener("keydown", (event) => {
    if("0123456789".includes(event.key)) {
        setCurrentValue(event.key);
        setScreenText(currentValue);
    } else if ("+-*/=".includes(event.key)) {
        setOperator(event.key);
    } else if (event.key === "Enter") {
        setOperator("=");
    }
})

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        setCurrentValue(number.textContent);
        setScreenText(currentValue);
    })
})

function setCurrentValue(number) {
    if(currentValue === "") {
        currentValue = number;
    } else {
        currentValue = currentValue.concat(number);
    }
}

decimal.addEventListener("click", () => {
    if(!currentValue.includes(".")) {
        currentValue = currentValue.concat(".");
        setScreenText(currentValue);
    }
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        setOperator(operator.textContent);
    } 
    )
})

function setOperator(operator) {
    if (lastValue !== "" && currentValue !== "") {
        currentValue = operate(lastValue, currentValue, currentOperator);
        setScreenText(currentValue);
    }  
    currentOperator = operator;
    if (currentValue !== "") {
        lastValue = currentValue;
    }
    currentValue = "";
}

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
    let result;
    switch(operator) {
        case "+": result =  add(lastValue, currentValue);
        break;
        case "-": result = subtract(lastValue, currentValue);
        break;
        case "*": result = multiply(lastValue, currentValue);
        break;
        case "/": result = divide(lastValue, currentValue);
        break;
        case "=": result = currentValue;
        break;
    }
    result = Number(roundedNumber(result));
    return result;
}

function roundedNumber(number) {
    let maxDigit = 14;
    let numAsString = number.toString();
    if (numAsString.length >= maxDigit + 1) {
        let firstPart = numAsString.substring(0, maxDigit - 1);
        let secondPart = numAsString.substring(maxDigit - 1);
        if (!secondPart.includes(".")) {
            secondPart = Math.round(Number(secondPart) / 10**(secondPart.length - 1));
            return firstPart + secondPart;
        } else {
            let indexOFDecimal = secondPart.indexOf(".");
            if (indexOFDecimal === 0) {
                if (Math.round(Number(secondPart)) === 0) {
                    return firstPart;
                } else {
                    return Number(firstPart) + 1;
                }
            } else {
                secondPart = Math.round(Number(secondPart) / 10**(indexOFDecimal - 1));
                return firstPart + secondPart;
            }
        }
        
    }
   return number; 
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



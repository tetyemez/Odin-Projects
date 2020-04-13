const displayScreen = document.querySelector(".calc-numbers");
const calculatorButtons = document.querySelector(".calculator-buttons");
var displayValue;
var operators = [];
var numbers = new Array();

calculatorButtons.addEventListener("click", function (event) {
    populateDisplay(event.target.id);
});

function populateDisplay(id) {

    switch (id) {
        case "operator-add":
            displayScreen.value += document.getElementById(id).textContent;
            operators += document.getElementById(id).textContent;
            break;
        case "operator-subtract":
            displayScreen.value += document.getElementById(id).textContent;
            operators += document.getElementById(id).textContent;
            break;
        case "operator-multiply":
            displayScreen.value += document.getElementById(id).textContent;
            operators += document.getElementById(id).textContent;
            break;
        case "operator-divide":
            displayScreen.value += document.getElementById(id).value;
            operators += document.getElementById(id).value;
            break;
        case "operator-result": displayScreen.value = calculateResult(displayScreen.value, operators); break;
        case "operator-delete": displayScreen.value = ""; operators = ""; break;
        case "operator-deleteSingle":
            var isOperator = displayScreen.value.substr(displayScreen.value.length - 1, displayScreen.value);
            if (isOperator == "+" || isOperator == "-" || isOperator == "*" || isOperator == "/") {
                displayScreen.value = displayScreen.value.substr(0, displayScreen.value.length - 1);
            }
            else {
                displayScreen.value = displayScreen.value.substr(0, displayScreen.value.length - 1);
                operators = operators.substr(0, operators.length);
            }
            break;
        case "dot": (displayScreen.value.includes(".")) ? displayScreen.value : displayScreen.value += document.getElementById(id).textContent; break;
        default:
            displayScreen.value += document.getElementById(id).textContent;
            break;
    }
}

function calculateResult(displayScreen, ops) {
    if (displayScreen != "") {
        var nums = getNumbers(displayScreen);
        var operators = ops;
        // ! Odin projectteki diğer test adımlarını yap. 
        for (let index = 0; index < ops.length; index++) {
            if (operators.indexOf("*") != -1) {
                nums.splice(operators.indexOf("*"), 2, multiply(nums[operators.indexOf("*")], nums[operators.indexOf("*") + 1]));
                operators = operators.replace("*", "");     //! işlemi bitmiş olan elemanları diziden çıkart ve hesaplanan değeri ekle.
            }
            else if (operators.indexOf("/") != -1) {
                nums.splice(operators.indexOf("/"), 2, divide(nums[operators.indexOf("/")], nums[operators.indexOf("/") + 1]));
                operators = operators.replace("/", "");
            }
            else if (operators.indexOf("+") != -1) {
                nums.splice(operators.indexOf("+"), 2, add(nums[operators.indexOf("+")], nums[operators.indexOf("+") + 1]));
                operators = operators.replace("+", "");
            }
            else if (operators.indexOf("-") != -1) {
                nums.splice(operators.indexOf("-"), 2, subtract(nums[operators.indexOf("-")], nums[operators.indexOf("-") + 1]));
                operators = operators.replace("-", "");
            }
        }
        console.log(nums);
        return nums;
    }
    else {
        console.log(displayScreen);
        return displayScreen;
    }

}

function getNumbers(str) {
    var number = "";
    var array = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i] == "+" || str[i] == "-" || str[i] == "*" || str[i] == "/") {
            array.push(number);
            number = "";
        } else {
            number += str[i];
        }
    }
    array.push(number);
    return array;
}

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide(a, b) {
    return parseInt(a) / parseInt(b);
}

function operate(a, b, operand) {
    return (operand == "+") ? add(a, b) :
        (operand == "-") ? subtract(a, b) :
            (operand == "*") ? multiply(a, b) :
                divide(a, b);
}

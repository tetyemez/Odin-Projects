//! start/restart butonları ekle.
//! kazananın adını ekranda gösteren bir alert ekle. sweetalert olabilir veya farklı bir display element ekle.

//! AI yapılacak. Kolay,Normal,Zor şeklinde. Sonradan da eklenebilir.

//Create gameBoard and displayController in module.
var firstModule = (function () {
    "use strict";

    const gameBoard = document.querySelector(".game-board");
    let _isClicked = false;
    let clickCounter = 0;

    gameBoard.addEventListener("click", (e) => {
        if (_isClicked && e.target.textContent === "") {
            e.target.textContent = player2.marker;
            clickCounter++;
            _isClicked = false;
            gameOver(e.target.parentNode);
        }
        else if (!_isClicked && e.target.textContent === "") {
            e.target.textContent = player1.marker;
            clickCounter++;
            _isClicked = true;
            gameOver(e.target.parentNode);
        }
        else if (clickCounter == 8) {
            alert("TIE");
        }
    });

    function renderGameBoard() {
        return gameBoard;
    };

    return {
        renderGameBoard,
    };
})();

function gameOver(gameBoardParam) {
    console.log(checkDiagonal(gameBoardParam.childNodes));
    if (checkHorizontal(gameBoardParam.childNodes) === player1.marker || checkVertical(gameBoardParam.childNodes) === player1.marker || checkDiagonal(gameBoardParam.childNodes) === player1.marker) {
        alert(player1.name + " wins")
    }
    else if (checkHorizontal(gameBoardParam.childNodes) === player2.marker || checkVertical(gameBoardParam.childNodes) === player2.marker || checkDiagonal(gameBoardParam.childNodes) === player2.marker) {
        alert(player2.name + " wins")
    }
}

function checkHorizontal(elements) {
    return (elements[1].textContent === elements[3].textContent && elements[1].textContent === elements[5].textContent && elements[3].textContent === elements[5].textContent) ?
        elements[1].textContent : (elements[7].textContent === elements[9].textContent && elements[7].textContent === elements[11].textContent && elements[9].textContent === elements[11].textContent) ?
            elements[7].textContent : (elements[13].textContent === elements[15].textContent && elements[13].textContent === elements[17].textContent && elements[15].textContent === elements[17].textContent) ?
                elements[13].textContent : "";
}

function checkVertical(elements) {
    return (elements[1].textContent === elements[7].textContent && elements[1].textContent === elements[13].textContent && elements[7].textContent === elements[13].textContent) ?
        elements[1].textContent : (elements[3].textContent === elements[9].textContent && elements[3].textContent === elements[15].textContent && elements[9].textContent === elements[15].textContent) ?
            elements[3].textContent : (elements[5].textContent === elements[11].textContent && elements[5].textContent === elements[17].textContent && elements[11].textContent === elements[17].textContent) ?
                elements[5].textContent : "";
}

function checkDiagonal(elements) {
    return (elements[1].textContent === elements[9].textContent && elements[1].textContent === elements[17].textContent) ?
        elements[1].textContent : (elements[5].textContent === elements[9].textContent && elements[5].textContent === elements[13].textContent) ?
            elements[5].textContent : "";
}

//Create players with factories.
const Player = (name, marker) => {
    return { name, marker };
};

//const player1 = Player(window.prompt("What's the name of player1?"), "X");
//const player2 = Player(window.prompt("What's the name of player1?"), "O");
const player1 = Player("yusuf", "X");
const player2 = Player("tugrul", "O");
document.getElementById("player-one").textContent = player1.name;
document.getElementById("player-two").textContent = player2.name;
const restartGame = document.getElementById("restart-btn");
restartGame.addEventListener("click", () => { window.location.reload(true); })

//TODO ADDITIONAL: make AI to play against computer.


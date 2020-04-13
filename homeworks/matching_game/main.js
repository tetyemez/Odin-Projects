"use strict";

const entrance = document.getElementById("entrance");
const view1 = document.getElementById("view-1");
const gameDiv = document.createElement("div");
gameDiv.setAttribute("id", "view-2");
const square = document.createElement("div");
square.classList.add("square");
const btnHint = document.createElement("button");
btnHint.textContent = "İpucu";
btnHint.classList.add("btn-hint");
const gridInput = document.getElementById("grid-number");
const btnGrid = document.getElementById("open-grid");
btnGrid.disabled = true;
let hasFlippedCard = false;
let firstCard, secondCard;
let isBlocksColored = false;
var moves = 0;
var second = 0,
  minute = 0;
var interval;

function startTimer() {
  interval = setInterval(function () {
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

function randomColorGenerator(ammount) {
  let colors = [];
  var letters = "0123456789ABCDEF";
  for (let y = 0; y < ammount; y++) {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  return colors;
}

function setButton(opacity, isClickable) {
  btnGrid.style.opacity = opacity;
  btnGrid.disabled = isClickable;
}

function getOrder(blockLength) {
  return Math.floor(Math.random() * blockLength);
}

function flipCard(elem) {
  moves++;
  if (moves === 1) {
    second = 0;
    minute = 0;
    startTimer();
  }
  if (elem.target.id === "") {
    elem.target.id = "flip";
    elem.target.style.backgroundColor = elem.target.dataset.color;
  } else {
    return;
  }

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = elem;
    return;
  }

  secondCard = elem;
  hasFlippedCard = false;
  return checkMatching();
}

function checkMatching() {
  let firstColor = firstCard.target.style.backgroundColor;
  let secondColor = secondCard.target.style.backgroundColor;
  if (firstColor === secondColor) {
    disableCards();
    return isGameFinish();
  }

  unflipCards();
}

function disableCards() {
  firstCard.target.removeEventListener("click", flipCard, true);
  secondCard.target.removeEventListener("click", flipCard, true);
}

function unflipCards() {
  document.getElementById("view-2").style.pointerEvents = "none";
  setTimeout(() => {
    firstCard.target.style.backgroundColor = "white";
    secondCard.target.style.backgroundColor = "white";
    firstCard.target.removeAttribute("id");
    secondCard.target.removeAttribute("id");
    document.getElementById("view-2").style.pointerEvents = "";
  }, 750);
}

function isGameFinish() {
  let blocks = document.querySelectorAll(".square");
  blocks = Array.from(blocks);
  return blocks.every(isFinish);
}
function isFinish(block) {
  return block.id === "flip";
}

function result() {
  setTimeout(() => {
    if (
      confirm(
        `Tebrikler! ${minute} dk ${second} sn sürede ve ${moves} hamlede oyunu bitirdiniz! :)`
      )
    ) {
      location.reload();
    }
  }, 750);
}

gridInput.addEventListener("keyup", e => {
  e.target.value.length > 1 && e.target.value > 3
    ? (e.target.value = e.target.value.slice(0, 1))
    : e.target.value.length == 1 && e.target.value > 3
      ? setButton(1, false)
      : setButton(0.5, true);
});

btnGrid.addEventListener("click", e => {
  if (gridInput.value % 2 != 0) {
    alert("Tüm kartların eşleşebilmesi için lütfen çift sayı giriniz.");
    return;
  }
  let blocks = gridInput.value;
  gameDiv.style.gridTemplateColumns = " repeat(" + blocks + ",1fr )";
  let colors = randomColorGenerator(blocks ** 2 / 2);

  var j = 0;
  for (let i = 0; i < blocks ** 2; i++) {
    if (i != 0 && i % 2 == 0) {
      j++;
    }
    square.setAttribute("data-color", colors[j]);
    square.style.order = getOrder(blocks ** 2);
    gameDiv.appendChild(square.cloneNode(true));
  }
  view1.parentNode.removeChild(view1);
  document.body.removeChild(entrance);
  document.body.appendChild(btnHint);
  document.body.appendChild(gameDiv);

  clearInterval(interval);
});

gameDiv.addEventListener("click", e => {
  if (!isBlocksColored) {
    if (flipCard(e)) {
      result();
      clearInterval(interval);
    }
  }
});

btnHint.addEventListener("click", () => {
  let blocks = document.querySelectorAll(".square");
  if (!isBlocksColored) {
    blocks = Array.from(blocks);
    blocks.map(block => {
      block.style.backgroundColor = block.dataset.color;
    });
    isBlocksColored = true;
  } else {
    blocks = Array.from(blocks);
    blocks.map(block => {
      if (block.id !== "flip") block.style.backgroundColor = "white";
    });
    isBlocksColored = false;
  }
});

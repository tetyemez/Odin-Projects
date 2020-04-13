const container = document.querySelector(".container");
const btnDiv = document.querySelector(".btnDiv");
const item = document.createElement("div");
item.classList.add('item');
const btn = document.createElement('button');
btn.textContent = "Reset";
btn.classList.add("resetBtn");
btnDiv.appendChild(btn);

let gridNumber = prompt("How many squares per side to make the new grid?");

container.style.gridTemplateColumns = ' repeat(' + gridNumber + ',1fr )';
// container.style.gridTemplateRows = 'repeat(' + gridNumber + ',1fr )';

for (let i = 0; i < gridNumber ** 2; i++) {
    container.appendChild(item.cloneNode(true));
}

/*EVENTS*/
function randomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

container.addEventListener("mouseover", function (e) {
    e.target.style.backgroundColor = randomColor();
});

btn.addEventListener('click', resetGrids);

function resetGrids() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    gridNumber = prompt("How many squares per side to make the new grid?");
    container.style.gridTemplateColumns = 'repeat(' + gridNumber + ',1fr)';
    for (let i = 0; i < gridNumber * gridNumber; i++) {
        container.appendChild(item.cloneNode(true));
    }
    var grids = document.querySelectorAll(".item");
    for (let i = 0; i < grids.length; i++) {
        grids[i].style.backgroundColor = "#fce8e8";
    }

}



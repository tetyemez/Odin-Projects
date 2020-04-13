"use strict";

var container = $("#container").clone();
var position = 0;
var timer;

function handleDragStart(e) {
  e.dataTransfer.setData("text", this.id);
}

function handleOverDrop(e) {
  e.preventDefault();

  if (e.type != "drop") {
    return;
  }
  var draggedId = e.dataTransfer.getData("text");
  var draggedEl = document.getElementById(draggedId);
  if (draggedEl !== null) {
    if (draggedEl.parentNode == this) {
      return;
    }
    draggedEl.parentNode.removeChild(draggedEl);
    this.appendChild(draggedEl);
    draggedEl.style.top = "10px";
    draggedEl.style.left = "20px";
    moveCircle(draggedId, draggedEl);
  }

}

function init() {
  var draggable = document.querySelectorAll("[draggable]");
  var targets = document.querySelectorAll("[data-drop-target]");
  for (var i = 0; i < draggable.length; i++) {
    draggable[i].addEventListener("dragstart", handleDragStart);
  }

  for (var i = 0; i < targets.length; i++) {
    if (targets[i].id === "container") {
      targets[i].addEventListener("dragover", e => {
        e.preventDefault();
      });
    } else {
      targets[i].addEventListener("dragover", handleOverDrop);
      targets[i].addEventListener("drop", handleOverDrop);
    }
  }
  speedEvents();
}

function snapPot(posLeft) {
  if (posLeft > -1 && posLeft < 67) {
    pot.style.left = 5 + "px";
  } else if (posLeft > 67 && posLeft < 180) {
    pot.style.left = 120 + "px";
  } else if (posLeft > 180 && posLeft < 256) {
    pot.style.left = 233 + "px";
  }
}

function setSpeed(txt) {
  if (txt == 2) {
    pot.style.left = 120 + "px";
  } else if (txt == 3) {
    pot.style.left = 233 + "px";
  }
}

function moveCircle(elemId, elem) {
  const dash = document.getElementById("dashline").getBoundingClientRect();
  var container = document.getElementById("container").getBoundingClientRect();
  var circle = elem.getBoundingClientRect();
  var diff = dash.width / 2 + circle.width / 2;
  setSpeed(elemId.slice(elemId.length - 1));

  timer = setInterval(action, 30 / elemId.slice(elemId.length - 1));

  function action() {
    let draggable = document.querySelectorAll("[draggable]");
    for (var i = 0; i < draggable.length; i++) {
      draggable[i].removeEventListener("dragstart", handleDragStart);
    }
    let pot = document.getElementById("pot").style.left;
    let potPos = pot.slice(0, pot.length - 2);
    var edge = container.width - diff;

    if (potPos > -1 && potPos < 21) {
      clearInterval(timer);
      timer = setInterval(action, 15);
      elem.innerHTML = "<span>1</span>";
    } else if (potPos > 117 && potPos < 137) {
      clearInterval(timer);
      timer = setInterval(action, 10);
      elem.innerHTML = "<span>2</span>";
    } else if (potPos > 229 && potPos < 256) {
      clearInterval(timer);
      timer = setInterval(action, 5);
      elem.innerHTML = "<span>3</span>";
    }

    if (position === Math.round(edge)) {
      clearInterval(timer);
      position = 0;
      refillPage();
    } else {
      position++;
      elem.style.left = position + "px";
    }
  }
}

function refillPage() {
  $("#container").remove();
  $("body").prepend(container);
  container = $("#container").clone();
  clearInterval(timer);
  position = 0;
  init();
}

function speedEvents() {
  $("#pot").draggable({
    containment: "#slider",
    axis: "x"
  });

  $("#slider").droppable({
    drop: function () {
      let pt = $("#pot").position();
      snapPot(pt.left);
    }
  });
}

$(function () {
  $("#reset-btn").click(refillPage);
});

init();

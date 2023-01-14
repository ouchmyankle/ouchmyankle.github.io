function init() {
  let buttonBlocked = false;
  const numberOfBoxes = 99;
  const boxes = [];
  const winnerBox = document.querySelector("h4");

  //Function to create the boxes
  function createBox(index) {
    const box = document.createElement("div");
    box.innerText = index;
    document.querySelector(".grid").appendChild(box);
    boxes.push(box);
  }

  let astronautPosition = 0;
  let alienPosition = 0;

  for (let i = 1; i < 100; i++) {
    createBox(i);
  }

  var button = document.getElementById("button");
  button.addEventListener("click", astronautTurn);

  // Function to move the player's piece on the board
  function moveAstronaut(roll) {
    boxes[astronautPosition].classList.remove("astronaut");
    if (astronautPosition + roll > 98) {
      astronautPosition = 98;
    } else {
      astronautPosition += roll;
    }
    console.log("You moved to position " + astronautPosition);
    boxes[astronautPosition].classList.add("astronaut");
  }

  // Function to move the computer's piece on the board
  function moveAlien(roll) {
    boxes[alienPosition].classList.remove("alien");
    if (alienPosition + roll > 98) {
      alienPosition = 98;
    } else {
      alienPosition += roll;
    }
    console.log("Computer moved to position " + alienPosition);
    boxes[alienPosition].classList.add("alien");
  }

  // Function for the player's turn
  function astronautTurn() {
    if (buttonBlocked) {
      return;
    }
    let roll = dice.roll();
    document.querySelector(
      ".dice-display"
    ).innerText = `player rolled a ${roll}`;
    moveAstronaut(roll);
    checkForWin();
    if (astronautPosition < 98) {
      buttonBlocked = true;
      setTimeout(() => {
        alienTurn();
        buttonBlocked = false;
      }, 2000);
    }
  }

  // Function for the computer's turn
  function alienTurn() {
    let roll = dice.roll();
    document.querySelector(
      ".dice-display"
    ).innerText = `computer rolled a ${roll}`;
    moveAlien(roll);
    checkForWin();
    if (alienPosition < 98) {
      document.getElementById("button").disabled = false;
    }
  }

  var dice = {
    sides: 6,
    roll: function () {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    },
  };

  // How to resart or declare winner

  function checkForWin() {
    if (astronautPosition === 98) {
      winnerBox.innerText = "Congratulations, you win!";
      clearTimeout(alienTurn);
      document.getElementById("button").disabled = true;
    } else if (alienPosition === 98) {
      winnerBox.innerText = "You lose, computer wins!";
      clearTimeout(alienTurn);
    }
  }
}
window.addEventListener("DOMContentLoaded", init);

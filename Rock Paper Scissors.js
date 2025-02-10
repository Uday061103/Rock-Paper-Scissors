let score = JSON.parse(localStorage.getItem("score"));

if (!score) {
  score = {
    wins: 0,
    loses: 0,
    ties: 0,
  };
}

updateScoreElem();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = PickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-btn').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock')
  }else if (event.key === 'p'){
    playGame('paper');
  }else if (event.key === 's'){
    playGame('scissors');
  }
});


function playGame(playerMove) {
  const computerMove = PickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "you loss.";
    } else if (computerMove === "paper") {
      result = "you win.";
    } else if (computerMove === "scissors") {
      result = "tie.";
    }
  }
  if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "you win.";
    } else if (computerMove === "paper") {
      result = "tie.";
    } else if (computerMove === "scissors") {
      result = "you loss.";
    }
  }
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "you loss.";
    } else if (computerMove === "scissors") {
      result = "you win";
    }
  }
  if (result === "you win.") {
    score.wins += 1;
  } else if (result === "you loss.") {
    score.loses += 1;
  } else if (result === "tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElem();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You
            <img src="images/${playerMove}-emoji.png" class="move-icon">
            <img src="images/${computerMove}-emoji.png" class="move-icon">
            Computer`;
}

function updateScoreElem() {
  document.querySelector(
    ".js-score"
  ).innerHTML = ` Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function PickComputerMove() {
  const randonNum = Math.random();
  let computerMove = "";

  if (randonNum >= 0 && randonNum < 1 / 3) {
    computerMove = "rock";
  } else if (randonNum >= 1 / 3 && randonNum < 2 / 3) {
    computerMove = "paper";
  } else if (randonNum < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

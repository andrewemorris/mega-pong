const firstPlayMsg = "Play now";
const winPlayMsg = "You won! Play again";
const losePlayMsg = "You Lost! Play Again";

let playMsg = firstPlayMsg;

function setBallCount(ballCount) {
  if (Number.isInteger(ballCount) && ballCount > 1) {
    localStorage.setItem("ballCount", ballCount);
    console.log(`setBallCount : ${ballCount}`);
    return ballCount;
  } else {
    console.log(`setBallCount, can't set it to: ${ballCount}`);
    return NaN;
  }
}

function getBallCount() {
  let ballCount = localStorage.getItem("ballCount");
  if (!Number.isInteger(ballCount) || ballCount < 2) {
    ballCount = setBallCount(5);
  }
  return ballCount;
}

function Ball(majority) {
  this.majority = majority;
}

function Game(ballCount) {
  this.balls = [];

  for (let i = 0; i < ballCount; i++) {
    if (i % 2 === 0) {
      this.balls.push(new Ball(true));
    } else {
      this.balls.push(new Ball(false));
    }
  }
}

function startGame() {
  game = new Game(getBallCount());
  console.log("startGame");
}

function win() {
  playMsg = winPlayMsg;
  console.log(playMsg);
}

function lose() {
  playMsg = losePlayMsg;
  console.log(playMsg);
}

function clickBall(ball) {
  if (!ball.majority) {
    ball.majority = true;
    if (winner()) {
      win();
    }
  } else {
    lose();
  }
}

function winner() {
  let gameOver = true
  for (let i = 0; i < game.balls.length; i++) {
    if (game.balls[i].majority) return false;
  }
  return true
}


let game = new Game(getBallCount());
console.log(game);
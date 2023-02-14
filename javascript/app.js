const firstPlayMsg = "Play now";
const winPlayMsg = "You won! Play again";
const losePlayMsg = "You Lost! Play Again";
const minSpeed = 2;
const maxSpeed = 8;
const defaultBallCount = 4;

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
  if (!Number.isInteger(parseInt(ballCount)) || ballCount < 2) {
    ballCount = setBallCount(defaultBallCount);
  }
  return parseInt(ballCount);
}

function Ball(majority) {
  this.majority = majority;
  this.horizontalTime = randNumRange(minSpeed, maxSpeed);
  this.verticalTime = randNumRange(minSpeed, maxSpeed);
}

//renderball
function renderBalls() {
  let section = document.getElementById('playArea');
  for (i = 0; i < game.balls.length; i++) {
    console.log(`i = ${i}`);
    let ballElem = document.createElement("div");
    section.appendChild(ballElem);
    ballElem.classList.add("ball");
    if (game.balls[i].majority) {
      ballElem.classList.add("majority");
      console.log("add majority");
    }
    else {
      ballElem.classList.add("minority");
      console.log("add minority");
    }
    ballElem.addEventListener("click", (e) => {
      if (ballElem.classList.contains("minority")) {
        ballElem.classList.replace("minority", "majority");
        console.log("remaining pre = " + game.remaining)
        game.remaining--;
        console.log("remaining post = " + game.remaining)
        if (game.remaining == 0) {
          win();
        }

      } else {
        lose();
      }
      console.log("ball clicked");
    });
    /*
    give it a class of majority or minority
    every one must have event listener (ballElem)
    it will check if majority, remove min add maj or gmae over
      */
  }
}
// render function
// create a new element
// give it the class ball
// apply the animation, and set the animation times to be equal to the two properties on your contructor

function Game(ballCount) {
  this.balls = [];
  this.remaining = Math.ceil(ballCount / 2);
  console.log(`remaining = ${this.remaining}`);

  for (let i = 0; i < ballCount; i++) {
    if (i % 2 === 0) {
      this.balls.push(new Ball(true));
    } else {
      this.balls.push(new Ball(false));
    }
  }
}

function randNumRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  // game = new Game(getBallCount());
  console.log("startGame");
}

function win() {
  playMsg = winPlayMsg;
  console.log("in win");
  console.log(playMsg);
}

function lose() {
  playMsg = losePlayMsg;
  console.log("in lose");
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
renderBalls();
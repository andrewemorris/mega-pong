const firstPlayMsg = "Play now";
const winPlayMsg = "You won! Play again";
const losePlayMsg = "You Lost! Play Again";
const minSpeed = 10;
const maxSpeed = 30;
const defaultBallCount = 5;

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
  console.log("ballCount got = " + ballCount)
  if (!Number.isInteger(parseInt(ballCount)) || ballCount < 2) {
    ballCount = setBallCount(defaultBallCount);
  }
  console.log("ballCount rtn = " + ballCount)
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
  section.classList.add("gameOn");
  section.classList.remove("hideBalls");
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

    // dynamically add an inline animation style to the balls for random velocity and start position (negative delay)
    game.balls[i].horizontalTime
    let animationStyle = `animation: upAndDown ${game.balls[i].verticalTime}s, leftAndRight ${game.balls[i].horizontalTime}s; animation-delay: ${game.balls[i].horizontalTime - maxSpeed}s;`;
    ballElem.setAttribute("style", animationStyle);
  }
}
// find a way to add inline styles to your individual balls and add the animation property, with upADnDown and LeftAndRIght getting their respective timings


function Game(ballCount) {
  this.balls = [];
  this.remaining = Math.floor(ballCount / 2);
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
  return Math.random() * (max - min) + min;
}

function startGame() {
  // game = new Game(getBallCount());
  console.log("startGame");
}

function win() {
  playMsg = winPlayMsg;
  console.log("in win");
  console.log(playMsg);
  stopGame();

}

function lose() {
  playMsg = losePlayMsg;
  console.log("in lose");
  console.log(playMsg);
  stopGame();
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
  return true;
}
function stopGame() {
  let section = document.getElementById('playArea');
  section.classList.add("hideBalls");
  playAgainBtn();
}

function playAgainBtn() {
  let footer = document.querySelector('footer');
  let b = document.createElement('button');
  b.textContent = playMsg;
  footer.appendChild(b);
  b.onclick = function () {
    footer.removeChild(b);
    game = new Game(getBallCount());
    renderBalls();
  };
}

let game = new Game(getBallCount());
console.log(game);
renderBalls();
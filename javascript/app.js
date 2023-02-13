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

let game = new Game(getBallCount());
console.log(game);
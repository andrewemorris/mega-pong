function Ball(colour) {
  this.colour = colour;
}

function Game(speed, numOfBalls) {
  this.speed = speed;
  this.balls = [];

  for (let i = 0; i < numOfBalls; i++) {
    if (i % 2 === 0) {
      this.balls.push(new Ball("white"));
    } else {
      this.balls.push(new Ball("black"));
    }
  }

}

const speed = 1;
const numOfBalls = 5;

let game = new Game(speed, numOfBalls);
console.log(game);
console.log("going live");

function setBallCount(n) {
  if (Number.isInteger(n) && n > 1) {
    localStorage.setItem("ballCount", n);
  }
}

function getBallCount() {
  let ballCount = localStorage.getItem("ballCount");
  if (!Number.isInteger(n) || n < 2) {
    setBallCount(5);
  }
}

let ballCount = getBallCount();
console.log(`ballcount: ${ballCount}`);
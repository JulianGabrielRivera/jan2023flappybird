const flappy = document.getElementById("flappyImg");
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "./images/bg.png";
const bird = new Image();
bird.src = "./images/flappy.png";

const topPipe = new Image();
topPipe.src = "./images/obstacle_top.png";
const bottomPipe = new Image();
bottomPipe.src = "./images/obstacle_bottom.png";
const pipesArray = [];

let gameOn = false;
window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };
  // document.getElementById("start-button").addEventListener('click', ()=>{
  //   startGame();
  // })
};
// let random = Math.floor(Math.random() * (350 - 150 + 1)) + 150;

//  remove off onload so we can use it elsewhere
//  if we leave this inside the window.onload it will shoot automatically
function startGame() {
  // gameOn = true;
  flappy.style.display = "none";
  ctx.drawImage(bgImg, 0, 0, 500, 700);
  ctx.drawImage(bird, 500 / 2 - 25, 1000 / 2 - 25, 50, 50);

  setInterval(() => {
    let random = Math.floor(Math.random() * (550 - 50 + 1)) + 50;
    let number = -700 + random;

    console.log(random);
    console.log(number);

    pipesArray.push({
      topPipe: new Pipe(topPipe, 0, 0, 100, random),
      bottomPipe: new Pipe(bottomPipe, 0, 700, 100, number + 150 - 10),
    });
    console.log(pipesArray);
  }, 2000);
  animation();
}
function animation() {
  animationId = setInterval(() => {
    update();
  }, 100);
}
function update() {
  ctx.clearRect(0, 0, 500, 700);

  ctx.drawImage(bgImg, 0, 0, 500, 700);
  ctx.drawImage(bird, 500 / 2 - 25, 1000 / 2 - 25, 50, 50);

  for (let i = 0; i < pipesArray.length; i++) {
    pipesArray[i].topPipe.newPos();
    pipesArray[i].bottomPipe.newPos();
    pipesArray[i].topPipe.draw();
    pipesArray[i].bottomPipe.draw();
  }
}

// create player

const flappyBird = {
  w: 0,
  y: 0,
  speedX: 0,
  speedY: 0,
  gravity: false,
  gravitySpeed: 0,

  update() {
    gravity = false;
  },
  newPos() {
    gravity = true;
  },
};

// class Pipe {
//   constructor(pipeImg) {
//     this.x =
//     (this.sharedX = 1200),
//       (this.spaceBetween = 300),
//       (topPipe = {
//         x: this.sharedX,
//         y: 0,
//       }),
//       (bottomPipe = {
//         x: this.sharedX,
//         y: Math.random() * 700,
//       });
//   }
// }
class Pipe {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  newPos() {
    this.x = this.x + 15;
  }
}

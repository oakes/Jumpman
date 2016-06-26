var canvas = document.querySelector("canvas"); // get canvas from HTML
var game = canvas.getContext("2d"); // get game object from canvas

var playerRight = new Image(10, 20); // create image object with size
playerRight.src = "mario.png"; // set source of image
var playerLeft = new Image(10, 20);
playerLeft.src = "mario2.png";
var playerImage = playerRight; // either playerRight or playerLeft

var jumpSound = new Audio(); // create audio object
jumpSound.src = "jump.wav";

var enemyImage = new Image(50, 50); // create enemy image object
enemyImage.src = "bullet_bill.png";

var x = 0; // the horizontal position
var xspeed = 0; // the horizontal speed
var ground = canvas.height - playerImage.height; // the lowest the player can go
var y = ground; // the vertical position
var yspeed = 0; // the vertical speed
var gravity = 1; // how fast the player falls
var enemyx = canvas.width;
var enemyy = canvas.height - enemyImage.height;
var score = 0;

// draw a single frame
function draw() {
  game.fillStyle = "lightblue";
  game.fillRect(0, 0, canvas.width, canvas.height);
  game.drawImage(playerImage, x, y, playerImage.width, playerImage.height);
  game.drawImage(enemyImage, enemyx, enemyy, enemyImage.width, enemyImage.height);
  game.font = "20px Arial";
  game.fillStyle = "black";
  game.fillText("Score: " + score, 20, 20);

  x = x + xspeed;
  y = y + yspeed;
  yspeed = yspeed + gravity;
  if (y > ground) {
    y = ground;
    yspeed = 0;
  }

  enemyx = enemyx - 5;
  if (enemyx < 0) {
    enemyx = canvas.width;
    score = score + 1;
  }

  if (x < enemyx + enemyImage.width &&
      x + playerImage.width > enemyx &&
      y < enemyy + enemyImage.height &&
      y + playerImage.height > enemyy)
  {
    alert("Game over!");
    x = 0;
    xspeed = 0;
    yspeed = 0;
    enemyx = canvas.width;
    score = 0;
  }
}

setInterval(draw, 20); // run draw function every 20 ms

// move player when pressing key down
function startMove(event) {
  // pressed left
  if (event.keyCode == 37) {
    xspeed = -5;
    playerImage = playerLeft;
  }
  // pressed right
  if (event.keyCode == 39) {
    xspeed = 5;
    playerImage = playerRight;
  }
  // pressed up
  if (event.keyCode == 38) {
    yspeed = -15;
    jumpSound.play();
  }
}

document.onkeydown = startMove;

// stop moving player when releasing key
function stopMove(event) {
  if (event.keyCode == 37) {
    xspeed = 0;
  }
  if (event.keyCode == 39) {
    xspeed = 0;
  }
}

document.onkeyup = stopMove;

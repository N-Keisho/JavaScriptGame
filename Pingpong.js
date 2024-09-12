const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start");
const speedBar = document.getElementById("speed");

const baseColor = "#ffffff";

let ballX = canvas.width / 2;
let ballY = 0;
const ballRadius = 5;
let ballSpeed = 5;
let dx = ballSpeed;
let dy = -ballSpeed;

let rightScore = 0;
let leftScore = 0;

const paddleHeight = 60;
const paddleWidth = 10;
const paddleOffsetX = 10;
let rightPaddleY = (canvas.height - paddleWidth) / 2;
let leftPaddleY = (canvas.height - paddleWidth) / 2;

let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

const boderHeight = 5;

let isGameOver = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
startButton.addEventListener("click", () => {
    document.location.reload();
});
speedBar.addEventListener("input", (e) => {
  ballSpeed = e.target.value;
});

function keyDownHandler(e) {
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  } else if (e.key == "w") {
    wPressed = true;
  } else if (e.key == "s") {
    sPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  } else if (e.key == "w") {
    wPressed = false;
  } else if (e.key == "s") {
    sPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = baseColor;
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "25px Arial";
  ctx.fillStyle = baseColor;
  ctx.fillText(leftScore, 65, 30);
  ctx.fillText(rightScore, canvas.width - 65, 30);
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    canvas.width - paddleWidth - paddleOffsetX,
    rightPaddleY,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = baseColor;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(paddleOffsetX, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = baseColor;
  ctx.fill();
  ctx.closePath();
}
function drawBorder() {
  let y = 0;
  while (y < canvas.height) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, y);
    ctx.lineTo(canvas.width / 2, y + boderHeight);
    ctx.closePath();
    ctx.strokeStyle = baseColor;
    ctx.stroke();
    y += boderHeight * 2;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawScore();
  drawPaddle();
  drawBorder();
  if (ballX + dx < ballRadius || ballX + dx > canvas.width - ballRadius) {
    if (ballX + dx < ballRadius) rightScore++;
    else leftScore++;

    if(rightScore === 5 || leftScore === 5){
      isGameOver = true;
      let winner = rightScore === 5 ? "Right" : "Left";
      alert(`${winner} win! Press OK to restart the game`);
    }


    dx = -dx;
    ballX = canvas.width / 2;
    ballY = 0;
  }
  if (ballY + dy < ballRadius || ballY + dy > canvas.height - ballRadius) {
    dy = -dy;
  }

  if (
    (ballY + dy > leftPaddleY &&
      ballY + dy < leftPaddleY + paddleHeight &&
      ballX + dx < paddleOffsetX + ballRadius) ||
    (ballY + dy > rightPaddleY &&
      ballY + dy < rightPaddleY + paddleHeight &&
      ballX + dx > canvas.width - paddleOffsetX - ballRadius)
  ) {
    dx = -dx;
  }

  ballX += dx;
  ballY += dy;
  dx = dx > 0 ? ballSpeed : -ballSpeed;
  dy = dy > 0 ? ballSpeed : -ballSpeed;

  if (upPressed && rightPaddleY > 0) rightPaddleY -= 7;
  else if (downPressed && rightPaddleY < canvas.height - paddleHeight)
    rightPaddleY += 7;
  if (wPressed && leftPaddleY > 0) leftPaddleY -= 7;
  else if (sPressed && leftPaddleY < canvas.height - paddleHeight)
    leftPaddleY += 7;

  if(!isGameOver) requestAnimationFrame(draw);
  
}

draw();

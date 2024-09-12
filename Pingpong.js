const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 5;
let dx = 5;
let dy = -5;

let rightScore = 0;
let leftScore = 0;

const paddleHeight = 75;
const paddleWidth = 10;
const paddleOffsetX = 10;
let rightPaddleY = (canvas.height - paddleWidth) / 2;
let leftPaddleY = (canvas.height - paddleWidth) / 2;

let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
    else if(e.key == "w"){
        wPressed = true;
    }
    else if(e.key == "s"){
        sPressed = true;
    }
}
function keyUpHandler(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
    else if(e.key == "w"){
        wPressed = false;
    }
    else if(e.key == "s"){
        sPressed = false;
    }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "25px Arial";
  ctx.fillStyle = "#0095DD";
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
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(paddleOffsetX, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawScore();
  drawPaddle();

  if (ballX + dx < ballRadius || ballX + dx > canvas.width - ballRadius) {
    if (ballX + dx < ballRadius) rightScore++;
    else leftScore++;
    dx = -dx;
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

  if (upPressed && rightPaddleY > 0) rightPaddleY -= 7;
  else if(downPressed && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += 7;
  if (wPressed && leftPaddleY > 0) leftPaddleY -= 7;
  else if(sPressed && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 7;
  
  requestAnimationFrame(draw);
}

draw();

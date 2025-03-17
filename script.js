const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = { x: 200, y: 50, radius: 10, dy: 3 };
let paddle = { x: 150, y: 580, width: 100, height: 10, dx: 5 };
let score = 0;

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = '#0077cc';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Move ball
function updateBall() {
  ball.y += ball.dy;

  // Bounce off bottom or reset if missed
  if (ball.y + ball.radius > canvas.height) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
      score++;
    } else {
      ball.y = 50;
      ball.dy = 3;
      score = 0;
    }
  }

  // Bounce off top
  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
}

// Control paddle
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && paddle.x + paddle.width < canvas.width) {
    paddle.x += paddle.dx;
  } else if (e.key === 'ArrowLeft' && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
});

// Draw score
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  updateBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();

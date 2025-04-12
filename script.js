const game = document.getElementById('game');
const player = document.getElementById('player');
let isJumping = false;
let jumpSpeed = 0;
let gravity = 0.5;
let obstacleSpeed = 2;
let obstacle = null;

function createObstacle() {
  obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = '100%';
  obstacle.style.bottom = '100px';
  game.appendChild(obstacle);
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    jumpSpeed = 10;
  }
}

function updateObstacle() {
  if (!obstacle) return;
  const left = parseInt(obstacle.style.left);
  obstacle.style.left = `${left - obstacleSpeed}px`;
  if (left < -50) {
    obstacle.style.left = '100%';
  }

  // Collision check
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  if (
    playerRect.bottom > obstacleRect.top &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.right > obstacleRect.left &&
    playerRect.left < obstacleRect.right
  ) {
    alert('Game Over!');
    window.location.reload();
  }
}

function gameLoop() {
  let bottom = parseInt(player.style.bottom);

  if (isJumping) {
    player.style.bottom = `${bottom + jumpSpeed}px`;
    jumpSpeed -= gravity;
    if (jumpSpeed <= 0) {
      isJumping = false;
    }
  } else {
    player.style.bottom = `${bottom - gravity * 4}px`;
    if (parseInt(player.style.bottom) < 0) {
      alert('Game Over!');
      window.location.reload();
    }
  }

  updateObstacle();
  requestAnimationFrame(gameLoop);
}

// Start
player.style.bottom = '100px';
player.style.left = '50%';
createObstacle();
gameLoop();

document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'ArrowUp') {
    jump();
  }
});
document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("gameCanvas");
	const ctx = canvas.getContext("2d");

	const gridSize = 20;
	const tileCount = 20;
	let snake = [{ x: 10, y: 10 }];
	let apple = { x: 15, y: 15 };
	let dx = 0;
	let dy = 0;

	function drawSnake() {
		ctx.fillStyle = "green";
		snake.forEach((segment) => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));
	}

	function drawApple() {
		ctx.fillStyle = "red";
		ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
	}

	function moveSnake() {
		const head = { x: snake[0].x + dx, y: snake[0].y + dy };
		snake.unshift(head);

		if (head.x === apple.x && head.y === apple.y) {
			apple.x = Math.floor(Math.random() * tileCount);
			apple.y = Math.floor(Math.random() * tileCount);
		} else {
			snake.pop();
		}
	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function checkCollision() {
		const hitLeftWall = snake[0].x < 0;
		const hitRightWall = snake[0].x > tileCount - 1;
		const hitTopWall = snake[0].y < 0;
		const hitBottomWall = snake[0].y > tileCount - 1;

		return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || hitSnakeBody();
	}

	function hitSnakeBody() {
		for (let i = 1; i < snake.length; i++) {
			if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
				return true;
			}
		}
		return false;
	}

	function updateGame() {
		if (checkCollision()) {
			clearInterval(gameLoop);
			alert("Game Over!");
			return;
		}

		clearCanvas();
		drawApple();
		drawSnake();
		moveSnake();
	}

	function changeDirection(e) {
		if (e.key === "ArrowUp" && dy !== 1) {
			dx = 0;
			dy = -1;
		}
		if (e.key === "ArrowDown" && dy !== -1) {
			dx = 0;
			dy = 1;
		}
		if (e.key === "ArrowLeft" && dx !== 1) {
			dx = -1;
			dy = 0;
		}
		if (e.key === "ArrowRight" && dx !== -1) {
			dx = 1;
			dy = 0;
		}
	}

	document.addEventListener("keydown", changeDirection);
	const gameLoop = setInterval(updateGame, 100);
});

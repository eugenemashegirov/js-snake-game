let canvas    = document.getElementById("canvas"),
	ctx       = canvas.getContext("2d"),
	snakeBody = [{x: 0, y: 0}],
	direction = 1,
	apple     = null,
	size      = 25;

setNewApple();

setInterval(() => {
	if ((apple[0] + size >= canvas.width) || (apple[1] + size >= canvas.height)) setNewApple(); 
            
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.fillRect(...apple, size, size);
	ctx.fillStyle = "#000";

	snakeBody.forEach((el, i) => {
		if ((el.x == snakeBody[snakeBody.length - 1].x) && (el.y == snakeBody[snakeBody.length - 1].y) && (i < snakeBody.length - 1)) {
			snakeBody = [{x: 0, y: 0}], direction = 1;

			alert("You lose.");
		}
	});

	let firstSegment = snakeBody[0], 
		lastSegment = snakeBody[snakeBody.length - 1], 
		nextSegment = {x: firstSegment.x, y: firstSegment.y};

	if (direction == 1)  nextSegment.x = lastSegment.x + size, nextSegment.y = Math.round(lastSegment.y / size) * size;
	if (direction == 2) nextSegment.y = lastSegment.y + size, nextSegment.x = Math.round(lastSegment.x / size) * size;
	if (direction == 3) nextSegment.x = lastSegment.x - size, nextSegment.y = Math.round(lastSegment.y / size) * size;
	if (direction == 4) nextSegment.y = lastSegment.y - size, nextSegment.x = Math.round(lastSegment.x / size) * size;

	snakeBody.push(nextSegment);
	snakeBody.splice(0, 1);

	snakeBody.forEach(segment => {
		if (direction == 1) if (segment.x > Math.round(canvas.width / size) * size) segment.x = 0;
		if (direction == 2) if (segment.y > Math.round(canvas.height / size) * size) segment.y = 0;
		if (direction == 3) if (segment.x < 0) segment.x = Math.round(canvas.width / size) * size;
		if (direction == 4) if (segment.y < 0) segment.y = Math.round(canvas.height / size) * size;

		if (segment.x == apple[0] && segment.y == apple[1]) setNewApple(), snakeBody.unshift({x: firstSegment.x - size, y: lastSegment.y - size});

		ctx.fillRect(segment.x, segment.y, size, size);
	});
}, 50);

window.onkeydown = function (e) {
	let keyCode = e.keyCode;

	if ([37, 38, 39, 40].indexOf(keyCode) >= 0) e.preventDefault();

	if (keyCode == 39 && direction != 3) direction = 1;
	if (keyCode == 40 && direction != 4) direction = 2;
	if (keyCode == 37 && direction != 1) direction = 3;
	if (keyCode == 38 && direction != 2) direction = 4;
};

function getRandomCoordinate(min, max) {
	coordinate = Math.floor(Math.random() * (max - min) + min);

	return Math.round(coordinate / size) * size;
}

function setNewApple() {
	apple = [getRandomCoordinate(0, innerWidth), getRandomCoordinate(0, innerHeight)];
}
const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 1;
let headX = 10;
let headY = 10;
const SnakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const eatSound = new Audio("gulp.mp3");
const overSound = new Audio("gameover.wav");

//game loop
function drawGame()
{
    let result = 0;

    changeSnakePosition();
    result = isGameOver();
    if (result)
        return;
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver()
{
    let gameOver = false;
    let lentghParts = SnakeParts.length;

    if (xVelocity === 0 && yVelocity === 0)
        return (false);
    if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount)
        gameOver = true;
    for (let i = 0; i < lentghParts; i++) {
        let part = SnakeParts[i];
        if (part.x === headX && part.y === headY)
            gameOver = true;
    }
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        overSound.play();
    }
    return (gameOver);
}

function clearScreen()
{
    let sizex = canvas.width / tileCount;
    let sizey = canvas.height / tileCount;

    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    for (let i = 0; i < tileCount; i += 1) {
        for (let j = 0; j < tileCount; j += 1) {
            ctx.fillRect(i * sizex + 1, j * sizey + 1, sizex - 1, sizey - 1);
        }
    }
}

function drawSnake()
{
    ctx.fillStyle = 'green';
    for (let i = 0; i < SnakeParts.length; i++) {
        let part = SnakeParts[i];
        ctx.fillRect(part.x * tileCount + 1, part.y * tileCount + 1, tileSize, tileSize);
    }
    SnakeParts.push(new SnakePart(headX, headY));
    while (SnakeParts.length > tailLength) {
        SnakeParts.shift();
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount + 1, headY * tileCount + 1, tileSize, tileSize);
}

function drawScore()
{
    ctx.fillStyle = 'white';
    ctx.font = "12px Verdana";
    ctx.fillText("Score: " + score, canvas.width - 100, 10);
}

function drawApple()
{
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount + 1, appleY * tileCount + 1, tileSize, tileSize)
}

function checkAppleCollision()
{
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appley = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        eatSound.play();
    }
}

function changeSnakePosition()
{
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event)
{
    //up
    if (event.keyCode == 38 && yVelocity != 1) {
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if (event.keyCode == 40 && yVelocity != -1) {
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if (event.keyCode == 37 && xVelocity != 1) {
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if (event.keyCode == 39 && xVelocity != -1) {
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
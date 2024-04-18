const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');


// Set the size of the box
const box = 20;

// Snake
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i == 0 ? 'green' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = 'red';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

// Food
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}


// Score
let score = 0;

// Display the score
function drawScore() {
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, box, box);
}


// Display game over
function gameOver() {
    context.fillStyle = 'black';
    context.font = '30px Arial';
    context.fillText('Game Over', 10 * box, 10 * box);

    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Final Score: ' + score, 10 * box, 12 * box);
}


// Draw the board
function drawBoard() {
    for (let i = 0; i < 45; i++) {
        for (let j = 0; j < 45; j++) {
            context.fillStyle = (i + j) % 2 == 0 ? 'white' : 'lightgrey';
            context.fillRect(j * box, i * box, box, box);
        }
    }
    drawSnake();
    drawFood();
}



// direction
let direction = { x: 1, y: 0 };


// Update the snake
function updateSnake() {
    const head = { ...snake[0] }; // copy the head
    head.x += direction.x * box;
    head.y += direction.y * box;

    // Check if the snake has hit the edge of the board
    if (head.x < 0 || head.y < 0 || head.x >= 45 * box || head.y >= 45 * box) {
        clearInterval(game);
        gameOver();
        return;
    }

    // Check if the snake has hit itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            clearInterval(game);
            gameOver();
            return;
        }
    }
    
    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        // Move the food to a new random position
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        // Increase the score
        score++;
    } else {
        // Remove the last segment of the snake
        snake.pop();
    }

    // Add the new head to the snake
    snake.unshift(head);
}

// Update the game every 100 ms
let game = setInterval(() => {
    drawBoard();
    updateSnake();
    drawScore();
}, 100);


// Listen to the keyboard
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown') {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft') {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight') {
        direction = { x: 1, y: 0 };
    }
});


drawBoard();
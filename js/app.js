const xStartPos = 200,
    yStartPos = 400,
    xStartPosEnemy = -100,
    yPositions = [50, 133, 216, 299],
    speeds = [1, 2, 3, 4, 5, 6];

const startButton = document.getElementById('start-game'),
    loseModal = document.getElementById('lose-modal'),
    modal = document.getElementsByClassName('modal');

// reset function resets the game by placing the player and enemies at their starting position.
const reset = () => {
    player.x = xStartPos;
    player.y = yStartPos;
    for (let i = 0; i < 3; i++) {
        allEnemies[i].x = xStartPosEnemy;
        allEnemies[i].y = yPositions[Math.floor(Math.random() * 4)];
        allEnemies[i].speed = speeds[Math.floor(Math.random() * 5)];
    }
}

// This function runs as player reaches the other side.
//The function executes the `reset()` function
const win = () => {
    alert('You won!');
    reset();
}

const gameOver = () => {
    loseModal.classList.toggle('display-none');
    startButton.classList.remove('display-none');
}

// The Enemy class
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor() {
            // The image for the sprite
            this.sprite = 'images/enemy-bug.png';
            this.x = xStartPosEnemy;
            this.speed = speeds[Math.floor(Math.random() * 5)];
        }
        // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    // Update the enemy's position
    update(dt) {
        // multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * 75 * dt;
        //return Enemy to start when leaves screen
        if (this.x >= 500) {
            this.x = xStartPosEnemy;
            this.y = yPositions[Math.floor(Math.random() * 4)];
            this.speed = speeds[Math.floor(Math.random() * 5)];
        } else {
            this.x = this.x;
        }
        //check collision of Enemy by avaluating x y positions
        if (this.x < player.x + 55 && this.x > player.x - 55 && this.y < player.y + 45 && this.y > player.y - 45) {
            player.lives--;
            //check if player has any lives left
            if (player.lives === 0) {
                gameOver();
            } else {
                reset();
            }
        }
    };
};

// Player class

class Player {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.x = xStartPos;
        this.y = yStartPos;
        this.lives = 3;
    }
    render() {
        ctx.drawImage(Resources.get('images/char-pink-girl.png'), this.x, this.y);
    }
    update(dt) {
        if (player.y === -15) {
            win();
        }
    }
    handleInput(key) {
        switch (key) {
            case 'left':
                player.x -= this.x <= 0 ? 0 : 101;
                break;
            case 'right':
                player.x += this.x >= 400 ? 0 : 101;
                break;
            case 'up':
                player.y -= this.y <= 0 ? 0 : 83;
                break;
            case 'down':
                player.y += this.y >= 400 ? 0 : 83;
                break;
        }
    }
}

// Instantiating enemies and player
const player = new Player();
let allEnemies = [];

//start button: start the game and hides the start button
startButton.addEventListener('click', function () {
    player.lives = 3;
    for (let i = 0; i < 3; i++) {
        allEnemies[i] = new Enemy();
    }
    startButton.classList.toggle('display-none');
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//close modal on click everywhere outside of modal
document.addEventListener('click', function (event) {
    //if you click on anything except the modal itself close the modal
    var isClickInside = loseModal.contains(event.target);
    if (!isClickInside) {
        loseModal.classList.add('display-none');
    };
});

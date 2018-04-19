const xStartPos = 200,
    yStartPos = 400,
    xStartPosEnemy = -100,
    yPositions = [50, 133, 216, 299],
    speeds = [1, 2, 3, 4, 5, 6],
    clock = $('#timer');

let gameOn = false;

const startButton = document.getElementById('start-game'),
    restartButton = document.getElementById('restart-game'),
    loseModal = document.getElementById('lose-modal'),
    modal = document.getElementsByClassName('modal'),
    livesWrapper = document.getElementById('lives');

/*Core Functions*/

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
    gameOn = false;
}

const gameOver = () => {
    loseModal.classList.toggle('display-none');
    gameOn = false;
    clock.timer('pause');
}

/*Object Constructors*/

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
    reset() {
            this.x = xStartPosEnemy;
            this.y = yPositions[Math.floor(Math.random() * 4)];
            this.speed = speeds[Math.floor(Math.random() * 5)];
        }
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
            window.setTimeout(player.loseLife(), 50);
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
    reset() {
        this.x = xStartPos;
        this.y = yStartPos;
    }
    loseLife() {
        this.lives--;
        //check if player has any lives left
        if (player.lives === 0) {
            gameOver();
        } else {
            livesWrapper.removeChild(livesWrapper.firstChild);
            livesWrapper.removeChild(livesWrapper.firstChild);
            player.reset();
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


/*user inputs*/

//start button: start the game and hides the start button
startButton.addEventListener('click', function () {
    gameOn = true;
    for (let i = 0; i < 3; i++) {
        allEnemies[i] = new Enemy();
    }
    startButton.classList.toggle('display-none');
    clock.timer('resume');
});

//retart button: restart the game and hides the game over modal
restartButton.addEventListener('click', function () {
    gameOn = true;
    player.lives = 3;
    for (let i = 0; i < 3; i++) {
        allEnemies[i] = new Enemy();
        const life = document.createElement("div");
        livesWrapper.appendChild(life);
    }
    loseModal.classList.toggle('display-none');
    clock.timer('reset');
    clock.timer('resume');
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
    if (gameOn) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

/*Timer*/
clock.timer({
    format: '%M:%S',
    countdown: true,
    duration: 30,
    callback: function () {
        gameOver()
    }
});
clock.timer('pause');

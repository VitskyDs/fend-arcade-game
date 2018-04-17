const xStartPos = 200,
    yStartPos = 400,
    xStartPosEnemy = -100,
    yPositions = [50, 133, 216, 299],
    speeds = [1, 2, 3, 4, 5, 6];

const reset = () => {
    player.x = xStartPos;
    player.y = yStartPos;
    for (let i = 0; i < 3; i++) {
        allEnemies[i].x = xStartPosEnemy;
        allEnemies[i].y = yPositions[Math.floor(Math.random() * 4)];
        allEnemies[i].speed = speeds[Math.floor(Math.random() * 5)];
    }
}

const win = () => {
        reset();
    }
    // Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor() {
            // The image/sprite for our enemies
            this.sprite = 'images/enemy-bug.png';
            this.x = xStartPosEnemy;
            this.speed = speeds[Math.floor(Math.random() * 5)];
        }
        // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += (this.speed * dt) * 75;
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
            reset();
            console.log('hit');
        }
    };
};

// Player class

class Player {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.x = xStartPos;
        this.y = yStartPos;
    }
    render() {
        ctx.drawImage(Resources.get('images/char-pink-girl.png'), this.x, this.y);
    }
    update(dt) {
        if (player.y === -15) {
            /*window.setTimeout(win, 150);*/
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

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();

for (let i = 0; i < 3; i++) {
    allEnemies[i] = new Enemy();
}

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

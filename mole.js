let currMoleTile;
let currPlantTile;
let score = 0;
let level = 1;
let gameOver = false;
let timer;
let timerMole;
let timerPlant;

window.onload = function () {
    setGame();
}

function setGame() {
    // setup the grid for the game board in html
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    // display the current level information and start timers
    updateLevelInfo();
    startTimers();
}

function updateLevelInfo() {
    // Clear the existing message
    document.getElementById("message").innerText = "";

    // Display level information based on the current level
    if (level === 2) {
        document.getElementById("level-info").innerText = "You are in Level: 2";
    } else if (level === 3) {
        document.getElementById("level-info").innerText = "Congratulations! You are in the final round😃";
    } else {
        document.getElementById("level-info").innerText = "You are in Level: " + level;
    }
}

function startTimers() {
    // setting timers based on the levels
    if (level === 1) {
        startLevelTimer(180); // 3 minutes for level 1
        timerMole = setInterval(setMole, 2000); // 1000 milliseconds = 2 seconds
        timerPlant = setInterval(setPlant, 3000); // 2000 milliseconds = 3 seconds
    } else if (level === 2) {
        startLevelTimer(120); // 2 minutes for level 2
        timerMole = setInterval(setMole, 1000); //1 second
        timerPlant = setInterval(setPlant, 2000); // 2seconds
    } else if (level === 3) {
        startLevelTimer(60); // 1 minute for level 3
        timerMole = setInterval(setMole, 500); // 0.5 second
        timerPlant = setInterval(setPlant, 1000); // 1 second
    }
}

function startLevelTimer(seconds) {
    let timeRemaining = seconds;
    updateTimerDisplay(timeRemaining);

    timer = setInterval(function () {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById("timer").innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();

        if (level === 1 && score >= 100) {
            level = 2;
            updateLevelInfo(); // Update level information
            resetGame();
        } else if (level === 2 && score >= 500) {
            level = 3;
            updateLevelInfo(); // Update level information
            resetGame();
        } else if (level === 3 && score >= 1000) {
            // Player has won Level 3
            document.getElementById("score").innerText = "Congratulations! You have won!🏆";
            gameOver = true;
            setTimeout(function () {
                // Reset the game after displaying the message
                endGame();
            }, 3000); // Display the message for 3 seconds
        }
    } else if (this == currPlantTile) {
        endGame();
    }
}

function resetGame() {
    clearInterval(timer);
    clearInterval(timerMole);
    clearInterval(timerPlant);

    // Clear the current mole and plant tiles
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    // Reset variables
    score = 0;
    document.getElementById("score").innerText = score.toString();
    gameOver = false;

    // Set the new timers based on the updated level
    startTimers();
}

function endGame() {
    clearInterval(timer);
    clearInterval(timerMole);
    clearInterval(timerPlant);

    document.getElementById("score").innerText = "OOP! Time's up! Game Over: " + score.toString();
    gameOver = true;

    // Hide the timer display
    document.getElementById("timer").style.display = "none";
}









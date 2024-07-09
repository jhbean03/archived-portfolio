var MAX_RANDOM_RUNS = 10;
var numSelected = null;
var tileSelected = null;
var errors = 0;
var gameBoard = generateBoard();

// Load the game
window.onload = function () {
    setGame();
}

function setGame() {
    // Build the digit selector for digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Build the 9x9 Board
    for (let j = 0; j < 9; j++) {
        for (let k = 0; k < 9; k++) {
            let tile = document.createElement("div");
            tile.id = j.toString() + "-" + k.toString();

            // If the board doesn't have a placeholder, insert number
            if (gameBoard[j][k] != "-") {
                tile.innerText = gameBoard[j][k];
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    // Check if there is a number already selected and remove it
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }

    // Select new number
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    // If there is a selected number, then insert in tile
    if (numSelected) {
        // If the tile already has a number, return
        if (this.innerText != "") {
            return;
        }
        this.innerText = numSelected.id;
    }
}

function generateBoard() {
    // Initialize the board
    let board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // Initialize and shuffle number list
    let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(numberList);

    return true;
}

function checkGrid(grid) {
    // Check to see if there are any unfilled tiles
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] == 0) {
                return false;
            }
        }
    }

    // Return true if we have a complete grid!
    return true;
}

function solveGrid(grid) {
    var counter;

    // Find the next empty cell
    for (let i = 0; i < 81; i++) {
        // Define row and column variables
        let row = Math.floor(i / 9);
        let column = i % 9;
        
        // Check if the element at this coordinate has been filled yet
        if (grid[row][column] == 0) {
            for (let value = 1; value < 10; value++) {
                // Check that this value has not already been used in row
                if (!grid[row].includes(value)) {
                    // Check that this value has not already been used in column
                    if (!isInColumn(grid, column, value)) {
                        // Identify which of the 9 squares is being updated
                        let square = [[], [], []];
                        if (row < 3) {
                            if (column < 3) {
                                for (let j = 0; j < 3; j++) {
                                    for (let k = 0; k < 3; k++) {
                                        square[j][k] = grid[j][k];
                                    }
                                }
                            } else if (column < 6) {
                                for (let j = 0; j < 3; j++) {
                                    for (let k = 3; k < 6; k++) {
                                        square[j][k - 3] = grid[j][k];
                                    }
                                }
                            } else {
                                for (let j = 0; j < 3; j++) {
                                    for (let k = 6; k < 9; k++) {
                                        square[j][k - 6] = grid[j][k];
                                    }
                                }
                            }
                        } else if (row < 6) {
                            if (column < 3) {
                                for (let j = 3; j < 6; j++) {
                                    for (let k = 0; k < 3; k++) {
                                        square[j - 3][k] = grid[j][k];
                                    }
                                }
                            } else if (column < 6) {
                                for (let j = 3; j < 6; j++) {
                                    for (let k = 3; k < 6; k++) {
                                        square[j - 3][k - 3] = grid[j][k];
                                    }
                                }
                            } else {
                                for (let j = 3; j < 6; j++) {
                                    for (let k = 6; k < 9; k++) {
                                        square[j - 3][k - 6] = grid[j][k];
                                    }
                                }
                            }
                        } else {
                            if (column < 3) {
                                for (let j = 6; j < 9; j++) {
                                    for (let k = 0; k < 3; k++) {
                                        square[j - 6][k] = grid[j][k];
                                    }
                                }
                            } else if (column < 6) {
                                for (let j = 6; j < 9; j++) {
                                    for (let k = 3; k < 6; k++) {
                                        square[j - 6][k - 3] = grid[j][k];
                                    }
                                }
                            } else {
                                for (let j = 6; j < 9; j++) {
                                    for (let k = 6; k < 9; k++) {
                                        square[j - 6][k - 6] = grid[j][k];
                                    }
                                }
                            }
                        }

                        // Check that this value has not been used within this square
                        if (!square[0].contains(value) && !square[1].contains(value) && !square[2].contains(value)) {
                            grid[row][column] = value;
                            
                            // If the grid is valid, increment and continue; if not, recursively call solveGrid
                            if (checkGrid(grid)) {
                                counter++;
                                break;
                            } else {
                                if (solveGrid(grid)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            break;
        }
    }
    grid[row][column] = 0;
}

function isInColumn(grid, col, val) {
    let isInCol = false;
    let counter = 0;
    while (isInCol == false && counter < 9) {
        isInCol = (grid[counter][col] == val);
        counter++;
    }
    return isInCol;
}

function fillGrid(grid) {
    var counter;
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle
    while (currentIndex != 0) {
  
      // Pick a remaining element
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}
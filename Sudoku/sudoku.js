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
    let board = [
        "---------",
        "---------",
        "---------",
        "---------",
        "---------",
        "---------",
        "---------",
        "---------",
        "---------",
    ];

    // Set up a validity matrix
    let validityMatrix = [[[]]];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = 0; k < 9; k++) {
                validityMatrix[i][j][k] = true;
            }
        }
    }

    // Start filling in the Sudoku board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // Randomly select a number for (i, j) coordinate
            let num = Math.floor((Math.random() * 9) + 1);
            let counter = 0;
            while (validityMatrix[i][j][num - 1] == false) {
                num = Math.floor((Math.random() * 9) + 1);
                counter++;
                if (counter >= MAX_RANDOM_RUNS) {
                    num = 0;
                    while (validityMatrix[i][j][num - 1] == false) {
                        num++;
                    }
                }
            }

            // Set the value of the board at this coordinate equal to this value
            let numString = board[i].substring(0, j) + num.toString() + board[i].substring(j+1, 9);
            board[i] = numString;

            // Update the validity matrix for the row and column
            for (let k = 0; k < 9; k++) {
                validityMatrix[i][k][num - 1] = false;
                validityMatrix[k][j][num - 1] = false;
            }

            // Update the validiy matrix for the box
            if (i < 3) {
                // For upper right box
                if (j < 3) {
                    for (let k = 0; k < 3; k++) {
                        for (let m = 0; m < 3; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }

                // For upper middle box
                } else if (j < 6) {
                    for (let k = 0; k < 3; k++) {
                        for (let m = 3; m < 6; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }

                // For upper left box
                } else if (j < 9) {
                    for (let k = 0; k < 3; k++) {
                        for (let m = 6; m < 9; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }
                }
            }
            if (i < 6) {
                // For middle right box
                if (j < 3) {
                    for (let k = 3; k < 6; k++) {
                        for (let m = 0; m < 3; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }

                // For center box
                } else if (j < 6) {
                    for (let k = 3; k < 6; k++) {
                        for (let m = 3; m < 6; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }

                // For middle left box
                } else if (j < 9) {
                    for (let k = 3; k < 6; k++) {
                        for (let m = 6; m < 9; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }
                }
            }
            if (i < 9) {
                // For lower right box
                if (j < 3) {
                    for (let k = 6; k < 9; k++) {
                        for (let m = 0; m < 3; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }

                // For lower middle box
                } else if (j < 6) {
                    for (let k = 6; k < 9; k++) {
                        for (let m = 3; m < 6; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }

                // For lower right box
                } else if (j < 9) {
                    for (let k = 6; k < 9; k++) {
                        for (let m = 6; m < 9; m++) {
                            validityMatrix[k][m][num - 1] = false;
                        }
                    }
                }
            }
        }
    }

    return board;
}
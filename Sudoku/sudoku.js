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
    let validityList, validityRow, validityMatrix = [];
    for (let i = 0; i < 9; i++) {
        validityList.append(true);
    }
    for (let i = 0; i < 9; i++) {
        validityRow.append(validityList);
    }
    for (let i = 0; i < 9; i++) {
        validityRow.append(validityMatrix);
    }

    // Choose a random free cell to pick from
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (board[x][y] != "-") {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }




}

var numSelected = null;
var tileSelected = null;
var errors = 0;

// Load the game
window.onload = function() {
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
            if (board[j][k] != "-") {
                tile.innerText = board[j][k];
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
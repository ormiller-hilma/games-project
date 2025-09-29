console.log(localStorage.key)
let board = []
let divBoard = []

const body = document.querySelector("body")
const switchPlayer = document.getElementById("switchPlayer")
const turnInfo = document.getElementById("turnInfo")
const yellowBox = document.getElementById("yellow")
const redBox = document.getElementById("red")
let currentPlayer = "red"
let winner = "";

function changePlayer() {
    if (winner === "") {
        if (currentPlayer === "red") {
            currentPlayer = "yellow"
            turnInfo.innerHTML = "תור הצהוב"
            yellowBox.style.backgroundColor = "yellow"
            redBox.style.backgroundColor = ""
        }
        else {
            currentPlayer = "red";
            turnInfo.innerHTML = "תור האדום"
            redBox.style.backgroundColor = "red";
            yellowBox.style.backgroundColor = ""
        }
    }
}

function createBoard() {
    const rows = 7;
    const columns = 6;
    divBoard = [[], [], [], [], [], [], []]; // array with 7 columns
    const container = document.getElementById("container");

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            const square = document.createElement("div");
            container.appendChild(square)
            divBoard[j][i] = square;
        }
    }
    console.log(divBoard);

    board = [[], [], [], [], [], [], []]; // array with 7 columns
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }
    console.log(board);
}

function getAvilableSlotInColumn(columnArray) {
    for (let i = 0; i < columnArray.length; i++) {
        if (columnArray[columnArray.length - i - 1] === 0) {
            return columnArray.length - i - 1;
        }
    }
    return -1; // no empty slots in column
}

function setPiece(columnIndex, color) {
    const columnArray = board[columnIndex];
    avilableSlot = getAvilableSlotInColumn(columnArray) // gets the first empty slot
    if (avilableSlot === -1) return; // return if no avilable slot
    board[columnIndex][avilableSlot] = color.charAt(0).toUpperCase();
    divBoard[columnIndex][avilableSlot].style.backgroundColor = color;
    console.log(board);
    checkWinnerColumn(board[columnIndex])
    checkWinnerRow(columnIndex, avilableSlot)
}

function setWinner(color) {
    if (color === "0") return;
    console.log("winner")
    console.log(color)
    winner = color;
    if (color === "R") {
        turnInfo.innerHTML = "האדום מנצח"
    }
    if (color === "Y") {
        turnInfo.innerHTML = "הצהוב מנצח"
    }
    alert("the winner is " + color)
}

function checkWinnerColumn(column) {
    console.log(column)
    for (let i = 0; i < column.length - 3; i++) {
        if (column[i] === column[i + 1] && column[i + 1] === column[i + 2] && column[i + 2] === column[i + 3]) {
            if (column[i] !== 0) {
                setWinner(column[i]);
            }
        }
    }
}

function checkWinnerRow(columnIndex, rowIndex) {
    // console.log("row: " + rowIndex)
    // console.log("column: " + columnIndex)
    let color = board[columnIndex][rowIndex];
    for (let i = 0; i < 4; i++) {
        if (board[i][rowIndex] === color && board[i + 1][rowIndex] === color &&
            board[i + 2][rowIndex] === color && board[i + 3][rowIndex]
        ) {
            setWinner(color);
        }
    }
}

function checkWinnerDiagonal(columnIndex, rowIndex) {
    const color = board[columnIndex][rowIndex];
    if (color === 0) {
        return;
    }
    let nextColumnIndex;
    let nextRowIndex;
    let colorCounter;
    //
    // First diagonal
    //
    nextColumnIndex = columnIndex + 1;
    nextRowIndex = rowIndex - 1;
    colorCounter = 1;
    for (let i = 0; i < board.length; i++) {
        if (nextColumnIndex >= board.length || nextRowIndex >= board[0].length) {
            break; // out of bounds of array
        }
        if (board[nextColumnIndex][nextRowIndex] !== color) {
            break; // no wins in this diagonal
        }
        //
        colorCounter++;
        nextColumnIndex++;
        nextRowIndex--;
        if (colorCounter >= 4) {
            setWinner(color);
        }
    }

    //
    // Second diagonal
    //
    nextColumnIndex = columnIndex - 1;
    nextRowIndex = rowIndex + 1;
    colorCounter = 0;
    for (let i = 0; i < board.length; i++) {
        if (nextColumnIndex < 0 || nextRowIndex < 0) {
            break; // out of bounds of array
        }
        if (board[nextColumnIndex][nextRowIndex] !== color) {
            break; // no wins in this diagonal
        }
        //
        colorCounter++;
        nextColumnIndex--;
        nextRowIndex++;
        if (colorCounter >= 4) {
            setWinner(color);
        }
    }

}


document.addEventListener('keydown', function (event) {
    const key = event.key; // What key was pressed
    //const code = event.code; Physical key on the keyboard

    const avilableSlot = getAvilableSlotInColumn(board[key - 1]);
    if (avilableSlot === -1) return; // return if not available slot

    const fallTime = 1000;
    const startingPosition = -500;
    const amountOfFrames = 1000;

    const fallingDiv = document.createElement("div")
    fallingDiv.classList.add("falling-piece");
    fallingDiv.style.backgroundColor = currentPlayer;
    setChildPiecePos(fallingDiv, startingPosition);
    divBoard[key - 1][avilableSlot].appendChild(fallingDiv);
    moveDown(fallingDiv, startingPosition, amountOfFrames, fallTime);

    console.log(`Key pressed: ${key}`);

    setTimeout(setPiece, fallTime, key - 1, currentPlayer);

    setTimeout(() => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                checkWinnerDiagonal(i, j);
            }
        }

    }, fallTime + 100)

    setTimeout(function () {
        fallingDiv.remove();
    }, fallTime);
    changePlayer();
});

createBoard();
setPiece(0, currentPlayer); changePlayer();
setPiece(1, currentPlayer); changePlayer(); setPiece(1, currentPlayer); changePlayer();
setPiece(2, currentPlayer); setPiece(2, currentPlayer); changePlayer(); setPiece(2, currentPlayer); changePlayer();
setPiece(3, currentPlayer); setPiece(3, currentPlayer); setPiece(3, currentPlayer); changePlayer(); //setPiece(3, currentPlayer);
checkWinnerDiagonal(0, 5);
// setPiece(0, currentPlayer);
// setPiece(0, currentPlayer);
// changePlayer();
// setPiece(0, currentPlayer);
// setPiece(0, currentPlayer);

switchPlayer.addEventListener("click", changePlayer)



function setChildPiecePos(piece, pos) {
    piece.style.setProperty('transform', `translateY(${pos}px)`, 'important');
}

function moveDown(piece, startingPos, amountOfFrames, time) {
    let updatedPosition = startingPos;
    for (let i = 0; i < amountOfFrames; i++) {
        updatedPosition -= startingPos / amountOfFrames;
        setTimeout(setChildPiecePos, i * (time / amountOfFrames), piece, updatedPosition);
    }
}


//setTimeout(setChildPiecePos(testDiv, -100), 9000);
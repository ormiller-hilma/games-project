console.log(localStorage.key)
let board = [];
let divBoard = [];
let countRed = localStorage.getItem("redWins");
let countYellow = localStorage.getItem("yellowWins");
let canPlay = true;
let isGameOver = false;

if (countRed === null || countYellow === null) {
    localStorage.setItem("redWins", 0)
    localStorage.setItem("yellowWins", 0)
}

const body = document.querySelector("body")
const newGame = document.getElementById("newGame")
const turnInfo = document.getElementById("turnInfo")
const yellowBox = document.getElementById("yellow")
const redBox = document.getElementById("red")
let currentPlayer = "red"
let winner = "";

const audio = new Audio("../audio/winner.mp3")

function changePlayer() {
    if (winner === "") {
        if (currentPlayer === "red") {
            currentPlayer = "yellow"
            turnInfo.innerHTML = "תור הצהוב"
            yellowBox.style.opacity = "100%"
            redBox.style.opacity = "25%"
        }
        else {
            currentPlayer = "red";
            turnInfo.innerHTML = "תור האדום"
            redBox.style.opacity = "100%"
            yellowBox.style.opacity = "25%"
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
            square.addEventListener("click", () => {
                inputToColumn(j);
            });
        }
    }
    //console.log(divBoard);

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
    // Check for wins
    console.log("COLUMN:")
    checkWinnerColumn(board[columnIndex])
    console.log("ROW:")
    checkWinnerRow(columnIndex, avilableSlot)
    console.log("DIAGONAL:")
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            checkWinnerDiagonal(i, j);
        }
    }
    console.log("DRAW:")
    // Check for draw
    if (isBoardFull() && winner === "") {
        setWinner("Draw")
    }
}

function isBoardFull() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 0) return false; // board not filled
        }
    }
    return true; // board is filled
}

function audioPlay() {
    audio.play()
    setTimeout(function () {
        audio.pause();
        audio.currentTime = 0;
    }, 3000)
}

function setWinner(color) {
    //console.log("winner")
    //console.log(color)
    winner = color;
    if (color === "R") {
        turnInfo.innerHTML = "האדום מנצח"
        countRed++;
        localStorage.setItem("redWins", countRed)
        audioPlay()
    }
    if (color === "Y") {
        turnInfo.innerHTML = "הצהוב מנצח"
        countYellow++;
        localStorage.setItem("yellowWins", countYellow)
        audioPlay()
        turnInfo.innerHTML = "האדום מנצח";
    }
    if (color === "Y") {
        turnInfo.innerHTML = "הצהוב מנצח";
    }
    if (color === "Draw") {
        turnInfo.innerHTML = "תקו";
    }
    isGameOver = true;
    setTimeout(() => {
        showGameOverScreen(color)
    }, 800);
    //alert("the winner is " + color)
}

function checkWinnerColumn(column) {
    //console.log(column)
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
            board[i + 2][rowIndex] === color && board[i + 3][rowIndex] === color
        ) {
            setWinner(color);
            console.log(board[i][rowIndex], board[i + 1][rowIndex],
                board[i + 2][rowIndex], board[i + 3][rowIndex]);
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
            console.log("DIAGONAL");
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
            console.log("DIAGONAL 2");
            setWinner(color);
        }
    }

}


function inputToColumn(columnIndex) {
    if (canPlay === false || isGameOver) return;
    const avilableSlot = getAvilableSlotInColumn(board[columnIndex]);
    if (avilableSlot === -1) return; // return if not available slot

    const fallTime = 600;
    const startingPosition = -800;
    const amountOfFrames = 1000;

    canPlay = false;

    const fallingDiv = document.createElement("div")
    fallingDiv.classList.add("falling-piece");
    fallingDiv.style.backgroundColor = currentPlayer;
    setChildPiecePos(fallingDiv, startingPosition);
    divBoard[columnIndex][avilableSlot].appendChild(fallingDiv);
    moveDown(fallingDiv, startingPosition, amountOfFrames, fallTime);

    setTimeout(setPiece, fallTime, columnIndex, currentPlayer);

    setTimeout(function () {
        fallingDiv.remove();
        canPlay = true;
    }, fallTime);
    changePlayer();
}

document.addEventListener('keydown', function (event) {
    const key = event.key; // What key was pressed
    if (key < '1' || key > '7') return;
    inputToColumn(key - 1);

});

newGame.addEventListener("click", function () {
    window.location.reload();
})


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

function showGameOverScreen(winner, points1 = 0, points2 = 0) {
    const screen = document.getElementById("end-game-screen");
    const gameoverText = document.getElementById("gameover-text");
    const pointsText = document.getElementById("points");
    if (winner === "R") {
        gameoverText.innerHTML = "המשחק נגמר אדום ניצח"
    }
    if (winner === "Y") {
        gameoverText.innerHTML = "המשחק נגמר צהוב ניצח"
    }
    if (winner === "Draw") {
        gameoverText.innerHTML = "תקו"
    }
    screen.style.visibility = "visible";
    pointsText.innerHTML = `${points1} | ${points2}`
}

createBoard();
changePlayer();
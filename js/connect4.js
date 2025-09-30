let board = [];
let divBoard = [];

// determains if input is accepted
let canPlay = false;
let isGameOver = false;

// names of players
let player1Name = "אדום";
let player2Name = "צהוב";

// get points from local storage
let sessionPointsRed = parseInt(sessionStorage.getItem("redPoints"));
let sessionPointsYellow = parseInt(sessionStorage.getItem("yellowPoints"));

// if points are not set, set them to 0
if (isNaN(sessionPointsRed) || isNaN(sessionPointsYellow)) {
    sessionPointsRed = 0;
    sessionPointsYellow = 0;
    sessionStorage.setItem("redPoints", sessionPointsRed.toString());
    sessionStorage.setItem("yellowPoints", sessionPointsYellow.toString());
}

let countRed = parseInt(localStorage.getItem("redWins"));
let countYellow = parseInt(localStorage.getItem("yellowWins"));

if (isNaN(countRed) || isNaN(countYellow)) {
    countRed = 0;
    countYellow = 0;
    console.log(countRed + " " + countYellow);
    localStorage.setItem("redWins", countRed.toString());
    localStorage.setItem("yellowWins", countYellow.toString());
}

// dom elements
const body = document.querySelector("body");
const newGame = document.getElementById("newGame");
const turnInfo = document.getElementById("turnInfo");
const yellowBox = document.getElementById("yellow");
const redBox = document.getElementById("red");

// determain who turn it is
let currentPlayer = "red";

// the winner of the round
let winner = "";

const audio = new Audio("../audio/winner.mp3");

// change the turn the next player
function changePlayer() {
    if (winner === "") {
        if (currentPlayer === "red") {
            currentPlayer = "yellow";
            turnInfo.innerHTML = `תור ${player2Name}`;
            yellowBox.style.opacity = "100%";
            redBox.style.opacity = "25%";
        } else {
            currentPlayer = "red";
            turnInfo.innerHTML = `תור ${player1Name}`;
            redBox.style.opacity = "100%";
            yellowBox.style.opacity = "25%";
        }
    }
}

// creates the squares that contain the pieces
function createBoard() {
    const rows = 7;
    const columns = 6;
    divBoard = [[], [], [], [], [], [], []]; // array with 7 columns
    const container = document.getElementById("container");

    // creates the squares
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            const square = document.createElement("div");
            container.appendChild(square);
            divBoard[j][i] = square;
            square.addEventListener("click", () => {
                inputToColumn(j); // adds event to detetect when the column is clicked
            });
        }
    }

    // creates visual board for logic
    board = [[], [], [], [], [], [], []]; // array with 7 columns
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }
    console.log(board);
}

// get the first empty index in a column
function getAvilableSlotInColumn(columnArray) {
    for (let i = 0; i < columnArray.length; i++) {
        if (columnArray[columnArray.length - i - 1] === 0) {
            return columnArray.length - i - 1; // returns the first empty index
        }
    }
    return -1; // no empty slots in column
}

function setPiece(columnIndex, color) {
    const columnArray = board[columnIndex];
    avilableSlot = getAvilableSlotInColumn(columnArray); // gets the first empty slot
    if (avilableSlot === -1) return; // return if no avilable slot
    board[columnIndex][avilableSlot] = color.charAt(0).toUpperCase(); // sets visual board to color
    divBoard[columnIndex][avilableSlot].style.backgroundColor = color; // sets square to color

    changePlayer();

    // check for wins

    checkWinnerColumn(columnIndex);
    checkWinnerRow(columnIndex, avilableSlot);

    // check each square for diagonal win
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            checkWinnerDiagonal(i, j);
        }
    }

    // check for draw
    if (isBoardFull() && winner === "") {
        setWinner("Draw");
    }
}

function isBoardFull() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 0) return false; // board not full
        }
    }
    return true; // board is full
}

function audioPlay() {
    audio.play(); // play audio
    setTimeout(function () {
        audio.pause();
        audio.currentTime = 0;
    }, 3000); // stop the audio after 3 seconds
}

function setWinner(color) {
    winner = color;
    // if winner is red
    if (color === "R") {
        turnInfo.innerHTML = `${player1Name} מנצח`;
        countRed++;
        sessionPointsRed++;
        console.log("I AM A RED POINT++");
        localStorage.setItem("redWins", countRed);
        sessionStorage.setItem("redPoints", sessionPointsRed);
    }
    // if winner is yellow
    if (color === "Y") {
        turnInfo.innerHTML = `${player2Name} מנצח`;
        countYellow++;
        sessionPointsYellow++;
        localStorage.setItem("yellowWins", countYellow);
        sessionStorage.setItem("yellowPoints", sessionPointsYellow);
    }

    // update points
    updateSavedPoints(color);

    // check if draw
    if (color === "Draw") {
        turnInfo.innerHTML = "תקו";
    }

    isGameOver = true; // stop getting input from user
    setTimeout(audioPlay, 800); // play audio after 0.8s
    setTimeout(() => {
        showGameOverScreen(color);
    }, 1600); // show the game over screen after 1.6s
    updateLeaderboard();
}

function checkWinnerColumn(columnIndex) {
    for (let i = 0; i < board[columnIndex].length - 3; i++) {
        if (
            board[columnIndex][i] === board[columnIndex][i + 1] &&
            board[columnIndex][i + 1] === board[columnIndex][i + 2] &&
            board[columnIndex][i + 2] === board[columnIndex][i + 3]
        ) {
            if (board[columnIndex][i] !== 0) {
                setWinner(board[columnIndex][i]);

                // play animation on the winning squares
                divBoard[columnIndex][i].classList.add("markedSquare");
                divBoard[columnIndex][i + 1].classList.add("markedSquare");
                divBoard[columnIndex][i + 2].classList.add("markedSquare");
                divBoard[columnIndex][i + 3].classList.add("markedSquare");
            }
        }
    }
}

function checkWinnerRow(columnIndex, rowIndex) {
    let color = board[columnIndex][rowIndex];
    for (let i = 0; i < 4; i++) {
        if (
            board[i][rowIndex] === color &&
            board[i + 1][rowIndex] === color &&
            board[i + 2][rowIndex] === color &&
            board[i + 3][rowIndex] === color
        ) {
            // set winner
            setWinner(color);

            // play animation on the winning squares
            divBoard[i][rowIndex].classList.add("markedSquare");
            divBoard[i + 1][rowIndex].classList.add("markedSquare");
            divBoard[i + 2][rowIndex].classList.add("markedSquare");
            divBoard[i + 3][rowIndex].classList.add("markedSquare");
        }
    }
}

function checkWinnerDiagonal(columnIndex, rowIndex) {
    const color = board[columnIndex][rowIndex];

    if (color === 0) return; // return if the color is neither yellow or red

    let nextColumnIndex; // the index of the next column in the diagonal
    let nextRowIndex; // the index of the next row in the diagonal
    let pieceArray = []; // array for the winning pieces

    //
    // First diagonal
    //

    nextColumnIndex = columnIndex + 1;
    nextRowIndex = rowIndex - 1;
    pieceArray = [[columnIndex, rowIndex]]; // add the first piece to the array

    for (let i = 0; i < board.length; i++) {
        if (nextColumnIndex >= board.length || nextRowIndex >= board[0].length) {
            break; // out of bounds of array
        }
        if (board[nextColumnIndex][nextRowIndex] !== color) {
            break; // no wins in this diagonal
        }

        pieceArray.push([nextColumnIndex, nextRowIndex]); // adds the square to an array

        nextColumnIndex++; // go to the next column in the diagonal
        nextRowIndex--; // go to the next row in the diagonal

        if (pieceArray.length >= 4) {
            // check that 4 squares were added
            setWinner(color);
            // Mark squares
            for (let i = 0; i < pieceArray.length; i++) {
                const columnI = pieceArray[i][0];
                const rowI = pieceArray[i][1];
                divBoard[columnI][rowI].classList.add("markedSquare"); // play animation on winning squares
            }
        }
    }

    //
    // Second diagonal
    //
    nextColumnIndex = columnIndex - 1;
    nextRowIndex = rowIndex - 1;
    pieceArray = [[columnIndex, rowIndex]];
    for (let i = 0; i < board.length; i++) {
        if (nextColumnIndex < 0 || nextRowIndex < 0) {
            break; // out of bounds of array
        }
        if (board[nextColumnIndex][nextRowIndex] !== color) {
            break; // no wins in this diagonal
        }

        pieceArray.push([nextColumnIndex, nextRowIndex]);

        nextColumnIndex--;
        nextRowIndex--;

        if (pieceArray.length >= 4) {
            setWinner(color);
            // Mark squares
            for (let i = 0; i < pieceArray.length; i++) {
                const columnI = pieceArray[i][0];
                const rowI = pieceArray[i][1];
                divBoard[columnI][rowI].classList.add("markedSquare");
            }
        }
    }
}

// gets column and drops piece accordingly
function inputToColumn(columnIndex) {
    if (canPlay === false || isGameOver) return;
    const avilableSlot = getAvilableSlotInColumn(board[columnIndex]);
    if (avilableSlot === -1) return; // return if not available slot

    const fallTime = 600;
    const startingPosition = -600;
    const amountOfFrames = 1000;

    canPlay = false;

    // faling piece
    const fallingDiv = document.createElement("div");
    fallingDiv.classList.add("falling-piece");
    fallingDiv.style.backgroundColor = currentPlayer;
    setChildPiecePos(fallingDiv, startingPosition);
    divBoard[columnIndex][avilableSlot].appendChild(fallingDiv);

    moveDown(fallingDiv, startingPosition, amountOfFrames, fallTime); // falling animation

    setTimeout(() => {
        setPiece(columnIndex, currentPlayer);
    }, fallTime); // set piece after falling animation

    setTimeout(function () {
        fallingDiv.remove();
        canPlay = true;
    }, fallTime);
    //changePlayer();
}

// keyboard input
document.addEventListener("keydown", function (event) {
    const key = event.key; // key that was pressed
    if (key < "1" || key > "7") return; // return if key is not the 1-7 keys
    inputToColumn(key - 1); // send valid input
});

newGame.addEventListener("click", function () {
    window.location.reload();
});

// offset the falling piece to be on the top of the screen
function setChildPiecePos(piece, pos) {
    piece.style.setProperty("transform", `translateY(${pos}px)`, "important");
}

// move the falling piece down until it reaches its parent
function moveDown(piece, startingPos, amountOfFrames, time) {
    let updatedPosition = startingPos;
    for (let i = 0; i < amountOfFrames; i++) {
        updatedPosition -= startingPos / amountOfFrames;
        setTimeout(
            setChildPiecePos,
            i * (time / amountOfFrames),
            piece,
            updatedPosition
        );
    }
}

function updateSavedPoints(winner) {
    if (
        sessionStorage.getItem("player1") === null ||
        sessionStorage.getItem("player2") === null
    )
        return;

    if (winner === "R") {
        const player1Name = sessionStorage.getItem("player1");
        const player1Points = Number(localStorage.getItem(player1Name));
        localStorage.setItem(player1Name, player1Points + 1);
    }

    if (winner === "Y") {
        const player2Name = sessionStorage.getItem("player2");
        const player2Points = Number(localStorage.getItem(player2Name));
        localStorage.setItem(player2Name, player2Points + 1);
    }
}

// show the game over screen and set it based on the winner
function showGameOverScreen(winner) {
    const screen = document.getElementById("end-game-screen");
    const gameoverText = document.getElementById("gameover-text");
    const pointsText = document.getElementById("points");

    if (winner === "R") {
        gameoverText.innerHTML = `המשחק נגמר ${player1Name} ניצח`;
    }
    if (winner === "Y") {
        gameoverText.innerHTML = `המשחק נגמר ${player2Name} ניצח`;
    }
    if (winner === "Draw") {
        gameoverText.innerHTML = "תקו";
    }
    screen.classList.add("swirlingObject");
    screen.style.visibility = "visible";
    pointsText.innerHTML = `<span style="color: yellow">${sessionPointsYellow}</span> | <span style="color: red">${sessionPointsRed}</span>`
}

function initializePlayerNameInputs() {
    if (sessionStorage.getItem("player1") !== null && sessionStorage.getItem("player2") !== null) {
        canPlay = true;
        if (sessionStorage.getItem("player1") === "" || sessionStorage.getItem("player2") === "") return;
        player1Name = sessionStorage.getItem("player1");
        player2Name = sessionStorage.getItem("player2");
        return;
    }
    document.getElementById("start-screen").style.visibility = "visible";
    document
        .getElementById("players-form")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            document.getElementById("start-screen").style.visibility = "hidden";

            const playerOne = document.getElementById("playerOne");
            const playerTwo = document.getElementById("playerTwo");

            const yellow = playerOne.value;
            const red = playerTwo.value;
            let yellowP;
            let redP;
            if (
                localStorage.getItem(yellow) !== null ||
                localStorage.getItem(red) !== null
            ) {
                yellowP = 0;
                redP = 0;
            } else {
                yellowP = parseInt(localStorage.getItem(yellow));
                redP = parseInt(localStorage.getItem(yellow));
            }

            console.log("Yellow: " + yellow + " Red: " + red);

            sessionStorage.setItem("player1", yellow);
            sessionStorage.setItem("player2", red);
            if (
                localStorage.getItem(yellow) === null &&
                localStorage.getItem(red) !== localStorage.getItem(yellow)
            )
                localStorage.setItem(yellow, yellowP);
            if (
                localStorage.getItem(red) === null &&
                localStorage.getItem(red) !== localStorage.getItem(yellow)
            )
                localStorage.setItem(red, redP);

            canPlay = true;

            if (
                sessionStorage.getItem("player1") === "" ||
                sessionStorage.getItem("player2") === ""
            )
                return;
            player1Name = sessionStorage.getItem("player1");
            player2Name = sessionStorage.getItem("player2");
            changePlayer();
        });
}

function updateLeaderboard() {
    // get all keys from local storage
    let keys = Object.keys(localStorage);

    // remove keys that are not relevent
    keys = keys.filter((item) => {
        return item !== "redWins" && item !== "yellowWins";
    });

    // get the values that are inside the keys and save them inside another array
    const valueArray = keys.map((item) => {
        return localStorage.getItem(item);
    });

    // sort the array from highest value to lowest value
    valueArray.sort((a, b) => parseInt(b) - parseInt(a));

    console.log(valueArray);

    // go through each key and ... 
    for (let i = 0; i < keys.length; i++) {
        const itemValue = localStorage.getItem(keys[i]);
        for (let j = 0; j < valueArray.length; j++) {
            if (valueArray[j] === itemValue) {
                valueArray[j] = keys[i];
                break;
            }
        }
    }

    const table = document.getElementById("leaderboard-table");
    //   for (let i = 1; i < table.rows.length; i++) {
    //     table.deleteRow(i);
    //   }
    while (table.rows.length > 1) {
        table.children(1).remove();
    }

    for (let i = 0; i < valueArray.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = valueArray[i];
        td2.innerHTML = localStorage.getItem(valueArray[i]);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    console.log(table.children[0]);
}

// initialize the game
createBoard();
initializePlayerNameInputs();
changePlayer();
updateLeaderboard();

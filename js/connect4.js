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
    if (winner==="") {
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
    if (avilableSlot === -1) return;
    board[columnIndex][avilableSlot] = color.charAt(0).toUpperCase();
    divBoard[columnIndex][avilableSlot].style.backgroundColor = color;
    console.log(board);
    checkWinnerColumn(board[columnIndex])
    checkWinnerRow(columnIndex, avilableSlot)
}

function checkWinnerColumn(column){
    console.log(column)
    for(let i=0; i<column.length-3; i++) {
        if(column[i]===column[i+1]&&column[i+1]===column[i+2]&&column[i+2]===column[i+3]){
            if(column[i]==="Y"){
                winner = column[i]
                turnInfo.innerHTML = "הצהוב מנצח"
            }
            if(column[i]==="R"){
                winner = column[i]
                turnInfo.innerHTML = "האדום מנצח"
            }
        }
    }
}

function checkWinnerRow(columnIndex, rowIndex) {
    // console.log("row: " + rowIndex)
    // console.log("column: " + columnIndex)
    let color = board[columnIndex][rowIndex];
    for (let i=0; i<4; i++) {
        if(board[i][rowIndex]===color&&board[i+1][rowIndex]===color&&
            board[i+2][rowIndex]===color&&board[i+3][rowIndex]
        ){
            console.log("winner")
            console.log(color)
            if(color==="R"){
                winner = color
                turnInfo.innerHTML = "האדום מנצח"
            }
            if(color==="Y"){
                winner = color
                turnInfo.innerHTML = "הצהוב מנצח"
            }
        }
    }
}


document.addEventListener('keydown', function (event) {
    const key = event.key; // What key was pressed
    //const code = event.code; Physical key on the keyboard
    console.log(`Key pressed: ${key}`);
    setPiece(key - 1, currentPlayer)
    changePlayer();
});

createBoard();
setPiece(0, currentPlayer);
setPiece(0, currentPlayer);
changePlayer();
setPiece(0, currentPlayer);
setPiece(0, currentPlayer);

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

const testDiv = document.createElement("div")
testDiv.id = "hello"
divBoard[0][5].appendChild(testDiv)
moveDown(testDiv, -500, 1000, 1000)
//setTimeout(setChildPiecePos(testDiv, -100), 9000);
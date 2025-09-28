function changePlayer() {
    if (currentPlayer==="red") {
        currentPlayer="yellow"
        body.style.backgroundColor="yellow"
    }
    else {
        currentPlayer="red";
        body.style.backgroundColor="red";
    }
}

let container = document.getElementById("container");

let board = [];
for(let i=0; i<6; i++) {
    let row = [];
    for (let j=0; j<7; j++){
        let square = document.createElement("div");
        container.appendChild(square)
        row.push(square);
    }
    board.push(row);
}
console.log(board);

let body = document.querySelector("body")
let switchPlayer = document.getElementById("switchPlayer")
let currentPlayer = "red"
switchPlayer.addEventListener("click", changePlayer)

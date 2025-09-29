const redWins = parseInt(localStorage.getItem("redWins"))
const yellowWins = parseInt(localStorage.getItem("yellowWins"))

let redRate = (redWins/(redWins+yellowWins) * 100).toFixed(2);
let yellowRate = (yellowWins/(redWins+yellowWins) * 100).toFixed(2);

const yellowtd = document.getElementById("yellow")
const redtd = document.getElementById("red")

redtd.innerHTML = redRate + "%"
yellowtd.innerHTML = yellowRate + "%"

document.getElementById("countyellow").innerHTML = yellowWins
document.getElementById("countred").innerHTML = redWins
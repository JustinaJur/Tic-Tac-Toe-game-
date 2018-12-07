var com = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
var table = document.querySelector("table");
var h1 = document.querySelector("h1");
var td = document.querySelectorAll("td");
var player = ["X", "O"];
var winner = "";
var turn = 0;
var catGame = 0;
var scoresOfX = [];
var scoresOfO = [];
var gameover = false;

play();

function play() {
    for (var i = 0; i < td.length; i++) {
        td[i].addEventListener("click", function () {

            if (!gameover) {
                //if square is empty
                if (this.innerHTML == "") {
                    //display X or O on clicked square
                    this.innerHTML = player[turn];
                    //count catGame
                    catGame += Number(this.id);
                    //collect clicked squares(scores)
                    collectScores(this);
                };
            }
            //after every click check if anyone won
            if (gameWin()) {
                announceWinner(winner);
                gameover = true;
            }
            //if catGame - finish game 
            if (catGame === 36 && !gameWin()) {
                h1.innerText = "Sorry, NO ONE has won!!!";
                h1.style.color = "white";
                for (var i = 0; i < td.length; i++) {
                    td[i].style.backgroundColor = "#D7CCC8";
                }
            };
        })
    }
    changePlayers();
}

//announce winner
function announceWinner(who) {
    h1.innerText = "Player " + who + " is the WINNER";
    h1.style.color = "#5C6BC0";
    for (var i = 0; i < td.length; i++) {
        td[i].style.backgroundColor = "#FF8F00";
    }
};

//compare clicked squares with win combinations
function gameWin() {
    for (var i = 0; i < com.length; i++) {
        if (com[i].every(elem => scoresOfX.indexOf(elem) > -1)) {
            winner = player[0];
            return true;
        }
        else if (com[i].every(elem => scoresOfO.indexOf(elem) > -1)) {
            winner = player[1];
            return true;
        }
    }
    return false;
}

//change players
function changePlayers() {
    turn == 0 ? turn = 1 : turn = 0;
}

//collect clicked squares of X and O in their arrays
function collectScores(clickedTd) {
    player[turn] === "X" ? scoresOfX.push(Number(clickedTd.id)) : scoresOfO.push(Number(clickedTd.id));
}

function reset() {
    gameover = false;
    scoresOfX = [];
    scoresOfO = [];
    catGame = 0;
    turn = 0;
    h1.innerText = "TIC TAC TOE";
    h1.style.color = "black";
    for (var i = 0; i < td.length; i++) {
        td[i].innerText = "";
        td[i].style.backgroundColor = "#C8E6C9";
    };
    play();
};





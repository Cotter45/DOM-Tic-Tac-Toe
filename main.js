import { TTT } from "./tic-tac-toe.js";

let logic = new TTT();

const reset = () => {
    logic.resetGrid();
    resetDisplay();
    localStorage.clear();
}

const updatePlayer = () => {
    let header = document.querySelector("h3");
    header.innerText = `Current Player Turn: ${logic.playerTurn}`;
}

const game = () => {
    const board = document.getElementById("board");
    board.addEventListener("click", event => {
        let move = event.target.id;
        localStorage.setItem("lastMove", move);
        logic.makeMove(move);
        updatePlayer();
        if(logic.checkWin(logic.grid)) {
            logic.endGame(logic.checkWin(logic.grid));
            reset();
            return;
        }
        logic.computerTurn();
        updatePlayer();
        if(logic.checkWin(logic.grid)) {
            logic.endGame(logic.checkWin(logic.grid));
            reset();
        }
    });
}

const newGame = () => {
    const button = document.getElementById("new-game");
    button.addEventListener("click", event => {
        reset();
    })
}

const giveUp = () => {
    const button = document.getElementById("give-up");
    button.addEventListener("click", event => {
        logic.endGame();
        reset();
    })
}

const resetDisplay = () => {
    let divs = document.querySelectorAll("div > div")
    divs.forEach(div => {
        div.style.backgroundImage = "none";
    })

}

const saveGame = () => {
    for (let row = 0; row < logic.grid.length; row++){
        for (let col = 0; col < logic.grid[row].length; col++){
            if(localStorage.getItem(`${row}-${col}`)){
                logic.makeMove(`${row}-${col}`, localStorage.getItem(`${row}-${col}`))
            }
        }
    }
}

window.onload = () => {
    updatePlayer();
    saveGame();
    game();
    newGame();
    giveUp();
}

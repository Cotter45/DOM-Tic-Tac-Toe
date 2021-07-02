export class TTT {
  constructor() {
    if(localStorage.getItem("player-turn")){
      this.playerTurn = localStorage.getItem("player-turn");
    } else {
      this.playerTurn = "O";
    }
    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']];
  }

  resetGrid() {
    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]
  }

  makeMove(move, player = this.playerTurn) {
      const split = move.split("-");
      let row = split[0];
      let col = split[1];
      let div = document.getElementById(move);
      if (this.grid[row][col] === " ") {
          localStorage.setItem(`${move}`, `${player}`)
          if (player === "X") {
              this.grid[row][col] = "X"
              div.style.backgroundImage = "URL('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg')"
          } else {
              div.style.backgroundImage = "URL('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg')"
              this.grid[row][col] = "O"
          }
          this.changePlayer();
      } else {
          alert("Invalid Move");
      }
  }

  getMove() {
    let moves = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === ' ') {
            moves.push(`${i}-${j}`)
        }
        if (i === 0 &&
            this.grid[i][j] === 'X' &&
            this.grid[i + 1][j] === 'X' ||
            i === 0 &&
            this.grid[i][j] === 'O' &&
            this.grid[i + 1][j] === 'O') {
              if (this.grid[i + 2][j] === " ") {
                return `${i + 2}-${j}`
              }
        }
        if (j === 0 &&
            this.grid[i][j] === 'X' &&
            this.grid[i][j + 1] === 'X' ||
            j === 0 &&
            this.grid[i][j] === 'O' &&
            this.grid[i][j + 1] === 'O') {
              if (this.grid[i][j + 2] === " ") {
                return `${i}-${j + 2}`
              }
        }
        if (i === 2 &&
          this.grid[i][j] === 'X' &&
          this.grid[i - 1][j] === 'X' ||
          i === 2 &&
          this.grid[i][j] === 'O' &&
          this.grid[i - 1][j] === 'O') {
            if (this.grid[i - 2][j] === " ") {
              return `${i - 2}-${j}`
            }
      }
      if (j === 2 &&
          this.grid[i][j] === 'X' &&
          this.grid[i][j - 1] === 'X' ||
          j === 2 &&
          this.grid[i][j] === 'O' &&
          this.grid[i][j - 1] === 'O') {
            if (this.grid[i][j - 2] === " ") {
              return `${i}-${j - 2}`
            }
      }
    }
  }

    let random = moves[Math.floor(Math.random() * moves.length)];
    let move = moves.splice(moves.indexOf(random), 1);
    return move[0];
  }

  computerTurn() {
    let move = this.getMove();
    let divMove = document.getElementById(`${move}`);

    if (this.playerTurn === "X") {
        this.grid[move[0]][move[2]] = "X"
        divMove.style.backgroundImage = "URL('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg')"
    } else if (this.playerTurn === "O") {
        this.grid[move[0]][move[2]] = "O"
        divMove.style.backgroundImage = "URL('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg')"
    }

    localStorage.setItem(`${move}`, `${this.playerTurn}`)
    this.changePlayer();

    localStorage.removeItem("lastMove");
  }

  changePlayer() {
      if (this.playerTurn === "O") {
          this.playerTurn = "X";
          localStorage.setItem("player-turn", "X")
      } else {
          this.playerTurn = "O";
          localStorage.setItem("player-turn", "O")
      }
  }

  checkWin(grid) {
    if (horizontals('X') || verticals('X') || diaganols('X')){
      return 'X'
    }
    if (horizontals('O') || verticals('O') || diaganols('O')){
      return 'O'
    }
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if (grid[i][j] === ' '){
              return false;
        }
      }
    }
    return 'T';

    function horizontals (char) {
      for (let row = 0; row < 3; row++){
        if (grid[row][0] === char && grid[row][1] === char && grid[row][2] === char) return true
      }
    }

    function verticals (char) {
      for (let col = 0; col < 3; col++){
        if (grid[0][col] === char && grid[1][col] === char && grid[2][col] === char) return true
      }
    }

    function diaganols (char) {
      if (grid[0][0] === char && grid[1][1] === char && grid[2][2] === char) return true;
      if (grid[0][2] === char && grid[1][1] === char && grid[2][0] === char) return true;
    }
  }

  endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      alert(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      alert(`Tie game!`);
    } else {
      alert(`Game Over`);
    }
  }
}

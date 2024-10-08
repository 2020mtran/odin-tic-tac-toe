// Gameboard needs to have 9 unmarked squares, marked with each time a player takes a turn
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (board[index] == "") {
            board[index] = marker;
        }
    }

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""]; // Reset the board  
    };

    return { getBoard, updateBoard, resetGame };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return { getName, getMarker };
}; 

const Gameflow = (() => {
    let currentPlayer;
    let player1;
    let player2;
    let gameOver = false;
    let winner = null;

    const startGame = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
        gameOver = false;
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const isGameOver = () => gameOver;

    const setGameOver = (player) => {
        gameOver = true;
        winner = player;
        console.log(winner ? `${winner.getName()} wins!` : "It's a draw!");
    }

    return { startGame, switchTurn, getCurrentPlayer, isGameOver, setGameOver };
})();

const processTurn = () => {
    const currentPlayer = Gameflow.getCurrentPlayer();

    const playerMove = prompt(`It's ${currentPlayer.getName()}'s turn. Enter a number (0-8):`);

    Gameboard.updateBoard(playerMove, currentPlayer.getMarker());

    if (checkWinner()) {
        Gameflow.setGameOver(currentPlayer);
    } else if (checkDraw()) {
        Gameflow.setGameOver(null);
    } else {
        Gameflow.switchTurn();
    }
};

const checkWinner = () => {
    const board = Gameboard.getBoard();

    const winningCombinations = [
        [0, 1, 2],  // First row
        [3, 4, 5],  // Second row
        [6, 7, 8],  // Third row
        [0, 3, 6],  // First column
        [1, 4, 7],  // Second column
        [2, 5, 8],  // Third column
        [0, 4, 8],  // Diagonal 1
        [2, 4, 6]   // Diagonal 2
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;

        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

const checkDraw = () => {
    const board = Gameboard.getBoard();

    for (let index in board) {
        if (board[index] === "") {
            return false;
        }
    }
    return true;
};

const playGame = () => {
    const name1 = prompt("Enter Player 1's name:");
    const name2 = prompt("Enter Player 2's name:");

    Gameflow.startGame(name1, name2); // Start the game with player names

    while (!Gameflow.isGameOver()) {
        processTurn();
    }

    console.log("Game over, thanks for playing!");
}

playGame();
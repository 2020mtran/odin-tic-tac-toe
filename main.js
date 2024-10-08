const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            document.querySelector(`[data-index="${index}"]`).textContent = marker;  // Update cell on the page
        }
    };

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = "";  // Clear the board visually
        });
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

    const startGame = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
        gameOver = false;
        document.getElementById('turnInfo').textContent = `${player1.getName()}'s turn`;
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.getElementById('turnInfo').textContent = `${currentPlayer.getName()}'s turn`;
    };

    const getCurrentPlayer = () => currentPlayer;

    const setGameOver = (winner) => {
        gameOver = true;
        document.getElementById('turnInfo').textContent = winner ? `${winner.getName()} wins!` : "It's a draw!";
    };

    return { startGame, switchTurn, getCurrentPlayer, setGameOver };
})();

const processTurn = (index) => {
    if (!Gameflow.isGameOver && Gameboard.getBoard()[index] === "") {
        const currentPlayer = Gameflow.getCurrentPlayer();
        Gameboard.updateBoard(index, currentPlayer.getMarker());

        if (checkWinner()) {
            Gameflow.setGameOver(currentPlayer);
        } else if (checkDraw()) {
            Gameflow.setGameOver(null);
        } else {
            Gameflow.switchTurn();
        }
    }
};

const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return Gameboard.getBoard().every(cell => cell !== "");
};

document.getElementById('startGameBtn').addEventListener('click', () => {
    const name1 = document.getElementById('player1').value || 'Player 1';
    const name2 = document.getElementById('player2').value || 'Player 2';
    Gameflow.startGame(name1, name2);
});

document.getElementById('resetGameBtn').addEventListener('click', () => {
    Gameboard.resetGame();
    const name1 = document.getElementById('player1').value;
    const name2 = document.getElementById('player2').value;
    Gameflow.startGame(name1, name2);
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        processTurn(index);
    });
});

$(document).ready(function() {
  const $board = $("#board");
  const $message = $("#message");
  const $resetButton = $("#reset");

  let currentPlayer = "X";
  let state = Array(9).fill(null);
  let gameOver = false;

  function createBoard() {
      $board.empty();
      state.forEach((_, i) => {
          const $cell = $("<div>")
              .addClass("cell")
              .data("index", i)
              .on("click", handleClick);
          $board.append($cell);
      });
  }

  function handleClick() {
      const index = $(this).data("index");

      if (gameOver || state[index]) return;

      state[index] = currentPlayer;
      $(this).text(currentPlayer).addClass("taken");

      if (checkWin()) {
          $message.text(`Jogador ${currentPlayer} venceu!`);
          gameOver = true;
      } else if (state.every(cell => cell)) {
          $message.text("Empate!");
          gameOver = true;
      } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          $message.text(`Jogador ${currentPlayer}'s turn`);
      }
  }

  function checkWin() {
      const wins = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];

      return wins.some(combo => {
          const [a, b, c] = combo;
          return state[a] && state[a] === state[b] && state[a] === state[c];
      });
  }

  $resetButton.on("click", function() {
      state.fill(null);
      gameOver = false;
      currentPlayer = "X";
      $message.text("Jogador X começa!");
      createBoard();
  });

  createBoard();
});
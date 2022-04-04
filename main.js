let x = 0,
  y = 1;

let turn = 0;

let moves = {
  x: [],
  y: [],
};

$(document).ready(function () {
  $("[data-value]").click(function ({
    target: {
      dataset: { value },
    },
  }) {
    let player = turn === 0 ? "x" : "y";
    let icon =
      player === "x"
        ? `<i class="far fa-times"></i>`
        : `<i class="far fa-circle"></i>`;
    moves = {
      ...moves,
      [player]: [...moves[player], parseInt(value)],
    };
    $(`[data-value=${value}]`).html(icon);
    turn = turn === 0 ? 1 : 0;
    findWinner(player);
  });
});

function findWinner(player) {
  let possibilities = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let result = possibilities.map((combination) => {
    let playerMoves = moves[player];
    let isExist = combination.every((position) => {
      return playerMoves.includes(position);
    });
    return isExist;
  });

  let [isWinner] = result.filter(Boolean);

  console.log(isWinner);
  if (isWinner) {
    setTimeout(() => {
      alert(player === 0 ? "Player A is the winner" : "Player B is the winner");
    }, 500);
  } else {
    if ([...moves.x, ...moves.y].length === 9) {
      setTimeout(() => {
        if (window.confirm("Match Draw! Click ok to reset the match again")) {
          reset();
        }
      }, 500);
    }
  }
}

function reset() {
  $("[data-value]").empty();
  turn = 0;
  moves = {
    x: [],
    y: [],
  };
}

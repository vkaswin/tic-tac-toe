let x = 0,
    y = 1;

let turn = 0;

let moves = {
    x: [],
    y: []
};

$(document).ready(function () {
    $('.btn-reset').click(function () {
        reset();
    });
    $('[data-value]').click(function ({
        target: {
            dataset: { value }
        }
    }) {
        let player = turn === 0 ? 'x' : 'y';
        let icon =
            player === 'x'
                ? `<i class="far fa-times"></i>`
                : `<i class="far fa-circle"></i>`;
        moves = {
            ...moves,
            [player]: [...moves[player], parseInt(value)]
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
        [3, 5, 7]
    ];

    let result = possibilities.map((combination) => {
        let playerMoves = moves[player];
        let isExist = combination.every((position) => {
            return playerMoves.includes(position);
        });
        return isExist;
    });

    let [isWinner] = result.filter(Boolean);

    if (isWinner) {
        let toast = $('.success-toast');
        toast.html($('<span></span>').text(`Winner is Player ${player}`));
        toast.show();
        $('.btn-reset').show();
        let canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        let myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });
        myConfetti({
            particleCount: 100,
            spread: 160
        });
        setTimeout(() => {
            canvas.remove();
        }, 3000);
    } else {
        if ([...moves.x, ...moves.y].length === 9) {
            if (
                window.confirm('Match Draw! Click ok to reset the match again')
            ) {
                reset();
            }
        }
    }
}

function reset() {
    $('[data-value]').empty();
    $('.btn-reset').hide();
    $('.success-toast').hide();
    turn = 0;
    moves = {
        x: [],
        y: []
    };
}

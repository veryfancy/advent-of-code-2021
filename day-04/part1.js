const inputFilePath = "./day-04/input.txt"

function readFile(filepath) {
    return require("fs").readFileSync(filepath, "utf-8");
}

function toNumber(str) {
    return parseInt(str, 10);
}

function parseDraws(str) {
    return str
        .split(",")
        .map(toNumber);
}

function parseBoard(str) {
    return str
        .split("\n")
        .map(line => {
            return line
                .trim()
                .split(/\s+/)
                .map(toNumber);
        });
}

function boardScore(board, drawnNums) {
    let sum = 0;
    board.forEach(line => {
        line.forEach(col => {
            if (!drawnNums.includes(col)) {
                sum += col;
            }
        });
    });
    return sum * drawnNums[drawnNums.length-1];
}

function isBoardHorizontalWinner(board, drawnNums) {
    const size = 5;
    const range = [...Array(size).keys()];

    return range.some(line => {
        return range.every(col => {
            return drawnNums.includes(board[line][col])
        })
    });
}

function isBoardVerticalWinner(board, drawnNums) {
    const size = 5;
    const range = [...Array(size).keys()];

    return range.some(col => {
        return range.every(line => {
            return drawnNums.includes(board[line][col])
        })
    });
}

// Ha, didn't notice the instruction "Diagonals don't count.". Read the instructions, Josh.
// function isBoardDiagonalWinner(board, drawnNums) {
//     const size = 5;
//     const range = [...Array(size).keys()];
//     return (
//         range.every(
//             i => drawnNums.includes(board[i][i])
//         )
//     ) || (
//         range.every(
//             i => drawnNums.includes(board[i][(size-1)-i])
//         )
//     );
// }

function isBoardWinner(board, drawnNums) {
    return isBoardHorizontalWinner(board, drawnNums) ||
        isBoardVerticalWinner(board, drawnNums);
}

function parseInput(str) {
    const parts = str
        .trim()
        .split("\n\n");

    const [draws, ...boards] = parts;

    return {
        draws: parseDraws(draws),
        boards: boards.map(parseBoard)
    };
}

function main() {
    const {
        draws,
        boards
    } = parseInput(readFile(inputFilePath));

    const drawn = [];
    let winner = null
    for(let i=0;i<draws.length;i++) {
        drawn.push(draws[i]);
        winner = boards.find(board => isBoardWinner(board, drawn));
        if(winner) break;
    }

    let score = boardScore(winner, drawn)

    console.log("score:", score);
}

main();

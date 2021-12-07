
function readInput() {
    return require("fs")
        .readFileSync("./day-07/input.txt", "utf-8")
        .trim()
        .split(",")
        .map(x => parseInt(x, 10));
}

// https://en.wikipedia.org/wiki/Triangular_number
function triangular(n) {
    return (n*(n+1)) / 2;
}

function fuelToTraverse(a, b) {
    return triangular(Math.abs(a - b));
}

function fuelForTargetPosition(targetPosition, initialPositions) {
    return initialPositions
        .map(x => fuelToTraverse(x, targetPosition))
        .reduce((x,y) => x+y, 0);
}

function search(initialPositions) {
    const min = Math.min.apply(null, initialPositions);
    const max = Math.max.apply(null, initialPositions);

    let optimumFuel = fuelForTargetPosition(min, initialPositions);
    let optimumPosition = min;

    for(let i=optimumPosition+1;i <= max;i++) {
        const fuel = fuelForTargetPosition(i, initialPositions);

        if (fuel < optimumFuel) {
            optimumFuel = fuel;
            optimumPosition = i;
        }
    }

    return {
        position: optimumPosition,
        fuel: optimumFuel
    };
}

function main() {
    const initialPositions = readInput();
    const optimum = search(initialPositions);
    console.log(`optimum: position ${optimum.position} requires ${optimum.fuel} fuel`);
}

main();

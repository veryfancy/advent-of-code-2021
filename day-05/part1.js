const inputFilePath = "./day-05/input.txt"

function readFile(filepath) {
    return require("fs").readFileSync(filepath, "utf-8");
}

function toNumber(str) {
    return parseInt(str, 10);
}

function parseLine(str) {
    const points = str.split(" -> ");
    const [x1,y1] = points[0].split(",").map(toNumber);
    const [x2,y2] = points[1].split(",").map(toNumber);
    return { x1, y1, x2, y2 };
}

function isVertical(line) {
    return line.x1 === line.x2;
}

function isHorizontal(line) {
    return line.y1 === line.y2;
}

function parseInput(str) {
    const lines = str
        .trim()
        .split("\n");

    return lines
        .map(parseLine)
        .filter(l => (isHorizontal(l) || isVertical(l)));
}

function isTargetInRange(target, boundary1, boundary2) {
    const min = Math.min(boundary1, boundary2);
    const max = Math.max(boundary1, boundary2);
    return target >= min && target <= max;
}

function isPointOnLine(x, y, line) {
    if(isHorizontal(line)) {
        return (
            line.y1 === y
            &&
            isTargetInRange(x, line.x1, line.x2)
        );
    }

    if(isVertical(line)) {
        return (
            line.x1 === x
            &&
            isTargetInRange(y, line.y1, line.y2)
        );
    }

    return false;
}

function main() {
    const lines = parseInput(readFile(inputFilePath));

    const size = 1000;
    const intersections = [];
    for(let i=0;i<size;i++) {
        for(let j=0;j<size;j++) {
            const hits = lines
                .filter(l => isPointOnLine(i,j,l));
            if (hits.length > 1) {
                intersections.push([i,j]);
            }
        }
    }

    console.log("danger zones:", intersections.length);
}

main();

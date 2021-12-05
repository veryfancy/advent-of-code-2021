const inputFilePath = "./day-05/input.txt"
const LINE_TYPE = {
    DIAGONAL_UP: "diagonal-up",
    DIAGONAL_DOWN: "diagonal-down",
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
};

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

    // start from point with lower x
    let xStart, yStart, xEnd, yEnd;
    if (x1 < x2) {
        xStart = x1;
        xEnd = x2;
        yStart = y1;
        yEnd = y2;
    } else {
        xStart = x2;
        xEnd = x1;
        yStart = y2;
        yEnd = y1;
    }

    let type;
    if(xStart == xEnd) {
        type = LINE_TYPE.VERTICAL;
        // start from point with lower y for vertical
        if(yStart > yEnd){
            [yStart, yEnd] = [yEnd, yStart];
        }
    } else if (yStart == yEnd) {
        type = LINE_TYPE.HORIZONTAL;
    } else if (yStart < yEnd) {
        type = LINE_TYPE.DIAGONAL_UP;
    } else {
        type = LINE_TYPE.DIAGONAL_DOWN;
    }

    return {
        type,
        xStart,
        xEnd,
        yStart,
        yEnd
    };
}

function parseInput(str) {
    const lines = str
        .trim()
        .split("\n");

    return lines
        .map(parseLine);
}

function isPointOnDiagonalLine(x, y, line) {
    let { type, xStart, yStart, xEnd } = line;

    const length = xEnd-xStart;

    for (let i=0;i<=length;i++) {
        if (
            x === xStart+i &&
            ( type === LINE_TYPE.DIAGONAL_UP ? ( y === yStart+i ) : ( y === yStart-i ) )
        ) {
            return true;
        }
    }

    return false;
}

function isPointOnHorizontalLine(x, y, line) {
    return y == line.yStart &&
        x >= line.xStart && x <= line.xEnd;
}

function isPointOnVerticalLine(x, y, line) {
    return x == line.xStart &&
        y >= line.yStart && y <= line.yEnd;
}

function isPointOnLine(x, y, line) {
    if (line.type === LINE_TYPE.HORIZONTAL) {
        return isPointOnHorizontalLine(x, y, line);
    }

    if (line.type === LINE_TYPE.VERTICAL) {
        return isPointOnVerticalLine(x, y, line);
    }

    return isPointOnDiagonalLine(x, y, line);
}

function main() {
    const lines = parseInput(readFile(inputFilePath));

    const size = 1000;
    const intersections = [];
    for(let i=0;i<size;i++) {
        for(let j=0;j<size;j++) {
            let hits = 0;
            for(let k=0;k<lines.length;k++) {
                if (isPointOnLine(i,j,lines[k])) {
                    hits += 1;
                }
                if (hits > 1) {
                    intersections.push([i,j]);
                    break;//stop search at two hits
                }
            }
        }
    }

    console.log("danger zones:", intersections.length);
}

main();

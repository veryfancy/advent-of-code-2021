const inputFilePath = "./day-09/input.txt"

function readFile(filepath) {
    return require("fs")
        .readFileSync(filepath, "utf-8")
        .trim();
}

function parseInput(str) {
    return str
        .split("\n")
        .map(line => {
            return line
                .split("")
                .map(x => parseInt(x, 10))
        });
}

function findLows(map) {
    const lows=[];
    const xSize=map.length;
    const ySize=map[0].length;
    for(let x=0;x<xSize;x++) {
        for(let y=0;y<ySize;y++) {
            if (
                ( x===xSize-1 || map[x][y] < map[x+1][y] ) &&
                ( y===ySize-1 || map[x][y] < map[x][y+1]) &&
                ( x===0 || map[x][y] < map[x-1][y]) &&
                ( y===0 || map[x][y] < map[x][y-1] )
            ) {
                lows.push(map[x][y]);
            }
        }
    }
    return lows;
}

function main() {
    const map = parseInput(
        readFile(inputFilePath)
    );

    const lowPoints = findLows(map);

    console.log("risk sum:", lowPoints.reduce((acc,x) => acc+x+1, 0))
}

main();


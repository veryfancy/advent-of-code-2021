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
                lows.push([x, y]);
            }
        }
    }
    return lows;
}

function keyFrom(x,y) {
    return `${x}-${y}`;
}

function basinSize(lowPoint, map, checked={}) {
    const xSize=map.length;
    const ySize=map[0].length;
    const [x,y] = lowPoint;

    if (map[x][y]===9 ) {
        return 0;
    }

    let result = 1;

    checked[keyFrom(x,y)] = true;


    if (x+1 < xSize && checked[keyFrom(x+1,y)]!==true) {
        result += basinSize([x+1,y], map, checked);
    }

    if (y+1 < ySize && checked[keyFrom(x,y+1)]!==true) {
        result += basinSize([x,y+1], map, checked);
    }

    if (x-1 >= 0 && checked[keyFrom(x-1,y)]!==true) {
        result += basinSize([x-1,y], map, checked);
    }

    if (y-1 >= 0 && checked[keyFrom(x,y-1)]!==true) {
        result += basinSize([x,y-1], map, checked);
    }

    return result;
}

function main() {
    const map = parseInput(
        readFile(inputFilePath)
    );

    const lowPoints = findLows(map);

    const sizes = lowPoints
        .map(p => {
            return basinSize(p, map);
        })
        .sort((a,b) => { return b-a});

    console.log("product of top three basin sizes:", sizes[0]*sizes[1]*sizes[2])

}

main();


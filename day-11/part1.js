
const inputFilePath = "./day-11/input.txt"

function readFile(filepath) {
    return require("fs")
        .readFileSync(filepath, "utf-8")
        .trim();
}

function parseInput(str) {
    return str.split("\n")
        .map(line => (
                line.split("")
                    .map(c => parseInt(c, 10))
            )
        );
}

function printMap(map) {
    map.forEach(line => {
        console.log(line.join(""))
    });
}

function flash(x, y, map, flashed) {
    if (!flashed[keyFor(x,y)]) {
        flashed[keyFor(x,y)] = true;

        let adjacents = [
            [x-1,   y-1 ],
            [x-1,   y   ],
            [x-1,   y+1 ],
            [x,     y-1 ],
            [x,     y+1 ],
            [x+1,   y-1 ],
            [x+1,   y   ],
            [x+1,   y+1 ],
        ].filter( ([x1,y1]) => { return onMap(x1,y1,map); } );
        
        adjacents.forEach( ([x1,y1]) => {
            map[x1][y1]++;

            if (map[x1][y1] > 9) {
                flash(x1, y1, map, flashed);
            }
        });
    }
}

function onMap(x,y,map) {
    return x >= 0 && y >= 0 &&
        x <= map.length - 1 &&
        y <= map[x].length - 1
    // return typeof map[x] !== "undefined" &&
    //     typeof map[x][y] !== "undefined"
}

function keyFor(x,y) { return [x,y].join(","); }

function applyStep(map) {
    // increment everyone's energy by one
    for(let x=0; x<map.length; x++) {
        for(let y=0; y<map[x].length; y++) {
            map[x][y]++
        }
    }

    // flash any > 9
    let flashed = {};
    for(let x=0; x<map.length; x++) {
        for(let y=0; y<map[x].length; y++) {
            if (map[x][y] > 9) {
                flash(x, y, map, flashed)
                // flash!
            }
        }
    }

    // reset any > 9 to zero
    for(let x=0; x<map.length; x++) {
        for(let y=0; y<map[x].length; y++) {
            if (map[x][y] > 9) {
                map[x][y] = 0;
            }
        }
    }

    return Object.keys(flashed).length;
}

function main() {
    const map = parseInput(readFile(inputFilePath));
    
    const steps = 100;
    let flashes = 0;

    for(let i=0;i<steps;i++) {
        flashes += applyStep(map);
    }

    // printMap(map);

    console.log(`${flashes} flashes`)
}


main();

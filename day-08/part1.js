
const inputFilePath = "./day-08/input.txt"

function readFile(filepath) {
    return require("fs")
        .readFileSync(filepath, "utf-8")
        .trim();
}

function parseInput(str) {
    return str
        .split("\n")
        .map(parseEntry);
}

// return the number of output values of length 2, 3, 4 or 7
function parseEntry(str) {
    return str
        .split("|")[1]
        .trim()
        .split(" ")
        .filter(x => [2,3,4,7].includes(x.length))
        .length;
}

function main() {
    const entryMatches = parseInput(readFile(inputFilePath));

    const count = entryMatches.reduce( (acc,x) => acc+x, 0 );
    
    console.log("known digits in output values:", count);
}

main();

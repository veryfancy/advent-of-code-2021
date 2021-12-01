
const inputFilePath = "./day-01/input.txt"

function readFile(filepath) {
    return require("fs").readFileSync(filepath, "utf-8");
}

function parseInput(str) {
    return str.split("\n").map(x => parseInt(x))
}

function main() {
    const measurements = parseInput(
        readFile(inputFilePath)
    )

    let increases = 0;
    for(let i=3; i<measurements.length; i++) {
        let window1Sum = measurements[i-1] + measurements[i-2] + measurements[i-3];
        let window2Sum = measurements[i] + measurements[i-1] + measurements[i-2];

        if (window2Sum > window1Sum) {
            increases++;
        }
    }

    console.log("increases:", increases);
}

main();

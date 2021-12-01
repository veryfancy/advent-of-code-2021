
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

    console.log(measurements)

    let increases = 0;
    for(let i=1; i<measurements.length; i++) {
        if (measurements[i] > measurements[i-1]) {
            increases++;
        }
    }

    console.log("increases:", increases)
}

main();
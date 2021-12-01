
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
        let windowIngress = measurements[i];
        let windowEgress = measurements[i-3];

        if (windowIngress > windowEgress) {
            increases++;
        }
    }

    console.log("increases:", increases);
}

main();

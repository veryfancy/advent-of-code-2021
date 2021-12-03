const inputFilePath = "./day-03/input.txt"

function readFile(filepath) {
    return require("fs").readFileSync(filepath, "utf-8");
}

function parseLine(line) {
    return line.split("");
}

function parseInput(str) {
    return str.split("\n").map(parseLine);
}

function mostCommons(nets) {
    return nets.map(x => x > 0 ? "1" : "0").join("");
}

function leastCommons(nets) {
    return nets.map(x => x < 0 ? "1" : "0").join("");
}

function main() {
    const readings = parseInput(readFile(inputFilePath));

    const nets = new Array(readings[0].length).fill(0);

    for(let i=0; i<readings.length; i++) {
        for(let j=0; j<readings[i].length; j++) {
            if (readings[i][j]=="0") {
                nets[j] -= 1;
            } else if (readings[i][j]=="1") {
                nets[j] += 1;
            } else {
                throw new Error("Didn't expect that reading")
            }
        }
    }

    const gammaRate = parseInt(mostCommons(nets), 2);
    console.log("gamma rate:", gammaRate);

    const epsilonRate = parseInt(leastCommons(nets), 2);
    console.log("epsilon rate:", epsilonRate);


    console.log("product:", gammaRate*epsilonRate);
}

main();

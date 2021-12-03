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

function cloneArray(arr) {
    return [...arr];
}

function getNets(readings) {
    let nets = new Array(readings[0].length).fill(0);
    for(let i=0; i<readings.length; i++) {
        for(let j=0; j<readings[i].length; j++) {
            if (readings[i][j]=="0") {
                nets[j] -= 1;
            } else if (readings[i][j]=="1") {
                nets[j] += 1;
            }
        }
    }
    return nets;
}

function main() {
    const readings = parseInput(readFile(inputFilePath));

    let oxyCandidates = cloneArray(readings);
    let oxyBit = 0;
    while(oxyCandidates.length > 1) {
        const nets = getNets(oxyCandidates);
        oxyCandidates = oxyCandidates.filter(x => (x[oxyBit] == ( nets[oxyBit] >= 0 ? "1" : "0" )));
        oxyBit++;
    }
    let oxygenGeneratorRating = parseInt(oxyCandidates[0].join(""), 2);

    let co2Candidates = cloneArray(readings);
    let co2Bit = 0;
    while(co2Candidates.length > 1) {
        const nets = getNets(co2Candidates);
        co2Candidates = co2Candidates.filter(x => (x[co2Bit] == ( nets[co2Bit] < 0 ? "1" : "0" )));
        co2Bit++;
    }
    let co2ScrubberRating = parseInt(co2Candidates[0].join(""), 2);

    console.log("life support rating:", oxygenGeneratorRating*co2ScrubberRating);
}

main();

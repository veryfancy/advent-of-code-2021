
const inputFilePath = "./day-02/input.txt"

function readFile(filepath) {
    return require("fs").readFileSync(filepath, "utf-8");
}

function parseLine(line) {
    const parts = line.split(" ");
    return {
        command: parts[0],
        magnitude: parseInt(parts[1])
    }
}

function parseInput(str) {
    return str.split("\n").map(parseLine);
}

function main() {
    const instructions = parseInput(
        readFile(inputFilePath)
    );

    let pos = 0;
    let depth = 0;

    instructions.forEach(inst => {
        switch (inst.command) {
            case "forward":
                pos += inst.magnitude
                break;
            case "down":
                depth += inst.magnitude
                break;
            case "up":
                depth -= inst.magnitude
                break;
            default:
                throw new Error("didn't recognize that command: " + JSON.stringify(inst));
          }
    });

    console.log("pos:", pos, "depth:", depth);
    console.log("product:", pos*depth);
}

main();

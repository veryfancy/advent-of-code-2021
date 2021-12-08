
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

// does string a include all the chars in string b?
function hasAllChars(a, b) {
    const aChars = [...a];
    const bChars = [...b]
    return bChars.every( x => aChars.includes(x) );;
}

function decode(x, inputs) {
    if (x.length === 2) {
        return '1';
    }
    if (x.length === 3) {
        return '7';
    }
    if (x.length === 4) {
        return '4';
    }
    if (x.length === 7) {
        return '8';
    }

    if (x.length === 6) {
        // if it lacks one of the letters in 1, then it's 6
        if (!hasAllChars(x, inputs.find(x => x.length === 2))) {
            return '6';
        }

        // if it has all the letters in 4, then it's 9
        if (hasAllChars(x, inputs.find(x => x.length === 4))) {
            return '9';
        }

        // otherwise it's 0
        return '0';
    }

    if (x.length === 5) {
        // if it has all letters that are in 1, then it's 3
        if (hasAllChars(x, inputs.find(x => x.length === 2))) {
            return '3';
        }

        // if it is missing whatever letter is not in 9, then it's 5
        const nine = inputs.find(x => x.length === 6 && decode(x, inputs) === '9');
        const charNotInNine = [..."abcdefg"].filter(c => !nine.includes(c));
        if (!hasAllChars(x, charNotInNine)) {
            return '5';
        }

        // otherwise it's 2
        return '2';
    }
}

function parseEntry(str) {
    const parts = str
        .split("|");

    return {
        inputs: parts[0].trim().split(" "),
        outputs: parts[1].trim().split(" ")
    };
}

function main() {
    const entries = parseInput(readFile(inputFilePath));
    const values = entries.map(
        e => parseInt(
            e.outputs.map(o => decode(o, e.inputs)).join(""),
            10
        )
    );

    const count = values.reduce( (acc,x) => acc+x, 0 );
    
    console.log("known digits in output values:", count);
}

main();

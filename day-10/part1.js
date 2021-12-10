const inputFilePath = "./day-10/input.txt"

function readFile(filepath) {
    return require("fs")
        .readFileSync(filepath, "utf-8")
        .trim();
}

function readLines(str) {
    return str.split("\n");
}

function scoreLine(line) {
    const chars = line.trim().split("");
    const stack = []
    for(let i=0;i<chars.length;i++) {
        if (["{", "[", "<", "("].includes(chars[i])) {
            stack.push(chars[i]);
        } else if (
            ( chars[i]===">" && stack[stack.length-1]==="<" ) ||
            ( chars[i]==="}" && stack[stack.length-1]==="{" ) ||
            ( chars[i]===")" && stack[stack.length-1]==="(" ) ||
            ( chars[i]==="]" && stack[stack.length-1]==="[" )
        ) {
            stack.pop();
        } else {
            switch (chars[i]) {
                case ")":
                    return 3;
                case "]":
                    return 57;
                case "}":
                    return 1197;
                case ">":
                    return 25137;
                default:
                  console.log("Unexpected char", i, "=", char[i]);
              }
        }
    }
    return 0
}

function main() {
    const lines = readLines(readFile(inputFilePath));
    console.log("Score:", lines.reduce((acc, l) => acc+scoreLine(l), 0))
}

main();

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
            return 0;
        }
    }
    if (stack.length > 0) {
        return scoreStack(stack);
    }
    return 0;
}

function scoreStack(stack) {
    let score = 0;
    for(let i=stack.length-1; i>=0; i--) {
        score = score * 5;
        switch (stack[i]) {
            case "(":
                score += 1;
                break;
            case "[":
                score += 2;
                break;
            case "{":
                score += 3;
                break;
            case "<":
                score += 4;
                break;
            default:
                console.log("Unexpected character", stack[i])
        }
    }
    return score;
}

function main() {
    const lines = readLines(readFile(inputFilePath));

    const scores = lines.map(scoreLine).filter(x => x!==0).sort((a,b)=>a-b)

    console.log("Middle score:", scores[(scores.length-1)/2])
}

main();

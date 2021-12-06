const inputFilePath = "./day-06/input.txt"
const NEW_FISH_DAYS_UNTIL_SPAWN = 8;
const SPAWNED_FISH_DAYS_UNTIL_SPAWN = 6;

function readFile(filepath) {
    return require("fs")
        .readFileSync(filepath, "utf-8")
        .trim();
}

function parseInput(str) {
    return str
        .split(",")
        .map(i => parseInt(i, 10))
        .map(daysUntilSpawn => fishBatch(1, daysUntilSpawn));
}

function fishBatch(count, daysUntilSpawn) {
    return {
        count,
        daysUntilSpawn
    };
}

function newFishBatch(count) {
    return fishBatch(
        count,
        NEW_FISH_DAYS_UNTIL_SPAWN
    )
}

function main() {
    let fishBatches = parseInput(readFile(inputFilePath));
    
    const days = 256;
    for(let d=1;d<=days;d++){
        let newFishiesCount = 0;
        for(let f=0;f<fishBatches.length;f++) {
            const fishBatch = fishBatches[f];
            if(fishBatch.daysUntilSpawn == 0) {
                fishBatch.daysUntilSpawn = SPAWNED_FISH_DAYS_UNTIL_SPAWN;
                newFishiesCount += fishBatch.count;
            } else {
                fishBatch.daysUntilSpawn -= 1;
            }
        }
        if(newFishiesCount > 0) {
            fishBatches.push(newFishBatch(newFishiesCount))
        }
    }

    const sum = fishBatches.reduce((acc, x) => { return acc + x.count }, 0);

    console.log(`After ${days} days: ${sum} fishies`);
}

main();

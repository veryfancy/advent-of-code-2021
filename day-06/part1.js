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
        .map(fish);
}

function fish(daysUntilSpawn) {
    return {
        daysUntilSpawn
    };
}

function newFish() {
    return fish(NEW_FISH_DAYS_UNTIL_SPAWN)
}

function main() {
    let fishies = parseInput(readFile(inputFilePath));
    
    const days = 80;
    for(let d=1;d<=days;d++){
        const newFishies = [];
        for(let f=0;f<fishies.length;f++) {
            const fish = fishies[f];
            if(fish.daysUntilSpawn == 0) {
                fish.daysUntilSpawn = SPAWNED_FISH_DAYS_UNTIL_SPAWN;
                newFishies.push(newFish());
            } else {
                fish.daysUntilSpawn -= 1;
            }
        }
        fishies = fishies.concat(newFishies);
    }

    console.log(`After ${days} days: ${fishies.length} fishies`);
}

main();

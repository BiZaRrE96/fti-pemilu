import fs from "fs";

function logCalonList(): void {
    let calons = getCalonList();
    for (const calon in calons) {
        console.log(calon)
    }   
}

function getCalonList(): string[] {
    return fs.readdirSync("./calons")
}

export {getCalonList, logCalonList}
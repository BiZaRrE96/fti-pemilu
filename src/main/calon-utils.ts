import fs from "fs";
import { NativeImage, nativeImage } from "electron";
function logCalonList(): void {
    let calons = getCalonList();
    for (const calon in calons) {
        console.log(calon)
    }   
}

function getCalonList(): string[] { //OFFLINE IMPLEMENTATION
    return fs.readdirSync("./calons")
}

function getCalonImage(calonpath: string): string { //OFFLINE IMPLEMENTATION
    var calonfolder : string = './calons/' + calonpath + '/face.png'
    var img : NativeImage = nativeImage.createFromPath(calonfolder)
    if (img.isEmpty()) {
        throw "could not find '" + calonfolder + "' !"
    }
    return img.toDataURL()
}

export {getCalonList, logCalonList, getCalonImage}
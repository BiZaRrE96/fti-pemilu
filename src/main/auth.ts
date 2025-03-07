import { compareSync } from "bcrypt";

function auth_code(code : string) : boolean {
    console.log("challenged with " + code)
    var correctCode = "$2b$10$d7bipI9F9VilJbx8sXYB1eePP2oVC1p2zMook/Zo0BjLCfnv94y6q"

    return compareSync(code, correctCode);
}

export {auth_code}
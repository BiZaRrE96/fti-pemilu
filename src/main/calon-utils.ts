import fs from "fs";
import { NativeImage, nativeImage } from "electron";
import ExcelJS from 'exceljs';

function logCalonList(): void {
    let calons = getCalonList();
    for (const calon in calons) {
        console.log(calon)
    }   
}

function getCalonList(): string[] { //OFFLINE IMPLEMENTATION
    let result = fs.readdirSync("./calons") 
    console.log("Succesfully detected %d calons",result.length)
    return result
}

function getCalonImage(calonpath: string): string { //OFFLINE IMPLEMENTATION
    var calonfolder : string = './calons/' + calonpath + '/face.png'
    var img : NativeImage = nativeImage.createFromPath(calonfolder)
    if (img.isEmpty()) {
        throw ("could not find '" + calonfolder + "' !")
    }
    return img.toDataURL()
}

function getCalonDesc(calonpath: string): string | undefined {
    var calonfolder : string = './calons/' + calonpath + '/desc.txt'
    var desc = fs.readFileSync(calonfolder).toLocaleString();
    return desc;
}

function dummyDatafier(target : CalonLogger, calon_count : number) {
    for (let i = 0; i < 10; i++) {
        let dummySelect : number[] = []
        for (let j = 0; j < calon_count; j++){
            dummySelect.push(Math.round(Math.random()*calon_count)); 
        }
        console.log("Dummy voting " + dummySelect);
        target.logSelection(dummySelect);
    }
}

class VoteSlip {
    public selection : number[] = [];
    public date : string = "UNDEFINED";
    public time : string = "UNDEFINED";

    constructor(count : number) {
        for (let i = 0; i < count; i++ ) {
            this.selection.push(0);
        }
    }
}

// Thanks gpt
function normalizeList(nums: number[]): number[] {
    let nonZeroCount = nums.filter(num => num > 0).length; // Count numbers > 0
  
    for (let target = 1; target <= nonZeroCount; target++) {
      // Step: Reduce numbers > target until `target` appears
      while (!nums.includes(target)) {
        nums = nums.map(num => (num >= target ? num - 1 : num));
      }
    }
  
    return nums;
  }

  
class CalonLogger {
    calon_names: string[];
    selection: VoteSlip[];

    constructor(clist? : string[]) {
        if (clist) {
            this.calon_names = clist;
        } else {
            this.calon_names = [];
        }
        this.selection = [];
        console.log("Succesfully constructed logger of " + this.calon_names.length)
    }

    async logSelection(result : number[]): Promise<boolean> {
        console.log("Logging...")
        console.log(result)
        try {
            if (result.length !== this.calon_names.length) {
                throw "Input list size mismatch! (Expected " + this.calon_names.length + " got " + result.length + ")";
            }
            var vote : VoteSlip = new VoteSlip(this.calon_names.length);
            for (let i = 0; i < result.length; i++) {
                vote.selection[i] = result[i];
            }
            let date : string = new Date().toLocaleDateString()
            let time : string = new Date().toLocaleTimeString()

            vote.date = date;
            vote.time = time;
            this.selection.push(vote)
            console.log("Logged!")
            return true
        }
        catch (e: unknown) {
            console.log(e)
            return false
        }
        
    }

    async saveCalonResults(): Promise<boolean> {
        try{
            const currentTime = new Date();
            const safeFilename = `${currentTime.getFullYear()}-${String(currentTime.getMonth() + 1).padStart(2, '0')}-${String(currentTime.getDate()).padStart(2, '0')}_${String(currentTime.getHours()).padStart(2, '0')}-${String(currentTime.getMinutes()).padStart(2, '0')}-${String(currentTime.getSeconds()).padStart(2, '0')}`;
            const sheets = new ExcelJS.Workbook();
            const worksheet = sheets.addWorksheet('Sheet1');
            worksheet.addRow([])
            worksheet.addRow(["","Date","Time",...this.calon_names])
            for (const result of this.selection) {
                let normalized = normalizeList(result.selection)
                worksheet.addRow(["",result.date,result.time,...normalized])
                console.log("Voted the following : " + normalized)
            }
            await sheets.xlsx.writeFile('output_' + safeFilename + '.xlsx');
            console.log("Completed")
            return true
        }
        catch (e: unknown) {
            console.log(e)
            return false
        }
        
    }
}

export {getCalonList, logCalonList, getCalonImage, CalonLogger, dummyDatafier, getCalonDesc}
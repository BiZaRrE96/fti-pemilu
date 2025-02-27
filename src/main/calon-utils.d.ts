declare function logCalonList(): void;
declare function getCalonList(): string[];
declare function getCalonImage(calonpath: string): string;
declare function dummyDatafier(target: CalonLogger, calon_count: number): void;
declare class VoteSlip {
    selection: number[];
    constructor(count: number);
}
declare class CalonLogger {
    calon_names: string[];
    selection: VoteSlip[];
    constructor(clist?: string[]);
    logSelection(result: number[]): Promise<boolean>;
    saveCalonResults(): Promise<boolean>;
}
export { getCalonList, logCalonList, getCalonImage, CalonLogger, dummyDatafier };

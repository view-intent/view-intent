export declare abstract class Generic {
    [fieldName: string]: any;
    viParent?: any;
    private viUpVersion;
    private updateSchedule;
    constructor(parent?: any);
    setParent(parent: any): void;
    toObject(exclude?: string[]): {
        [key: string]: any;
    };
    setField(fieldName: string, value: any): void;
    update(level?: number): void;
}
export default Generic;

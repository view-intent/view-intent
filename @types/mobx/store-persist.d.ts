export interface IPersistOutput {
    [property: string]: string | number;
}
export interface IPersist {
    persistInput(stored: IPersistOutput): void;
    persistOutput(): IPersistOutput;
}

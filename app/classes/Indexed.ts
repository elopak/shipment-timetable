export class Indexed {
    index: number;

    constructor(index: number) {
        this.index = index;
    }

    equals(indexed: Indexed): boolean {
        return indexed.index == this.index;
    }

    public toString(): string {
        return this.index.toString();
    }
}
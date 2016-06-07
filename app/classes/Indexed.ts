export class Indexed {
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    equals(indexed: Indexed): boolean {
        return indexed.id == this.id;
    }

    public toString(): string {
        return this.id.toString();
    }
}
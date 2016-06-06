import { Indexed } from './Indexed';

export class IndexedNamed extends Indexed {
    name: string;

    constructor(index: number, name: string) {
        super(index);
        this.name = name;
    }

    public toString(): string {
        return this.name;
    }
}
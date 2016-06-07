import { Indexed } from './Indexed';

export class IndexedNamed extends Indexed {
    name: string;

    constructor(id: number, name: string) {
        super(id);
        this.name = name;
    }

    public toString(): string {
        return this.name;
    }
}
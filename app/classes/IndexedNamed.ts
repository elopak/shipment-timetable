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

    public static compare(a: IndexedNamed, b: IndexedNamed): number {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    }
    
    public compareTo(o: IndexedNamed): number{
        return IndexedNamed.compare(this, o);
    }
}
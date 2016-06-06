import { Indexed } from './Indexed';

export class Interval extends Indexed{
    startHour: number;
    endHour: number;

    constructor(index: number) {
        index = Math.floor(index);
        super(index);
        this.startHour = (index === 1 ? 10 : 11 + (index - 1) * 2);
        this.endHour = this.startHour + 2;
    }

    toString(): string {
        return this.startHour + ':00 – ' + this.endHour + ':00';
    }
}
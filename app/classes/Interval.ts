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

    public static fromDate(date: Date) : Interval {
        var hour = Number(date.getHours);
        if (hour >= 10 && hour < 12) return new Interval(1);
        if (hour >= 13 && hour < 15) return new Interval(2);
        if (hour >= 15 && hour < 17) return new Interval(3);
        if (hour >= 17 && hour < 19) return new Interval(4);
        return null;
    }

    toString(): string {
        return this.startHour + ':00 – ' + this.endHour + ':00';
    }   
    
}
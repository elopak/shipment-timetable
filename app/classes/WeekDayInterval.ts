import { Interval } from './Interval';
import { Day } from './Day';

export class WeekDayInterval extends Interval {
    week: number;
    day: Day;

    constructor(week: number, day: Day, index: number) {
        super(index);
        this.week = week;
        this.day = day;
    }
}
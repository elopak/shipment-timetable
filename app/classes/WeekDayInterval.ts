import { Interval } from './Interval';
import { Day } from './Day';
import { Week } from './Week';

export class WeekDayInterval extends Interval {
    week: Week;
    day: Day;

    constructor(week: Week, day: Day, interval: Interval) {
        super(interval.id);
        this.week = week;
        this.day = day;
    }
    
    getStartDate(): Date {
        return this.week.getStartDate();
    }
}
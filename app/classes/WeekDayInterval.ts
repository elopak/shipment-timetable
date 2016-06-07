import { Interval } from './Interval';
import { Day } from './Day';
import { Time } from './Time';
import { Week } from './Week';

export class WeekDayInterval extends Interval {
    week: Week;
    day: Day;

    constructor(week: Week, day: Day, interval: Interval) {
        super(interval.id);
        this.week = week;
        this.day = day;
    }
    
    getStartTime(): Time {
        return this.week.getStartTime();
    }
}
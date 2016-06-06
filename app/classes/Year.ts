import { Indexed } from './Indexed';
import { Day } from './Day';
import { Week } from './Week';

export class Year extends Indexed {
    getTotalDays(): number {
        var firstDate  = new Date(this.index, 0, 1);
        var secondDate = new Date(this.index + 1, 0, 1);
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / Day.MILLISECONDS));
    }

    public static fromDate(date: Date): Year {
        return new Year(date.getFullYear());
    }

    getWeeks(): Week[] {
        var weeks: Week[] = [];
        for (var day = 1; day <= this.getTotalDays(); day += 7) {
            var date = new Date(this.index, 0, day);
            var week = Week.fromDate(date);
            weeks.push(week);
        }
        return weeks;
    }

    getStartDate(): Date {
        return new Date(this.index, 0, 1);
    }
}
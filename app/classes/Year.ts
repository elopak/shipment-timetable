import { Indexed } from './Indexed';
import { Day } from './Day';
import { Week } from './Week';

export class Year extends Indexed {
    public static CURRENT_YEAR = Year.fromDate(new Date());

    getWeeks(): Week[] {
        var weeks: Week[] = [];
        for (var day = 1; day <= this.getTotalDays(); day += 7) {
            var date = new Date(this.id, 0, day);
            var week = Week.fromDate(date);
            weeks.push(week);
        }
        return weeks;
    }

    getTotalDays(): number {
        var firstDate  = new Date(this.id, 0, 1);
        var secondDate = new Date(this.id + 1, 0, 1);
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / Day.MILLISECONDS));
    }
    
    public static fromDate(date: Date): Year {
        return new Year(date.getFullYear());
    }

    getStartDate(): Date {
        return new Date(this.id, 0, 1);
    }
}
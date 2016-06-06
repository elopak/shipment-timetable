import { Indexed } from './Indexed';
import { Day } from './Day';
import { Year } from './Year';
import { LOCALE } from '../globals';
import { WeekDayInterval } from './WeekDayInterval';

export class Week extends Indexed {
    year: Year;

    constructor(index: number, year: Year) {
        super(index);
        this.year = year;
    }

    public static fromDate(date: Date): Week {
        var newYear   = new Date(date.getFullYear(), 0, 1);
        var day       = newYear.getDay();
        day           = (day >= 0 ? day : day + 7);
        var dayNumber = Math.floor((date.getTime() - newYear.getTime() -
                (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / Day.MILLISECONDS) + 1;
        var weekNumber: number;
        if (day < 4) {
            weekNumber = Math.floor((dayNumber + day - 1) / 7) + 1;
            if (weekNumber > 52) {
                var y      = new Date(date.getFullYear() + 1, 0, 1);
                var d      = y.getDay();
                d          = d >= 0 ? d : d + 7;
                weekNumber = d < 4 ? 1 : 53;
            }
        }
        else {
            weekNumber = Math.floor((dayNumber + day - 1) / 7);
        }
        return new Week(weekNumber, Year.fromDate(date));
    }

    getDate(day: Day): Date {
        var firstDay = this.year.getStartDate();
        var offset   = firstDay.getTimezoneOffset();
        firstDay.setDate(firstDay.getDate() + 4 - (firstDay.getDay() || 7));
        firstDay.setTime(firstDay.getTime() + 7 * Day.MILLISECONDS * (this.index + (this.year.index == firstDay.getFullYear() ? -1 : 0 )));
        firstDay.setTime(firstDay.getTime() + (firstDay.getTimezoneOffset() - offset) * 60 * 1000);
        firstDay.setDate(firstDay.getDate() - 3 + day.index - 1);
        return firstDay;
    }

    getStartDate(): Date {
        return this.getDate(Day.MONDAY);
    }

    getEndDate(): Date {
        return this.getDate(Day.SUNDAY);
    }

    getFormattedRange(): string {        
        return this.getFormattedDate(Day.MONDAY) + ' – ' + this.getFormattedDate(Day.SUNDAY);
    }

    getFormattedDate(day: Day): string {
        return this.getDate(day).toLocaleDateString(LOCALE);
    }


}
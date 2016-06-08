import { Indexed } from './Indexed';
import { Day } from './Day';
import { Year } from './Year';
import * as moment from 'moment';

moment.locale('ru');

export class Week extends Indexed {
    year: Year;

    constructor(id: number, year: Year) {
        super(id);
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

    getNextWeek(): Week {
        return new Week(this.id + 1, this.year);
    }

    getPreviousWeek(): Week {
        return new Week(this.id - 1, this.year);
    }

    getDate(day: Day): Date {
        var j1   = new Date(Year.CURRENT_YEAR.id, 0, 10, 0, 0, 0),
            j2   = new Date(Year.CURRENT_YEAR.id, 0, 4, 0, 0, 0),
            mon1 = j2.getTime() - j1.getDay() * Day.MILLISECONDS;
        return new Date(mon1 + ((this.id - 1) * 7 + (day.id - 1)) * Day.MILLISECONDS);
    }

    getDateForNumber(day: number): Date {
        var j1   = new Date(Year.CURRENT_YEAR.id, 0, 10, 0, 0, 0),
            j2   = new Date(Year.CURRENT_YEAR.id, 0, 4, 0, 0, 0),
            mon1 = j2.getTime() - j1.getDay() * Day.MILLISECONDS;
        return new Date(mon1 + ((this.id - 1) * 7 + (day - 1)) * Day.MILLISECONDS);
    }

    getStartDate(): Date {
        return this.getDate(Day.MONDAY);
    }

    getEndDate(): Date {
        return this.getDateForNumber(7);
    }

    public toString(): string {
        return this.id.toString();
    }

    getFormattedRange(): string {
        return this.getFormattedDate(Day.MONDAY) + ' – ' + this.getFormattedDate(Day.SUNDAY);
    }

    getFormattedDate(day: Day): string {
        return moment(this.getDate(day)).format('D MMMM');
    }

}
import { Component } from '@angular/core';
import { AGENTS, CLIENTS, INTERVALS, WEEKS, YEAR } from '../globals';
import { Shipment } from '../classes/Shipment';
import { WeekDayInterval } from '../classes/WeekDayInterval';
import { Day } from '../classes/Day';
import { Week } from '../classes/Week';
import { DatePickerComponent } from '../components/DatePickerComponent';

@Component({
    selector: 'timetable',
    templateUrl: 'app/templates/timetable.html',
    directives: [DatePickerComponent]
})
export class TimetableComponent {
    now                               = new Date();
    year                              = YEAR;
    selectedWeek                      = Week.fromDate(new Date());
    selectedInterval: WeekDayInterval = null;
    weeks                             = WEEKS;
    days                              = Day.getDays();
    intervals                         = INTERVALS;
    shipments                         = [
        new Shipment(CLIENTS[0], AGENTS[0], new WeekDayInterval(22, Day.FRIDAY, 1), 33),
        new Shipment(CLIENTS[1], AGENTS[1], new WeekDayInterval(22, Day.WEDNESDAY, 1), 12)
    ];

    selectWeek(value: string): void {
        var i = parseInt(value);
        if (!i || i < 1) i = 1;
        else if (i > this.weeks.length) i = this.weeks.length;
        this.selectedWeek = this.weeks[i];
    }
}

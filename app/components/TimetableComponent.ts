import { Component, OnInit } from '@angular/core';
import { Shipment } from '../classes/Shipment';
import { WeekDayInterval } from '../classes/WeekDayInterval';
import { Day } from '../classes/Day';
import { Week } from '../classes/Week';
import { CustomerListService } from '../services/CustomerListService';
import { Customer } from '../classes/Customer';
import { Dispatcher } from '../classes/Dispatcher';
import { ShipmentListService } from '../services/ShipmentListService';
import { DispatcherListService } from '../services/DispatcherListService';
import { Year } from '../classes/Year';
import { Interval } from '../classes/Interval';
import { TYPEAHEAD_DIRECTIVES, BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

@Component({
    selector: 'timetable',
    templateUrl: 'app/templates/timetable.html',
    directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, BUTTON_DIRECTIVES],
    providers: [CustomerListService, DispatcherListService, ShipmentListService]
})
export class TimetableComponent implements OnInit {

    constructor(private customerListService: CustomerListService,
                private shipmentListService: ShipmentListService,
                private dispatcherListService: DispatcherListService) {
    }

    public static INTERVALS    = [
        new Interval(1),
        new Interval(2),
        new Interval(3),
        new Interval(4)
    ];
    public static LOCALE       = 'ru-RU';
    public static CURRENT_DATE = new Date();
    public static YEAR         = Year.fromDate(TimetableComponent.CURRENT_DATE);

    weeks                             = TimetableComponent.YEAR.getWeeks();
    currentWeek                       = Week.fromDate(TimetableComponent.CURRENT_DATE);
    nextWeek                          = this.currentWeek.getNextWeek();
    previousWeek                      = this.currentWeek.getPreviousWeek();
    selectedWeek                      = Week.fromDate(TimetableComponent.CURRENT_DATE);
    selectedInterval: WeekDayInterval = null;
    days                              = Day.getDays();
    intervals                         = TimetableComponent.INTERVALS;
    shipments: Shipment[];
    customers: Customer[];
    dispatchers: Dispatcher[];
    error: any;

    selectWeek(value: string): void {
        var i = parseInt(value);
        if (!i || i < 1) i = 1;
        else if (i > this.weeks.length) i = this.weeks.length;
        this.selectedWeek = this.weeks[i];
        this.loadShipments();
    }

    selectPreviousWeek(): void {
        this.selectedWeek = this.previousWeek;
    }

    selectCurrentWeek(): void {
        this.selectedWeek = this.currentWeek;
    }

    selectNextWeek(): void {
        this.selectedWeek = this.nextWeek;
    }



    loadShipments(): any {
        this.shipmentListService.get(this.selectedWeek.getStartTime()).subscribe(
            list => this.shipments = list,
            error => this.error = error
        );
    }

    ngOnInit(): any {
        //this.customers = [new Customer(1, "test")];
        this.dispatchers = [new Dispatcher(1, 'test dispatcher')];
        this.customerListService.get().subscribe(
            list => this.customers = list,
            error => this.error = error
        );

        /*this.dispatcherListService.get().subscribe(
         list => this.dispatchers = list,
         error => this.error = error
         );*/
    }
}

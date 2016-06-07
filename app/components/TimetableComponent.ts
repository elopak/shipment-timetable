import { Component, OnInit } from '@angular/core';
import { Shipment } from '../classes/Shipment';
import { WeekDayInterval } from '../classes/WeekDayInterval';
import { Day } from '../classes/Day';
import { Week } from '../classes/Week';
import { DatePickerComponent } from '../components/DatePickerComponent';
import { CustomerListService } from '../services/CustomerListService';
import { Customer } from '../classes/Customer';
import { Dispatcher } from '../classes/Dispatcher';
import { ShipmentListService } from '../services/ShipmentListService';
import { DispatcherListService } from '../services/DispatcherListService';
import { Year } from '../classes/Year';
import { Interval } from '../classes/Interval';

@Component({
    selector: 'timetable',
    templateUrl: 'app/templates/timetable.html',
    directives: [DatePickerComponent]
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
    selectedWeek                      = Week.fromDate(TimetableComponent.CURRENT_DATE);
    selectedInterval: WeekDayInterval = null;
    days                              = Day.getDays();
    shipments: Shipment[];
    customers: Customer[];
    dispatchers: Dispatcher[];
    errorMessage: string;

    selectWeek(value: string): void {
        var i = parseInt(value);
        if (!i || i < 1) i = 1;
        else if (i > this.weeks.length) i = this.weeks.length;
        this.selectedWeek = this.weeks[i];
        this.loadShipments();
    }

    loadShipments() {
        this.shipmentListService.get(this.selectedWeek.getStartTime())
            .subscribe(
                list => this.shipments = list,
                error => this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.customerListService.get()
            .subscribe(
                list => this.customers = list,
                error => this.errorMessage = <any>error);
        this.dispatcherListService.get()
            .subscribe(
                list => this.dispatchers = list,
                error => this.errorMessage = <any>error);
    }
}

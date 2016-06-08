import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Shipment } from '../classes/Shipment';
import { WeekDayInterval } from '../classes/WeekDayInterval';
import { Week } from '../classes/Week';
import { CustomerListService } from '../services/CustomerListService';
import { Customer } from '../classes/Customer';
import { Dispatcher } from '../classes/Dispatcher';
import { ShipmentListService } from '../services/ShipmentListService';
import { DispatcherListService } from '../services/DispatcherListService';
import { Year } from '../classes/Year';
import { Interval } from '../classes/Interval';
import {
    TYPEAHEAD_DIRECTIVES,
    BUTTON_DIRECTIVES,
    MODAL_DIRECTVES,
    BS_VIEW_PROVIDERS
} from 'ng2-bootstrap/ng2-bootstrap';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import * as moment from 'moment';
import { ShipmentSaveService } from '../services/ShipmentSaveService';
import { Day } from '../classes/Day';

@Component({
    selector: 'timetable',
    templateUrl: 'app/templates/timetable.html',
    directives: [
        TYPEAHEAD_DIRECTIVES,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        BUTTON_DIRECTIVES,
        MODAL_DIRECTVES
    ],
    providers: [
        CustomerListService,
        DispatcherListService,
        ShipmentListService,
        ShipmentSaveService
    ],
    viewProviders: [BS_VIEW_PROVIDERS]
})
export class TimetableComponent implements OnInit {

    constructor(private customerListService: CustomerListService,
                private shipmentListService: ShipmentListService,
                private shipmentSaveService: ShipmentSaveService,
                private dispatcherListService: DispatcherListService,
                private viewContainerRef: ViewContainerRef) {
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
    days                              = Day.getWorkingDays();
    intervals                         = TimetableComponent.INTERVALS;
    shipments: Shipment[];
    customers: Customer[];
    dispatchers: Dispatcher[];
    error: any;
    newShipment                       = new Shipment(this.currentWeek);

    selectWeek(week: Week): void {
        this.selectedWeek = week;
        this.loadShipments();
    }

    selectPreviousWeek(): void {
        this.selectWeek(this.previousWeek);
    }

    selectCurrentWeek(): void {
        this.selectWeek(this.currentWeek);
    }

    selectNextWeek(): void {
        this.selectWeek(this.nextWeek);
    }

    loadShipments(): any {
        this.shipmentListService.get(this.selectedWeek).subscribe(
            (shipments: Shipment[]) => {
                for (let day of this.days){
                    for (let interval of day.intervals) {
                        interval.shipments = [];
                        for (let shipment of shipments) {
                            if (shipment.day.equals(day)) interval.shipments.push(shipment);
                        }
                    }
                }
            },
            error => this.error = error
        );
    }

    ngOnInit(): any {
        this.customerListService.get().subscribe(
            list => this.customers = list,
            error => this.error = error
        );
        this.dispatcherListService.get().subscribe(
            list => this.dispatchers = list,
            error => this.error = error
        );
        this.selectCurrentWeek();
    }

    saveShipment(): void {
        this.shipmentSaveService.post(this.newShipment).subscribe(this.loadShipments);
    }
}

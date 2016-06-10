import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Shipment } from '../classes/Shipment';
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
import { ShipmentSaveService } from '../services/ShipmentSaveService';
import { Day } from '../classes/Day';
import { ShipmentRemoveService } from '../services/ShipmentRemoveService';
import { User } from '../classes/User';
import { Hour } from '../classes/Hour';

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
        ShipmentSaveService,
        ShipmentRemoveService,
    ],
    viewProviders: [BS_VIEW_PROVIDERS]
})
export class TimetableComponent implements OnInit {

    constructor(private customerListService: CustomerListService,
                private shipmentListService: ShipmentListService,
                private shipmentSaveService: ShipmentSaveService,
                private shipmentRemoveService: ShipmentRemoveService,
                private dispatcherListService: DispatcherListService,
                private viewContainerRef: ViewContainerRef) {
    }

    public static INTERVALS    = Interval.INTERVALS;
    public static LOCALE       = 'ru-RU';
    public static CURRENT_DATE = new Date();
    public static YEAR         = Year.fromDate(TimetableComponent.CURRENT_DATE);
    public static CURRENT_WEEK = Week.fromDate(TimetableComponent.CURRENT_DATE);

    locale                     = TimetableComponent.LOCALE;
    currentWeek                = TimetableComponent.CURRENT_WEEK;
    nextWeek                   = this.currentWeek.getNextWeek();
    previousWeek               = this.currentWeek.getPreviousWeek();
    selectedWeek               = Week.fromDate(TimetableComponent.CURRENT_DATE);
    weeks: Week[]              = [this.previousWeek, this.currentWeek, this.nextWeek];
    days: Day[]                = Day.getWorkingDays();
    today: Day                 = Day.fromDate(TimetableComponent.CURRENT_DATE);
    selectedDay: Day           = Day.MONDAY;
    intervals                  = TimetableComponent.INTERVALS;
    customers: Customer[]      = Customer.getCustomers();
    dispatchers: Dispatcher[]  = Dispatcher.getDispatchers();
    error: any                 = null;
    newShipment: Shipment      = new Shipment(this.currentWeek);
    availablePallets: number[] = [];
    maxPallets                 = TimetableComponent.getRange(Interval.MAX_PALLETS);
    selectedShipment: Shipment;
    selectedInterval: Interval;
    users                      = User.getUsers();
    user: User;
    tempUserId: number;
    tempPassword: string;
    authErr: string;
    hours                      = Hour.getHours();
    comment: string;

    authorize(): boolean {
        this.authErr = null;
        if (this.users[this.tempUserId].password == this.tempPassword) {
            this.user = this.users[this.tempUserId];
            return true;
        }
        this.authErr = 'Неверный пароль';
        return false;
    }

    selectWeek(week: Week): void {
        this.selectedWeek = week;
        this.loadShipments();
        this.deselect();
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

    selectShipment(shipment: Shipment, interval?: Interval, day?: Day): void {        
        this.selectedShipment = shipment;
        this.selectedInterval = interval || shipment.plannedInterval;
        if (day) this.selectDay(day);
        this.prepareNewShipment();
    }

    selectDay(day: Day): void {
        this.selectedDay = day;
    }

    deselect(): void {
        this.selectedInterval = null;
        this.selectedShipment = null;
        this.selectedDay      = null;
    }

    selectInterval(interval: Interval, day?: Day): void {
        if (this.isIntervalAvailable(interval, day)) {
            this.selectedInterval = interval;
            this.selectedShipment = null;
            if (day) this.selectDay(day);
            this.prepareNewShipment();
        }
    }

    prepareNewShipment(): void {
        if (!this.selectedInterval) this.availablePallets = TimetableComponent.getRange(Interval.MAX_PALLETS);
        this.availablePallets            = TimetableComponent.getRange(this.selectedInterval.getAvailablePallets());
        this.newShipment.plannedPallets  = this.availablePallets[0];
        this.newShipment.week            = this.selectedWeek;
        this.newShipment.day             = this.selectedDay;
        this.newShipment.plannedInterval = this.selectedInterval;
    }

    public static getRange(n: number): number[] {
        return new Array(n).join().split(',').map((item, index) => ++index).reverse();
    }

    validate(): void {
        var tel = parseInt(String(this.newShipment.telephone).substr(0, 10).replace(/[^0-9]/gi, ''));
        if (isNaN(tel)) this.newShipment.telephone = null;
        else this.newShipment.telephone = tel;
    }

    isSelectedIntervalAvailable(): boolean {
        return this.isIntervalAvailable(this.selectedInterval);
    }

    isIntervalAvailable(interval: Interval, day?: Day): boolean {
        if (!day) day = this.selectedDay;
        return interval && interval.isAvailable()
            && this.selectedWeek.getDate(day).getTime() > TimetableComponent.CURRENT_DATE.getTime()
    }

    loadShipments(): any {
        this.shipmentListService.get(this.selectedWeek, this.customers, this.dispatchers).subscribe(
            (shipments: Shipment[]) => {
                this.days = Day.getWorkingDays();
                for (let day of this.days) {
                    for (let interval of day.intervals) {
                        interval.shipments = [];
                        for (let shipment of shipments) {
                            if (shipment.day.equals(day) && shipment.plannedInterval.equals(interval)) {
                                interval.shipments.push(shipment);
                            }
                        }
                    }
                }
            },
            error => this.error = error
        );
    }

    ngOnInit(): any {
        this.selectCurrentWeek();
    }

    loadCustomers(): void {
        this.customerListService.get().subscribe(
            function (list) {
                this.customers = list;
                this.loadDispatchers();
            },
            error => this.error = error
        );
    }

    loadDispatchers(): void {
        this.dispatcherListService.get().subscribe(
            function (list) {
                this.dispatchers = list;
                this.selectCurrentWeek();
            },
            error => this.error = error
        );
    }

    saveShipment(): any {
        var s = this.newShipment;
        var o = {
            week: s.week.id,
            day: s.day.id,
            customerId: s.customer.id,
            dispatcherId: s.dispatcher.id,
            plannedInterval: s.plannedInterval.id,
            plannedPallets: s.plannedPallets,
            vehicle: s.vehicle,
            driver: s.driver,
            telephone: s.telephone,
            comments: s.comments
        };
        this.shipmentSaveService
            .post(o)
            .subscribe(() => this.loadShipments());
    }

    editSelectedShipment(): any {
        var s = this.selectedShipment;
        if (!s) return;
        var o = {            
            customerId: s.customer.id,
            dispatcherId: s.dispatcher.id,
            plannedInterval: s.plannedInterval.id,
            plannedPallets: s.plannedPallets,
            vehicle: s.vehicle,
            driver: s.driver,
            telephone: s.telephone            
        };
        this.shipmentSaveService
            .post(o)
            .subscribe(() => this.loadShipments());
    }

    closeSelectedShipment(): any {
        if (!this.selectedShipment) return;
        var s = this.selectedShipment;
        var o = {
            arrived: s.arrived,
            loaded: s.loaded,
            actualPallets: s.actualPallets
        };
        this.shipmentSaveService
            .post(o)
            .subscribe(() => this.loadShipments());
    }

    addComment(): any {
        if (!this.selectedShipment) return;
        var s = this.selectedShipment;
        var o = {
            id: s.id,
            comment: s.comments + '<br>' + this.comment
        };
        this.shipmentSaveService
            .post(o)
            .subscribe(() => this.loadShipments());
    }

    removeSelectedShipment(): any {
        if (this.selectedShipment) this.shipmentRemoveService
            .post(this.selectedShipment.id)
            .subscribe(() => this.selectWeek(this.selectedWeek));
    }
}

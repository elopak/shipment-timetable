import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Shipment } from '../classes/Shipment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';
import { Week } from '../classes/Week';
import { Day } from '../classes/Day';
import { Interval } from '../classes/Interval';
import { Customer } from '../classes/Customer';
import { Dispatcher } from '../classes/Dispatcher';
import { TimetableComponent } from '../components/TimetableComponent';

@Injectable()
export class ShipmentListService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND + 'shipments?week=';
    private customers = {};
    private dispatchers = {};

    get(week: Week, customers: Customer[], dispatchers: Dispatcher[]): Observable<Shipment[]> {
        customers.forEach(customer => this.customers[customer.id] = customer);
        dispatchers.forEach(dispatcher => this.dispatchers[dispatcher.id] = dispatcher);

        return this.http.get(this.url + week.id).map(res => {
            let shipments: Shipment[] = [];
            let array                 = res.json();
            for (var i = 0; i < array.length; i++) {
                let shipment: Shipment   = array[i];
                let dayIndex             = Number(shipment.day) - 1;
                let intervalIndex        = Number(shipment.plannedInterval);
                shipment.day             = Day.getWorkingDays()[dayIndex];
                shipment.week            = new Week(shipment.week, TimetableComponent.YEAR);
                shipment.plannedInterval = new Interval(intervalIndex);
                shipment.customer        = this.customers[array[i].customerId] || new Customer(1, 'customer');
                shipment.dispatcher      = this.dispatchers[array[i].dispatcherId] || new Dispatcher(1, 'dispatcher');
                let t1 = new Date(shipment.created).getTime();
                let t2 = shipment.week.getDate(shipment.day).getTime();
                shipment.urgent = (Math.abs(t1 - t2) < Day.MILLISECONDS);
                shipments.push(shipment);
            }
            return shipments;
        });
    }
}
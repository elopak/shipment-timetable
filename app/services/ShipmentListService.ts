import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Shipment } from '../classes/Shipment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';
import { Week } from '../classes/Week';
import { Day } from '../classes/Day';
import { Interval } from '../classes/Interval';

@Injectable()
export class ShipmentListService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND + 'shipments?week=';

    get(week: Week): Observable<Shipment[]> {
        return this.http.get(this.url).map(res => {
            let shipments: Shipment[] = [];
            let array                 = res.json();
            for (var i = 0; i < array.length; i++) {
                var shipment: Shipment = array[i];
                shipment.day           = Day.getWorkingDays()[shipment.day - 1];
                shipment.plannedLoad   = Interval.fromHour(shipment.plannedLoad);
                shipments.push(shipment);
            }
            return shipments;
        });

    }
}
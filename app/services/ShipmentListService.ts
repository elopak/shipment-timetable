import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Shipment } from '../classes/Shipment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';
import { Week } from '../classes/Week';
import { Day } from '../classes/Day';

@Injectable()
export class ShipmentListService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND +  'shipments?week=';

    get(week: Week): Observable<Shipment[]> {        
        return this.http.get(this.url + week.id).map(res => {
            var shipments = res.json();
            for (let shipment of shipments){
                if (shipment.week && typeof shipment.week == 'number') shipment.day = new Week(shipment.week);
                if (shipment.day && typeof shipment.day == 'number') shipment.day = new Day(shipment.day);
            }
            return shipments;
        });
    }
}
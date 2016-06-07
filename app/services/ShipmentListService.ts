import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Shipment } from '../classes/Shipment';
import { Time } from '../classes/Time';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';

@Injectable()
export class ShipmentListService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND +  'shipments?time=';

    get(time: Time): Observable<Shipment[]> {
        return this.http.get(this.url + time.value).map(res => res.json() || {});
    }
}
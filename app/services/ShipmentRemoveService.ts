import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';
import { Observable } from 'rxjs/Rx';
import { Shipment } from '../classes/Shipment';

@Injectable()
export class ShipmentRemoveService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND + 'remove_shipment';

    post(shipment: Shipment): Observable<any> {
        let body = JSON.stringify({ id: shipment.id });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, body, options).map(res => res).catch(e => console.log(e));
    }
}
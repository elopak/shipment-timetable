import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Shipment } from '../classes/Shipment';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ShipmentSaveService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND + 'save_shipment';

    post(shipment: Shipment): Observable<string> {
        let body    = JSON.stringify({ shipment });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, body, options).map(res => "test");
    }
}
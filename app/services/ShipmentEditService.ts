import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ShipmentEditService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND + 'edit_shipment';

    post(o: any): Observable<any> {
        let body = JSON.stringify(o);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, body, options).map(res => res).catch(e => console.log(e));
    }
}
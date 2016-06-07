import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Shipment } from '../classes/Shipment';
import { Time } from '../classes/Time';

@Injectable()
export class ShipmentListService {
    constructor(private http: Http) {
    }

    private url = '10.7.84.13/shipments?time=';

    get(time: Time): Observable<Shipment[]> {
        return this.http.get(this.url + time.value)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
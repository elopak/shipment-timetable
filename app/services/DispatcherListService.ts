import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Shipment } from '../classes/Shipment';
import { Dispatcher } from '../classes/Dispatcher';

@Injectable()
export class DispatcherListService {
    constructor(private http: Http) {
    }

    private url = '10.7.84.13/dispatchers';

    get(): Observable<Dispatcher[]> {
        return this.http.get(this.url)
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
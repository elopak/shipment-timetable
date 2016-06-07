import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Dispatcher } from '../classes/Dispatcher';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';

@Injectable()
export class DispatcherListService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND +  'dispatchers';

    get(): Observable<Dispatcher[]> {
        return this.http.get(this.url).map(res => res.json() || {});
    }
}
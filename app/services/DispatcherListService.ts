import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Dispatcher } from '../classes/Dispatcher';
import { Observable } from 'rxjs/Rx';
import { Paths } from '../Globals';
import 'rxjs/add/operator/map';

@Injectable()
export class DispatcherListService {
    constructor(private http: Http) {
    }

    private url = Paths.BACKEND +  'dispatchers';

    get(): Observable<Dispatcher[]> {
        return this.http.get(this.url).map(res => {
            let dispatchers: Dispatcher[] = [];
            let array = res.json();
            for (var i = 0; i < array.length; i++){
                dispatchers.push(new Dispatcher(array[i].id, array[i].name));
            }
            return dispatchers;
        });
    }
}
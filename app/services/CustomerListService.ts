import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Customer } from '../classes/Customer';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Paths } from '../Globals';

@Injectable()
export class CustomerListService {
    constructor(private http: Http) {}

    private url = Paths.BACKEND +  'customers';

    get(): Observable<Customer[]> {
        return this.http.get(this.url).map(res => {
            let customers: Customer[] = [];
            let array = res.json();
            for (var i = 0; i < array.length; i++){
                var customer: Customer = array[i];
                customers.push(new Customer(customer.id, customer.name));
            }            
            return customers;
        });
    }
}
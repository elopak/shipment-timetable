import { Component } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'customer-input',
    directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: '../templates/customer-input.html'
})
export class CustomerInputComponent {
    public selected: string            = '';
    public asyncSelected: string       = '';
    public typeaheadLoading: boolean   = false;
    public typeaheadNoResults: boolean = false;
    public states: Array<string>       = ['WBD', 'Pepsi', 'Slavmo'];
    private _cache: any;
    private _prevContext: any;

    public getContext(): any {
        return this;
    }

    public getAsyncData(context: any): Function {
        if (this._prevContext === context) {
            return this._cache;
        }

        this._prevContext = context;
        let f: Function   = function (): Promise<string[]> {
            let p: Promise<string[]> = new Promise((resolve: Function) => {
                setTimeout(() => {
                    let query = new RegExp(context.asyncSelected, 'ig');
                    return resolve(context.states.filter((state: any) => {
                        return query.test(state);
                    }));
                }, 200);
            });
            return p;
        };
        this._cache       = f;
        return this._cache;
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e: any): void {
        console.log(`Selected value: ${e.item}`);
    }
}
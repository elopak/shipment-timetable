System.register(['@angular/core', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ng2_bootstrap_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.dt = new Date();
                    this.minDate = null;
                    this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
                    this.format = this.formats[0];
                    this.dateOptions = {
                        formatYear: 'YY',
                        startingDay: 1
                    };
                    this.opened = false;
                }
                AppComponent.prototype.getDate = function () {
                    return this.dt && this.dt.getTime() || new Date().getTime();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        directives: [ng2_bootstrap_1.AlertComponent, ng2_bootstrap_1.DATEPICKER_DIRECTIVES],
                        template: "\n    <alert type=\"info\">ng2-bootstrap hello world!</alert>\n      <pre>Selected date is: <em *ngIf=\"dt\">{{ getDate() | date:'fullDate'}}</em></pre>\n      <h4>Inline</h4>\n      <div style=\"display:inline-block; min-height:290px;\">\n        <datepicker [(ngModel)]=\"dt\" [minDate]=\"minDate\" [showWeeks]=\"true\"></datepicker>\n      </div>\n  ",
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
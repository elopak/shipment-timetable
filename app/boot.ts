import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { DatePickerComponent } from './components/DatePickerComponent';
import 'rxjs/Rx'

enableProdMode();

bootstrap(DatePickerComponent);
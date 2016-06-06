import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { TimetableComponent } from './components/TimetableComponent';
import 'rxjs/Rx'

enableProdMode();

bootstrap(TimetableComponent);
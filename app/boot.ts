import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import 'rxjs/Rx';
import { TimetableComponent } from './components/TimetableComponent';

enableProdMode();

bootstrap(TimetableComponent);
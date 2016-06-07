import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { TimetableComponent } from './components/TimetableComponent';

enableProdMode();

bootstrap(TimetableComponent, [HTTP_PROVIDERS]);
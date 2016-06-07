import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { TimetableComponent } from './components/TimetableComponent';
import 'rxjs/Rx';

enableProdMode();

bootstrap(TimetableComponent, [HTTP_PROVIDERS]);
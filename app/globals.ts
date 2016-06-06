import { Interval } from './classes/Interval';
import { Client } from './classes/Client';
import { Agent } from './classes/Agent';
import { Year } from './classes/Year';

export var LOCALE = 'ru-RU';
export var YEAR    = Year.fromDate(new Date());
export var WEEKS   = YEAR.getWeeks();
export var CLIENTS = [
    new Client('WBD'),
    new Client('Danone'),
    new Client('Lactalis')
];

export var AGENTS = [
    new Agent('InterTransport'),
    new Agent('CargoBull')
];

export var INTERVALS = [
    new Interval(1),
    new Interval(2),
    new Interval(3),
    new Interval(4)
];

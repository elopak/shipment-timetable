import { Day } from './Day';
import { Interval } from './Interval';
import { Week } from './Week';
import { TimetableComponent } from '../components/TimetableComponent';
import { Dispatcher } from './Dispatcher';
import { Customer } from './Customer';
import { Indexed } from './Indexed';

export class Shipment extends Indexed {
    week: Week;
    day: Day;
    customer: Customer;
    dispatcher: Dispatcher;
    telephone: number;
    plannedPallets: number;
    actualPallets: number;
    created: Date;
    edited: Date;
    plannedInterval: Interval;
    arrived: number;
    loaded: number;
    urgent = false;

    ticket: string;
    vehicle: string;
    driver: string;
    comments: string;

    constructor(week: Week) {
        super(0);
        this.week            = TimetableComponent.CURRENT_WEEK;
        this.day             = Day.MONDAY;
        this.plannedInterval = new Interval(1);
        this.plannedPallets  = Interval.MAX_PALLETS;
        this.customer        = new Customer(1, null);
        this.dispatcher      = new Dispatcher(1, null);
    }

    getActualInterval(): Interval {
        if (!this.loaded) return null;
        for (var interval of TimetableComponent.INTERVALS) {
            if (this.loaded >= interval.startHour && this.loaded <= interval.endHour) return interval;
        }
        return null;
    }

    isCompleted(): boolean {
        return this.loaded != null;
    }

    isOnTime(): boolean {
        return this.getActualInterval().equals(this.plannedInterval);
    }
}
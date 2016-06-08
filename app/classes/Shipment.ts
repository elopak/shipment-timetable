import { Day } from './Day';
import { Interval } from './Interval';
import { Week } from './Week';
import { TimetableComponent } from '../components/TimetableComponent';
import { Dispatcher } from './Dispatcher';
import { Customer } from './Customer';

export class Shipment {
    week: Week;
    day: Day;
    customer: Customer;
    dispatcher: Dispatcher;
    telephone: number;
    plannedPallets: number;
    actualPallets: number;
    created: Date;
    edited: Date;
    plannedLoad: Interval;
    arrived: number;
    loaded: number;

    ticket: string;
    vehicle: string;
    driver: string;
    comments: string;

    constructor(week: Week){
        this.week = week;
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
        return this.getActualInterval().equals(this.plannedLoad);
    }

}
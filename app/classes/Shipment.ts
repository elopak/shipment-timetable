import { Day } from './Day';
import { Interval } from './Interval';
import { Week } from './Week';
import { TimetableComponent } from '../components/TimetableComponent';

export class Shipment {
    week: Week;
    day: Day;
    customerId: number;
    dispatcherId: number;
    telephone: number;
    plannedPallets: number;
    actualPallets: number;
    created: Date;
    edited: Date;
    plannedLoad: number;
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

    getPlannedInterval(): Interval {
        for (var interval of TimetableComponent.INTERVALS) {
            if (this.plannedLoad >= interval.startHour && this.plannedLoad <= interval.endHour) return interval;
        }
    }

    isCompleted(): boolean {
        return this.loaded != null;
    }

    isOnTime(): boolean {
        return this.getActualInterval().equals(this.getPlannedInterval());
    }

}
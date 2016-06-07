import { Day } from './Day';
import { Interval } from './Interval';
import { WeekDayInterval } from './WeekDayInterval';
import { Indexed } from './Indexed';
import { Time } from './Time';
import { Week } from './Week';
import { TimetableComponent } from '../components/TimetableComponent';

export class Shipment extends Indexed {
    customerId: number;
    dispatcherId: number;
    telephone: number;
    plannedPallets: number;
    actualPallets: number;
    created: Time;
    edited: Time;
    plannedLoad: Time;
    arrived: Time;
    loaded: Time;

    ticket: string;
    vehicle: string;
    driver: string;
    comments: string;

    getActualInterval(): Interval {
        if (!this.loaded) return null;
        for (var interval of TimetableComponent.INTERVALS) {
            var loadHour = this.loaded.getHour();
            if (loadHour >= interval.startHour && loadHour <= interval.endHour) return interval;
        }
        return null;
    }

    getPlannedInterval(): Interval {
        var date = this.plannedLoad.getDate();
        return new WeekDayInterval(Week.fromDate(date), Day.fromDate(date), Interval.fromDate(date));
    }

    isCompleted(): boolean {
        return this.loaded != null;
    }

    isOnTime(): boolean {
        return this.getActualInterval() === this.getPlannedInterval();
    }

}
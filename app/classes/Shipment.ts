import { Agent } from './Agent';
import { Client } from './Client';
import { Day } from './Day';
import { Interval } from './Interval';
import { INTERVALS } from '../globals';
import { WeekDayInterval } from './WeekDayInterval';

export class Shipment {
    urgent: boolean;
    client: Client;
    agent: Agent;
    vehicle: string;
    driver: string;
    phone: number;
    ticket: string;
    commentsMU: string;
    commentsLogistics: string;
    plannedPallets: number;
    plannedWeekDayInterval: WeekDayInterval;
    actualPallets: number;
    actualArrivalTime: Date;
    actualLoadTime: Date;

    getPlannedDay(): Day {
        return this.plannedWeekDayInterval.day;
    }

    getActualInterval(): Interval {
        if (!this.actualLoadTime) return null;
        for (var interval of INTERVALS) {
            var loadHour = this.actualLoadTime.getHours();
            if (loadHour >= interval.startHour && loadHour <= interval.endHour) return interval;
        }
        return null;
    }

    getPlannedInterval(): Interval {
        if (!this.plannedWeekDayInterval) return null;
        return this.plannedWeekDayInterval;
    }

    isCompleted(): boolean {
        return this.actualLoadTime == null;
    }

    isOnTime(): boolean {
        return this.getActualInterval() === this.getPlannedInterval();
    }

    constructor(client: Client, agent: Agent, plannedWeekDayInterval: WeekDayInterval, plannedPallets: number) {
        this.client                 = client;
        this.agent                  = agent;
        this.plannedPallets         = plannedPallets;
        this.plannedWeekDayInterval = plannedWeekDayInterval;
    }
}
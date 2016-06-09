import { IndexedNamed } from './IndexedNamed';
import { Shipment } from './Shipment';
import { Interval } from './Interval';
import { TimetableComponent } from '../components/TimetableComponent';

export class Day extends IndexedNamed {
    public static MILLISECONDS = 24 * 60 * 60 * 1000;
    public static MONDAY       = new Day(1, 'Понедельник');
    public static TUESDAY      = new Day(2, 'Вторник');
    public static WEDNESDAY    = new Day(3, 'Среда');
    public static THURSDAY     = new Day(4, 'Четверг');
    public static FRIDAY       = new Day(5, 'Пятница');
    public static SATURDAY     = new Day(6, 'Суббота');
    public static SUNDAY       = new Day(7, 'Воскресенье');

    intervals = [
        new Interval(1),
        new Interval(2),
        new Interval(3),
        new Interval(4)
    ];

    getShipments(): Shipment[] {
        let shipments: Shipment[] = [];
        for (let interval of this.intervals){
            for (let shipment of interval.shipments) shipments.push(shipment);
        }
        return shipments;
    }
    
    hasShipments(): boolean {
        return this.getShipments().length != 0;
    }
    
    getRows(): number {
        let rows = 0;
        for (let interval of this.intervals){
            rows += (interval.shipments.length || 1);
        }
        return rows;
    }

    public static getWorkingDays(): Day[] {
        return [
            Day.MONDAY,
            Day.TUESDAY,
            Day.WEDNESDAY,
            Day.THURSDAY,
            Day.FRIDAY
        ];
    }

    public toString(): string {
        return this.name;
    }

    public static fromDate(date: Date): Day {
        return Day.getWorkingDays()[date.getDay() - 1];
    }    

    equals(day: Day): boolean {
        return day.id === this.id;
    }
}
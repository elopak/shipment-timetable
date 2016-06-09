import { Indexed } from './Indexed';
import { Shipment } from './Shipment';

export class Interval extends Indexed {
    startHour: number;
    endHour: number;
    shipments: Shipment[] = [];

    public static MAX_PALLETS = 66;
    public static MAX_SHIPMENTS = 3;

    public static INTERVALS = [
        new Interval(1),
        new Interval(2),
        new Interval(3),
        new Interval(4)
    ];

    constructor(index: number) {
        super(Math.floor(index));
        this.startHour = (index === 1 ? 10 : 11 + (index - 1) * 2);
        this.endHour   = this.startHour + 2;
    }

    public static fromDate(date: Date): Interval {
        return Interval.fromHour(Number(date.getHours));
    }

    public static fromHour(hour: number): Interval {
        if (hour >= 10 && hour < 12) return new Interval(1);
        if (hour >= 13 && hour < 15) return new Interval(2);
        if (hour >= 15 && hour < 17) return new Interval(3);
        if (hour >= 17 && hour < 19) return new Interval(4);
        return null;
    }
    
    hasShipments(): boolean {
        return this.shipments.length > 0;
    }

    getTotalPallets(): number {
        let totalPallets = 0;
        this.shipments.forEach(shipment => totalPallets += shipment.plannedPallets);
        return totalPallets;
    }
    
    getAvailablePallets(): number {
        if (!this.isAvailable()) return 0;
        return Interval.MAX_PALLETS - this.getTotalPallets();
    }

    isAvailable(): boolean {
        return (this.getTotalPallets() < Interval.MAX_PALLETS && this.shipments.length < Interval.MAX_SHIPMENTS);
    }

    toString(): string {
        return this.startHour + ':00 – ' + this.endHour + ':00';
    }   
    
}
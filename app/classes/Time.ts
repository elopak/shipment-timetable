export class Time {
    value: number;

    public constructor(value: number){
        this.value = value;
    }

    public static fromDate(date: Date): Time {
        return new Time(
            (date.getFullYear() - 2000) * 1e8
            + date.getMonth() * 1e6 + 1
            + date.getDate() * 1e4
            + date.getHours() * 1e2
            + date.getMinutes()
        );        
    }
    
    getDate(): Date {
        return new Date(this.getYear(), this.getMonth() - 1, this.getDay(), this.getHour(), this.getMinute());
    }

    getYear():number {
        return Math.floor(this.value / 1e8 % 1e8) + 2000;
    }

    getMonth():number {
        return Math.floor(this.value / 1e6 % 1e6);
    }

    getDay():number {
        return Math.floor(this.value / 1e4 % 1e4);
    }

    getHour():number {
        return Math.floor(this.value / 1e2 % 1e2);
    }

    getMinute():number {
        return this.value % 1e2;
    }

}
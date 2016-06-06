import { IndexedNamed } from './IndexedNamed';

export class Day extends IndexedNamed {
    public static MILLISECONDS = 24 * 60 * 60 * 1000;
    public static MONDAY       = new Day(1, 'Пн');
    public static TUESDAY      = new Day(2, 'Вт');
    public static WEDNESDAY    = new Day(3, 'Ср');
    public static THURSDAY     = new Day(4, 'Чт');
    public static FRIDAY       = new Day(5, 'Пт');
    public static SATURDAY     = new Day(6, 'Сб');
    public static SUNDAY       = new Day(7, 'Вс');

    public static getDays(): Day[] {
        return [
            Day.MONDAY,
            Day.TUESDAY,
            Day.WEDNESDAY,
            Day.THURSDAY,
            Day.FRIDAY,
            Day.SATURDAY,
            Day.SUNDAY
        ];
    }

    public toString(): string {
        return this.name;
    }
}
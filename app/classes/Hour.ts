import { IndexedNamed } from './IndexedNamed';

export class Hour extends IndexedNamed {
    public static getHours(): Hour[] {
        var hours: Hour[] = [];
        
        for (var i = 8; i < 25; i++){
            hours.push(new Hour(i, String(i) + ':00'));
        }
        
        return hours;
    }
}
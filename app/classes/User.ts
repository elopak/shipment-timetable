import { IndexedNamed } from './IndexedNamed';

export class User extends IndexedNamed {
    password: string;

    constructor(id: number, name: string, password: string) {
        super(id, name);
        this.password = password;
    }
    
    public static MANAGER = new User(1, 'МЮ', '111');
    public static LOGISTICS = new User(2, 'Склад', '222');
    
    public static getUsers(): User[] {
        return [User.MANAGER, User.LOGISTICS];
    }
        
}
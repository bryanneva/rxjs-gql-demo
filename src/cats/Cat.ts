import {BehaviorSubject} from "rxjs/index";

let ids = 0;

export class Cat {
    id: number = ids++;

    public description: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public age: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(public name: string = '', age: number = 0, description: string = '') {
        this.description.next(description);
        this.age.next(age);
    }

    subscribe(update: () => void): any {
        this.description.subscribe(update);
        this.age.subscribe(update);
    }
}
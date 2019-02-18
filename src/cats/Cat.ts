import {BehaviorSubject} from "rxjs/index";
import {CatRepository} from "./CatRepository";

export class Cat {
    public description: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public age: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public lastUpdated: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(
        private catRepository: CatRepository,
        public id: number = 0,
        public name: string = '',
        age: number = 0,
        description: string = '') {

        this.description.next(description);
        this.age.next(age);
    }

    subscribe(update: () => void): void {
        this.description.subscribe(update);
        this.age.subscribe(update);
    }

    async save() {
        const response = await this.catRepository.updateCat(this);
        console.log('save', response);
        this.lastUpdated.next(response.updatedAt);
    }
}
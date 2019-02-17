import {Cat} from "./Cat";

export class CatRepository {
    getCats() {
        return Promise.resolve([
            new Cat("Cookie", 9, "Feral tabby cat"),
            new Cat("Tommy", 14, "Indoor cat with white and black coat"),
            new Cat("Pepper", 11, "Indoor male cat with black and white coat"),
        ]);
    }
}

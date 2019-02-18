import {Cat} from "./Cat";
import {ajax} from "rxjs/ajax";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs/index";

interface CatFactResponse {
    all: Array<{
        _id: string;
        text: string;
    }>
}

type RequesUser = { id: number, first_name: string, last_name: string, avatar: string };

interface RequesGetUsersResponse {
    data: RequesUser[];
}

type RequesPutUserRequest = { name: string, job: string };

type RequesPutUserResponse = { name: string, job: string, updatedAt: string };

export interface GraphQLPayload<T> {
    data?: T;
    dataPresent: boolean;
    errors: any[];
}

export class CatRepository {
    // private catNames = [
    //     "Cookie",
    //     "Tommy",
    //     "Joey",
    //     "Nika",
    //     "Kishan",
    //     "Pepper",
    // ];

    // getFacts(): /facts/random

    getCats(): Promise<Cat[]> {
        return fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then((users: RequesGetUsersResponse) => users.data.map((user: RequesUser) =>
                new Cat(
                    this,
                    user.id,
                    `${user.first_name} ${user.last_name}`,
                    this.age(),
                    ""
                ))
            );
    }

    updateCat(cat: Cat): Promise<RequesPutUserResponse> {
        console.log('update cat', cat);
        const requestBody: RequesPutUserRequest = {
            name: cat.name,
            job: cat.description.getValue()
        };

        return fetch(`https://reques.in/api/users/${cat.id}`, {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((json: RequesPutUserResponse) => json);

    }

    private age(): number {
        return Math.floor(Math.random() * Math.floor(20));
    }

    alternativeGetCats(): Observable<Cat[]> {
        return ajax({url: 'https://reqres.in/api/users'})
            .pipe(
                tap(ajax => console.log('GraphQL Tap', ajax)),
                map((ajax: any) => ajax.response),
                map((response: RequesGetUsersResponse) => {
                    return response.data.map((user: RequesUser) =>
                        new Cat(
                            this,
                            user.id,
                            `${user.first_name} ${user.last_name}`,
                            this.age(),
                            ""
                        ))
                })
            )
    }
}

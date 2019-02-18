import {GraphQLClient} from 'graphql-request';

export class PlanetRepository {
    private client: GraphQLClient = new GraphQLClient('https://graphql.org/swapi-graphql', {mode: "no-cors"});

    getPlanets() {
        const query = `{
            allPlanets(first: 30) {
                planets {
                    name
                    diameter
                    population
                    climates
                    created
                    edited
                }
            }
        }`;

        this.client.request(query).then(data => console.log('data', data));
    }
}
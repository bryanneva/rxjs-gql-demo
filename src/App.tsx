import React, {Component} from 'react';
import './App.css';
import {CatRepository} from "./cats/CatRepository";
import {Cat} from "./cats/Cat";
import {CatComponent} from "./CatComponent";
import {PlanetComponent} from "./PlanetComponent";
import {PlanetRepository} from "./star-wars/PlanetRepository";

type AppProps = { catRepository: CatRepository, planetRepository: PlanetRepository };

type AppState = { cats: Cat[], otherCats: Cat[] }

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            cats: [],
            otherCats: []
        };
    }

    componentDidMount() {
        this.props.catRepository.getCats()
            .then(cats => this.setState({cats}));

        this.props.catRepository.alternativeGetCats()
            .subscribe(otherCats => this.setState({otherCats}));

        // this.props.planetRepository.getPlanets(); // Needs proxy
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>State Management Demo</h1>
                </header>
                <main className="App-body">
                    <div>
                        <h2>Cats</h2>
                        <ul>
                            {this.state.cats.map((cat: Cat) => <li className="cat-container" key={cat.id}>
                                <CatComponent cat={cat}/>
                            </li>)}
                        </ul>
                    </div>
                    <div>
                        <h2>Other Cats</h2>
                        <ul>
                            {this.state.otherCats.map((cat: Cat) => <li className="cat-container" key={cat.id}>
                                <CatComponent cat={cat}/>
                            </li>)}
                        </ul>
                    </div>
                    <div>
                        <h2>Planets</h2>
                        <div><PlanetComponent/></div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import {CatRepository} from "./cats/CatRepository";
import {Cat} from "./cats/Cat";
import {CatComponent} from "./CatComponent";

type AppProps = { catRepository: CatRepository };

type AppState = { cats: Cat[] }

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            cats: []
        };
    }

    componentDidMount() {
        this.props.catRepository.getCats()
            .then(cats => this.setState({cats}));
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
                </main>
            </div>
        );
    }
}

export default App;

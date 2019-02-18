import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {CatRepository} from "./cats/CatRepository";
import {PlanetRepository} from "./star-wars/PlanetRepository";



ReactDOM.render(<App catRepository={new CatRepository()} planetRepository={new PlanetRepository()}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

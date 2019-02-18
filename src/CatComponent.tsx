import React, {Component} from 'react';
import {Cat} from "./cats/Cat";

type CatProps = { cat: Cat };

export class CatComponent extends Component<CatProps> {
    constructor(props: CatProps) {
        super(props);
        this.updateAge = this.updateAge.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.cat.subscribe(() => this.forceUpdate());
    }

    render() {
        return (
            <section className="cat">
                <header className="cat-header">{this.props.cat.name}</header>
                <main className="cat-body">
                    <form onSubmit={this.onSubmit}>
                        <fieldset className="cat-data cat-age">
                            <label htmlFor={`age-${this.props.cat.id}`}>Age</label>
                            <input
                                type="text"
                                id={`age-${this.props.cat.id}`}
                                value={this.props.cat.age.getValue()}
                                onChange={this.updateAge}/>
                        </fieldset>

                        <fieldset className="cat-data cat-description">
                            <label htmlFor={`description-${this.props.cat.id}`}>Description:</label>
                            <input
                                type="text"
                                id={`description-${this.props.cat.id}`}
                                value={this.props.cat.description.getValue()}
                                onChange={this.updateDescription}
                            />
                        </fieldset>

                        <input type="submit" value="Save"/>
                    </form>

                    <p>{this.props.cat.lastUpdated.getValue()}</p>
                </main>
            </section>
        );
    }

    updateAge(e: any) {
        this.props.cat.age.next(e.target.value);
    }

    updateDescription(e: any) {
        this.props.cat.description.next(e.target.value);
    }

    onSubmit(e: any) {
        console.log('onSubmit')
        e.preventDefault();
        this.props.cat.save();
    }
}
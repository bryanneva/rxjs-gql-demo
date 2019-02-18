import React from 'react';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import {CatComponent} from "./CatComponent";
import {Cat} from "./cats/Cat";

describe('CatComponent', () => {
    afterEach(cleanup);

    it('displays the cat name', () => {
        const cat = new Cat({}, 1, "Snowball", 0, "");
        const {getByText} = render(<CatComponent cat={cat}/>);
        const element = getByText(/snowball/i);
        expect(element.innerHTML).toEqual("Snowball");
    });

    it('displays the age', () => {
        const cat = new Cat({}, 1, "Snowball", 50, "");
        const {getByLabelText} = render(<CatComponent cat={cat}/>);
        const ageInput = getByLabelText(/age/i) as HTMLInputElement;
        expect(ageInput.value).toEqual("50");
    });

    it('changes the age', () => {
        const cat = new Cat({}, 1, "Snowball", 50, "");
        const {getByLabelText} = render(<CatComponent cat={cat}/>);
        const ageInput = getByLabelText(/age/i) as HTMLInputElement;

        expect(ageInput.value).toEqual("50");

        fireEvent.change(ageInput, {target: {value: 33}});

        expect(cat.age.getValue()).toEqual(33);

        const updatedAgeInput = getByLabelText(/age/i) as HTMLInputElement;

        expect(updatedAgeInput.value).toEqual("33");
    });
});
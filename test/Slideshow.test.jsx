import React from 'react';
import ReactDOM from 'react-dom';
import Image from 'react-bootstrap/Image'; // Need this to render Carousel?
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
const jsdom = require('mocha-jsdom');

global.document = jsdom({
    url: "http://localhost:3000"
});

let root;

import ControlledCarousel from '../src/components/Slideshow';

beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
});

afterEach(() => {
    document.body.removeChild(root);
    root = null;
});

describe('Slideshow (ControlledCarousel) Testing', () => {
    it("Renders ControlledCarousel", () => {
        // test if the component is rendered and mounted (unit test)
        act(() => {
            ReactDOM.render(<ControlledCarousel />, root);
        })
        // assert that index increments (function test)

        // const indicators = root.querySelector("li");
        // let indicators = carousel.("li");
        console.log(root.innerHTML); // Work from here!
        // console.log(indicators);

        // expect(carousel.activeIndex).to.equal(0); // change this for increment?
        // assert that direction changes if clicked on? (tough with 2 images...)
    });
});

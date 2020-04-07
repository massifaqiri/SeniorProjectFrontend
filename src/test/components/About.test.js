import React from 'react';
import TestRenderer from 'react-test-renderer';
import AboutSub from '../resources/AboutSub';
import About from '../resources/About';

import {expect} from 'chai';

var ShallowRenderer = require('react-test-renderer/shallow')

/*
References:
https://reactjs.org/docs/shallow-renderer.html
https://reactjs.org/docs/test-renderer.html
*/


describe("About component unit test", () => {
    it('About should render AboutUs.png ', () => {
        const shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<About />);
        const result = shallowRenderer.getRenderOutput();
        console.log(result);
//        expect(result.props.children[0].props.children).equal("Fuzzy's Taco Shop")
//        console.log(result.props.children[0].props.children);
//        expect(result.props.children).equal("Fuzzy's Taco Shop");
        console.log(result.props.children[1]); //KtSubComponent
    });
});

//console.log(result)
//console.log(typeof(testRenderer.findByProps({id: 'sub'}).props.children))


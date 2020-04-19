import React from 'react';
// import TestRenderer from 'react-test-renderer';
import About from '../../components/About';

// import {expect} from 'chai';

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
        console.log(result.props.children[1]);
    });
});
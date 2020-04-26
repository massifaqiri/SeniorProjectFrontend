import React from 'react';
import Home from "../../components/Home";

const ShallowRenderer = require('react-test-renderer/shallow');
const shallowRenderer = new ShallowRenderer();
shallowRenderer.render(<Home />);
const result = shallowRenderer.getRenderOutput();

describe('Home component unit test', () => {
    it('Outer component is a div', () => {
        assert.equal(result.type, 'div', 'Home is type div');
    });
    it('There are 3 Child Components ', () => {
        assert.equal(result.props.children.length, 3);
    })
});
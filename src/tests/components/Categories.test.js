import React from 'react';
import Categories from "../../components/Categories";
import TestRenderer from 'react-test-renderer';

const ShallowRenderer = require('react-test-renderer/shallow');
const shallowRenderer = new ShallowRenderer();
shallowRenderer.render(<Categories />);
const result = shallowRenderer.getRenderOutput();
// Demo ShallowRender OBJ
// console.log(result);

const testRenderer = TestRenderer.create(<Categories />)
const testInstance = testRenderer.root;

describe('Categories component unit test', () => {
    it('Outer component is a container', () => {
        assert.equal(result.type.displayName, 'Container', 'Categories is type Container');
    });
    it('There are 14 categories', () => {
        let category_list = testInstance.findByProps({className: "row"})
        assert.equal(category_list.props.children.length, 14);
    })
});
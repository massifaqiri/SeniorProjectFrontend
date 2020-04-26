import React from 'react';
import Misc from "../../../components/categories/Misc";

const ShallowRenderer = require('react-test-renderer/shallow');
const shallowRenderer = new ShallowRenderer();
shallowRenderer.render(<Misc />);
const result = shallowRenderer.getRenderOutput();

describe('Misc component unit test', () => {

});
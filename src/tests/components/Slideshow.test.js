import React from 'react';
import Slideshow from "../../components/Slideshow";

const ShallowRenderer = require('react-test-renderer/shallow');
const shallowRenderer = new ShallowRenderer();
shallowRenderer.render(<Slideshow />);
const result = shallowRenderer.getRenderOutput();

describe('Slideshow component unit test', () => {
    it('Outer component is a Carousel', () => {
        assert.equal(result.type.Caption.displayName, 'CarouselCaption', 'Slideshow is type Carousel');
    });
});
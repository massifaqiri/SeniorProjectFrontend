import React from 'react';
import About from '../../components/About';
import ShallowRenderer from 'react-test-renderer/shallow';

const shallowRenderer = new ShallowRenderer();
shallowRenderer.render(<About />);
const result = shallowRenderer.getRenderOutput();


describe("About Component Unit Test", () => {
    it('Confirm About is a div with 8 sub components', () => {
        assert.equal(result.type, 'div', 'About renders a div');
        assert.lengthOf(result.props.children, 8, 'There are 8 sub components of About');
    });
    it('Confirm 1st Child is a div', () => {
        let firstChild = result.props.children[0];
        assert.equal(firstChild.type, 'div', 'First Child of About is a div');
    });
});

// 1st Child contains CandidCheetahs.png
// TODO: Confirm image is the correct
// expect(testRenderer.findByType(img).props.src).to.equal('CandidCheetahs.png');
// 2nd Child is 3 Pillars in Accordion component
// assert.typeOf(result.props.children[1], 'Accordion');
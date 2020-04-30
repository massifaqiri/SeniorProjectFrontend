import React from 'react';
import chai from 'chai';
import chaiJestSnapshot from 'chai-jest-snapshot';
import renderer from 'react-test-renderer';
import Textbooks from "../../../components/categories/Textbooks";

// chai.use(chaiJestSnapshot);

// before(function() {
//     chaiJestSnapshot.resetSnapshotRegistry();
// });

// beforeEach(function() {
//     chaiJestSnapshot.configureUsingMochaContext(this);
// });

// describe("Textbooks Unit Test", function() {
//     it("Textbooks renders correctly", () => {
//         const tree = renderer.create(<Textbooks/>).toJSON();
//         expect(tree).to.matchSnapshot(true);
//     })
// });
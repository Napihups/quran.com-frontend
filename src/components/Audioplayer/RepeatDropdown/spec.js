import React from 'react';
import { mountWithIntl } from '../../../../tests/helpers/intl-enzyme-test-helper.js';

import RepeatDropdown from './index';

let component;
let overlay;
let setRepeat;
const chapter = {
  ayat: 10
};

const makeComponent = (repeat) => {
  setRepeat = sinon.stub();

  component = mountWithIntl(
    <RepeatDropdown
      repeat={repeat}
      setRepeat={setRepeat}
      current={1}
      chapter={chapter}
    />
  );

  overlay = mountWithIntl(component.find('OverlayTrigger').first().props().overlay);
};

describe('<RepeatDropdown />', () => {
  it('should not be repeating', () => {
    makeComponent({ times: Infinity });

    expect(component.find('i').first().props().className).not.to.contain('repeat_');
  });

  it('should indicate repeating', () => {
    makeComponent({ from: 1, to: 10, times: Infinity });

    expect(component.find('i').first().props().className).to.contain('repeat');
  });

  describe('when single ayah', () => {
    beforeEach(() => {
      makeComponent({ from: 3, to: 3, times: Infinity });
    });

    it('should have a single ayah input', () => {
      expect(overlay.find('FormControl').length).to.eql(2); // with the times
    });

    it('should have value of the ayah for the input', () => {
      expect(overlay.find('FormControl').first().props().value).to.eql(3);
    });
  });

  describe('when range', () => {
    beforeEach(() => {
      makeComponent({ from: 1, to: 3, times: Infinity });
    });

    it('should have a range ayah input', () => {
      expect(overlay.find('FormControl').length).to.eql(3); // with the times
    });

    it('should have value of the ayah for the input', () => {
      expect(overlay.find('FormControl').first().props().value).to.eql(1);
      expect(overlay.find('FormControl').at(1).props().value).to.eql(3);
    });
  });

  describe('times', () => {
    it('should have Infinity count', () => {
      makeComponent({ from: 1, to: 3, times: Infinity });

      expect(overlay.find('FormControl').last().props().value).to.eql(Infinity);
    });

    it('should have a count', () => {
      makeComponent({ from: 1, to: 3, times: 4 });

      expect(overlay.find('FormControl').last().props().value).to.eql(4);
    });
  });
});

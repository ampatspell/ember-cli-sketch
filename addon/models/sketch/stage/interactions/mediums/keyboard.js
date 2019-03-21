import Base from '../../../-base';
import { equal } from '@ember/object/computed';

const keyCode = value => equal('keyCode', value).readOnly();
const key = value => equal('key', value).readOnly();

export default Base.extend({

  owner: null,

  state: 'up',
  key: null,
  keyCode: null,

  isShift: key('Shift'),
  isSpace: keyCode(32),

  onKeyDown({ key, keyCode }) {
    this.setProperties({ state: 'down', key, keyCode });
  },

  onKeyPress(/* { key, keyCode } */) {
  },

  onKeyUp() {
    this.setProperties({ state: 'up', key: null, keyCode: null });
  },

  reset() {
    this.setProperties({
      state: 'up',
      key: null,
      keyCode: null
    });
  }

});

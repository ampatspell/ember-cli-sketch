import EmberObject from '@ember/object';
import { equal } from '@ember/object/computed';

const keyCode = value => equal('keyCode', value).readOnly();
const key = value => equal('key', value).readOnly();

export default EmberObject.extend({

  owner: null,

  state: 'up',
  key: null,
  keyCode: null,

  isShift: key('Shift'),
  isSpace: keyCode(32),

  prepare(props) {
    this.setProperties(props);
  },

  onKeyDown({ key, keyCode }) {
    this.setProperties({ state: 'down', key, keyCode });
  },

  onKeyPress(/* { key, keyCode } */) {
  },

  onKeyUp() {
    this.setProperties({ state: 'up', key: null, keyCode: null });
  }

});

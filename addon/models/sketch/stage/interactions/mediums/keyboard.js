import Base from '../../../-base';
import { equal } from '@ember/object/computed';

const keyCode = value => equal('keyCode', value).readOnly();
const key = value => equal('key', value).readOnly();

let mapping = {
  ' ':     'isSpace',
  'Shift': 'isShift',
  'Meta':  'isMeta'
};

export default Base.extend({

  owner: null,

  state: 'up',
  key: null,
  keyCode: null,

  isShift: false,
  isSpace: false,
  isMeta: false,

  updateKeys({ key }, value) {
    let prop = mapping[key];
    if(!prop) {
      return;
    }
    console.log(prop, value);
    this.set(prop, value);
  },

  onKeyDown(opts) {
    let { key, keyCode } = opts;
    this.setProperties({ state: 'down', key, keyCode });
    this.updateKeys(opts, true);
  },

  onKeyPress(/* { key, keyCode } */) {
  },

  onKeyUp(opts) {
    let { key, keyCode } = opts;
    this.setProperties({ state: 'up', key: null, keyCode: null });
    this.updateKeys(opts, false);
  },

  reset() {
    this.setProperties({
      state: 'up',
      key: null,
      keyCode: null
    });
  }

});

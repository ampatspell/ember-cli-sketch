import Base from '../../../-base';
import { array, serialized } from '../../../../../util/computed';
import { computed } from '@ember/object';

const properties = [ 'state', 'keys', 'isShift', 'isSpace', 'isMeta' ];

const is = (key, value) => computed(`keys.@each.${key}`, function() {
  return !!this.keys.find(object => object[key] === value);
}).readOnly();

const isKey = value => is('key', value);

export default Base.extend({

  owner: null,

  state: 'up',
  keys: array(),

  isShift: isKey('Shift'),
  isSpace: isKey(' '),
  isMeta:  isKey('Meta'),

  serialized: serialized(properties, hash => {
    hash.keys = hash.keys.slice();
    return hash;
  }),

  existingKey({ key, keyCode }) {
    return this.keys.find(object => object.key === key && object.keyCode === keyCode);
  },

  addKey(opts) {
    if(this.existingKey(opts)) {
      return;
    }
    this.keys.pushObject(opts);
  },

  removeKey(opts) {
    let object = this.existingKey(opts);
    if(!object) {
      return;
    }
    this.keys.removeObject(object);
  },

  onKeyDown(opts) {
    this.setProperties({ state: 'down' });
    this.addKey(opts);
  },

  onKeyPress() {
  },

  onKeyUp(opts) {
    this.setProperties({ state: 'up' });
    this.removeKey(opts);
  },

  reset() {
    this.setProperties({ state: 'up' });
    this.keys.clear();
  }

});

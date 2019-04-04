import EmberObject, { computed } from '@ember/object';
import { array, serialized } from '../../../util/computed';
import sketches from '../../../util/sketches';

const properties = [ 'state', 'keys', 'isShift', 'isSpace', 'isMeta' ];

const is = key => computed(`keys.@each.${key}`, function() {
  return !!this.keys.find(object => object[key]);
}).readOnly();

const state = () => computed('keys.[]', function() {
  return this.keys.length ? 'down' : 'up';
}).readOnly();

export default EmberObject.extend({

  keys: array(),
  state: state(),

  isShift: is('isShift'),
  isSpace: is('isSpace'),
  isMeta:  is('isMeta'),

  serialized: serialized(properties, hash => {
    hash.keys = hash.keys.map(key => key.serialized);
    return hash;
  }),

  isKeyCode(keyCode) {
    return !!this.keys.find(object => object.keyCode === keyCode);
  },

  existingKey({ key, keyCode }) {
    return this.keys.find(object => object.key === key && object.keyCode === keyCode);
  },

  createKey(opts) {
    return sketches(this).factory.interationsKeyboardKey(opts);
  },

  addKey(opts) {
    let key = this.existingKey(opts);
    if(!key) {
      key = this.createKey(opts);
      this.keys.pushObject(key);
    }
    return key;
  },

  removeKey(opts) {
    let object = this.existingKey(opts);
    if(!object) {
      return;
    }
    this.keys.removeObject(object);
    return object;
  },

  onKeyDown(opts) {
    return this.addKey(opts);
  },

  onKeyUp(opts) {
    return this.removeKey(opts);
  },

  reset() {
    this.keys.clear();
  }

});

import Base from '../../../-base';
import { array, serialized } from '../../../../../util/computed';
import { computed } from '@ember/object';
import { sketches } from '../../../../../services/sketches';

const properties = [ 'state', 'keys', 'isShift', 'isSpace', 'isMeta' ];

const is = key => computed(`keys.@each.${key}`, function() {
  return !!this.keys.find(object => object[key]);
}).readOnly();

export default Base.extend({

  owner: null,

  state: 'up',
  keys: array(),

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
    return sketches(this).factory.stage.interactions.key(this, opts);
  },

  addKey(opts) {
    if(this.existingKey(opts)) {
      return;
    }
    let key = this.createKey(opts);
    this.keys.pushObject(key);
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
    this.setProperties({ state: 'down' });
    return this.addKey(opts);
  },

  onKeyUp(opts) {
    this.setProperties({ state: 'up' });
    return this.removeKey(opts);
  },

  reset() {
    this.setProperties({ state: 'up' });
    this.keys.clear();
  }

});

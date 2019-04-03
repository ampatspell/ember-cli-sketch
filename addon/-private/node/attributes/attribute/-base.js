import EmberObject, { defineProperty } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isProp } from '../../../computed/prop';

export default EmberObject.extend({

  attributes: null,
  opts: null,

  model: readOnly('attributes.model'),

  init() {
    this._super(...arguments);
    this._createProps();
  },

  _createProps() {
    let { opts } = this;
    for(let key in opts) {
      let value = opts[key];
      if(isProp(value)) {
        defineProperty(this, key, readOnly(`model.${value.key}`));
      } else {
        this.set(key, value);
      }
    }
  },

  getPrimitiveValue() {
    return this.model.get(this.opts.target);
  },

  setPrimitiveValue(value) {
    return this.model.set(this.opts.target, value);
  },

  getValue() {
    return this.transformValue(this.getPrimitiveValue());
  },

  setValue(value) {
    if(this.immutable) {
      return this.getValue();
    }
    return this.setPrimitiveValue(this.transformValue(value));
  },

});

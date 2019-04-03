import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  attributes: null,
  opts: null,

  model: readOnly('attributes.model'),

  getPrimitiveValue() {
    return this.model.get(this.opts.target);
  },

  setPrimitiveValue(value) {
    return this.model.set(this.opts.target, value);
  },

  getValue() {
    return this.getPrimitiveValue();
  },

  setValue(value) {
    return this.setPrimitiveValue(value);
  },

});

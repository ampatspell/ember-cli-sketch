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

  transform() {
    let { type } = this.opts;
    if(!type) {
      return;
    }
    return this.attributes.transforms.transform(type);
  },

  transformValue(value) {
    let transform = this.transform();
    if(transform) {
      value = transform.process(value, this.opts);
    }
    return value;
  },

  getValue() {
    let value = this.getPrimitiveValue();
    return this.transformValue(value);
  },

  setValue(value) {
    value = this.transformValue(value);
    return this.setPrimitiveValue(value);
  },

});

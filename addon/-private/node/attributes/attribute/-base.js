import EmberObject, { defineProperty } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isProp } from '../../../computed/prop';
import { assign } from '@ember/polyfills';

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

  //

  isChanged(value) {
    let transformed = this.transformValue(value);
    return this.getValue() !== transformed;
  },

  _invokeChanged(value, state) {
    let changed = this.opts.changed;
    if(!changed) {
      return;
    }
    let deps = assign(this.getProperties(Object.keys(this.opts)), state);
    let model = this.model;
    return changed.call(this.model, value, deps, model);
  },

  didSetValue(value) {
    let deps = this._invokeChanged(value);
    if(!deps) {
      return;
    }
    for(let key in deps) {
      let value = deps[key];
      let attribute = this.attributes.attribute(key);
      if(attribute.isChanged(value)) {
        attribute.setValue(value, true);
      }
    }
  },

  //

  getValue() {
    return this.transformValue(this.getPrimitiveValue());
  },

  setValue(value, skipNotify) {
    if(this.immutable) {
      return this.getValue();
    }
    value = this.setPrimitiveValue(this.transformValue(value));
    if(!skipNotify) {
      this.didSetValue(value);
    }
    return value;
  },

  //

  resolve(value, state) {
    if(this.immutable) {
      return this.getValue();
    }

    value = this.transformValue(value);
    let deps = this._invokeChanged(value, state);

    return {
      [this.key]: value,
      ...deps
    };
  }

});

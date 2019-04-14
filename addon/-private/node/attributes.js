import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { assert } from '@ember/debug';
import { factory } from '../util/computed';
import { __sketch_attribute__ } from '../computed/attr';

const definitions = () => computed(function() {
  let definitions = [];
  this.model.constructor.eachComputedProperty((key, meta) => {
    if(meta[__sketch_attribute__] !== true) {
      return;
    }
    definitions.push(assign({ key }, meta.opts));
  });
  return definitions;
}).readOnly();

const attributes = () => factory((factory, attributes) => {
  return attributes.definitions.reduce((hash, definition) => {
    let { key, type } = definition;
    let attribute = factory.attribute(attributes, type, definition);
    hash[key] = attribute;
    return hash;
  }, {});
});

const attribute = fn => function(name, ...args) {
  return fn(this.attribute(name, true), ...args);
}

export default EmberObject.extend({

  node: null,
  model: readOnly('node.model'),

  definitions: definitions(),
  attributes: attributes(),

  attribute(key, required=true, requiredType) {
    let attribute = this.attributes[key];
    assert(`attribute '${key}' not defined for ${this.model}`, attribute || !required);
    assert(`attribute ${key} must be ${requiredType} not ${attribute.type}`, !requiredType || attribute.type === requiredType);
    return attribute;
  },

  getValue(key) {
    return this.attribute(key).getValue();
  },

  setValue(key, value) {
    return this.attribute(key).setValue(value);
  },

  changes(props) {
    let { model } = this;
    let result = {};
    for(let key in props) {
      let value = props[key];
      let attribute = this.attribute(key, false);
      if(attribute) {
        let { changed, transformed } = attribute.isChanged(value);
        if(changed) {
          result[key] = transformed;
        }
      } else {
        if(model[key] !== value) {
          result[key] = value;
        }
      }
    }
    return result;
  },

  clamp:      attribute((attribute, value) => attribute.clamp(value)),
  clampDelta: attribute((attribute, delta) => attribute.clampDelta(delta)),
  transform:  attribute((attribute, value) => attribute.transformValue(value))

});

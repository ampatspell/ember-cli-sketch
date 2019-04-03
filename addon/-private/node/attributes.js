import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { assert } from '@ember/debug';
import { __sketch_attribute__ } from '../computed/attr';

const transforms = () => computed(function() {
  return this.node.sketches.factory.transforms();
}).readOnly();

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

const attributes = () => computed(function() {
  let factory = this.node.sketches.factory;
  return this.definitions.reduce((hash, definition) => {
    let attribute = factory.attribute(this, definition);
    hash[definition.key] = attribute;
    return hash;
  }, {});
}).readOnly();

export default EmberObject.extend({

  node: null,
  model: readOnly('node.model'),

  transforms: transforms(),
  definitions: definitions(),
  attributes: attributes(),

  attribute(key, required=true) {
    let attribute = this.attributes[key];
    assert(`attribute '${key}' not defined for ${this.model}`, attribute || !required);
    return attribute;
  },

  getValue(key) {
    return this.attribute(key).getValue();
  },

  setValue(key, value) {
    return this.attribute(key).setValue(value);
  }

});

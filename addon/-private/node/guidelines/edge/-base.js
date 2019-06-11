import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export const frame = (...deps) => {
  let fn = deps.pop();
  return computed(`frame.{${deps.join(',')}}`, function() {
    return fn(this.frame.hover);
  }).readOnly();
};

export default EmberObject.extend({

  edges: null,

  node:  readOnly('edges.node'),
  frame: readOnly('node.frame')

});

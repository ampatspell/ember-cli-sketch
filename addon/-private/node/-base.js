import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export const frame = type => computed(function() {
  return this.sketches.factory.frame(type, this);
}).readOnly();

export default opts => EmberObject.extend({

  model: null,

  stage:  readOnly(`model.${opts.stage}`),
  parent: readOnly(`model.${opts.parent}`),
  nodes:  readOnly(`model.${opts.nodes}`)

});

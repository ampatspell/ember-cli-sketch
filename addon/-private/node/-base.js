import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export const frame = type => computed(function() {
  return this.sketches.factory.frame(type, this);
}).readOnly();

export default opts => {

  const prop = key => readOnly(`model.${opts.properties[key]}`);

  return EmberObject.extend({

    model: null,

    type:   prop('type'),
    stage:  prop('stage'),
    parent: prop('parent'),
    nodes:  prop('nodes'),

  });
};

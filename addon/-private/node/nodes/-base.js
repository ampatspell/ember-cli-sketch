import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { frame } from '../frame/-base';

export default condition => EmberObject.extend({

  nodes: null,
  sketches: readOnly('nodes.sketches'),

  all: computed(`nodes._nodes.@each.${condition}`, function() {
    return this.nodes._nodes.filter(node => node[condition]).map(node => node.model);
  }).readOnly(),

  frame: frame('nodes'),

});

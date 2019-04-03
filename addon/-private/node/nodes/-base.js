import EmberObject from '@ember/object';
import { filterBy, map, readOnly } from '@ember/object/computed';
import { frame } from '../frame/-base';

export default condition => EmberObject.extend({

  nodes: null,
  parent: readOnly('nodes.parent'),
  stage: readOnly('parent.stage'),

  _nodes: filterBy('nodes._nodes', condition, true),
  all: map('_nodes', node => node.model),

  frame: frame('nodes')

});

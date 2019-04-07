import EmberObject from '@ember/object';
import { filterBy, map, readOnly } from '@ember/object/computed';
import { frame } from '../frame/-base';

const models = key => map(key, node => node.model);

export default condition => EmberObject.extend({

  nodes: null,
  parent: readOnly('nodes.parent'),
  stage: readOnly('parent.stage'),

  _nodes: filterBy('nodes._nodes', condition, true),
  _visibleNodes: filterBy('_nodes', 'isVisible', true),

  all: models('_nodes'),
  visible: models('_visibleNodes'),

  frame: frame('nodes')

});

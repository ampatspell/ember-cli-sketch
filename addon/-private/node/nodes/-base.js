import EmberObject from '@ember/object';
import { filterBy, readOnly } from '@ember/object/computed';
import { frame } from '../frame/-base';

export default condition => EmberObject.extend({

  nodes: null,
  parent: readOnly('nodes.parent'),
  stage: readOnly('parent.stage'),

  all: filterBy('nodes.all', condition, true),
  visible: filterBy('all', 'isVisible', true),

  frame: frame('nodes')

});

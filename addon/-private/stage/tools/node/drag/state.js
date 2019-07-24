import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  tool: null,
  nodes: readOnly('tool.selection.selectable'),

  states: computed('nodes', function() {
    let { tool, nodes } = this;
    return nodes.map(node => tool.stateModel('node-state', { node }));
  }).readOnly(),

  update(props) {
    this.states.forEach(state => state.update(props));
  }

});

import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  stage: null,
  enabled: readOnly('stage.tools.selected.guidelines'),
  nodes: readOnly('stage.selection.attached'),

  all: computed('nodes.@each._guidelines', function() {
    let { nodes } = this;
    let guidelines = [];
    nodes.forEach(node => guidelines.push(...node._guidelines));
    return guidelines;
  }).readOnly(),

  visible: computed('all', 'enabled', function() {
    if(this.enabled) {
      return this.all;
    }
  }).readOnly()

});

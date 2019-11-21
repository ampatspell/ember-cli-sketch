import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  stage: null,

  enabled: computed('stage.{tools.selected.guidelines,model.guidelines}', function() {
    let { stage } = this;
    return stage.model.guidelines && stage.tools.selected.guidelines;
  }).readOnly(),

  nodes: readOnly('stage.selection.attached'),

  all: computed('nodes.@each._guidelines', function() {
    let { nodes } = this;
    let all = [];
    nodes.forEach(node => {
      let guidelines = node._guidelines;
      if(guidelines) {
        all.push(...guidelines);
      }
    });
    return all;
  }).readOnly(),

  visible: computed('all', 'enabled', function() {
    if(this.enabled) {
      return this.all;
    }
    return;
  }).readOnly()

});

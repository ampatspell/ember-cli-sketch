import Component from '@ember/component';
import layout from './template';
import { frame } from '../../../-computed';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-node-selection-item' ],
  attributeBindings: [ 'style' ],

  stage: readOnly('node.stage'),

  style: frame('node', 'absolute', { inset: -1 }),

  actions: {
    enter(edge) {
      let { stage: { resizing }, node } = this;
      resizing.bind(node, edge);
    },
    leave() {
      this.stage.resizing.unbind();
    }
  }

});

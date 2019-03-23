import Component from '@ember/component';
import layout from './template';
import { frame } from '../../../-computed';
import { readOnly, or } from '@ember/object/computed';

const disabled = key => readOnly(`constraints.${key}.isNotResizable`);

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-node-selection-item' ],
  attributeBindings: [ 'style' ],

  stage: readOnly('node.stage'),
  resizing: readOnly('stage.resizing'),

  constraints: readOnly('node.constraints'),

  width:  disabled('width'),
  height: disabled('height'),

  isTopLeftDisabled:      or('height', 'width'),
  isTopRightDisabled:     or('height', 'width'),
  isBottomLeftDisabled:   or('height', 'width'),
  isBotomRightDisabled:   or('height', 'width'),

  isTopMiddleDisabled:    or('height'),
  isBottomMiddleDisabled: or('height'),
  isMiddleLeftDisabled:   or('width'),
  isMiddleRightDisabled:  or('width'),

  style: frame('node', 'stageZoomedBounding', { inset: -1 }),

  actions: {
    enter(edge) {
      let { resizing, node } = this;
      resizing.bind(node, edge);
    },
    leave() {
      this.resizing.unbind();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.resizing.unbind();
  }

});

import Component from '@ember/component';
import layout from './template';
import { readOnly, or } from '@ember/object/computed';
import { frame, style } from '../../-computed';

// const disabled = key => readOnly(`constraints.${key}.isNotResizable`);

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-selections-selection' ],
  attributeBindings: [ 'style' ],

  stage: readOnly('model.node.stage'),
  resizing: readOnly('stage.resizing'),

  // TODO: constraints
  // constraints: readOnly('node.constraints'),

  horizontal: false, // disabled('horizontal'),
  vertical:   false, // disabled('vertical'),

  isTopLeftDisabled:      or('vertical', 'horizontal'),
  isTopRightDisabled:     or('vertical', 'horizontal'),
  isBottomLeftDisabled:   or('vertical', 'horizontal'),
  isBotomRightDisabled:   or('vertical', 'horizontal'),

  isTopMiddleDisabled:    or('vertical'),
  isBottomMiddleDisabled: or('vertical'),
  isMiddleLeftDisabled:   or('horizontal'),
  isMiddleRightDisabled:  or('horizontal'),

  frame: frame('model', 'selection', { inset: -1, index: false }),
  style: style('frame', ({ frame }) => frame),

  actions: {
    enter(edge) {
      let { resizing, model: { node } } = this;
      resizing.bind(node, edge);
    },
    leave() {
      this.resizing.unbind();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.resizing && this.resizing.unbind();
  }

});

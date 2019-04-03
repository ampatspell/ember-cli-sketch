import Component from '@ember/component';
import layout from './template';
import { readOnly, or } from '@ember/object/computed';
import { frame, style, attribute } from '../../-computed';

const both   = () => or('width.immutable', 'height.immutable');
const width  = () => or('width.immutable');
const height = () => or('height.immutable');

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-selections-selection' ],
  attributeBindings: [ 'style' ],

  stage: readOnly('model.node.stage'),
  resizing: readOnly('stage.resizing'),

  width:  attribute('model', 'width'),
  height: attribute('model', 'height'),

  isTopLeftDisabled:      both(),
  isTopRightDisabled:     both(),
  isBottomLeftDisabled:   both(),
  isBotomRightDisabled:   both(),

  isTopMiddleDisabled:    height(),
  isBottomMiddleDisabled: height(),

  isMiddleLeftDisabled:   width(),
  isMiddleRightDisabled:  width(),

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

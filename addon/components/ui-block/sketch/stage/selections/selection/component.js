import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from './template';
import { readOnly, or } from '@ember/object/computed';
import { frame, style, attribute } from '../../-computed';

const both   = () => or('width.immutable', 'height.immutable');
const width  = () => or('width.immutable');
const height = () => or('height.immutable');

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-selections-selection' ],
  attributeBindings: [ 'style' ],

  node: readOnly('model.node'),
  edge: readOnly('node.edge'),

  stage: readOnly('node.stage'),

  width:  attribute('model', 'width'),
  height: attribute('model', 'height'),

  isBothDisabled:   both(),
  isHeightDisabled: height(),
  isWidthDisabled:  width(),

  isEditable: readOnly('node.isEditable'),

  isEditableVisible: computed('isEditable', 'node.frame.selection', function() {
    if(!this.isEditable) {
      return;
    }
    let { node: { frame: { selection: frame } } } = this;
    if(frame.width < 90 || frame.height < 45) {
      return false;
    }
    return true;
  }).readOnly(),

  frame: frame('model', 'selection', { index: false }),
  style: style('frame', ({ frame }) => frame)

});

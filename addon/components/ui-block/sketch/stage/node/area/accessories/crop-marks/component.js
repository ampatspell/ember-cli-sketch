import Component from '@ember/component';
import layout from './template';
import { style } from '../../../-computed';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-node-area-accessories-crop-marks', 'highlighted:highlighted' ],
  attributeBindings: 'style',

  highlighted: readOnly('model.node.isHovered'),
  inset: readOnly('accessory.inset'),

  insetStyle: style('inset', function() {
    let { inset } = this;
    if(!inset) {
      return;
    }
    inset = `${inset}px`;
    return {
      top:    inset,
      left:   inset,
      bottom: inset,
      right:  inset
    };
  }),

  overlayStyle: style('inset', function() {
    let { inset } = this;
    if(!inset) {
      return;
    }
    let borderWidth = `${inset - 1}px`;
    return {
      borderWidth
    }
  })

});

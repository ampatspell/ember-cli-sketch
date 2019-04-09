import Component from '@ember/component';
import layout from './template';
import { style } from '../../../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-accessories-crop-marks' ],
  attributeBindings: 'style',

  inset: 0,

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
  }),

});

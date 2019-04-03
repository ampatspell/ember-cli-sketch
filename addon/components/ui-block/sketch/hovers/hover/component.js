import Component from '@ember/component';
import layout from './template';
import { frame, style } from '../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-hovers-hover' ],
  attributeBindings: [ 'style' ],

  frame: frame('model', 'hover', { inset: -1, index: false }),
  style: style('frame', ({ frame }) => frame),

});

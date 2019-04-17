import Component from '@ember/component';
import layout from './template';
import { frame, style } from '../../-computed';
import ShowMixin from '../../-show-mixin';

export default Component.extend(ShowMixin, {
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-hovers-hover' ],
  attributeBindings: [ 'style' ],

  frame: frame('model', 'hover', { inset: -1, index: false }),
  style: style('frame', ({ frame }) => frame),

});

import Component from '@ember/component';
import { frame, style } from '../../-computed';
import ShowMixin from '../../-show-mixin';

export default Component.extend(ShowMixin, {
  classNameBindings: [ ':ui-block-sketch-stage-hovers-hover' ],
  attributeBindings: [ 'style' ],

  frame: frame('model', 'hover', { inset: -1, index: false }),
  style: style('frame', ({ frame }) => frame),

});

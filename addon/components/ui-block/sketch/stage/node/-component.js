import Component from '@ember/component';
import { frame, style } from '../../-computed';

export default Component.extend({
  classNameBindings: [ ':ui-block-sketch-stage-node', 'model.node.type' ],
  attributeBindings: [ 'style' ],

  frame: frame('model', 'zoomed'),
  style: style('frame', ({ frame }) => frame)

});

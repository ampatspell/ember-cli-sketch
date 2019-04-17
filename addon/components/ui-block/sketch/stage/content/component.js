import Component from '@ember/component';
import layout from './template';
import { frame, style } from '../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-content' ],
  attributeBindings: [ 'style' ],

  frame: frame('stage', 'rounded'),
  style: style('frame', ({ frame }) => frame)

});

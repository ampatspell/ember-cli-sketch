import Component from '@ember/component';
import layout from './template';
import { frame, style } from '../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage' ],
  attributeBindings: [ 'style' ],

  frame: frame('stage', 'roundedZoomed'),
  style: style('frame', ({ frame }) => frame),

});

import Component from '@ember/component';
import layout from './template';
import { style, frameToObject } from '../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-frame' ],
  attributeBindings: [ 'style' ],

  style: style('frame', ({ frame }) => {
    return frameToObject(frame);
  }),

});

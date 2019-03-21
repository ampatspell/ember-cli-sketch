import Component from '@ember/component';
import layout from './template';
import { frame } from '../../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-node-hover-item' ],
  attributeBindings: [ 'style' ],

  style: frame('node', 'stageZoomedBounding', { inset: -2 }),

});

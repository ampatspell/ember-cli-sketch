import Component from '@ember/component';
import layout from './template';
import { frame } from '../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-hovers-hover' ],
  attributeBindings: [ 'style' ],

  style: frame('node', 'hover', { inset: -2 }),

});

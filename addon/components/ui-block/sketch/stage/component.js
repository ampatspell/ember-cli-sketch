import Component from '@ember/component';
import layout from './template';
import { frame } from '../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage' ],
  attributeBindings: [ 'style' ],

  style: frame('stage', 'zoomed'),

});

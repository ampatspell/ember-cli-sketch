import Component from '@ember/component';
import layout from './template';
import { frame } from '../../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-crop-marks-item' ],
  attributeBindings: [ 'style' ],

  area: null,

  style: frame('area', 'absolute')

});

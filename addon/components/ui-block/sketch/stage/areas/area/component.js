import Component from '@ember/component';
import layout from './template';
import { readOnly } from '@ember/object/computed';
import { frame } from '../../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-area' ],
  attributeBindings: [ 'style' ],

  area: null,
  group: readOnly('area.group'),

  style: frame('area', 'normalized')

});

import Component from '@ember/component';
import layout from './template';
import { frame } from '../../-computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-stage-node', 'node.type' ],
  attributeBindings: [ 'style' ],

  style: frame('node', 'zoomed')

});

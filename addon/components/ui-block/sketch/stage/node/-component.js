import Component from '@ember/component';
import { frame, style } from '../-computed';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ ':ui-block-sketch-stage-node', 'model.node.type' ],
  attributeBindings: [ 'style' ],

  frame: frame('model', 'rounded'),
  style: style('frame', ({ frame }) => frame),

  zoom: readOnly('model.node.stage.zoom')

});

import Component from '@ember/component';
import { frame, style } from '../../-computed';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ ':ui-block-sketch-stage-node', 'node.type' ],
  attributeBindings: [ 'style' ],

  frame: frame('node', 'zoomed'),
  index: readOnly('node.index'),

  style: style('frame', 'index', ({ frame, index }) => {
    return [
      frame,
      { 'z-index': index }
    ];
  })

});

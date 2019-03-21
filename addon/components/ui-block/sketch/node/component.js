import Component from '@ember/component';
import layout from './template';
import { frame } from '../-computed';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-node' ],
  attributeBindings: [ 'style' ],

  frame: frame('node', 'normalized'),
  isGroup: readOnly('node.isGroup'),

  style: computed('frame', 'isGroup', function() {
    if(this.isGroup) {
      return;
    }
    return this.frame;
  }).readOnly()

});

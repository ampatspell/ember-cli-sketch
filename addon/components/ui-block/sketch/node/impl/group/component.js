import Component from '../-component';
import layout from './template';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-node-impl-group' ],

  nodes: readOnly('node.nodes')

});

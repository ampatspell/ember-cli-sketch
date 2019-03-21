import Component from '../-component';
import layout from './template';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-node-impl-rect' ],

  style: computed('node.fill', function() {
    let { node: { fill } } = this;
    return htmlSafe(`background: ${fill}`);
  }).readOnly()

});

import Component from '../-component';
import layout from './template';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-sketch-node-impl-rect' ],

  style: computed('node.{fill,opacity}', function() {
    let { node: { fill, opacity } } = this;
    return htmlSafe(`background: ${fill}; opacity: ${opacity}`);
  }).readOnly()

});

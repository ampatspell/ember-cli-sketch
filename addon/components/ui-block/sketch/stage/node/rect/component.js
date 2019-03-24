import Component from '../-component';
import layout from './template';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  layout,

  style: computed('node.{fill,opacity}', function() {
    let { fill, opacity } = this.node;
    return htmlSafe(`background: ${fill}; opacity: ${opacity}`);
  }).readOnly(),

});

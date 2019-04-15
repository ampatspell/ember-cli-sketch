import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  classNameBindings: [ ':ui-block-dropdown-item', 'selected:selected' ],

  click() {
    this.select();
  }

});

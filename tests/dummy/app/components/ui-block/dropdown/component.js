import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: [ ':ui-block-dropdown' ],

  expanded: false,

  actions: {
    toggle() {
      this.toggleProperty('expanded');
    },
    select(item) {
      if(this.selected !== item && this.select) {
        this.select(item);
      }
      this.set('expanded', false);
    }
  }

});

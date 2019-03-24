import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: [ ':marker', 'vertical', 'horizontal', 'disabled:disabled' ],

  mouseEnter() {
    let { vertical, horizontal } = this;
    this.enter({ vertical, horizontal });
  },

  mouseLeave() {
    let { vertical, horizontal } = this;
    this.leave({ vertical, horizontal });
  }

});

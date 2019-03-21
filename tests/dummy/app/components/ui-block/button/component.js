import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNameBindings: [ ':ui-block-button', 'disabled:disabled:enabled' ],
  attributeBindings: [ 'disabled' ],

  disabled: false,

  click() {
    this.action && this.action();
  }

});

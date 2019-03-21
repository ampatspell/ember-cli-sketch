import Component from '@ember/component';

export default Component.extend({
  tagName: 'input',

  classNameBindings: [ ':ui-block-input', 'disabled:disabled:enabled' ],

  attributeBindings: [
    'placeholder',
    'value',
    'autofocus',
    'spellcheck',
    'autocapitalize',
    'autocorrect',
    'type',
    'disabled'
  ],

  placeholder: null,
  value: null,
  autofocus: false,
  spellcheck: false,
  autocapitalize: 'off',
  autocorrect: 'off',
  type: 'text',
  disabled: false,

  didInsertElement() {
    this._super(...arguments);
    if(this.focus) {
      this.element.focus();
    }
  },

  input(e) {
    this._update(e, false);
  },

  focusOut(e) {
    this._update(e, true);
  },

  keyPress(e) {
    if(e.keyCode == 13 || e.which == 13) {
      this.enter && this.enter(e.target.value);
    }
  },

  _update(e, focus) {
    let value = e.target.value;
    if(value === String(this.value)) {
      return;
    }
    this.update && this.update(value, focus);
  }

});

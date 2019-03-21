import Component from '@ember/component';

export default Component.extend({
  tagName: 'input',
  classNameBindings: [ ':ui-block-slider' ],
  attributeBindings: [ 'type', 'min', 'max', 'step', 'value' ],

  type: 'range',

  min: 0,
  max: 100,
  step: 1,
  value: 0,

  input(e) {
    let value = e.target.value;
    this.update && this.update(parseFloat(value));
  }

});

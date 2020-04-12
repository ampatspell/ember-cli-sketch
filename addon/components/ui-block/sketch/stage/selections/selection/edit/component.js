import Component from '@ember/component';
import layout from './template';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNameBindings: [ ':edit' ],

  strings: readOnly('model.node.stage.strings'),

  click() {
    let { model: { node } } = this;
    this.model.node.stage.tools.activate('node/edit', { node });
  }

});

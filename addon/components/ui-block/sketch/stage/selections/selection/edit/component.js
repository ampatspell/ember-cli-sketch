import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: [ ':edit' ],

  click() {
    let { model: { node } } = this;
    this.model.node.stage.tools.activate('node/edit', { node });
  }

});

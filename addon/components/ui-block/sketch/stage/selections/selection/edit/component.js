import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  classNameBindings: [ ':edit' ],

  click() {
    this.model.node.stage.tools.activate('node/edit');
  }

});

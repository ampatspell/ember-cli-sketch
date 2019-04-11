import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editors-editor-image' ],
  layout,

  actions: {
    ready(stage) {
      stage.node.fit({ offset: 0 });
    }
  }

});

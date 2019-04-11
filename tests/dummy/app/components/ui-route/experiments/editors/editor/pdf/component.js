import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { millimetersToPixels } from 'ember-cli-sketch/util/object';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editors-editor-pdf' ],
  layout,

  size: computed('stage.size', function() {
    let { size } = this.stage;
    return millimetersToPixels(size);
  }).readOnly(),

  actions: {
    ready(stage) {
      stage.node.fit({ offset: 0 });
    }
  }

});

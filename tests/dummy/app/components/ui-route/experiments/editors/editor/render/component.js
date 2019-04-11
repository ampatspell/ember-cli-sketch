import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { millimetersToPixels } from 'ember-cli-sketch/util/object';

export default Component.extend({
  classNameBindings: [ ':ui-route-experiments-editors-editor-render' ],
  layout,

  size: computed('stage.size', function() {
    let { size } = this.stage;
    return millimetersToPixels(size);
  }).readOnly(),

  borderStyle: computed('stage.node.renderer.size', function() {
    let size = this.get('stage.node.renderer.size');
    if(!size) {
      return;
    }
    let { width, height } = size;
    return htmlSafe(`width: ${width}px; height: ${height}px`);
  }).readOnly(),

  actions: {
    ready(stage) {
      stage.node.fit({ offset: 0 });
    }
  }

});

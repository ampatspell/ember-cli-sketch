import Tool from '../-base';
import { computed } from '@ember/object';

export default Tool.extend({

  delta: null,

  cursor: computed('delta', function() {
    return this.delta < 0 ? 'zoom-out' : 'zoom-in';
  }).readOnly(),

  update({ delta }) {
    this.stage.perform('zoom', { delta });
  },

  begin() {
    this.down = true;
  },

  reset() {
    this.setProperties({ down: false, delta: null });
  },

  onMouseDown() {
    this.begin();
  },

  onMouseUp() {
    this.reset();
  },

  onMouseMove({ delta }) {
    if(!this.down) {
      return;
    }
    this.update({ delta: delta.y / 200 });
  },

  onMouseWheel({ value }) {
    this.begin();
    this.update({ delta: value / 10 });
    this.reset();
  },

  deactivate() {
    this.reset();
  }

});

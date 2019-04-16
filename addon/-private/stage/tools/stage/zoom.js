import Tool from '../-base';
import { computed } from '@ember/object';

export default Tool.extend({

  delta: null,

  cursor: computed('delta', function() {
    return this.delta < 0 ? 'zoom-out' : 'zoom-in';
  }).readOnly(),

  update({ delta }) {
    if(delta === 0) {
      return;
    }

    this.set('delta', delta);

    let prev = this.zoom;
    let zoom = prev + delta;

    this.stage.update({ zoom });
  },

  begin() {
  },

  reset() {
    this.setProperties({ delta: null });
  },

  onMouseDown() {
    this.begin();
  },

  onMouseUp() {
    this.reset();
  },

  onMouseMove({ delta }) {
    if(!this.state) {
      return;
    }
    this.update({ delta: delta.y / 500 });
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

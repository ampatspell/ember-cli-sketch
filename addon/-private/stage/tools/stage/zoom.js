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

    let point = this.mouse.absolute;
    let props = this.stage.frame.properties;

    let calc = p => {
      let a = point[p] / prev;
      let b = point[p] / zoom;
      let c = (a - b) * zoom;
      return props[p] - c;
    };

    let x = calc('x');
    let y = calc('y');

    this.stage.update({ zoom, x, y });
  },

  begin() {
    this.state = {};
  },

  reset() {
    this.setProperties({ state: null, delta: null });
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

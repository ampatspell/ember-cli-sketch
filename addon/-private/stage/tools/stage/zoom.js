import Tool from '../-base';
import { computed } from '@ember/object';
import { round } from '../../../util/math';

export default Tool.extend({

  delta: null,

  cursor: computed('delta', function() {
    return this.delta < 0 ? 'zoom-out' : 'zoom-in';
  }).readOnly(),

  update({ delta }) {
    if(delta === 0) {
      return;
    }

    delta = round(delta, 2);

    let prev = this.zoom;
    let zoom = prev + delta;

    if(zoom <= 0) {
      return;
    }

    this.set('delta', delta);

    let size = this.stage.renderer.size;
    let props = this.stage.frame.properties;

    let calc = (d, s) => {
      let point = size[s] / 2;
      let p = point / prev;
      let n = point / zoom;
      return props[d] - (p - n);
    };

    let x = calc('x', 'width');
    let y = calc('y', 'height');

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

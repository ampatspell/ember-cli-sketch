import Action from '../-base';

export default Action.extend({

  normalize(stage, opts={}) {
    let { delta, value } = opts;
    if(delta) {
      value = stage.attributes.clampDelta('zoom', delta);
      if(!value) {
        return;
      }
      return stage.zoom + value;
    }
    return value;
  },

  perform(stage, opts) {
    let zoom = this.normalize(stage, opts);

    if(!zoom) {
      return;
    }

    let prev = stage.zoom;

    let size = stage.renderer.size;
    let props = stage.frame.properties;

    let calc = (d, s) => {
      let point = size[s] / 2;
      let p = point / prev;
      let n = point / zoom;
      let v = p - n;
      return props[d] - v;
    };

    let x = calc('x', 'width');
    let y = calc('y', 'height');

    stage.update({ zoom, x, y });
  }

});

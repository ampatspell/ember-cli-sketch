import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  node: null,
  opts: null,

  frame: readOnly('node.frame.hover'),

  guidelines(edges) {
    let source = this.frame;
    let target = edges.frame;

    let array = this.opts.recompute(source, target);
    if(!array) {
      return;
    }

    let hx = Math.min(source.x, target.x);
    let hl = Math.max(source.x + source.width, target.x + target.width) - hx;

    let vy = Math.min(source.y, target.y);
    let vl = Math.max(source.y + source.height, target.y + target.height) - vy;

    return array.map(def => {
      let { direction, x, y } = def;
      let length;

      if(direction === 'horizontal') {
        x = hx;
        length = hl;
      } else if(direction === 'vertical') {
        y = vy;
        length = vl;
      }

      return {
        direction,
        x,
        y,
        length
      };
    });
  }

});

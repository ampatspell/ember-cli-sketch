import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const frame = key => readOnly(`${key}.frame.guidelines`);

export default EmberObject.extend({

  guidelines: null,

  source: null, // node
  target: null, // node

  _source: frame('source'),
  _target: frame('target'),

  matches: computed('_source', '_target', function() {
    let {
      _source: { x: sx, y: sy, width: sw, height: sh },
      _target: { x: tx, y: ty, width: tw, height: th }
    } = this;

    let tyh = ty + th;
    let txw = tx + tw;
    let syh = sy + sh;
    let sxw = sx + sw;

    return (sy >= ty && sy <= tyh)   ||
           (syh >= ty && syh <= tyh) ||
           (sx >= tx && sx <= txw)   ||
           (sxw >= tx && sxw <= txw);
  }).readOnly(),

  recompute(source, target, approx) {
    let array = this.guidelines.recompute(source, target, approx);

    if(!array) {
      return;
    }

    let hx = Math.min(source.x, target.x);
    let hl = Math.max(source.x + source.width, target.x + target.width) - hx;

    let vy = Math.min(source.y, target.y);
    let vl = Math.max(source.y + source.height, target.y + target.height) - vy;

    return array.map(def => {
      let { direction, x, y, approx, delta } = def;
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
        length,
        approx,
        delta
      };
    });
  },

  matched: computed('matches', function() {
    let { matches, _source, _target } = this;
    if(!matches) {
      return;
    }
    // Approx should be based on zoom level
    let approx = 3;
    return this.recompute(_source, _target, approx);
  }).readOnly(),

});

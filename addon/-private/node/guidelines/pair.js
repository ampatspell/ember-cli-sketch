import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const frame = key => readOnly(`${key}.frame.guidelines`);

const _delta = (source, target, zoom) => (target - source) / zoom;
const _approx = (a, b, approx) => a - approx < b && a + approx > b;

export default EmberObject.extend({

  guidelines: null,

  zoom: readOnly('guidelines.zoom'),
  approx: readOnly('guidelines.approx'),

  source: null, // node
  target: null, // node

  _source: frame('source'), // TODO: this should be source.guidelines
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

  _recomputeLinesForDirection(source, target, direction, positionKey, approx) {
    let { zoom } = this;
    let lines = [];
    source.points[direction].forEach(sourcePoint => {
      target.points[direction].forEach(targetPoint => {
        if(sourcePoint === targetPoint) {
          lines.push({ direction, [positionKey]: sourcePoint });
        } else if(approx && _approx(sourcePoint, targetPoint, approx)) {
          let delta = _delta(sourcePoint, targetPoint, zoom);
          lines.push({ direction, [positionKey]: targetPoint, delta, approx: true });
        }
      });
    });
    return lines;
  },

  _recompute() {
    let { source, target, _source, _target, approx } = this;

    let pack = (node, frame) => {
      let { guidelines } = node;
      let points = (guidelines && guidelines.points) || [];
      return {
        points,
        frame
      };
    }

    source = pack(source, _source);
    target = pack(target, _target);

    let array = [
      ...this._recomputeLinesForDirection(source, target, 'horizontal', 'y', approx),
      ...this._recomputeLinesForDirection(source, target, 'vertical',   'x', approx)
    ];

    if(!array) {
      return;
    }

    let hx = Math.min(source.frame.x, target.frame.x);
    let hl = Math.max(source.frame.x + source.frame.width, target.frame.x + target.frame.width) - hx;

    let vy = Math.min(source.frame.y, target.frame.y);
    let vl = Math.max(source.frame.y + source.frame.height, target.frame.y + target.frame.height) - vy;

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

  matched: computed('matches', 'approx', function() {
    let { matches } = this;
    if(!matches) {
      return;
    }
    return this._recompute();
  }).readOnly(),

});

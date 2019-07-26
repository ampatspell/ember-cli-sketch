import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const guidelines = key => readOnly(`${key}.guidelines`);

const _delta = (source, target, zoom) => (target - source) / zoom;
const _approx = (a, b, approx) => a - approx < b && a + approx > b;

export default EmberObject.extend({

  guidelines: null,

  zoom: readOnly('guidelines.zoom'),
  approx: readOnly('guidelines.approx'),

  source: null, // node
  target: null, // node

  _source: guidelines('source'),
  _target: guidelines('target'),

  matches: computed('_source.frame', '_target.frame', function() {
    let { _source, _target } = this;

    if(!_source || !_target) {
      return;
    }

    let { frame: { x: sx, y: sy, width: sw, height: sh } } = _source;
    let { frame: {x: tx, y: ty, width: tw, height: th } } = _target;

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
    let { _source: source, _target: target, approx } = this;

    let array = [
      ...this._recomputeLinesForDirection(source, target, 'horizontal', 'y', approx),
      ...this._recomputeLinesForDirection(source, target, 'vertical',   'x', approx)
    ];

    let minmax = ({ frame: source }, { frame: target }, positionKey, sizeKey) => {
      let min = Math.min(source[positionKey], target[positionKey]);
      let max = Math.max(source[positionKey] + source[sizeKey], target[positionKey] + target[sizeKey]) - min;
      return [ min, max ];
    }

    let [ hx, hl ] = minmax(source, target, 'x', 'width');
    let [ vy, vl ] = minmax(source, target, 'y', 'height');

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

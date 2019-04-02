import Mixin from '@ember/object/mixin';
import { assign } from '@ember/polyfills';
import { round } from '../../util/math';

export default Mixin.create({

  reset() {
    this.update({
      x: 0,
      y: 0,
      zoom: 1
    });
  },

  _frameForOptions(opts) {
    let { type } = opts;
    if(!type) {
      return this.nodes.frame;
    } else if(type === 'containers') {
      return this.nodes.containers.frame;
    }
  },

  center(opts={}) {
    opts = assign({}, opts);

    let { renderer: { size }, zoom } = this;

    if(!size) {
      return;
    }

    let frame = this._frameForOptions(opts);
    if(!frame) {
      return;
    }

    let bounds = frame.hover;
    if(!bounds) {
      return;
    }

    let dimension = (dimensionKey, sizeKey) => {
      let value = opts[dimensionKey];
      if(value) {
        return value;
      }
      let base = this.frame[dimensionKey] - (bounds[dimensionKey] / zoom);
      let offset = (size[sizeKey] - (bounds[sizeKey])) / 2 / zoom;
      return round(base + offset);
    }

    let position = {
      x: dimension('x', 'width'),
      y: dimension('y',  'height')
    };

    this.update(position);
  },

  fit(opts={}) {
    opts = assign({ offset: 0 }, opts);
    let { renderer: { size } } = this;

    if(!size) {
      return;
    }

    let frame = this._frameForOptions(opts);
    if(!frame) {
      return;
    }

    let bounds = frame.absoluteBounds;
    if(!bounds) {
      return;
    }

    let value = dimension => (size[dimension] - (opts.offset * 2)) / bounds[dimension];

    let zoom = Math.min(value('width'), value('height'));

    this.update({ zoom });
    this.center({ type: opts.type });
  }

});

import Base from '../-base';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { omit } from '../../../util/object';
import { assign } from '@ember/polyfills';
import { assert } from '@ember/debug';
import { constraints } from '../stage/constraints';

const {
  keys
} = Object;

export const frame = (type='node') => computed(function() {
  return sketches(this).factory.stage.frame(type, this);
}).readOnly();

const split = opts => {
  if(!opts) {
    return {};
  }
  let { frame, constraints } = opts;
  let props = omit(opts, [ 'frame', 'constraints' ]);
  return { frame, constraints, props };
};

export const FrameMixin = Mixin.create({

  constraints: constraints(),

  prepare(opts) {
    let { frame, props, constraints } = split(opts);
    this._super(props);
    if(frame) {
      this.frame.prepare(frame);
    }
    if(constraints) {
      this.constraints.prepare(assign({ owner: this }, constraints));
    }
  }

});

export default Base.extend({

  exists: true,

  deltaToFrame(props) {
    let values = {};
    keys(props).forEach(key => {
      let value = props[key];
      if(value !== undefined) {
        values[key] = this[key] + props[key];
      } else {
        values[key] = this[key];
      }
    });
    return values;
  },

  update(props, opts) {
    let { delta } = assign({ delta: false }, opts);
    if(delta) {
      let values = this.deltaToFrame(props);
      this.setProperties(values);
    } else {
      this.setProperties(props);
    }
  },

  convertPointFromParent(point) {
    return {
      x: point.x - this.x,
      y: point.y - this.y
    };
  },

  convertPointFromAbsolute(point) {
    let { absolute } = this;
    return {
      x: point.x - absolute.x,
      y: point.y - absolute.y,
    };
  },

  convertFrameFromAbsolute(frame) {
    return assign({}, frame, this.convertPointFromAbsolute(frame));
  },

  includesPosition({ x, y }, frameKey='serialized') {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared`, !!frame);
    return frame.x <= x && frame.y <= y && frame.x + frame.width >= x && frame.y + frame.height >= y;
  },

  includesFrame({ x, y, width, height }, frameKey='serialized') {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared`, !!frame);
    return x >= frame.x && y >= frame.y && x + width <= frame.x + frame.width && y + height <= frame.y + frame.height;
  },

  overlapsFrame({ x, y, width, height }, frameKey='serialized') {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared`, !!frame);
    return x < frame.x + frame.width && x + width > frame.x && y < frame.y + frame.height && y + height > frame.y;
  }

});

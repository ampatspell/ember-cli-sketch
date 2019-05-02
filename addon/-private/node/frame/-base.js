import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { factory } from '../../util/computed';

export const frame = type => factory((factory, node) => factory.frame(type, node));

export const model = key => readOnly(`model.${key}`);

const {
  keys
} = Object;

export default EmberObject.extend({

  parent: null,
  model: readOnly('parent.model'),
  zoom: readOnly('parent.stage.zoom'),

  deltaToFrame(props) {
    let values = {};
    keys(props).forEach(key => {
      values[key] = this[key] + props[key];
    });
    return values;
  },

  frameToDelta(props) {
    let values = {};
    keys(props).forEach(key => {
      values[key] = props[key] - this[key];
    });
    return values;
  },

  convertPoint(point, frameKey) {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared for ${this}`, !!frame);
    return {
      x: point.x - frame.x,
      y: point.y - frame.y,
    };
  },

  convertPointFromAbsolute(point) {
    return this.convertPoint(point, 'absolute');
  },

  convertFrameFromAbsolute(frame) {
    return assign({}, frame, this.convertPointFromAbsolute(frame));
  },

  center(props) {
    props = assign({}, props);
    let calc = (dim, size) => {
      if(props[size] && !props[dim]) {
        props[dim] = this[dim] + ((this[size] - props[size]) / 2);
      }
    };
    calc('y', 'height');
    calc('x', 'width');
    return props;
  },

  _frame(frameKey) {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared for ${this}`, !!frame);
    return frame;
  },

  // point is inside this frame
  containsPosition({ x, y }, frameKey) {
    let frame = this._frame(frameKey);
    return frame.x <= x && frame.y <= y && frame.x + frame.width >= x && frame.y + frame.height >= y;
  },

  // frame is completely out of this frame
  excludesFrame({ x, y, width, height }, frameKey) {
    let frame = this._frame(frameKey);
    return x + width < frame.x || x > frame.x + frame.width || y + height < frame.y || y > frame.y + frame.height;
  },

  // frame is fully inside this frame
  containsFrame({ x, y, width, height }, frameKey) {
    let frame = this._frame(frameKey);
    return x >= frame.x && y >= frame.y && x + width <= frame.x + frame.width && y + height <= frame.y + frame.height;
  },

  // frame is at least partially inside this frame
  overlapsFrame({ x, y, width, height }, frameKey) {
    let frame = this._frame(frameKey);
    return x < frame.x + frame.width && x + width > frame.x && y < frame.y + frame.height && y + height > frame.y;
  }

});

import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';

export const model = key => readOnly(`model.${key}`);

const {
  keys
} = Object;

export default EmberObject.extend({

  node: null,
  model: readOnly('node.model'),
  zoom: readOnly('node.stage.node.zoom'),

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

  includesPosition({ x, y }, frameKey) {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared for ${this}`, !!frame);
    return frame.x <= x && frame.y <= y && frame.x + frame.width >= x && frame.y + frame.height >= y;
  },

  includesFrame({ x, y, width, height }, frameKey) {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared for ${this}`, !!frame);
    return x >= frame.x && y >= frame.y && x + width <= frame.x + frame.width && y + height <= frame.y + frame.height;
  },

  overlapsFrame({ x, y, width, height }, frameKey) {
    let frame = this[frameKey];
    assert(`frame ${frameKey} not declared for ${this}`, !!frame);
    return x < frame.x + frame.width && x + width > frame.x && y < frame.y + frame.height && y + height > frame.y;
  }

});

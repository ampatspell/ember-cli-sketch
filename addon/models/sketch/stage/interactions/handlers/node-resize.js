import Handler from './-handler';
import { readOnly } from '@ember/object/computed';

export default Handler.extend({

  resizing: readOnly('stage.resizing'),
  zoom: readOnly('stage.zoom'),

  onMouseDown() {
    let { mouse: { isLeftButton }, resizing } = this;
    if(isLeftButton && resizing.bound) {
      resizing.begin();
      return false;
    }
  },

  onMouseUp() {
    let { resizing } = this;
    if(resizing.bound) {
      resizing.end();
      return false;
    }
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, resizing, zoom } = this;

    if(!isLeftButton) {
      return;
    }

    if(!resizing.bound || !resizing.active) {
      return;
    }

    let { node, node: { constraints }, edge } = resizing;

    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    let frame = {};

    if(edge.vertical === 'bottom') {
      let value = constraints.vertical.clampSizeDelta(delta.y);
      frame.height = value;
    } else if(edge.vertical === 'top') {
      let value = constraints.vertical.clampSizeDelta(-delta.y);
      frame.y = -value;
      frame.height = value;
    }

    if(edge.horizontal === 'right') {
      let value = constraints.horizontal.clampSizeDelta(delta.x);
      frame.width = value;
    } else if(edge.horizontal === 'left') {
      let value = constraints.horizontal.clampSizeDelta(-delta.x);
      frame.x = -value;
      frame.width = value
    }

    node.frame.update(frame, { delta: true });

    return false;
  }

});

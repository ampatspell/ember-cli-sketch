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

    let { node, edge } = resizing;

    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    let frame = {};

    if(edge.vertical === 'bottom') {
      frame.height = delta.y;
    } else if(edge.vertical === 'top') {
      frame.y = delta.y;
      frame.height = -delta.y;
    } else if(edge.vertical === 'middle') {
    } else {
      frame.y = delta.y;
      frame.height = -delta.y * 2;
    }

    if(edge.horizontal === 'right') {
      frame.width = delta.x;
    } else if(edge.horizontal === 'left') {
      frame.x = delta.x;
      frame.width = -delta.x;
    } else if(edge.horizontal === 'middle') {
    } else {
      frame.x = delta.x;
      frame.width = -delta.x * 2;
    }

    let next = node.frame.deltaToFrame(frame);
    node.frame.update(next);

    return false;
  }

});

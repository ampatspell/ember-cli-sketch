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

  onMouseMove({ keys: { meta }, delta }) {
    let { mouse: { isLeftButton }, keyboard: { isShift }, resizing, zoom } = this;

    if(!isLeftButton) {
      return;
    }

    if(!resizing.bound || !resizing.active) {
      return;
    }

    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    if(isShift) {
      let mid = (delta.x + delta.y / 2);
      delta.x = mid;
      delta.y = mid;
    }

    let { node, edge } = resizing;

    if(meta) {
      edge = {
        vertical: 'middle',
        horizontal: 'middle'
      };
    }

    let frame = {};

    if(edge.vertical === 'bottom') {
      frame.height = delta.y;
    } else if(edge.vertical === 'top') {
      frame.y = delta.y;
      frame.height = -delta.y;
    } else if(edge.vertical === 'middle') {
      frame.y = -delta.y;
      frame.height = delta.y * 2;
    }

    if(edge.horizontal === 'right') {
      frame.width = delta.x;
    } else if(edge.horizontal === 'left') {
      frame.x = delta.x;
      frame.width = -delta.x;
    } else if(edge.horizontal === 'middle') {
      frame.x = -delta.x;
      frame.width = delta.x * 2;
    }

    node.frame.update(frame, { delta: true });

    return false;
  }

});

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
    let constraints = node.constraints;

    if(edge.vertical === 'bottom') {
      if(constraints.height.isDeltaValid(delta.y)) {
        frame.height = delta.y;
      }
    } else if(edge.vertical === 'top') {
      if(constraints.height.isDeltaValid(-delta.y)) {
        frame.y = delta.y;
        frame.height = -delta.y;
      }
    }

    if(edge.horizontal === 'right') {
      if(constraints.width.isDeltaValid(delta.x)) {
        frame.width = delta.x;
      }
    } else if(edge.horizontal === 'left') {
      if(constraints.width.isDeltaValid(-delta.x)) {
        frame.x = delta.x;
        frame.width = -delta.x;
      }
    }

    let next = node.frame.deltaToFrame(frame);
    node.frame.update(next);

    return false;
  }

});

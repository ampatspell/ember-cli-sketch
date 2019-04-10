import Tool from '../-base';
import { assign } from '@ember/polyfills';

export default Tool.extend({

  node: null,
  edge: null,

  update(delta) {
    let { node, edge } = this;

    let frame = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    let children = {};

    if(edge.vertical === 'bottom') {
      let value = node.clampAttributeDelta('height', delta.y);
      frame.height = value;
    } else if(edge.vertical === 'top') {
      let value = node.clampAttributeDelta('height', -delta.y);
      frame.y = -value;
      frame.height = value;
      children.y = value;
    }

    if(edge.horizontal === 'right') {
      let value = node.clampAttributeDelta('width', delta.x);
      frame.width = value;
    } else if(edge.horizontal === 'left') {
      let value = node.clampAttributeDelta('width', -delta.x);
      frame.x = -value;
      frame.width = value;
      children.x = value;
    }

    let current = node.frame.properties;
    frame = node.attributes.resolve(node.frame.deltaToFrame(frame));

    if(edge.horizontal === 'middle') {
      frame.x -= (frame.width - current.width) / 2;
    } else if (edge.vertical === 'middle') {
      // frame.y -= (frame.height - current.height) / 2;
    } else if(edge.horizontal === 'left') {
      frame.x += (current.x + current.width) - (frame.x + frame.width);
    }

    node.update(frame);
    node.nodes.all.forEach(model => model.node.update(children, { delta: true }));

    return true;
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, zoom } = this;

    if(!isLeftButton) {
      return;
    }

    delta = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.update(delta);
  },

  onMouseUp() {
    this.done();
  },

  activate({ node }) {
    let edge = node.edge.serialized;
    this.setProperties({ node, edge });

    this.selection.removeExcept(node);

    node.isContainer && node.moveToTop();
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.setProperties({ node: null, edge: null });
  }

});

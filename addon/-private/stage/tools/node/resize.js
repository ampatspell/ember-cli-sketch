import Tool from '../-base';
import { assign } from '@ember/polyfills';

export default Tool.extend({

  node: null,
  edge: null,

  update(delta) {
    let { node, edge } = this;

    let frame = {};
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

    node.update(frame, { delta: true });
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

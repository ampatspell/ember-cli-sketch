import Handler from '../-handler';
import { readOnly } from '@ember/object/computed';

export default Handler.extend({

  node: readOnly('resizing.node'),
  edge: readOnly('resizing.edge'),
  isActive: readOnly('resizing.isActive'),

  begin() {
    let { resizing } = this;

    if(!resizing.begin()) {
      return;
    }

    let { selection, node } = this;
    let nodes = selection.filter(selection => selection !== node);
    selection.removeNodes(nodes);

    nodes.forEach(node => node.isArea && node.moveToBottom());

    return true;
  },

  end() {
    let { resizing } = this;

    if(!resizing.end()) {
      return;
    }

    return true;
  },

  update(delta) {
    let { isActive } = this;

    if(!isActive) {
      return;
    }

    let { node, node: { constraints }, edge } = this;

    let frame = {};
    let children = {};

    if(edge.vertical === 'bottom') {
      let value = constraints.vertical.clampSizeDelta(delta.y);
      frame.height = value;
    } else if(edge.vertical === 'top') {
      let value = constraints.vertical.clampSizeDelta(-delta.y);
      frame.y = -value;
      frame.height = value;
      children.y = value;
    }

    if(edge.horizontal === 'right') {
      let value = constraints.horizontal.clampSizeDelta(delta.x);
      frame.width = value;
    } else if(edge.horizontal === 'left') {
      let value = constraints.horizontal.clampSizeDelta(-delta.x);
      frame.x = -value;
      frame.width = value;
      children.x = value;
    }

    node.update(frame, { delta: true });

    if(!node.isGroup && node.nodes) {
      node.nodes.forEach(node => node.update(children, { delta: true }));
    }

    return true;
  },

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage } } = this;
    if(isLeftButtonOverStage && this.begin()) {
      return false;
    }
  },

  onMouseUp() {
    if(this.end()) {
      return false;
    }
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

    if(this.update(delta)) {
      return false;
    }
  }

});

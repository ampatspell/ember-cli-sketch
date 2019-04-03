import Handler from '../-base';

export default Handler.extend({

  node: null,
  edge: null,

  begin() {
    let { selection } = this;
    let node = selection.find(node => node.edge.has);
    if(!node) {
      return;
    }

    let edge = node.edge.serialized;
    this.setProperties({ node, edge });

    selection.removeExcept(node);

    if(node.isContainer) {
      node.moveToBottom();
    }

    return true;
  },

  end() {
    if(!this.node) {
      return;
    }

    this.setProperties({ node: null, edge: null });
    return true;
  },

  update(delta) {
    let { node, edge } = this;

    if(!node) {
      return;
    }

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

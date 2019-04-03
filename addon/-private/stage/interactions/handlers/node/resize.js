import Handler from '../-base';
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
    nodes.forEach(node => node.isContainer && node.moveToBottom());
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

    this._edge();

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
  },

  edgeForNode(node, point) {
    let bounds = node.frame.hover;
    let local = node.frame.convertPoint(point, 'hover');
    let offset = 10;

    let edge = {};

    if(local.x > -offset && local.x < offset) {
      edge.horizontal = 'left';
    } else if(local.x > bounds.width - offset && local.x + offset < bounds.width + offset) {
      edge.horizontal = 'right';
    } else if(local.x > bounds.width / 2 - offset && local.x < bounds.width / 2 + offset) {
      edge.horizontal = 'middle';
    }

    if(local.y > -offset && local.y < offset) {
      edge.vertical = 'top';
    } else if(local.y > bounds.height - offset && local.y + offset < bounds.height + offset) {
      edge.vertical = 'bottom';
    } else if(local.y > bounds.height / 2 - offset && local.y < bounds.height / 2 + offset) {
      edge.vertical = 'middle';
    }

    if(!edge.horizontal || !edge.vertical) {
      return;
    }

    if(edge.horizontal === 'middle' && edge.vertical === 'middle') {
      return;
    }

    console.log(edge);
  },

  _edge() {
    let point = this.stage.frame.convertPointFromScreen(this.mouse.stage);
    this.selection.attached.forEach(node => this.edgeForNode(node, point));
  },

});

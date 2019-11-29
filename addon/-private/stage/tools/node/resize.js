import Tool from '../-base';
import { assign } from '@ember/polyfills';

export default Tool.extend({

  guidelines: true,

  node: null,
  edge: null,
  point: null,
  delta: null,

  aspectForEdge(edge) {
    let { node, node: { attributes: { aspect } } } = this;

    if(aspect.free) {
      return;
    }

    let middle = edge.vertical === 'middle' || edge.horizontal === 'middle';

    let shift = this.get('keyboard.isShift');
    if(shift) {
      middle = !middle;
    }

    let { locked } = aspect;

    if(shift) {
      locked = false;
    }

    if(!locked && middle) {
      return;
    }

    return node.aspect;
  },

  updateAspect() {
    this.node.perform('aspect-update');
  },

  update({ delta }) {
    let { node, edge } = this;

    let aspect = this.aspectForEdge(edge);

    let before = node.frame.properties;
    let frame = assign({}, node.frame.properties);
    let children = {};
    let attributes = node.attributes;

    if(edge.vertical === 'bottom') {
      let value = attributes.clampDelta('height', delta.y);
      frame.height += value;
    } else if(edge.vertical === 'top') {
      let value = attributes.clampDelta('height', -delta.y);
      frame.y += -value;
      frame.height += value;
      children.y = value;
    }

    if(edge.horizontal === 'right') {
      let value = attributes.clampDelta('width', delta.x);
      frame.width += value;
    } else if(edge.horizontal === 'left') {
      let value = attributes.clampDelta('width', -delta.x);
      frame.x += -value;
      frame.width += value;
      children.x = value;
    }

    if(aspect) {
      let height;
      let width;

      if(before.width !== frame.width) {
        height = attributes.clamp('height', frame.width / aspect);
        width = attributes.clamp('width', height * aspect);
      } else if(before.height !== frame.height) {
        width = attributes.clamp('width', frame.height * aspect);
        height = attributes.clamp('height', width / aspect);
      }

      if(width && height) {
        frame.height = height;
        frame.width = width;
      }
    }

    node.update(frame);
    node.nodes.all.forEach(node => node.update(children, { delta: true }));

    let after = node.frame.properties;
    frame = {};

    if(edge.horizontal === 'left') {
      frame.x = (before.x + before.width) - (after.x + after.width);
    } else if(edge.horizontal === 'middle') {
      frame.x = ((before.x + before.width) - (after.x + after.width)) / 2;
    }

    if(edge.vertical === 'top') {
      frame.y = (before.y + before.height) - (after.y + after.height);
    } else if(edge.vertical === 'middle') {
      frame.y = ((before.y + before.height) - (after.y + after.height)) / 2;
    }

    node.update(frame, { delta: true });

    this.delta = { x: 0, y: 0 };

    if(!aspect) {
      this.updateAspect();

      let result = node.frame.properties;

      if(edge.horizontal === 'right') {
        this.delta.x = before.width + delta.x - result.width;
      } else if(edge.horizontal === 'left') {
        this.delta.x = before.x + delta.x - result.x;
      }

      if(edge.vertical === 'top') {
        this.delta.y = before.y + delta.y - result.y;
      } else if(edge.vertical === 'bottom') {
        this.delta.y = before.height + delta.y - result.height;
      }

    }

    node.perform('move-to-container');
  },

  onMouseMove() {
    let { node: { frame }, mouse: { absolute, isLeftButton } } = this;

    if(!isLeftButton) {
      return;
    }

    let point = frame.rotatedPosition(absolute, 'absolute');

    if(!this.point) {
      this.point = point;
      return;
    }

    let delta = {
      x: this.delta.x + (point.x - this.point.x),
      y: this.delta.y + (point.y - this.point.y)
    };

    this.point = point;

    // TODO: get rid of delta, use absolute point
    this.update({ delta });
  },

  onMouseUp() {
    this.done();
  },

  onKeyDown() {
    if(!this.free) {
      this.updateAspect();
    }
  },

  activate({ node }) {
    this.selection.removeExcept(node);
    let edge = node.edge.serialized;
    let point = null;
    let delta = { x: 0, y: 0 };
    this.setProperties({ node, edge, delta, point });
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.setProperties({ node: null, edge: null, point: null });
  }

});

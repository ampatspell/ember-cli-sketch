import Tool from '../-base';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';

export default Tool.extend({

  guidelines: true,

  state: null,

  free: computed('keyboard.isShift', 'node.attributes.aspect.locked', function() {
    let locked = !!this.get('node.attributes.aspect.locked');
    let shift = this.get('keyboard.isShift');
    return locked === shift;
  }).readOnly(),

  aspect: computed('free', 'node.aspect', function() {
    let { free, node } = this;
    if(free) {
      return;
    }
    return node.aspect;
  }).readOnly(),

  updateAspect() {
    this.node.perform('aspect-update');
  },

  update({ delta }) {
    delta = this.zoomedDelta(delta);

    let { node, edge, aspect } = this;

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

    if(!aspect) {
      this.updateAspect();
    }

    // node.perform('snap-to-guidelines');

    node.perform('move-to-container');
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton } } = this;

    if(!isLeftButton) {
      return;
    }

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
    let state = null;
    this.setProperties({ node, edge, state });
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.state = null;
  }

});

import Tool from '../-base';
import { assign } from '@ember/polyfills';
import { computed } from '@ember/object';

export default Tool.extend({

  guidelines: true,

  node: null,
  edge: null,

  free: computed('keyboard.isShift', 'state.node.attributes.aspect.locked', function() {
    let locked = !!this.get('state.node.attributes.aspect.locked');
    let shift = this.get('keyboard.isShift');
    return locked === shift;
  }).readOnly(),

  aspect: computed('free', 'state.node.aspect', function() {
    if(this.free) {
      return;
    }
    return this.state.node.aspect;
  }).readOnly(),

  updateAspect() {
    this.state.node.perform('aspect-update');
  },

  // update(delta) {
  //   let { node, edge, aspect } = this;

  //   let before = node.frame.properties;
  //   let frame = assign({}, node.frame.properties);
  //   let children = {};
  //   let attributes = node.attributes;

  //   if(edge.vertical === 'bottom') {
  //     let value = attributes.clampDelta('height', delta.y);
  //     frame.height += value;
  //   } else if(edge.vertical === 'top') {
  //     let value = attributes.clampDelta('height', -delta.y);
  //     frame.y += -value;
  //     frame.height += value;
  //     children.y = value;
  //   }

  //   if(edge.horizontal === 'right') {
  //     let value = attributes.clampDelta('width', delta.x);
  //     frame.width += value;
  //   } else if(edge.horizontal === 'left') {
  //     let value = attributes.clampDelta('width', -delta.x);
  //     frame.x += -value;
  //     frame.width += value;
  //     children.x = value;
  //   }

  //   if(aspect) {
  //     let height;
  //     let width;

  //     if(before.width !== frame.width) {
  //       height = attributes.clamp('height', frame.width / aspect);
  //       width = attributes.clamp('width', height * aspect);
  //     } else if(before.height !== frame.height) {
  //       width = attributes.clamp('width', frame.height * aspect);
  //       height = attributes.clamp('height', width / aspect);
  //     }

  //     if(width && height) {
  //       frame.height = height;
  //       frame.width = width;
  //     }
  //   }

  //   node.update(frame);
  //   node.nodes.all.forEach(node => node.update(children, { delta: true }));

  //   let after = node.frame.properties;
  //   frame = {};

  //   if(edge.horizontal === 'left') {
  //     frame.x = (before.x + before.width) - (after.x + after.width);
  //   } else if(edge.horizontal === 'middle') {
  //     frame.x = ((before.x + before.width) - (after.x + after.width)) / 2;
  //   }

  //   if(edge.vertical === 'top') {
  //     frame.y = (before.y + before.height) - (after.y + after.height);
  //   } else if(edge.vertical === 'middle') {
  //     frame.y = ((before.y + before.height) - (after.y + after.height)) / 2;
  //   }

  //   node.update(frame, { delta: true });

  //   if(!aspect) {
  //     this.updateAspect();
  //   }

  //   node.perform('move-to-container');

  //   return true;
  // },

  update({ delta }) {
    let { zoom, aspect } = this;

    let zoomed = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.state.perform({ delta: zoomed, aspect });
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
    let edge = node.edge.serialized;
    this.selection.removeExcept(node);
    this.set('state', node.action('resize').begin(node, edge));
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.set('state', null);
  }


});

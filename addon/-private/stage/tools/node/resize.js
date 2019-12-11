import Tool from '../-base';
import { assign } from '@ember/polyfills';
import { round, rotatePosition, rotatedRectBounds } from '../../../util/math';

const toRect = props => ({
  top: {
    x: props.x,
    y: props.y
  },
  bottom: {
    x: props.x + props.width,
    y: props.y + props.height
  }
});

const fromRect = rect => ({
  x:      rect.top.x,
  y:      rect.top.y,
  width:  rect.bottom.x - rect.top.x,
  height: rect.bottom.y - rect.top.y
});

export default Tool.extend({

  guidelines: true,

  node: null,
  edge: null,

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

  rotatedPoint() {
    let properties = this.properties;
    let rotation = -properties.rotation;
    return rotatePosition(this.mouse.absolute, properties, rotation);
  },

  calculateDelta(target) {
    let source = this.point;
    let delta = {
      x: target.x - source.x,
      y: target.y - source.y
    };
    return delta;
  },

  pin(pin, frame, properties) {
    let { rotation } = properties;
    let initial = rotatePosition(pin, properties, rotation);
    let updated = rotatePosition(pin, frame, rotation);
    frame.x += (initial.x - updated.x);
    frame.y += (initial.y - updated.y);
    return frame;
  },

  update() {
    let { edge, node } = this;

    let point = this.rotatedPoint();
    let delta = this.calculateDelta(point);

    let properties = this.properties;
    let rect = toRect(properties);
    let pin = { x: 0, y: 0 };

    if(edge.vertical === 'top') {
      rect.top.y += delta.y;
    } else if(edge.vertical === 'bottom') {
      rect.bottom.y += delta.y;
      pin.y = properties.height;
    }

    if(edge.horizontal === 'left') {
      rect.top.x += delta.x;
    } else if(edge.horizontal === 'right') {
      rect.bottom.x += delta.x;
      pin.x = properties.width;
    }

    let frame = fromRect(rect);
    this.pin(pin, frame, properties);

    //

    node.update(frame);

    // let aspect = this.aspectForEdge(edge);

    // let before = node.frame.properties;
    // let frame = assign({}, node.frame.properties);
    // let children = {};
    // let attributes = node.attributes;

    // if(edge.vertical === 'bottom') {
    //   let value = attributes.clampDelta('height', delta.y);
    //   frame.height += value;
    // } else if(edge.vertical === 'top') {
    //   let value = attributes.clampDelta('height', -delta.y);
    //   frame.y += -value;
    //   frame.height += value;
    //   children.y = value;
    // }

    // if(edge.horizontal === 'right') {
    //   let value = attributes.clampDelta('width', delta.x);
    //   frame.width += value;
    // } else if(edge.horizontal === 'left') {
    //   let value = attributes.clampDelta('width', -delta.x);
    //   frame.x += -value;
    //   frame.width += value;
    //   children.x = value;
    // }

    // if(aspect) {
    //   let height;
    //   let width;

    //   if(before.width !== frame.width) {
    //     height = attributes.clamp('height', frame.width / aspect);
    //     width = attributes.clamp('width', height * aspect);
    //   } else if(before.height !== frame.height) {
    //     width = attributes.clamp('width', frame.height * aspect);
    //     height = attributes.clamp('height', width / aspect);
    //   }

    //   if(width && height) {
    //     frame.height = height;
    //     frame.width = width;
    //   }
    // }

    // node.update(frame);
    // node.nodes.all.forEach(node => node.update(children, { delta: true }));

    // let after = node.frame.properties;
    // frame = {};

    // if(edge.horizontal === 'left') {
    //   frame.x = (before.x + before.width) - (after.x + after.width);
    // } else if(edge.horizontal === 'middle') {
    //   frame.x = ((before.x + before.width) - (after.x + after.width)) / 2;
    // }

    // if(edge.vertical === 'top') {
    //   frame.y = (before.y + before.height) - (after.y + after.height);
    // } else if(edge.vertical === 'middle') {
    //   frame.y = ((before.y + before.height) - (after.y + after.height)) / 2;
    // }

    // node.update(frame, { delta: true });

    // this.delta = { x: 0, y: 0 };

    // if(!aspect) {
    //   this.updateAspect();

    //   let result = node.frame.properties;

    //   if(edge.horizontal === 'right') {
    //     this.delta.x = before.width + delta.x - result.width;
    //   } else if(edge.horizontal === 'left') {
    //     this.delta.x = before.x + delta.x - result.x;
    //   }

    //   if(edge.vertical === 'top') {
    //     this.delta.y = before.y + delta.y - result.y;
    //   } else if(edge.vertical === 'bottom') {
    //     this.delta.y = before.height + delta.y - result.height;
    //   }

    // }

    // node.perform('move-to-container');
  },

  onMouseMove() {
    let { node: { frame }, mouse: { absolute, isLeftButton } } = this;

    if(!isLeftButton) {
      return;
    }

    this.update();
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
    let properties = node.frame.properties;
    this.setProperties({ node, edge, properties });
    let point = this.rotatedPoint();
    this.setProperties({ point });
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.setProperties({ node: null, edge: null });
  }

});

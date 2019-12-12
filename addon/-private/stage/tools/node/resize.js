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

  moveToContainer() {
    if(!this.node.perform('move-to-container')) {
      return;
    }
    this.setup();
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

    let dim = (o, s) => {
      let value = pin[o];
      if(value === 'min') {
        return 0;
      } else if(value === 'max') {
        return properties[s];
      }
    }

    let pos = {
      x: dim('x', 'width'),
      y: dim('y', 'height')
    };

    let initial = rotatePosition(pos, properties, rotation);
    let updated = rotatePosition(pos, frame, rotation);
    frame.x += (initial.x - updated.x);
    frame.y += (initial.y - updated.y);
    return frame;
  },

  aspect(aspect, attributes, frame, properties) {
    if(!aspect) {
      return;
    }

    let height;
    let width;

    // aspect should be based on edge
    // am i resizing width or height

    if(properties.width !== frame.width) {
      height = attributes.clamp('height', frame.width / aspect);
      width = attributes.clamp('width', height * aspect);
    } else {
      width = attributes.clamp('width', frame.height * aspect);
      height = attributes.clamp('height', width / aspect);
    }

    frame.height = height;
    frame.width = width;

    return frame;
  },

  update() {
    let { edge, node } = this;

    let point = this.rotatedPoint();
    let delta = this.calculateDelta(point);

    let properties = assign({}, this.properties);
    let pin = { x: 'min', y: 'min' };
    let attributes = node.attributes;

    if(edge.vertical === 'top') {
      let clamped = attributes.clamp('height', properties.height - delta.y);
      properties.y -= clamped - properties.height;
      properties.height = clamped;
    } else if(edge.vertical === 'bottom') {
      pin.y = 'max';
      let clamped = attributes.clamp('height', properties.height + delta.y);
      properties.height = clamped;
    }

    if(edge.horizontal === 'left') {
      let clamped = attributes.clamp('width', properties.width - delta.x);
      properties.x -= clamped - properties.width;
      properties.width = clamped;
    } else if(edge.horizontal === 'right') {
      pin.x = 'max';
      let clamped = attributes.clamp('width', properties.width + delta.x);
      properties.width = clamped;
    }

    let aspect = this.aspectForEdge(edge);
    this.aspect(aspect, attributes, properties, this.properties);

    this.pin(pin, properties, this.properties);

    node.update(properties);

    // TODO: children delta
    // delta since previous child update
    // node.nodes.all.forEach(node => node.update(children, { delta: true }));

    if(!aspect) {
      this.updateAspect();
    }

    this.moveToContainer();
  },

  onMouseMove() {
    let { mouse: { isLeftButton } } = this;
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

  setup() {
    let { node } = this;
    let properties = node.frame.properties;
    this.setProperties({ properties });
    let point = this.rotatedPoint();
    this.setProperties({ point });
  },

  activate({ node }) {
    this.selection.removeExcept(node);
    let edge = node.edge.serialized;
    this.setProperties({ node, edge });
    this.setup();
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.setProperties({ node: null, edge: null });
  }

});

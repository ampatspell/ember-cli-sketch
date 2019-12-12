import Tool from '../-base';
import { assign } from '@ember/polyfills';
import { rotatePosition } from '../../../util/math';

export default Tool.extend({

  guidelines: true,

  node: null,
  edge: null,

  calculateAspect() {
    let { node, node: { attributes: { aspect } } } = this;
    if(aspect.free) {
      return;
    }
    let shift = this.get('keyboard.isShift');
    if(shift) {
      return;
    }
    return node.aspect;
  },

  updateAspect() {
    this.node.perform('aspect-update');
  },

  moveToContainer() {
    return this.node.perform('move-to-container');
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

  update() {
    let { edge, node } = this;

    let point = this.rotatedPoint();
    let delta = this.calculateDelta(point);
    let aspect = this.calculateAspect();

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

    if(aspect) {
      if((edge.horizontal === 'right' || edge.horizontal === 'left') && edge.vertical !== 'middle') {
        let value = attributes.clamp('height', properties.width / aspect);
        let diff = properties.height - value;
        properties.height = value;
        if(edge.vertical === 'top') {
          properties.y += diff;
        }
      } else {
        aspect = 0;
      }
    }

    this.pin(pin, properties, this.properties);
    node.update(properties);

    // TODO: children delta
    // delta since previous child update
    // node.nodes.all.forEach(node => node.update(children, { delta: true }));

    if(!aspect) {
      this.updateAspect();
    }

    if(this.moveToContainer()) {
      this.setup();
    }
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

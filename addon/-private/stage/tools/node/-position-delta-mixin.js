import Mixin from '@ember/object/mixin';

class PositionDeltaMixinState {

  constructor(node) {
    this.node = node;
    this.delta = { x: 0, y: 0 };
  }

  invoke(delta, cb) {
    let _delta = this.delta || { x: 0, y: 0 };

    let frame = this.node.frame;

    delta = {
      x: _delta.x + delta.x,
      y: _delta.y + delta.y
    };

    let point = {
      x: frame.x + delta.x,
      y: frame.y + delta.y
    };

    cb(point);

    _delta = {
      x: point.x - frame.x,
      y: point.y - frame.y
    };

    this.delta = _delta;
  }

}

export default Mixin.create({

  createStateForNode(node) {
    return new PositionDeltaMixinState(node);
  },

  createStateForNodes(nodes) {
    return nodes.map(node => this.createStateForNode(node));
  }

});

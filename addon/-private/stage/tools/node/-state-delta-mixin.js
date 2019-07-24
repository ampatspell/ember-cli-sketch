import Mixin from '@ember/object/mixin';

class NodeDeltaState {

  constructor(node) {
    this.node = node;
    this.delta = { x: 0, y: 0 };
  }

  invoke(delta, cb) {
    let _delta = this.delta || { x: 0, y: 0 };

    let frame = this.node.frame;

    let point = {
      x: frame.x + _delta.x + delta.x,
      y: frame.y + _delta.y + delta.y
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
    return new NodeDeltaState(node);
  },

  createStateForNodes(nodes) {
    return nodes.map(node => this.createStateForNode(node));
  }

});

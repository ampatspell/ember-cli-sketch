import Tool from '../-base';

class DragNodeState {

  constructor(node) {
    this.node = node;
    this.delta = { x: 0, y: 0 };
  }

  invoke(delta, cb) {
    let _delta = this.delta;

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

export default Tool.extend({

  guidelines: true,

  update(delta) {
    delta = this.zoomedDelta(delta);
    this.state.forEach(state => {
      let { node } = state;
      state.invoke(delta, point => node.update(point));
      node.perform('move-to-container');
    });
  },

  onMouseMove({ delta }) {
    this.hover.reset();
    this.update(delta);
  },

  onMouseUp() {
    this.done();
  },

  activate() {
    this.state = this.selection.selectable.map(node => new DragNodeState(node));
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.state = null;
  }

});

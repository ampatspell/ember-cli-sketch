import EmberObject from '@ember/object';

export default EmberObject.extend({

  node: null,

  withDelta(node, delta, cb) {
    let { _delta } = this;

    if(!_delta) {
      _delta = { x: 0, y: 0 };
    }

    let { frame } = node;

    let point = {
      x: frame.x + _delta.x + delta.x,
      y: frame.y + _delta.y + delta.y
    };

    cb(point);

    _delta = {
      x: point.x - frame.x,
      y: point.y - frame.y
    };

    this._delta = _delta;
  },

  update({ delta }) {
    let { node } = this;

    this.withDelta(node, delta, point => {
      node.update(point);
      node.perform('snap-to-guidelines');
    });

    node.perform('move-to-container');
  }

});

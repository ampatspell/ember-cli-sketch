import EmberObject from '@ember/object';

export default EmberObject.extend({

  node: null,

  point: null,

  init() {
    this._super(...arguments);
    let { node: { frame: { x, y } } } = this;
    this.set('point', { x, y });
  },

  addDelta(delta) {
    let { point } = this;
    let add = prop => point[prop] = point[prop] + delta[prop];
    add('x');
    add('y');
    return point;
  },

  update({ delta }) {
    let { node } = this;
    let point = this.addDelta(delta);

    node.update(point);
    // node.perform('snap-to-guidelines');
    node.perform('move-to-container');
  }

});

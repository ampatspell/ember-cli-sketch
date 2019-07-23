import EmberObject from '@ember/object';

export default EmberObject.extend({

  action: null,
  node: null,
  edge: null,

  point: null,

  init() {
    this._super(...arguments);
    let { node: { frame: { x, y } } } = this;
    this.set('point', { x, y });
  },

  // addDelta(delta) {
  //   let { point } = this;
  //   let add = prop => point[prop] = point[prop] + delta[prop];
  //   add('x');
  //   add('y');
  //   return point;
  // }

  perform({ delta, aspect }) {
    console.log(this.node+'', this.edge, delta, aspect);
    // let { action, node } = this;
    // let point = this.addDelta(delta);
    // action.perform(node, { point });
  }

});

import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  tool: null,
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

  update({ delta, aspect }) {
    console.log(this.node+'', this.edge, delta, aspect);
    // let { action, node } = this;
    // let point = this.addDelta(delta);
    // action.perform(node, { point });
  }

});

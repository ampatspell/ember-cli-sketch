import Action from '../-base';

class NodeDragState {

  constructor(action, node) {
    this.action = action;
    this.node = node;

    let { x, y } = node.frame;
    this.point = { x, y };
  }

  addDelta(delta) {
    let { point } = this;
    let add = prop => point[prop] = point[prop] + delta[prop];
    add('x');
    add('y');
    return point;
  }

  perform({ delta }) {
    let { action, node } = this;
    let point = this.addDelta(delta);
    action.perform(node, { point });
  }

}

export default Action.extend({

  perform(node, { point }) {
    node.update(point);

    node.perform('snap-to-guidelines');
    node.perform('move-to-container');
  },

  begin(node) {
    return new NodeDragState(this, node);
  }

});

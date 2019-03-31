import Node from './-base';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  isGroup: true,
  isContainer: true,

  frame: frame('group'),
  nodes: nodes(),

  moveToParent(/*parent*/) {
    // let select = this._beginMoveSelection();
    // let commits = this.nodes.all.map(node => node._beginMoveToParent(parent));

    // // TODO: via model
    // this.remove();
    // parent.nodes.addNode(this);
    // commits.forEach(commit => commit());

    // select();

    // return true;
    return false;
  },

  update(props) {
    let delta = this.frame.frameToDelta(props);
    this.nodes.all.forEach(node => {
      node.update(node.frame.deltaToFrame(delta));
    });
  }

});

import Node from './-base';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';
import { assign } from '@ember/polyfills';

export default Node.extend({

  isGroup: true,
  isContainer: true,

  frame: frame('group'),
  nodes: nodes(),

  moveToParent(parent) {
    let select = this._beginMoveSelection();
    let commits = this.nodes.all.map(node => node._beginMoveToParent(parent));
    this.stage._moveNode(this, parent);
    commits.forEach(commit => commit());
    select();
    return true;
  },

  update(props, opts) {
    opts = assign({ delta: false }, opts);
    if(opts.delta) {
      props = this.frame.deltaToFrame(props);
    }

    let delta = this.frame.frameToDelta(props);
    this.nodes.all.forEach(node => {
      node.update(delta, { delta: true });
    });
  }

});

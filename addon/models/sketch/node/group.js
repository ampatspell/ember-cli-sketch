import Node from './-base';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  isGroup: true,

  frame: frame('group'),
  nodes: nodes(),

  moveToParent(parent) {
    let selected = this.isSelected;

    if(selected) {
      this.deselect();
    }

    let frames = this.nodes.all.map(node => parent.frame.convertFrameFromAbsolute(node.frame.absolute));

    this.remove();
    this.nodes.all.forEach((node, idx) => node.frame.update(frames[idx]));
    parent.nodes.addNode(this);

    if(selected) {
      this.select({ replace: false });
    }

    return true;
  }

});

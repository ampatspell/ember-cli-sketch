import Node from './-base';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  frame: frame('group'),
  nodes: nodes(),

  // nodesForPosition(position, type) {
  //   if(this.frame.includesPosition(position, type)) {
  //     let nodes = this.nodes.nodesForPosition(position, type);
  //     return [ this, ...nodes ];
  //   }
  //   return [];
  // }

});

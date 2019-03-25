import Node from './-base';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  isGroup: true,

  frame: frame('group'),
  nodes: nodes()

});

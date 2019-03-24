import Node from './-base';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  frame: frame('node/sized'),
  nodes: nodes()

});

import Node from './-base';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  isArea: true,
  isContainer: true,

  frame: frame('node'),
  nodes: nodes()

});

import Node from './-base';
import { self } from '../../../util/computed';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  isArea: true,
  area: self(),

  frame: frame('node'),
  nodes: nodes()

});

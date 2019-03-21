import Node from '../node';
import { frame } from '../frame';

export default Node.extend({

  type: 'rect',
  frame: frame(),

  fill: 'red',
  opacity: 1

});

import Node from './-base';
import { frame } from '../frame/-base';

export default Node.extend({

  frame: frame('node/sized'),

  fill: '#000000',
  opacity: 1

});

import Node, { model } from './-base';
import { frame } from '../frame/-base';

export default Node.extend({

  frame: frame('node'),

  fill:    model('fill'),
  opacity: model('opacity')

});

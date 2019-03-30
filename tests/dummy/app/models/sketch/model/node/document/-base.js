import Node from '../-base';
import { readOnly } from '@ember/object/computed';

export const prop = key => readOnly(`object.${key}`);

export default Node.extend({

  type:     prop('type'),

  x:        prop('x'),
  y:        prop('y'),
  width:    prop('width'),
  height:   prop('height'),
  rotation: prop('rotation')

});

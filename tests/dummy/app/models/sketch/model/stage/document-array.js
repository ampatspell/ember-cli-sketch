import StageArray from './array';
import { readOnly } from '@ember/object/computed';

const prop = key => readOnly(`documents.${key}`);

export default StageArray.extend({

  documents: null,

  array: prop('all'),

  x:     prop('x'),
  y:     prop('y'),
  zoom:  prop('zoom')

});

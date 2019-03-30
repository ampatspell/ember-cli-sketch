import StageArray from './array';
import { readOnly } from '@ember/object/computed';

const prop = key => readOnly(`documents.${key}`);

export default StageArray.extend({

  array: prop('all'),
  x:     prop('x'),
  y:     prop('y'),
  zoom:  prop('zoom'),

  moveModel(model, target) {
    model.set('parentId', target.id);
  },

  handle(action) {
    this.documents.handle(action);
  },

  update(props) {
    this.documents.update(props);
  }

});

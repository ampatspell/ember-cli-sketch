import StageArray from './array';
import { readOnly } from '@ember/object/computed';

export default StageArray.extend({

  documents: null,
  array: readOnly('documents.all'),

  nodeModelTypeForObject(object) {
    let { type } = object;
    return `document/${type}`;
  }

});

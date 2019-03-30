import StageArray from './array';
import { readOnly } from '@ember/object/computed';

export default StageArray.extend({

  model: readOnly('documents'),
  array: readOnly('documents.all')

});

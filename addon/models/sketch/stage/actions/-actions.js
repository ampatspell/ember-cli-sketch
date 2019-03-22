import Base from '../../-base';
import { model } from '../actions';
import { readOnly } from '@ember/object/computed';

export {
  model
}

export default Base.extend({

  stage: readOnly('owner.stage')

});

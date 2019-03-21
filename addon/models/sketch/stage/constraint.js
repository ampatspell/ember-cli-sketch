import Base from '../-base';
import { readOnly, not } from '@ember/object/computed';

export default Base.extend({

  owner: null,

  resize: true,
  min: null,
  max: null,

  isResizable: readOnly('resize'),
  isNotResizable: not('isResizable')

});

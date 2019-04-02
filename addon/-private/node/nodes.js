import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  parent: null,

  all: readOnly('parent._nodes')

});

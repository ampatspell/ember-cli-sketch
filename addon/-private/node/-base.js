import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default opts => EmberObject.extend({

  model: null,

  parent: readOnly(`model.${opts.parent}`),
  nodes:  readOnly(`model.${opts.nodes}`),

});

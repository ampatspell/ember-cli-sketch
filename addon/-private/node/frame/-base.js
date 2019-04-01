import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export const model = key => readOnly(`model.${key}`);

export default EmberObject.extend({

  node: null,
  model: readOnly('node.model'),
  zoom: readOnly('node.stage.node.zoom')

});

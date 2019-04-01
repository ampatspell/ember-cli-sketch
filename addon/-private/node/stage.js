import create, { frame } from './-base';
import { zoom } from '../util/computed';
import { readOnly } from '@ember/object/computed';

export default opts => create(opts).extend({

  frame: frame('stage'),

  stage: readOnly('model'),

  zoom: zoom('model.zoom')

});

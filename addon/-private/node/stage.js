import create from './-base';
import { zoom } from '../util/computed';

export default opts => create(opts).extend({

  zoom: zoom('model.zoom')

});

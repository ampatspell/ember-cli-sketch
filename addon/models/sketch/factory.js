import Base from './-base';
import { factory } from './factory/-base';

export default Base.extend({

  owner: null,

  model() {
    return this.owner.model(...arguments);
  },

  stage: factory('stage'),
  node: factory('node')

});

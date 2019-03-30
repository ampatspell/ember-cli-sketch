import Base from './-base';
import { factory } from './factory/-base';

export default Base.extend({

  owner: null,

  _model() {
    return this.owner.model(...arguments);
  },

  stage: factory('stage'),

});

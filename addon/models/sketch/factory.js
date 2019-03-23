import Base from './-base';
import { factory } from './factory/-base';

export default Base.extend({

  owner: null,

  model() {
    return this.owner.model(...arguments);
  },

  stage: factory('stage'),

  area(type, props) {
    return this.model(`area/${type}`, props);
  },

  node(name, props) {
    return this.model(`node/${name}`, props);
  }

});

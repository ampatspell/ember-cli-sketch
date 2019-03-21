import Base from './-base';
import { factory } from './factory/-base';

export default Base.extend({

  owner: null,

  model() {
    return this.owner.model(...arguments);
  },

  stage: factory('stage'),

  area(props) {
    return this.model('area', props);
  },

  node(name, props) {
    return this.model(`node/${name}`, props);
  }

});

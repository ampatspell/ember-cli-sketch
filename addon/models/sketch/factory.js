import EmberObject from '@ember/object';
import { factory } from './factory/-base';

export default EmberObject.extend({

  owner: null,

  prepare(props) {
    this.setProperties(props);
  },

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

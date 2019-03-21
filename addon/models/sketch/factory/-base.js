import EmberObject, { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';

export const factory = name => computed(function() {
  return sketches(this).model(`factory/${name}`, { owner: this });
}).readOnly();

export default EmberObject.extend({

  owner: null,

  prepare(props) {
    this.setProperties(props);
  },

  model() {
    return this.owner.model(...arguments);
  }

});

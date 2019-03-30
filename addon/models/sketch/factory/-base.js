import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';

export const factory = name => computed(function() {
  return sketches(this).model(`factory/${name}`, { owner: this });
}).readOnly();

export default Base.extend({

  owner: null,

  _model() {
    return this.owner._model(...arguments);
  }

});

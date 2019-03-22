import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';

export const actions = () => computed(function() {
  return sketches(this).factory.stage.actions(this);
}).readOnly();

export default Base.extend({

  owner: null

});

import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';

export const actions = () => computed(function() {
  return sketches(this).factory.stage.actions.create(this);
}).readOnly();

export const model = (type) => computed(function() {
  return sketches(this).factory.stage.actions.actions(type, { owner: this, stage: this.owner });
}).readOnly();

export default Base.extend({

  owner: null,

  node:  model('node'),
  stage: model('stage'),

});

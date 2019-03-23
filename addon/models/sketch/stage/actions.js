import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';

export const actions = () => computed(function() {
  return sketches(this).factory.stage.actions(this);
}).readOnly();

export const model = (type) => computed(function() {
  let stage = this.owner;
  while(stage.owner) {
    stage = stage.owner;
  }
  return sketches(this).factory.stage.action(type, { owner: this, stage });
}).readOnly();

export default Base.extend({

  owner: null,

  node:  model('node'),
  stage: model('stage'),

});

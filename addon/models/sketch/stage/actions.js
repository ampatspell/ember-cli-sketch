import Base from '../-base';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { sketches } from '../../../services/sketches';

export const actions = () => computed(function() {
  return sketches(this).factory.stage.actions(this);
}).readOnly();

export const model = type => computed(function() {
  return sketches(this).factory.stage.action(type, this);
}).readOnly();

export default Base.extend({

  owner: null,
  stage: readOnly('owner'),

  node: model('node')

});

import Base from '../../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../../services/sketches';

const actions = () => computed(function() {
  let { types } = this;
  return types.map(type => sketches(this).factory.stage.actions.action(type, this, { stage: this.owner.owner }));
}).readOnly();

export default Base.extend({

  all: actions(),

  prepare() {
    this._super(...arguments);
    this.setProperties(this.all.reduce((hash, action) => {
      hash[action.type] = action;
      return hash;
    }, {}));
  }

});

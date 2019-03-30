import Base from '../-base';
import { computed } from '@ember/object';
import { readOnly, gt } from '@ember/object/computed';
import { frame } from '../frame/-base';

export default opts => Base.extend({

  stage: readOnly('owner.stage'),
  parent: readOnly('owner.parent'),
  frame: frame('nodes'),

  all: computed(`owner.all.@each.${opts.condition}`, function() {
    return this.owner.all.filterBy(opts.condition, true);
  }).readOnly(),

  any: gt('all.length', 0),

  find() {
    return this.all.find(...arguments);
  }

});

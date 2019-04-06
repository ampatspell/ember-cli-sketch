import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

const factory = () => computed(function() {
  return getOwner(this).factoryFor('sketch:sketches/factory').create({ sketches: this });
}).readOnly();

export default EmberObject.extend({

  factory: factory()

});

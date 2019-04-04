import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

const factory = () => computed(function() {
  return getOwner(this).factoryFor('sketch:factory').create({ sketches: this });
}).readOnly();

export default EmberObject.extend({

  factory: factory()

});

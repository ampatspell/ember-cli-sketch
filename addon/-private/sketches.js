import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default EmberObject.extend({

  factory: computed(function() {
    return getOwner(this).factoryFor('sketch:factory').create({ sketches: this });
  }).readOnly()

});

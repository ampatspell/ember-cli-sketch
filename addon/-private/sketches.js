import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

const create = name => computed(function() {
  return getOwner(this).factoryFor(`sketch:sketches/${name}`).create({ sketches: this });
}).readOnly();

export default EmberObject.extend({

  factory: create('factory'),
  fonts:   create('fonts'),

});

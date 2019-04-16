import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { factory } from '../-private/util/computed';

const create = () => computed(function() {
  return getOwner(this).factoryFor(`sketch:sketches/factory`).create({ sketches: this });
}).readOnly();

const model = name => factory((factory, sketches) => factory[name].call(factory, sketches));

export default EmberObject.extend({

  factory: create(),

  fonts:   model('fonts'),
  actions: model('actions')

});

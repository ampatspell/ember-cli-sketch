import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { factory } from '../-private/util/computed';

const create = () => computed(function() {
  return getOwner(this).factoryFor(`sketch:sketches/factory`).create({ sketches: this });
}).readOnly();

const fonts = () => factory((factory, sketches) => factory.fonts(sketches));

export default EmberObject.extend({

  factory: create(),
  fonts:   fonts()

});

import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';

const factory = () => computed(function() {
  setGlobal({ sketches: this });
  return getOwner(this).factoryFor('sketch:sketches/factory').create({ sketches: this });
}).readOnly();

const create = name => computed(function() {
  let factory = this.factory;
  return factory[name].call(factory, { sketches: this });
}).readOnly();

export default EmberObject.extend({

  factory: factory(),

  cursor: create('cursor')

});

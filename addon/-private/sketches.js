import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { factory } from '../-private/util/computed';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';

export const defaults = {
  interactions: [
    'tools'
  ],
  tools: [
    'selection',
    'stage/drag',
    'stage/zoom',
    'node/add',
    'node/resize',
    'node/move',
    'node/drag',
    'node/remove'
  ],
  actions: [
    'stage/zoom',
    'stage/reset',
    'stage/center',
    'stage/fit',
    'stage/selectable',
    'node/aspect-fit'
  ],
  fonts: {
  }
};

const create = () => computed(function() {
  return getOwner(this).factoryFor(`sketch:sketches/factory`).create({ sketches: this, opts: this.mergedOptions });
}).readOnly();

const model = name => factory((factory, sketches) => factory[name].call(factory, sketches));

export default EmberObject.extend({

  options: null,
  registrations: null,

  factory: create(),

  fonts:   model('fonts'),
  actions: model('actions'),

  mergedOptions: computed(function() {
    let { options, registrations } = this;
    assert(`sketches.options are required`, !!options);

    if(registrations) {
      let merge = key => {
        let arr = registrations[key];
        if(arr) {
          options[key] = [ ...options[key], ...arr ];
        }
      }

      merge('interactions');
      merge('actions');
      merge('tools');

      options.fonts = assign({}, options.fonts, registrations.fonts);
    }

    return options;
  }).readOnly()

});

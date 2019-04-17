import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { factory } from '../-private/util/computed';

let opts = {
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
    'stage/fit'
  ],
  fonts: {
    google: {
      'Ubuntu Mono': '400,400i,700,700i',
      'Pacifico': true,
      'Montserrat': '100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i:latin,latin-ext',
      'Bitter': true,
      'Amatic SC': true,
      'Chewy': true,
      'Dokdo': true,
      'Fredoka One': true,
      'Raleway': '100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i:latin,latin-ext'
    }
  }
};

const create = () => computed(function() {
  return getOwner(this).factoryFor(`sketch:sketches/factory`).create({ sketches: this, opts });
}).readOnly();

const model = name => factory((factory, sketches) => factory[name].call(factory, sketches));

export default EmberObject.extend({

  factory: create(),

  fonts:   model('fonts'),
  actions: model('actions')

});

import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

export default EmberObject.extend({

  sketches: null,
  types: null,

  instances: computed(function() {
    let { sketches: { factory }, types } = this;
    return A(types.map(type => factory.action(this, type)));
  }).readOnly(),

  action(node, name) {
    let { type } = node;
    let action = this.instances.findBy('type', `${type}/${name}`);
    if(!action) {
      action = this.instances.findBy('type', `node/${name}`);
    }
    assert(`action '${type}/${name}' is not registered`, !!action);
    return action;
  },

  perform(name, node, ...args) {
    let action = this.action(node, name);
    return action.perform(node, ...args);
  }

});

import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { factory } from '../util/computed';

const all = () => factory((factory, actions) => A(actions.types.map(type => factory.action(type, actions))));

export default EmberObject.extend({

  all: all(),

  action(node, name) {
    let { type } = node;
    let action = this.all.findBy('type', `${type}/${name}`);
    if(!action) {
      action = this.all.findBy('type', `node/${name}`);
    }
    assert(`action '${type}/${name}' is not registered`, !!action);
    return action;
  },

  perform(name, node, ...args) {
    let action = this.action(node, name);
    return action.perform(node, ...args);
  }

});

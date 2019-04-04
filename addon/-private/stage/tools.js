import EmberObject, { computed } from '@ember/object';
import { factory } from '../util/computed';
import { A } from '@ember/array';

const all = () => factory((factory, tools) => A(tools.types.map(type => factory.tool(type, tools))));

const selected = () => {
  let _set = (owner, next) => {
    let current = owner._selected;
    if(current !== next) {
      if(current) {
        current.deactivate();
      }
      owner._selected = next;
      next.activate();
    }
    return next;
  }
  return computed({
    get() {
      return _set(this, this.default);
    },
    set(key, value) {
      return _set(this, value || this.default);
    }
  });
}

export default EmberObject.extend({

  stage: null,
  types: null,

  all: all(),

  default: computed(function() {
    return this.byType(this.types[0]);
  }).readOnly(),

  selected: selected(),

  byType(type) {
    return this.all.findBy('type', type);
  },

  activate(type) {
    let tool = this.byType(type);
    if(this.selected === tool) {
      return;
    }
    this.set('selected', tool);
  },

  deactivate(type) {
    let tool = this.byType(type);
    if(this.selected !== tool) {
      return;
    }
    this.set('selected', null);
  },

  reset() {
    this.set('selected', null);
  }

});

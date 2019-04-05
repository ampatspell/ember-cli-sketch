import EmberObject, { computed } from '@ember/object';
import { factory } from '../util/computed';
import { A } from '@ember/array';

const all = () => factory((factory, tools) => A(tools.types.map(type => factory.tool(type, tools))));

const selected = () => {
  return computed({
    get() {
      if(!this._selected) {
        this._selected = this.default;
        this._selected.activate();
      }
      return this._selected;
    },
    set(key, value) {
      this._selected = value;
      return this._selected;
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

  replace(tool, props) {
    let { selected } = this;

    tool = tool || this.default;

    if(selected === tool) {
      return;
    }

    if(selected) {
      selected.deactivate(tool);
    }

    this.set('selected', tool);

    tool.activate(props);
  },

  activate(type, props) {
    let tool = this.byType(type);
    this.replace(tool, props);
  },

  deactivate(type) {
    let tool = this.byType(type);
    if(this.selected !== tool) {
      return;
    }
    this.replace(null);
  },

  _deactivate(tool) {
    if(this.selected !== tool) {
      return;
    }
    this.reset();
  },

  reset() {
    this.replace(null);
  }

});

import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { frame } from './frame/-base';

export {
  frame
};

export const nodes = () => computed(function() {
  return this.sketches.factory.nodes(this);
}).readOnly();

export default opts => {

  const value = key => readOnly(`model.${opts.properties[key]}`);

  const prop = (key, defaultValue) => computed(function() {
    let value = opts[key];
    if(value === undefined) {
      value = defaultValue;
    }
    return value;
  }).readOnly();

  return EmberObject.extend({

    model: null,

    isContainer: prop('container', false),

    _parent: value('parent'),
    _nodes:  value('nodes'),

    type:    value('type'),
    stage:   value('stage'),

    nodes:   nodes(),

    isSelected: computed('stage.node.selection.all.[]', function() {
      let selection = this.get('stage.node.selection.all');
      if(!selection) {
        return;
      }
      return selection.includes(this);
    }).readOnly(),

    parent: computed('_parent', 'stage', function() {
      let parent = this._parent;
      if(parent) {
        return parent;
      }
      return this.stage;
    }).readOnly(),

    containsNode(node) {
      return this.nodes.containsNode(node);
    },

    update(props, opts) {
      let { delta } = assign({ delta: false }, opts);
      if(delta) {
        props = this.frame.deltaToFrame(props);
      }
      assert(`update is required for ${this.model}`, !!this.model.update);
      return this.model.update(props);
    },

    remove() {
      assert(`remove is required for ${this.model}`, !!this.model.remove);
      this.model.remove();
    },

  });
};

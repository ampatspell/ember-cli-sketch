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

const parent = (prop, key) => computed(`parent.{${prop},${key}}`, function() {
  let parent = this.get('parent');
  if(!parent) {
    return;
  }
  if(parent[prop]) {
    return parent;
  }
  return parent[key];
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

    stage:     parent('isStage', 'stage'),
    container: parent('isContainer', 'container'),

    _stage:  value('stage'),
    _parent: value('parent'),
    _models: value('nodes'),
    type:    value('type'),

    _rotatedFrame: readOnly('frame.rotated'),

    nodes: nodes(),

    parent: computed('_parent', '_stage', function() {
      let parent = this._parent;
      if(parent) {
        return parent.node;
      }
      let stage = this._stage;
      if(stage) {
        return this._stage.node;
      }
    }).readOnly(),

    isSelected: computed('stage.node.selection.all.[]', function() {
      let selection = this.get('stage.node.selection.all');
      if(!selection) {
        return;
      }
      return selection.includes(this);
    }).readOnly(),

    containsNode(node) {
      return this.nodes.containsNode(node);
    },

    _update(props) {
      assert(`update is required for ${this.model}`, !!this.model.update);
      // let changes = this.frame.changesForFrame(props);
      this.model.update(props);
    },

    update(props, opts) {
      let { delta } = assign({ delta: false }, opts);
      if(delta) {
        props = this.frame.deltaToFrame(props);
      }
      this._update(props);
    },

    remove() {
      assert(`remove is required for ${this.model}`, !!this.model.remove);
      this.model.remove();
    },

    //

    deselect() {
      this.stage.selection.removeNode(this);
    },

    select(opts) {
      let { replace } = assign({ replace: true }, opts);
      let { selection } = this.stage;
      if(replace) {
        selection.replace([ this ]);
      } else {
        selection.addNode(this);
      }
    },

    //

    _beginMoveSelection() {
      let selected = this.isSelected;
      if(selected) {
        this.deselect();
      }

      return () => {
        if(selected) {
          this.select({ replace: false });
        }
      }
    },

    _beginMoveToParent(parent) {
      let select = this._beginMoveSelection();
      let frame = parent.frame.convertFrameFromAbsolute(this.frame.absolute);
      return () => {
        this.update(frame);
        select();
      };
    },

    moveTo(target) {
      let commit = this._beginMoveToParent(target);

      let model = null;
      if(target && !target.isStage) {
        target = target.model;
      }

      assert(`move is required for ${this.model}`, !!this.model.move);
      this.model.move(model);

      commit();
    },

  });
};

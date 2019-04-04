import EmberObject, { computed } from '@ember/object';
import { readOnly, bool } from '@ember/object/computed';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { frame } from './frame/-base';
import { factory as _factory } from '../util/computed';

export {
  frame
};

const factory = name => () => _factory((factory, node) => factory[name].call(factory, node));

const nodes = factory('nodes');
const attributes = factory('attributes');
const edge = factory('edge');

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

const prop = (key, defaultValue) => computed(function() {
  let value = this.opts[key];
  if(value === undefined) {
    value = defaultValue;
  }
  return value;
}).readOnly();

export default opts => {

  const value = key => readOnly(`model.${opts.properties[key]}`);

  return EmberObject.extend({

    model: null,

    _stage:  value('stage'),
    _parent: value('parent'),
    _models: value('nodes'),

    type:    value('type'),

    isContainer: prop('container', false),
    isAttached: bool('parent'),

    parent:    readOnly('_parent.node'),
    stage:     parent('isStage', 'stage'),
    container: parent('isContainer', 'container'),

    _rotatedFrame: readOnly('frame.rotated'),

    nodes: nodes(),
    attributes: attributes(),
    edge: edge(),

    index: computed('parent.nodes.all.[]', function() {
      let nodes = this.get('parent.nodes.all');
      if(!nodes) {
        return;
      }
      return nodes.indexOf(this.model) + 1;
    }).readOnly(),

    isSelected: computed('stage.selection.all.[]', function() {
      let selection = this.get('stage.selection.all');
      if(!selection) {
        return;
      }
      return selection.includes(this);
    }).readOnly(),

    clampAttributeDelta(attribute, delta) {
      return this.attributes.attribute(attribute, true, 'number').clampDelta(delta);
    },

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

    hover() {
      let { replace } = assign({ replace: true }, opts);
      let { hover } = this.stage;
      if(replace) {
        hover.replace([ this ]);
      } else {
        hover.addNode(this);
      }
    },

    //

    _withMoveToParent(parent, cb) {
      let absolute = this.frame.absolute;
      let frame = parent.frame.convertFrameFromAbsolute(absolute);
      cb();
      this.update(frame);
    },

    moveTo(target) {
      assert(`move is required for ${this.model}`, !!this.model.move);

      let model = null;
      if(target && !target.isStage) {
        model = target.model;
      }

      this._withMoveToParent(target, () => {
        this.model.move(model);
      });
    },

    moveToBottom() {
      assert(`moveToBottom is required for ${this.model}`, !!this.model.moveToBottom);
      this.model.moveToBottom();
    }

  });
};

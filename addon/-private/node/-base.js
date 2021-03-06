import EmberObject, { computed } from '@ember/object';
import { readOnly, bool, and, not } from '@ember/object/computed';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { frame } from './frame/-base';
import { factory as _factory } from '../util/computed';

export {
  frame
};

const {
  keys
} = Object;

const factory = (name, opts) => () => _factory((factory, node) => factory[name].call(factory, node, opts));

const nodes = factory('nodes');
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

const included = arrayKey => computed(`${arrayKey}.[]`, function() {
  let array = this.get(arrayKey);
  if(!array) {
    return;
  }
  return array.includes(this);
}).readOnly();

export default opts => {

  const attributes = () => _factory((factory, node) => {
    let { identifier } = opts;
    let { type } = node;
    return factory.attributes(node, { identifier, type });
  });

  const value = (key, defaultValue) => {
    let path = `model.${opts.properties[key]}`;
    return computed(path, function() {
      let value = this.get(path);
      if(value === undefined) {
        value = defaultValue;
      }
      return value;
    }).readOnly();
  };

  const isEditing = () => computed('stage.tools.selected.{type,node}', function() {
    let tool = this.stage.tools.selected;
    return tool.type === 'node/edit' && tool.node === this;
  }).readOnly();

  return EmberObject.extend({

    model: null,

    _stage:      value('stage'),
    _parent:     value('parent'),
    _models:     value('nodes'),
    _visible:    value('visible'),
    _selectable: value('selectable', true),

    type:        value('type'),
    aspect:      readOnly('model.aspect'),
    accessories: readOnly('model.accessories'),
    guidelines:  readOnly('model.guidelines'),

    isContainer:  prop('container', false),
    isAttached:   bool('parent'),
    isVisible:    and('isAttached', '_visible', 'parent.isVisible'),
    isEditing:    isEditing(),
    isNotEditing: not('isEditing'),
    isSelectable: and('isAttached', 'isVisible', 'isNotEditing', '_selectable', 'parent.isSelectable'),
    isEditable:   and('model.isEditable', 'isSelectable'),

    parent:    readOnly('_parent.node'),
    stage:     parent('isStage', 'stage'),
    container: parent('isContainer', 'container'),

    nodes:      nodes(),
    attributes: attributes(),
    edge:       edge(),

    _guidelines: readOnly('guidelines.matched'),
    _rotatedFrame: readOnly('frame.rotated'),
    _hasEdge: readOnly('edge.has'),

    recursive: computed('nodes.recursive', function() {
      let { nodes: { recursive } } = this;
      return [ this, ...recursive ];
    }).readOnly(),

    index: computed('parent.nodes.all.[]', function() {
      let nodes = this.get('parent.nodes.all');
      if(!nodes) {
        return;
      }
      return nodes.indexOf(this) + 1;
    }).readOnly(),

    isSelected: included('stage.selection.all'),
    isHovered: included('stage.hover.all'),

    containsNode(node) {
      return this.nodes.containsNode(node);
    },

    _update(props) {
      assert(`update is required for ${this.model}`, !!this.model.update);
      this.model.update(props);
    },

    update(props, opts) {
      if(!props) {
        return;
      }

      let { delta } = assign({ delta: false }, opts);

      if(delta) {
        props = this.frame.deltaToFrame(props);
      }

      props = this.attributes.changes(props);

      if(!keys(props)) {
        return;
      }

      this._update(props);
    },

    action(name) {
      return this.sketches.actions.action(this, name);
    },

    perform(name, ...args) {
      return this.sketches.actions.perform(this, name, ...args);
    },

    hide() {
      this.update({ visible: false });
    },

    show() {
      this.update({ visible: true });
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
      let { replace, toggle } = assign({ replace: true, toggle: false }, opts);

      let { selection } = this.stage;
      let selected = this.isSelected;

      if(replace) {
        if(toggle && selected) {
          selection.clear();
        } else {
          selection.replace([ this ]);
        }
      } else {
        if(toggle && selected) {
          selection.removeNode(this);
        } else {
          let nodes = [
            ...selection.filter(sel => this.containsNode(sel)),
            ...selection.filter(sel => sel.containsNode(this)),
          ];
          selection.removeNodes(nodes);
          selection.addNode(this);
        }
      }
      this.stage.focus();
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

    _replace(next) {
      if(!next || next === this) {
        return;
      }
      let parent = this.parent;
      if(!parent) {
        return;
      }
      assert(`replace is required for ${parent}`, !!parent.model.replace);
      parent.model.replace(this.model, next.model);
    },

    moveToTop() {
      let last = this.parent.nodes.all.lastObject;
      this._replace(last);
    },

    _moveWithDelta(delta) {
      let nodes = this.parent.nodes.all;
      let index = nodes.indexOf(this);
      let next = nodes.objectAt(index + delta);
      this._replace(next);
    },

    moveDown() {
      this._moveWithDelta(-1);
    },

    moveUp() {
      this._moveWithDelta(+1);
    }

  });
};

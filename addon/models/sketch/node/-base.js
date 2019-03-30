import Base from '../-base';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { FrameMixin } from '../frame/-base';

const frame = key => readOnly(`frame.${key}`);

const parent = prop => computed(`parent.${prop}`, function(key) {
  let { parent } = this;
  if(!parent) {
    return;
  }
  if(parent[prop]) {
    return parent;
  }
  return parent[key];
}).readOnly();

export const model = key => readOnly(`model.${key}`);

export default Base.extend(FrameMixin, {

  isNode: true,

  parent: null,
  stage: readOnly('parent.stage'),

  index: computed('parent.nodes.all.[]', function() {
    let nodes = this.get('parent.nodes.all');
    if(!nodes) {
      return;
    }
    return nodes.indexOf(this) + 1;
  }).readOnly(),

  area: parent('isArea'),
  group: parent('isGroup'),

  isSelected: computed('stage.selection.all.[]', function() {
    let selection = this.get('stage.selection.all');
    if(!selection) {
      return;
    }
    return selection.includes(this);
  }).readOnly(),

  _serializedFrame: frame('serialized'),
  _rotatedFrame:    frame('rotated'),

  willAddToParent() {
  },

  didAddToParent(parent) {
    this.setProperties({ parent });
  },

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

  remove() {
    this.parent && this.parent.nodes._removeNode(this);
  },

  willRemove() {
    this.stage && this.stage.willRemoveNode(this);
  },

  didRemove() {
    this.stage && this.stage.didRemoveNode(this);
    this.setProperties({ parent: null });
  },

  //

  moveToBottom() {
    let { parent } = this;
    parent && parent.nodes._moveToBottom(this);
  },

  //

  nodesForPosition(position, type) {
    if(this.nodes) {
      let nodes = this.nodes.nodesForPosition(this.frame.convertPointFromParent(position), type);
      if(nodes.length || this.frame.includesPosition(position, type)) {
        return [ this, ...nodes ];
      }
      return nodes;
    } else {
      if(this.frame.includesPosition(position, type)) {
        return [ this ];
      }
      return [];
    }
  },

  containsNode(node) {
    let { nodes } = this;
    if(nodes) {
      return nodes.containsNode(node);
    }
  },

  allNodes() {
    let { nodes } = this;
    let array = [ this ];
    nodes && nodes.all.forEach(node => {
      array.push(...node.allNodes());
    });
    return array;
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

  moveToParent(parent) {
    let commit = this._beginMoveToParent(parent);

    // TODO: via model
    this.remove();
    parent.nodes.addNode(this);
    commit();

    return true;
  },

  //

  update(props) {
    this.model.update(props);
  }

});

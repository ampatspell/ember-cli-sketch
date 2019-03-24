import Base from '../-base';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { FrameMixin } from '../frame/-base';

const frame = key => readOnly(`frame.${key}`);

export default Base.extend(FrameMixin, {

  isNode: true,

  parent: null,
  stage: readOnly('parent.stage'),
  area: readOnly('parent.area'),

  isSelected: computed('stage.selection.all.[]', function() {
    let selection = this.get('stage.selection.all');
    if(!selection) {
      return;
    }
    return selection.includes(this);
  }).readOnly(),

  _serializedFrame: frame('serialized'),
  _boundsFrame:     frame('bounds'),

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
    this.stage.willRemoveNode(this);
  },

  didRemove() {
    this.stage.didRemoveNode(this);
    this.setProperties({ parent: null });
  },

  //

  nodesForPosition(position, type) {
    if(this.nodes) {
      let nodes = this.nodes.nodesForPosition(this.frame.convertPointFromParent(position), type);
      if(nodes.length) {
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
  }

});

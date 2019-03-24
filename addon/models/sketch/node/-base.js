import Base from '../-base';
import { readOnly } from '@ember/object/computed';
import { FrameMixin } from '../frame/-base';

const frame = key => readOnly(`frame.${key}`);

export default Base.extend(FrameMixin, {

  isNode: true,

  parent: null,
  stage: readOnly('parent.stage'),

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
    if(this.frame.includesPosition(position, type)) {
      let { nodes } = this;
      if(nodes) {
        return [ this, ...nodes.nodesForPosition(this.frame.convertPointFromParent(position), type) ];
      } else {
        return [ this ];
      }
    }
    return [];
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

});

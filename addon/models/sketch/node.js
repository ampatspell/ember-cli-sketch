import Selectable from './-selectable';
import { readOnly } from '@ember/object/computed';

export default Selectable.extend({

  isNode: true,
  group: null,

  area: readOnly('group.area'),
  stage: readOnly('area.stage'),

  _boundingFrame: readOnly('frame.bounding'),

  didAddToGroup(group) {
    window.node= this;
    this.setProperties({ group });
  },

  nodesForPosition(position) {
    if(this.frame.includesPosition(position)) {
      return [ this ];
    }
    return [];
  },

  containsNode() {
    return false;
  },

  hasParentNode(node) {
    let { group } = this;
    if(!group) {
      return false;
    }
    if(group === node) {
      return true;
    }
    return group.hasParentNode(node);
  },

  select() {
    this.stage.selection.replace([ this ]);
  },

  remove() {
    let { group } = this;
    if(!group) {
      return;
    }
    group._removeNode(this);
  },

  willRemove() {
    this.stage.willRemoveNode(this);
  },

  didRemove() {
    this.stage.didRemoveNode(this);
  },

  toStringExtension() {
    let { frame: { serialized: { x, y, width, height } } } = this;
    return `${x}×${y}:${width}×${height}`;
  }

});

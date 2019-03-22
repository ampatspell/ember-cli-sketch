import Selectable from './-selectable';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';

export default Selectable.extend({

  isNode: true,
  group: null,

  area: readOnly('group.area'),
  stage: readOnly('area.stage'),

  _boundingFrame: readOnly('frame.bounding'),

  didAddToGroup(group) {
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

  allNodes() {
    return [ this ];
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

  deselect() {
    this.stage.selection.removeNode(this);
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
    this.setProperties({ group: null });
  },

  toStringExtension() {
    let { frame: { serialized: { x, y, width, height } } } = this;
    return `${x}×${y}:${width}×${height}`;
  }

});

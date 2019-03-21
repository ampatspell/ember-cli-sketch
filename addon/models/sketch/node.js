import Base from './-with-frame';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';

export default Base.extend({

  isNode: true,
  group: null,

  area: readOnly('group.area'),
  stage: readOnly('area.stage'),

  isSelected: computed('stage.selection.nodes.[]', function() {
    return this.stage.selection.find(node => node === this);
  }).readOnly(),

  notSelected: not('isSelected'),

  isHovered: computed('stage.hover.nodes.[]', function() {
    return this.stage.hover.find(node => node === this);
  }).readOnly(),

  _boundingFrame: readOnly('frame.bounding'),

  didAddToGroup(group) {
    this.setProperties({ group });
  },

  nodesForPosition(position) {
    if(this.frame.includesAbsolutePosition(position)) {
      return [ this ];
    }
    return [];
  },

  includesNode() {
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

  toStringExtension() {
    let { frame: { serialized: { x, y, width, height } } } = this;
    return `${x}×${y}:${width}×${height}`;
  }

});

import Base from './-with-frame';
import { frame } from './frame';
import { readOnly } from '@ember/object/computed';

export default Base.extend({

  isArea: true,

  stage: null,
  group: null,

  frame: frame('area'),

  _serializedFrame: readOnly('frame.serialized'),
  _absoluteFrame: readOnly('frame.absolute'),

  setGroup(group) {
    this.setProperties({ group });
    group.didAddToArea(this);
  },

  didAddToStage(stage) {
    this.setProperties({ stage });
  },

  nodesForAbsolutePosition(position) {
    let local = this.frame.convertToLocalPosition(position);
    return this.group.nodesForPosition(local);
  }

});

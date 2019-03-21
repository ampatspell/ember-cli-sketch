import Base from './-with-frame';
import { frame } from './frame';
import { readOnly } from '@ember/object/computed';

export default Base.extend({

  isArea: true,

  stage: null,
  group: null,

  frame: frame('area'),

  _serializedFrame: readOnly('frame.serialized'),

  setGroup(group) {
    this.setProperties({ group });
    group.didAddToArea(this);
  },

  didAddToStage(stage) {
    this.setProperties({ stage });
  },

  nodesForStagePosition(position) {
    let area = this.frame.convertPointFromStage(position);
    return this.group.nodesForPosition(area);
  }

});

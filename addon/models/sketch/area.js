import Selectable from './-selectable';
import { frame } from './frame';
import { readOnly } from '@ember/object/computed';

export default Selectable.extend({

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
    let { frame } = this;
    let nodes = [];
    if(frame.includesPosition(position)) {
      nodes.push(this);
    }
    let area = frame.convertPointFromStage(position);
    let group = this.group.nodesForPosition(area);
    nodes.push(...group);
    return nodes;
  },

  _moveNode(node) {
    let frame = this.frame.convertPointFromStage(node.frame.stage);
    node.remove();
    this.group.addNode(node);
    node.frame.update(frame);
  },

  moveNode(node) {
    if(node.isGroup && !node.group) {
      node.deselect();
      let selectRoot = this.group.nodes.length === 0;
      node.nodes.slice().forEach(node => {
        this._moveNode(node);
        if(!selectRoot) {
          node.select({ replace: false });
        }
      });
      if(selectRoot) {
        this.group.select();
      }
    } else {
      node.deselect();
      this._moveNode(node);
      node.select({ replace: false });
    }
  },

  moveNodeIfContained(node) {
    if(this.frame.includesFrame(node.frame.stageBounding)) {
      this.moveNode(node);
      return true;
    }
  }

});
